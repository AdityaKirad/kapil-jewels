import { PasswordSchema } from "~/lib/validation";
import { z } from "zod";

export const schema = z
  .object({
    token: z.string().base64url(),
    password: PasswordSchema,
    confirmPassword: z.string(),
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

export type SchemaOutput = z.infer<typeof schema>;
