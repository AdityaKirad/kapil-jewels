import Link from "next/link";
import { SignInForm } from "../_components/signin-form";

export default async function Page() {
  return (
    <div className="p-4">
      <SignInForm />
      <Link href="/signup">Create New Account</Link>
    </div>
  );
}
