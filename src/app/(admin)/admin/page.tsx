import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { SESSION_KEY } from "~/server/auth";
import Form from "next/form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookie = await cookies();
  console.log(cookie.toString());

  return (
    <div>
      Home
      <Form
        action={async () => {
          "use server";

          (await cookies()).delete(SESSION_KEY);

          redirect("/login");
        }}
      >
        <Button>Logout</Button>
      </Form>
    </div>
  );
}
