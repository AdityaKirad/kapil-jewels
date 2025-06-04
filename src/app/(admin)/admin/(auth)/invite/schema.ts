import { PasswordSchema } from "~/lib/validation";
import { z } from "zod";

export const schema = z
  .object({
    firstName: z
      .string({ required_error: "First name is required" })
      .trim()
      .min(3, { message: "Name is too short" }),
    lastName: z
      .string({ required_error: "Last name is required" })
      .trim()
      .min(3, { message: "Name is too short" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Email is invalid" })
      .toLowerCase(),
    token: z.string(),
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });

export type SchemaOutput = z.output<typeof schema>;
