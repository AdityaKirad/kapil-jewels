import "~/styles/globals.css";
import Logo from "~/assets/logo.png";
import { DesktopSearch } from "~/components/desktop-search";
import { DesktopNav, MobileNav } from "~/components/navigation";
import { paymentIcons } from "~/components/payment-icons";
import { ShoppingBag } from "~/components/shoping-bag";
import { Copyright, Facebook, Instagram, UserCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex flex-col items-center border-b-1 border-b-green-950 bg-green-900 p-2 text-lg text-amber-400">
        <p>FAMILY OWNED AND OPERATED</p>
        <Link
          href="/about"
          className="relative outline-hidden after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-amber-400 after:transition-transform after:duration-300 hover:after:scale-x-[.85] focus-visible:after:scale-x-[.85]"
        >
          More about us
        </Link>
      </div>
      <div className="flex items-center justify-between bg-green-900 px-8 text-amber-400">
        <MobileNav />
        <Link
          href="/"
          className="font-libre-baskerville flex flex-col items-center font-medium select-none"
        >
          <Image src={Logo} width={96} height={96} alt="Logo" unoptimized />
        </Link>
        <div className="flex gap-4">
          <Link href="/account">
            <UserCircle2 strokeWidth={1.5} aria-hidden={true} />
            <span className="sr-only">account</span>
          </Link>
          <DesktopSearch />
          <Link href="/card">
            <ShoppingBag aria-hidden={true} strokeWidth={1.5} />
            <span className="sr-only">cart</span>
          </Link>
        </div>
      </div>
      <DesktopNav />
      {children}
      <footer className="bg-muted p-6 sm:p-12">
        <div className="flex justify-between max-sm:flex-col">
          <div>
            <p className="font-libre-baskerville text-2xl">Contacts</p>
            <div className="my-6 flex flex-col gap-2 text-sm">
              <Link
                href="mailto:info@kapiljewels.com"
                className="underline underline-offset-2"
              >
                info@kapiljewels.com
              </Link>
              <p>Jaipur</p>
              <Link href="tel:+91-9876543210">+91-9876543210</Link>
              <div className="flex gap-2">
                <Link href="#">
                  <Facebook
                    className="size-5"
                    strokeWidth={1.5}
                    aria-hidden={true}
                  />
                  <span className="sr-only">facebook</span>
                </Link>
                <Link href="#">
                  <Instagram
                    className="size-5"
                    strokeWidth={1.5}
                    aria-hidden={true}
                  />
                  <span className="sr-only">instagram</span>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p className="font-libre-baskerville text-2xl">Get inspired</p>
            <div className="my-6 text-sm">
              <span>#kapiljewels</span>
              <p className="mt-2">@kapil.jewels</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between max-xl:flex-col max-xl:gap-2">
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/" className="flex items-center gap-1">
              <Copyright className="size-3.5" strokeWidth={1.5} />
              Kapil Jewels {new Date().getFullYear()}
            </Link>
            <Link href="/shipping-policy">Shipping</Link>
            <Link href="/about">About</Link>
            <Link href="/refund-policy">Customer Service</Link>
            <Link href="/terms-of-service">Terms & Conditions</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {paymentIcons.map(({ PaymentIcon, name }) => (
              <PaymentIcon key={name} aria-label={name} />
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
