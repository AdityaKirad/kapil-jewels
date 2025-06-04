import { decodeVerificationToken } from "~/server/auth";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const token = params.token;
  if (!token || typeof token !== "string") {
    redirect("/account/login");
  }
  const payload = decodeVerificationToken<{ target: string }>(token);
  if (!payload) {
    redirect("/account/login");
  }
  return (
    <>
      <h2 className="font-libre-baskerville text-5xl">
        Reset account password
      </h2>
      <p className="mt-12 mb-8 text-sm font-light">
        Enter new password for your {payload.target}
      </p>
      <ResetPasswordForm token={token} />
    </>
  );
}
