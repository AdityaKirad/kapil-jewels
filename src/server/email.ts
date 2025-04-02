import { env } from "~/env";
import { Resend } from "resend";

type Email = {
  subject: string;
  to: string;
  react: React.ReactNode;
};

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = (data: Email) =>
  resend.emails.send({ from: "kapil Jewels <onboarding@resend.dev>", ...data });
