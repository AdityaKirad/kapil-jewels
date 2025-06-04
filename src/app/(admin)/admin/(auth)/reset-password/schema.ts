import { PasswordSchema } from "~/lib/validation";
import { z } from "zod";

export const schema = z
  .object({
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
