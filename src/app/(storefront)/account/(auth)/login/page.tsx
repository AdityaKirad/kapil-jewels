import Link from "next/link";
import { LoginForm } from "./form";

export const metadata = {
  title: "Account - Kapil Jewels",
};

export default function Page() {
  return (
    <>
      <h2 className="font-libre-baskerville text-5xl">Login</h2>
      <p className="mt-12 mb-8 text-sm font-light">
        Don&apos;t have an account?{" "}
        <Link
          className="underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
          href="/account/register"
        >
          Sign up here
        </Link>
      </p>
      <LoginForm />
    </>
  );
}
