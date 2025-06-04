import { Body, Head, Html, Preview, Tailwind } from "@react-email/components";

export function MailLayout({
  children,
  preview,
}: React.PropsWithChildren<{ preview: string }>) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Preview>{preview}</Preview>
        <Body className="m-auto bg-white px-2 font-sans text-black">
          {children}
        </Body>
      </Tailwind>
    </Html>
  );
}
