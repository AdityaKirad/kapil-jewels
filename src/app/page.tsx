import { BillBoard } from "~/app/_components/banner";
import { DiscordLogin } from "./_components/discord-login";

export default async function Home() {
  return (
    <main>
      <BillBoard />
      <DiscordLogin />
    </main>
  );
}
