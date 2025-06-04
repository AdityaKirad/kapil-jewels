"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { use, useState } from "react";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collection: string }>;
}) {
  const { collection } = use(params);
  const [sidebarOpen, sidebarOpenSet] = useState(true);
  return (
    <div>
      <h1 className="font-libre-baskerville py-8 text-center text-3xl">
        {collection === "all"
          ? "Products"
          : collection.charAt(0).toUpperCase() + collection.slice(1)}
      </h1>
      <div className="bg-accent flex justify-between border-y-[1px]">
        <button
          className="text-xxs flex items-center gap-2 border-r-[1px] px-4 py-6"
          onClick={() => sidebarOpenSet((prev) => !prev)}
        >
          {sidebarOpen ? "CLOSE FILTERS" : "FILTERS"}
          <ChevronDown
            className="size-4 transition-transform data-[state=open]:rotate-x-180"
            strokeWidth={1.5}
            aria-hidden={true}
            data-state={sidebarOpen ? "open" : "closed"}
          />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="group text-xxs flex items-center gap-2 border-l-[1px] px-4 py-6 outline-none select-none">
            SORT BY
            <ChevronDown
              className="size-4 transition-transform group-data-[state=open]:rotate-x-180"
              aria-hidden={true}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right rounded-none"
            sideOffset={0}
          >
            <DropdownMenuItem>Featured</DropdownMenuItem>
            <DropdownMenuItem>Best Selling</DropdownMenuItem>
            <DropdownMenuItem>Alphabetically, A-Z</DropdownMenuItem>
            <DropdownMenuItem>Alphabetically, Z-A</DropdownMenuItem>
            <DropdownMenuItem>Price, low to high</DropdownMenuItem>
            <DropdownMenuItem>Price, high to low</DropdownMenuItem>
            <DropdownMenuItem>Date, old to new</DropdownMenuItem>
            <DropdownMenuItem>Date, new to old</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {children}
    </div>
  );
}
