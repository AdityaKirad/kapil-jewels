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
  firstName: z.string(),
  lastName: z.string(),
  email: EmailSchema,
  password: PasswordSchema,
});

export const signInSchema = z.object({
  email: EmailSchema,
  password: z.string({ required_error: "Password is required" }),
  rememberMe: z.boolean().default(false),
});
