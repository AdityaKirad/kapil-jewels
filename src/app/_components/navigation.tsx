"use client";

import { cn } from "~/lib/utils";
import { ChevronRight, Facebook, Instagram, Menu } from "lucide-react";
import { Link } from "next-view-transitions";
import { useCallback, useSyncExternalStore } from "react";
import Search from "./search";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

const links: Array<{ href: string; title: string }> = [
  { href: "/", title: "Home" },
  { href: "/collections/all", title: "Shop All" },
  { href: "/collections/rings", title: "Rings" },
  { href: "/collections/Necklaces", title: "Necklaces" },
  { href: "/collections/Bracelets", title: "Bracelets" },
  { href: "/collections/sacred", title: "Sacred" },
  { href: "/collections/best-sellers", title: "Best Sellers" },
  { href: "/collections/sale", title: "Sale" },
  { href: "/collections/new-arrivals", title: "New Arrivals" },
];

function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: () => void) => {
      const matchMedia = window.matchMedia(query);

      matchMedia.addEventListener("change", callback);
      return () => {
        matchMedia.removeEventListener("change", callback);
      };
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function DesktopNav() {
  const isDesktop = useMediaQuery("(width >= 80rem)");
  if (isDesktop)
    return (
      <div className="flex justify-center gap-8 border-b-[1px]">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="group relative py-2 outline-hidden"
          >
            {link.title}
            <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-center scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </Link>
        ))}
        <DropdownMenu className="flex w-max flex-col gap-2" title="Collections">
          <DropdownLink
            href="/collections/dance-of-love"
            title="Dance of Love - Diamond Classic"
            className="delay-1000"
          />
          <DropdownLink
            href="/collections/freedom"
            title="Freedom - Exclusive Design"
            className="delay-[350ms]"
          />

          <DropdownLink
            href="/collections/olimp"
            title="Olimp - Cocktail Jewelry"
            className="delay-[375ms]"
          />

          <DropdownLink
            href="/collections/road-to-the-stars"
            title="Road to the Stars - Mutli Gemstone"
            className="delay-[400ms]"
          />

          <DropdownLink
            href="/collections/spiritual-collections"
            title="Spiritiual Collections"
            className="delay-[425ms]"
          />
        </DropdownMenu>
        <DropdownMenu
          className="grid w-(--radix-hover-card-content-available-width) grid-cols-2 px-16"
          title="Gifts"
        >
          <div>
            <span className="font-medium">Gifts</span>
            <Link className="mt-4 mb-2 block" href="/gift-cards">
              Gift cards
            </Link>
            <Link className="block" href="gifts-for-her">
              Gifts for Her
            </Link>
          </div>
          <div>
            <span className="font-medium">By price</span>
            <Link className="mt-4 mb-2 block" href="gifts-under-1000">
              Gifts under $1000
            </Link>
            <Link className="block" href="gifts-under-2000">
              Gifts under $2000
            </Link>
          </div>
        </DropdownMenu>
        <DropdownMenu className="flex flex-col gap-2" title="About">
          <Link href="/about">About Kapil Jewels</Link>
          <Link href="/handmade-artisan-jewelrt">Handmade Artisan Jewelry</Link>
          <Link href="/blogs">Blogs</Link>
        </DropdownMenu>
        <DropdownMenu className="flex flex-col gap-2" title="Help">
          <Link href="/sizing-guide">Sizing Guide</Link>
          <Link href="/shipping-policy">Shipping Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/contact">Contact</Link>
        </DropdownMenu>
      </div>
    );
}

export function MobileNav() {
  const isMobile = useMediaQuery("(width < 80rem)");
  if (isMobile)
    return (
      <div className="flex gap-2">
        <Sheet>
          <SheetTrigger>
            <Menu aria-hidden={true} strokeWidth={1} />
            <span className="sr-only">menu</span>
          </SheetTrigger>
          <SheetContent className="group" side="left">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="mt-16 flex flex-col gap-2 overflow-y-scroll border-y-1 text-sm">
              {links.map((link, _index) => (
                <Link
                  className="hover:bg-accent focus-visible:bg-accent px-8 py-3 transition-colors outline-none"
                  key={link.title}
                  href={link.href}
                >
                  {link.title}
                </Link>
              ))}
              {["Collections", "Gifts", "About", "Help"].map((title) => (
                <button
                  className="hover:bg-accent focus-visible:bg-accent flex items-center justify-between py-3 pr-4 pl-8 outline-none [&>svg]:mr-1 [&>svg]:transition-[margin-right] hover:[&>svg]:mr-0 focus-visible:[&>svg]:mr-0"
                  key={title}
                >
                  {title}
                  <ChevronRight />
                </button>
              ))}
            </div>
            <SocialLinks className="px-8 py-4" />
          </SheetContent>
        </Sheet>
        <Search />
      </div>
    );
  return <SocialLinks />;
}

function DropdownMenu({
  children,
  className,
  open,
  title,
}: {
  children: React.ReactNode;
  className: string;
  open?: boolean;
  title: string;
}) {
  return (
    <HoverCard openDelay={0} closeDelay={0} open={open}>
      <HoverCardTrigger className="group relative py-2 outline-hidden" asChild>
        <button>
          {title}
          <span className="absolute inset-x-0 bottom-0 h-[2px] scale-x-0 bg-black transition-transform duration-300 group-data-[state=open]:scale-x-100" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent className={cn("group rounded-t-none", className)}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}

function DropdownLink({
  className,
  href,
  title,
}: {
  className?: string;
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group-data-[state=open]:animate-in group-data-[state=closed]:animate-out group-data-[state=open]:fade-in group-data-[state=closed]:fade-out duration-1000",
        className,
      )}
    >
      {title}
    </Link>
  );
}

function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-2", className)}>
      <Link href="#">
        <Facebook aria-hidden={true} strokeWidth={1} />
        <span className="sr-only">facebook</span>
      </Link>
      <Link href="#">
        <Instagram aria-hidden={true} strokeWidth={1} />
        <span className="sr-only">instagram</span>
      </Link>
    </div>
  );
}
