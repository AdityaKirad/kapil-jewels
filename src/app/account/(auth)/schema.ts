import { z } from "zod";

const EmailSchema = z
  .string({ required_error: "Email is required" })
  .email({ message: "Email is invalid" })
  .min(3, { message: "Email is too short" })
  .max(100, { message: "Email is too long" })
  .toLowerCase();

const PasswordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, { message: "Password is too short" })
  .max(128, { message: "Password is too long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/^(?=.*[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]).*$/, {
    message: "Password must contain at least one special character",
  })
  .refine((val) => new TextEncoder().encode(val).length <= 72, {
    message: "Password is too long",
  });

export const signUpSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  email: EmailSchema,
  password: PasswordSchema,
});

export const signInSchema = z.object({
  email: EmailSchema,
  password: z.string({ required_error: "Password is required" }),
  redirectTo: z.string().optional(),
});

export const forgotPasswordSchema = z.object({
  email: EmailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: PasswordSchema,
    token: z.string(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: "custom",
      });
    }
  });
