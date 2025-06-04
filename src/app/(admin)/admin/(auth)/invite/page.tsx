import { decodeVerificationToken } from "~/server/auth";
import { InviteForm } from "./form";
import { InvalidToken } from "./invalid-token";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { token } = await searchParams;
  if (!token || typeof token !== "string") {
    return <InvalidToken />;
  }
  const payload = decodeVerificationToken<{ email: string }>(token);
  if (!payload) {
    return <InvalidToken />;
  }
  return <InviteForm email={payload.email} token={token} />;
}
