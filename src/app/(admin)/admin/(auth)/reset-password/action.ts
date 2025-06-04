"use server";

import type { Errors, FormState } from "~/lib/types";
import {
  doesUserExist,
  getPasswordHash,
  verifyVerificationToken,
} from "~/server/auth";
import { db } from "~/server/drizzle";
import { password as passwordTable } from "~/server/drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { schema } from "./schema";

export async function onResetPasswordAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const errors: Errors = {};

    for (const issue of parsed.error.issues) {
      errors[issue.path[0]!] = {
        type: issue.code,
        message: issue.message,
      };
    }
    return {
      success: false,
      errors,
    };
  }

  const { token, password } = parsed.data;

  const payload = verifyVerificationToken<{
    target: string;
  }>(token);

  if (!payload) {
    return {
      success: false,
      errors: {
        token: {
          type: "invalid_token",
          message: "Invalid Token",
        },
      },
    };
  }

  const user = await doesUserExist({
    email: payload.target,
    type: "admin",
  });

  if (!user) {
    return {
      success: false,
      errorMessage: "Account not found",
    };
  }

  await db
    .update(passwordTable)
    .set({ hash: await getPasswordHash(password) })
    .where(eq(passwordTable.userId, user.id));

  redirect("/login");
}
