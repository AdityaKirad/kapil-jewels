import JwelleryMaking from "~/assets/premium_photo-1664301253767-5c090279cd62.avif";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex gap-6 max-md:flex-col [&>*]:flex-1">
      <Image src={JwelleryMaking} alt="Kapil Jewels" className="w-full" />
      <div className="grid place-items-center">
        <div className="flex flex-col gap-6 p-4">
          <h1 className="font-libre-baskerville text-center text-4xl">
            About Kapil Jewels
          </h1>
          <p>
            Kapil Jewels is a brand created by two sisters with a deep passion
            for fine jewelry. Every piece we design is crafted with love and
            intention, radiating warmth and light to complement and enhance your
            unique personality. Our mission is to create jewelry beyond being an
            accessory—each piece reflects your inner glow and energy.
          </p>
          <p>
            We are committed to sustainability, using only recycled gold in our
            collections. This ensures that every piece is not only beautiful but
            also a mindful choice for a more sustainable future.
          </p>
        </div>
      </div>
    </div>
  );
}
