import { Separator } from "~/components/ui/separator";
import Link from "next/link";
import { ForgetPasswordForm } from "./form";

export default function Page() {
  return (
    <>
      <p className="text-lg">Reset Password</p>
      <p className="text-muted-foreground text-sm">
        Enter your email below, and we will send you instructions on how to reset your password.
      </p>

      <ForgetPasswordForm />

      <Separator />

      <Link className="text-muted-foreground text-sm" href="/login">
        Back to login
      </Link>
    </>
  );
}
