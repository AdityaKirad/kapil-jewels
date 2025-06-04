import { EmailSchema } from "~/lib/validation";
import { z } from "zod";

export const schema = z.object({
  email: EmailSchema,
  password: z.string({ required_error: "Password is required" }),
});

export type SchemaOutput = z.infer<typeof schema>;
