import { getSession } from "~/server/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession({ headers: await headers() });
  if (!session) redirect("/account/login");
  return (
    <div className="flex-1">
      <h1 className="font-libre-baskerville my-8 text-6xl">Order History</h1>
      <p>You haven&apos;t placed any orders yet.</p>
    </div>
  );
}
