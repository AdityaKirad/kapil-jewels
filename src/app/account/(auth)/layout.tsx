export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-20 w-full max-w-lg text-center">{children}</div>
  );
}
