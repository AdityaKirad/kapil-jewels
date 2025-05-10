import { getSession } from "~/server/auth";
import { Link } from "next-view-transitions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./form";

export const metadata = {
  title: "Account - Kapil Jewels",
};

export default async function Page(props: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const session = await getSession({ headers: await headers() });
  if (session) {
    redirect("/account");
  }
  const searchParams = await props.searchParams;
  const redirectTo = searchParams.redirectTo;
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
      <LoginForm redirectTo={redirectTo} />
    </>
  );
}
