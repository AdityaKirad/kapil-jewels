import { ResetPasswordMail } from "~/app/_components/mails/reset-password";
import { VerifyMail } from "~/app/_components/mails/verify";
import { db } from "~/server/db";
import {
  account,
  rateLimit,
  session,
  user,
  verification,
} from "~/server/db/schema";
import { type BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { customSession } from "better-auth/plugins";
import { sendEmail } from "../email";

export const authConfig = {
  appName: "kapil-jewels",
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
      await sendEmail({
        to: email,
        subject: "Verify your email",
        react: VerifyMail({ url }),
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 60 * 10,
    async sendResetPassword({ url, user: { email } }) {
      await sendEmail({
        to: email,
        subject: "Reset your password",
        react: ResetPasswordMail({ url }),
      });
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
  plugins: [
    customSession(async ({ session, user }) => ({
      expires: session.expiresAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })),
    nextCookies(),
  ],
} satisfies BetterAuthOptions;
