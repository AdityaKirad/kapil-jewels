import Link from "next/link";
import { LoginForm } from "./form";

export default function Page() {
  return (
    <>
      <p className="text-lg font-medium">Welcome to Kapil Jewels</p>
      <p className="text-muted-foreground text-sm">
        Sign in to access the account area
      </p>
      <LoginForm />
      <p className="text-muted-foreground text-sm">
        Forgot password? -{" "}
        <Link className="text-blue-500" href="/forget-password">
          Reset
        </Link>
      </p>
    </>
  );
}
