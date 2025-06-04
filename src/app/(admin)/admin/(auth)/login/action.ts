"use server";

import { env } from "~/env";
import type { Errors, Fields, FormState } from "~/lib/types";
import { doesUserExist, verifyPassword } from "~/server/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { schema } from "./schema";

export async function onLoginAction(
  prevState: FormState,
  formdata: FormData,
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formdata));

  if (!parsed.success) {
    const fields: Fields = {};
    const errors: Errors = {};

    for (const key of [...formdata.keys()]) {
      if (key !== "password") {
        const raw = formdata.get(key);
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

  const user = await doesUserExist({
    email,
    type: "admin",
  });

  const credentialsError = {
    type: "invalid_credentials",
    message: "Invalid Email or Password",
  };

  if (!user) {
    return {
      success: false,
      fields: { email, password: "" },
      errors: {
        email: credentialsError,
        password: credentialsError,
      },
    };
  }

  const isValid = await verifyPassword({ id: user.id, password });

  if (!isValid) {
    return {
      success: false,
      fields: { email, password: "" },
      errors: {
        email: credentialsError,
        password: credentialsError,
      },
    };
  }

  (await cookies()).set({
    name: env.ADMIN_SESSION_KEY,
    value: user.id,
    path: "/admin",
    sameSite: "lax",
    httpOnly: true,
    secure: true,
  });

  redirect("/admin");
}
