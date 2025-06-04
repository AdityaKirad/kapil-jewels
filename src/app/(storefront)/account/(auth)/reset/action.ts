"use server";

import type { Errors, FormState } from "~/lib/types";
import {
  isOTPValid,
  updatePassword,
  verifyVerificationToken,
} from "~/server/auth";
import { redirect } from "next/navigation";
import { schema } from "./schema";

export async function onResetAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Errors = {};

    for (const issue of parsed.error.issues) {
      errors[issue.path[0]!] = { type: issue.code, message: issue.message };
    }

    return {
      success: false,
      errors,
    };
  }

  const payload = verifyVerificationToken<{
    actor: "customer";
    type: "reset-password";
    otp: string;
    target: string;
  }>(parsed.data.token);

  if (!payload) {
    return {
      success: false,
      errorMessage: "Invalid Token",
    };
  }

  const { actor, otp, target, type } = payload;
  const { password } = parsed.data;

  const isValid = await isOTPValid({ actor, otp, target, type });

  if (!isValid) {
    return {
      success: false,
      errorMessage: "Invalid Token",
    };
  }

  const isPasswordUpdated = await updatePassword({
    password,
    email: target,
    type: actor,
  });

  if (!isPasswordUpdated) {
    return {
      success: false,
      errorMessage: "Something went wrong. Please try again later.",
    };
  }

  redirect("/account/login");
}
