import Logo from "~/assets/logo.png";
import Image from "next/image";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen place-items-center">
      <div className="w-full max-w-96 space-y-2 p-4 text-center">
        <Image
          className="mx-auto"
          src={Logo}
          alt="Brand Logo"
          height={128}
          width={128}
          priority
        />
        {children}
      </div>
    </div>
  );
}
