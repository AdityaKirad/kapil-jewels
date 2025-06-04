import Link from "next/link";
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
          }}
        />
        <Link href="mailto:support@kapiljewels.com">Support</Link>
      </div>
      {children}
    </div>
  );
}
