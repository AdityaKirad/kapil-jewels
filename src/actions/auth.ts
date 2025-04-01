"use server";

import crypto from "crypto";
import { parseWithZod } from "@conform-to/zod";
import { signInSchema, signUpSchema } from "~/schema/auth";
import { signInEmail, signUpEmail } from "~/server/auth";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";

function getPasswordHashParts(password: string) {
  const hash = crypto
    .createHash("sha1")
    .update(password, "utf8")
    .digest("hex")
    .toUpperCase();
  return [hash.slice(0, 5), hash.slice(5)] as const;
}

async function checkIsCommonPassword(password: string) {
  const [prefix, suffix] = getPasswordHashParts(password);
  try {
    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      signal: AbortSignal.timeout(1000),
    });
    if (!res.ok) return false;
    const data = await res.text();
    return data.split(/\r?\n/).some((line) => {
      const [hashSuffix, _ignoredPrevalenceCount] = line.split(":");
      return hashSuffix === suffix;
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      console.warn("Password check timed out");
      return false;
    }

    console.warn("Unknown error during password check", error);
    return false;
  }
}

export async function signUp(prevState: unknown, formData: FormData) {
  const submission = await parseWithZod(formData, {
    schema: signUpSchema.superRefine(async ({ password }, ctx) => {
      const isCommonPassword = await checkIsCommonPassword(password);
      if (isCommonPassword) {
        ctx.addIssue({
          path: ["password"],
          message: "Password is too common",
          code: "custom",
        });
      }
    }),
    async: true,
  });

  if (submission.status !== "success") return submission.reply();

  const { firstName, lastName, email, password } = submission.value;

  try {
    await signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
      },
    });
    redirect("/");
  } catch (error) {
    if (error instanceof APIError) {
      return submission.reply({
        fieldErrors: { email: ["Email already exists"] },
        resetForm: false,
      });
    }
    throw error;
  }
}

export async function signIn(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: signInSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  try {
    await signInEmail({
      body: {
        ...submission.value,
        callbackURL: "/",
      },
    });
  } catch (error) {
    if (error instanceof APIError) {
      if (error.status === "TOO_MANY_REQUESTS") {
        return submission.reply({
          formErrors: [error.message],
        });
      }
      if (error.status === "FORBIDDEN") {
        return submission.reply({
          formErrors: ["Verify your email before siging in"],
        });
      }
      if (error.status === "UNAUTHORIZED") {
        return submission.reply({
          fieldErrors: {
            email: ["Invalid Credentials"],
            password: ["Invalid Credentials"],
          },
        });
      }
      throw error;
    }
    throw error;
  }
}
