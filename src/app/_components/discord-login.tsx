"use client";

import { authClient } from "~/server/auth";
import { Button } from "./ui/button";

export function DiscordLogin() {
  return (
    <Button
      onClick={async () => {
        await authClient.signIn.social({
          provider: "discord",
        });
      }}
    >
      Login with Discord
    </Button>
  );
}
