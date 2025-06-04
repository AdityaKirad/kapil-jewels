"use server";

import { VerifyMail } from "~/components/mails/verify";
import { env } from "~/env";
import type { Errors, Fields, FormState } from "~/lib/types";
import {
  checkCommonPassword,
  createVerificationToken,
  doesUserExist,
  getPasswordHash,
  prepareVerification,
} from "~/server/auth";
import { db } from "~/server/drizzle";
import { password as passwordTable, user } from "~/server/drizzle/schema";
import { sendEmail } from "~/server/email";
import { schema } from "./schema";

export async function onSignupAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Errors = {};
    const fields: Fields = {};

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

  const { firstName, lastName, email, password } = parsed.data;

  const isEmailTaken = await doesUserExist({
    email,
    type: "customer",
  });

  if (isEmailTaken) {
    return {
      success: false,
      fields: { ...parsed.data, password: "" },
      errors: {
        email: {
          type: "email_already_taken",
          message: "Email already taken",
        },
      },
    };
  }

  const isPasswordCommon = await checkCommonPassword(password);

  if (isPasswordCommon) {
    return {
      success: false,
      fields: { ...parsed.data, password: "" },
      errors: {
        password: {
          type: "password_is_common",
          message: "Password is very common. Please use a stronger password",
        },
      },
    };
  }

  await db.transaction(async (tx) => {
    const userId = await tx
      .insert(user)
      .values({
        name: `${firstName} ${lastName}`,
        email,
      })
      .returning({ id: user.id })
      .then((res) => res[0]?.id);

    if (!userId) return tx.rollback();

    await tx
      .insert(passwordTable)
      .values({ userId, hash: await getPasswordHash(password) });
  });

  const verifierDetails = {
    actor: "customer",
    type: "login",
    target: email,
  } as const;

  const { otp } = await prepareVerification(verifierDetails);

  const token = createVerificationToken({
    otp,
    ...verifierDetails,
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
