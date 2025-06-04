import { Separator } from "~/components/ui/separator";
import Link from "next/link";

export function InvalidToken() {
  return (
    <>
      <p className="text-lg">Your invite token is invalid</p>
      <p className="text-muted-foreground text-sm">Try requesting a new invite link</p>
      <Separator />
      <Link className="text-muted-foreground text-sm" href="/login">
        Back to login
      </Link>
    </>
  );
}
