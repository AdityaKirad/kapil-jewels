import { ResetPasswordMail } from "~/app/_components/mails/reset-password";
import { VerifyMail } from "~/app/_components/mails/verify";
import { env } from "~/env";
import { Resend } from "resend";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const resend = new Resend(env.RESEND_API_KEY);
const from = `Kapil Jewels <onboarding@resend.dev>`;

export const resendRouter = createTRPCRouter({
  resetPassword: publicProcedure
    .input(z.object({ email: z.string().email(), url: z.string().url() }))
    .mutation(async ({ input: { email: to, url } }) => {
      await resend.emails.send({
        from,
        to,
        subject: "Reset your password",
        react: ResetPasswordMail({ url }),
      });
    }),

  verify: publicProcedure
    .input(z.object({ email: z.string().email(), url: z.string() }))
    .mutation(async ({ input: { email: to, url } }) => {
      await resend.emails.send({
        from,
        to: "delivered@resend.dev",
        subject: "Verify your email",
        react: VerifyMail({ url }),
      });
    }),
});
