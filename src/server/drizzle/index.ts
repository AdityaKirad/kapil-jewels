import { env } from "~/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForClient = globalThis as unknown as {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  client: postgres.Sql<{}> | undefined;
};

const client = globalForClient.client ?? postgres(env.DATABASE_URL);

if (env.NODE_ENV !== "production") globalForClient.client = client;
export const db = drizzle(client, { schema, logger: true });
