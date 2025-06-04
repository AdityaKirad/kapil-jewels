"use server";

import { ResetPasswordMail } from "~/components/mails/admin/reset-password";
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

  const user = await doesUserExist({
    email: parsed.data.email,
    type: "admin",
  });

  if (!user) {
    return {
      success: false,
      fields: parsed.data,
      errors: {
        email: {
          type: "account_not_found",
          message: "No account found with this email",
        },
      },
    };
  }

  const verifierDetails = {
    actor: "admin",
    type: "reset-password",
    target: user.email,
  } as const;

  const { otp } = await prepareVerification(verifierDetails);

  const token = createVerificationToken({
    otp,
    ...verifierDetails,
  });

  const { error } = await sendEmail({
    to: user.email,
    subject: "Reset your password",
    react: ResetPasswordMail({
      url: `${env.URL}/admin/reset-password?token=${token}`,
    }),
  });

  if (error) {
    return {
      success: false,
      fields: parsed.data,
      errors: {
        email: {
          type: "email_not_sent",
          message: "Something went wrong, please try again later",
        },
      },
    };
  }

  return {
    success: true,
  };
}
