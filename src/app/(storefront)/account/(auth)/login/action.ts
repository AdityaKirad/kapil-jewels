"use server";

import { VerifyMail } from "~/components/mails/verify";
import { env } from "~/env";
import type { Errors, Fields, FormState } from "~/lib/types";
import {
  createToken,
  createVerificationToken,
  getExpirationDate,
  prepareVerification,
  SESSION_KEY,
  verifyPassword,
} from "~/server/auth";
import { db } from "~/server/drizzle";
import { session } from "~/server/drizzle/schema";
import { sendEmail } from "~/server/email";
import { sign } from "cookie-signature";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { schema } from "./schema";

export async function onLoginAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fields: Fields = {};
    const errors: Errors = {};

    for (const key of [...formData.keys()]) {
      if (key !== "password") {
        const raw = formData.get(key);
        fields[key] = typeof raw === "string" ? raw : "";
      }
    }

    for (const issue of parsed.error.issues) {
      errors[issue.path[0]!] = {
        type: issue.code,
        message: issue.message,
      };
    }

    return {
      success: false,
      fields,
      errors,
    };
  }

  const { email, password } = parsed.data;

  const user = await db.query.user.findFirst({
    columns: { id: true, emailVerified: true },
    where: (user, { and, eq }) =>
      and(eq(user.email, email), eq(user.type, "customer")),
  });

  if (!user) {
    const error = {
      type: "invalid_credentials",
      message: "Invalid Email or Password",
    };
    return {
      success: false,
      fields: { email, password: "" },
      errors: {
        email: error,
        password: error,
      },
    };
  }

  const isPasswordValid = await verifyPassword({ id: user.id, password });

  if (!isPasswordValid) {
    const error = {
      type: "invalid_credentials",
      message: "Invalid Email or Password",
    };
    return {
      success: false,
      fields: { email, password: "" },
      errors: {
        email: error,
        password: error,
      },
    };
  }

  if (!user.emailVerified) {
    const { otp } = await prepareVerification({
      actor: "customer",
      type: "login",
      target: email,
    });

    const token = createVerificationToken({
      otp,
      target: email,
      type: "login",
      actor: "customer",
    });

    const { error } = await sendEmail({
      to: email,
      subject: "Verify your email",
      react: VerifyMail({ url: `${env.URL}/api/verify?token=${token}` }),
    });

    if (error) {
      return {
        success: false,
        errorMessage: "Failed to send email. Please try logging in again.",
      };
    }

    return {
      success: true,
      successMessage: "Please check your email for verification link.",
    };
  }

  const expires = getExpirationDate(30 * 24 * 60 * 60);

  const token = await db
    .insert(session)
    .values({
      token: createToken(),
      userId: user.id,
      expiresAt: expires,
    })
    .returning({ token: session.token })
    .then((res) => res[0]?.token);

  (await cookies()).set({
    name: SESSION_KEY,
    value: sign(token!, env.SESSION_SECRET),
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });

  redirect("/account");
}
