"use client";

import { Button } from "~/app/_components/ui/button";

export function Logout({ onClickAction }: { onClickAction: () => void }) {
  return (
    <Button
      className="size-fit p-0 font-normal hover:no-underline"
      variant="link"
      onClick={onClickAction}
    >
      Log out
    </Button>
  );
}
