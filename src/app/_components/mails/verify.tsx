import { Link } from "@react-email/components";
import { MailLayout } from "./layout";

export function VerifyMail({ url }: Readonly<{ url: string }>) {
  return (
    <MailLayout preview="Verify your email">
      <Link href={url}>Verify your email</Link>
    </MailLayout>
  );
}
