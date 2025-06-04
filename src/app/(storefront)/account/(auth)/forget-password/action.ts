"use server";

import { ResetPasswordMail } from "~/components/mails/reset-password";
import { env } from "~/env";
import type { Errors, Fields, FormState } from "~/lib/types";
import {
  createVerificationToken,
  doesUserExist,
  prepareVerification,
} from "~/server/auth";
import { sendEmail } from "~/server/email";
import { schema } from "./schema";

export async function onForgetPasswordAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fields: Fields = {};
    const errors: Errors = {};

    for (const key of [...formData.keys()]) {
      const raw = formData.get(key);
      fields[key] = typeof raw === "string" ? raw : "";
    }

    for (const issue of parsed.error.issues) {
      errors[issue.path[0]!] = { type: issue.code, message: issue.message };
    }

    return {
      success: false,
      fields,
      errors,
    };
  }

  const user = await doesUserExist({
    email: parsed.data.email,
    type: "customer",
  });

  if (!user) {
    return {
      success: false,
      fields: parsed.data,
      errors: {
        email: {
          type: "account_not_found",
          message: "Account not found",
        },
      },
    };
  }

  const { email: target } = user;

  const { otp } = await prepareVerification({
    target,
    actor: "customer",
    type: "reset-password",
  });

  const token = createVerificationToken({
    otp,
    target,
    type: "reset-passoword",
    actor: "customer",
  });

  const { error } = await sendEmail({
    to: target,
    subject: "Reset your password",
    react: ResetPasswordMail({
      url: `${env.URL}/account/reset?token=${token}`,
    }),
  });

  if (error) {
    return {
      success: false,
      errorMessage: "Failed to send email. Please try again later.",
    };
  }

  return {
    success: true,
    successMessage:
      "Password reset link sent successfully. Please check your email for verification link.",
  };
}
