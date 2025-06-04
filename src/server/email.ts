import { env } from "~/env";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendEmail({
  subject,
  to,
  react,
}: {
  subject: string;
  to: string;
  react: React.ReactNode;
}) {
  return resend.emails.send({
    from: "Kapil Jewels <onboarding@resend.dev>",
    subject,
    to,
    react,
  });
}
