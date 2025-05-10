import { db } from "~/server/db";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "./form";

export default async function Page(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const searchParams = await props.searchParams;
  const error = searchParams.error;
  const token = searchParams.token;
  if (error || !token) {
    redirect("/account/forget-password");
  }
  const user = await db.query.verification
    .findFirst({
      columns: {},
      with: { user: { columns: { email: true } } },
      where: ({ identifier }, { like }) => like(identifier, `%${token}%`),
    })
    .then((res) => res?.user);
  return (
    <>
      <h2 className="font-libre-baskerville text-5xl">
        Reset account password
      </h2>
      <p className="mt-12 mb-8 text-sm font-light">
        Enter new password for {user?.email}
      </p>
      <ResetPasswordForm token={token} />
    </>
  );
}
