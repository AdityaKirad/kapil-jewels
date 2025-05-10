"use server";

import { parseWithZod } from "@conform-to/zod";
import { auth, type ERROR_CODES } from "~/server/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "./schema";

export async function signUp(prevState: unknown, data: FormData) {
  const submission = parseWithZod(data, {
    schema: signUpSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { firstName, lastName, email, password } = submission.value;

  try {
    await auth.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
  } catch (error) {
    if (!(error instanceof APIError)) throw error;
    const code = error.body?.code;
    if (code === "USER_ALREADY_EXISTS") {
      return submission.reply({
        fieldErrors: { email: ["Email already taken"] },
      });
    }
    if (
      code ===
      "THE_PASSWORD_YOU_ENTERED_HAS_BEEN_COMPROMISED_PLEASE_CHOOSE_A_DIFFERENT_PASSWORD"
    ) {
      return submission.reply({
        fieldErrors: { password: ["Password is too common"] },
      });
    }
    console.log(error.body?.code, error.body?.message);
  }
}

export async function signIn(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: signInSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { email, password, redirectTo } = submission.value;

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
        callbackURL: redirectTo ?? "/",
      },
    });
  } catch (error) {
    if (!(error instanceof APIError)) throw error;
    const code = error.body?.code as ERROR_CODES;
    console.log(code);
    if (code === "EMAIL_NOT_VERIFIED") {
      return submission.reply({
        formErrors: ["Verify your email before siging in"],
      });
    }
    if (code === "INVALID_EMAIL_OR_PASSWORD") {
      return submission.reply({
        fieldErrors: {
          email: ["Invalid Credentials"],
          password: ["Invalid Credentials"],
        },
      });
    }
  }
}

export async function requestPasswordReset(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, { schema: forgotPasswordSchema });

  if (submission.status !== "success") return submission.reply();

  try {
    await auth.api.forgetPassword({
      body: {
        email: submission.value.email,
        redirectTo: "/account/reset",
      },
    });
  } catch (error) {
    if (!(error instanceof APIError)) {
      throw error;
    }
    const code = error.body?.code;
    if (
      code ===
      "THE_PASSWORD_YOU_ENTERED_HAS_BEEN_COMPROMISED_PLEASE_CHOOSE_A_DIFFERENT_PASSWORD"
    ) {
      return submission.reply({
        fieldErrors: { password: ["Password is too common"] },
      });
    }
    console.log(code);
  }
}

export async function resetUserPassword(
  prevState: unknown,
  formData: FormData,
) {
  const submission = parseWithZod(formData, {
    schema: resetPasswordSchema,
  });

  if (submission.status !== "success") return submission.reply();

  const { password, token } = submission.value;

  try {
    await auth.api.resetPassword({ body: { newPassword: password, token } });
  } catch (error) {
    if (!(error instanceof APIError)) throw error;
    const code = error.body?.code as ERROR_CODES;
    console.log(code);
  }
  return null;
}
