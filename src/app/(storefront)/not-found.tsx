import { type Metadata } from "next";
import Form from "next/form";

export const metadata: Metadata = {
  title: "404 Not Found - KAPIL JEWELS",
};

export default async function NotFound() {
  return (
    <div className="mx-auto max-w-lg pt-16 pb-8 text-center">
      <h1 className="font-libre-baskerville text-5xl">404 Page Not Found</h1>
      <p className="mt-8 mb-2 text-sm font-light">
        The page you requested does not exist
      </p>
      <Form className="flex items-center p-4 outline" action="/search">
        <input
          className="flex-1 text-sm outline-none"
          type="text"
          name="q"
          placeholder="Find products"
        />
        <button className="text-xs" type="submit">
          SEARCH
        </button>
      </Form>
    </div>
  );
}
