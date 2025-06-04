import { env } from "~/env";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/server/drizzle/schema.ts",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
