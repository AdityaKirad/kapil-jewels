import { EmailSchema, PasswordSchema } from "~/lib/validation";
import { z } from "zod";

export const schema = z.object({
  firstName: z.string().trim().min(1, { message: "First Name is required" }),
  lastName: z.string().trim().min(1, { message: "Last Name is required" }),
  email: EmailSchema,
  password: PasswordSchema,
});

export type SchemaOutput = z.output<typeof schema>;
