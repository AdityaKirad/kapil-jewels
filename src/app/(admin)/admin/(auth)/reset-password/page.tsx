import { Separator } from "~/components/ui/separator";
import { decodeVerificationToken } from "~/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await searchParams;
  if (!token || typeof token !== "string") {
    redirect("/admin/login");
  }
  const payload = decodeVerificationToken<{ target: string }>(token);
  if (!payload) {
    redirect("/admin/login");
  }
  return (
    <>
      <p className="text-lg">Reset Password</p>
      <p className="text-muted-foreground text-sm">
        Choose a new password below
      </p>

      <ResetPasswordForm token={token} email={payload.target} />

      <Separator />

      <Link className="text-muted-foreground text-sm" href="/login">
        Back to login
      </Link>
    </>
  );
}
