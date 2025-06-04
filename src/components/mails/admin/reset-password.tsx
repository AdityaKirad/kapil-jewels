import { Link } from "@react-email/components";
import { MailLayout } from "../mail-layout";

export function ResetPasswordMail({ url }: Readonly<{ url: string }>) {
  return (
    <MailLayout preview="Reset your password">
      <Link href={url}>Reset your password</Link>
    </MailLayout>
  );
}
