import Link from "next/link";
import { SignupForm } from "../_components/signup-form";

export default function Page() {
  return (
    <div className="p-4">
      <SignupForm />
      <Link href="/signin">Sign In</Link>
    </div>
  );
}
