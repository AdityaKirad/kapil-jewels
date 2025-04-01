import { env } from "~/env";
import { db } from "~/server/db";
import {
  account,
  rateLimit,
  session,
  user,
  verification,
} from "~/server/db/schema";
import { api } from "~/trpc/server";
import { type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

export const authConfig = {
  appName: "kapil-jewels",
  baseURL: env.URL,
  advanced: {
    generateId: false,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
      rateLimit,
    },
  }),
  emailVerification: {
    expiresIn: 60 * 10,
    sendOnSignUp: true,
    async sendVerificationEmail({ url, user: { email } }) {
      await api.resend.verify({ email, url });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 10,
    async sendResetPassword(data) {
      await api.resend.resetPassword({ email: data.user.email, url: data.url });
    },
  },
  rateLimit: {
    enabled: true,
    storage: "database",
    window: 60,
    max: 2,
    customRules: {
      "/signin": {
        window: 60,
        max: 2,
      },
    },
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60,
    updateAge: 15 * 24 * 60 * 60,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10,
    },
  },
  plugins: [nextCookies()],
} satisfies BetterAuthOptions;
