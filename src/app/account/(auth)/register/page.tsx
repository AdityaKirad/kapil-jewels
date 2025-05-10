import { Link } from "next-view-transitions";
import { SignupForm } from "./form";

export const metadata = {
  title: "Create Account - Kapil Jewels",
};

export default function Page() {
  return (
    <>
      <h2 className="font-libre-baskerville text-5xl">Create Account</h2>
      <p className="mt-12 mb-8 text-sm font-light">
        Already have an account?{" "}
        <Link
          className="underline underline-offset-8 transition-[text-underline-offset] outline-none hover:underline-offset-[5px] focus-visible:underline-offset-[5px]"
          href="/account/login"
        >
          Sign in here
        </Link>
      </p>
      <SignupForm />
    </>
  );
}
