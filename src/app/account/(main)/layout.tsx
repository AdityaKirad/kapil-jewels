import { auth } from "~/server/auth";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import { Logout } from "./logout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-12 flex w-full max-w-6xl">
      <div className="flex flex-col gap-2 text-sm">
        <h2 className="font-medium">My Account</h2>
        <Link href="/account">Order History</Link>
        <Link href="/account/addresses">View Addresses</Link>
        <Logout
          onClickAction={async () => {
            "use server";
            await auth.api.signOut({ headers: await headers() });
          }}
        />
        <Link href="mailto:support@kapiljewels.com">Support</Link>
      </div>
      {children}
    </div>
  );
}
