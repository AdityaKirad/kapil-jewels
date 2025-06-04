"use server";

import type { Errors, Fields, FormState } from "~/lib/types";
import {
  doesUserExist,
  getPasswordHash,
  verifyVerificationToken,
} from "~/server/auth";
import { db } from "~/server/drizzle";
import {
  invite,
  password as passwordTable,
  user,
} from "~/server/drizzle/schema";
import { eq } from "drizzle-orm";
import { schema } from "./schema";

export async function onInviteAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const fields: Fields = {};
    const errors: Errors = {};

    for (const key of [...formData.keys()]) {
      if (key !== "password" && key !== "confirmPassword") {
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

  const { firstName, lastName, email, password, token } = parsed.data;

  const payload = verifyVerificationToken<{ email: string }>(token);

  if (!payload) {
    return {
      success: false,
      errorMessage: "Invalid Token",
    };
  }

  const isEmailTaken = await doesUserExist({
    email: parsed.data.email,
    type: "admin",
  });

  if (isEmailTaken) {
    return {
      success: false,
      fields: parsed.data,
      errors: {
        email: {
          type: "email_taken",
          message: "An admin already exist with this email",
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
        emailVerified: true,
        type: "admin",
      })
      .returning({ id: user.id })
      .then((res) => res[0]?.id);
    if (!userId) {
      return tx.rollback();
    }
    await tx
      .insert(passwordTable)
      .values({ hash: await getPasswordHash(password), userId });
    await tx
      .update(invite)
      .set({ accepted: true })
      .where(eq(invite.email, email));
  });

  return {
    success: true,
  };
}
