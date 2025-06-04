"use client";

import { useMediaQuery } from "~/hooks/use-media-query";
import Search from "./search";

export function DesktopSearch() {
  const matches = useMediaQuery("width > 80rem");
  if (matches) {
    return <Search />;
  }
  return null;
}
