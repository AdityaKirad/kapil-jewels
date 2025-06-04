import HandmadeArtisianJwellery from "~/assets/handmade-artisan-jewelry_1024x1024.webp";
import Image from "next/image";

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 text-lg max-md:text-sm">
      <h1 className="font-libre-baskerville text-center text-4xl">
        Handmade Artisan Jewelry
      </h1>
      <p>
        KAPIL JEWELS - A business founded on family values and nurtured in the
        warm environment of the foundress sisters, Svetlana and Evgenia.
      </p>
      <p>
        We take pride in that, despite new technologies, we have preserved the
        artistry of handcrafting. Each KAPIL JEWELS piece is crafted by hand.
      </p>
      <p>
        Our Handcrafted Artisan Fine Jewelry is designed for individuals who
        genuinely appreciate the authentic appearance of a natural gemstones,
        appreciating its beauty as it comes directly from nature.
      </p>
      <p>
        The journey of each piece of jewelry begins with the creation of a
        unique design on paper. It undergoes a long process before reaching its
        owner, coming to life under the guidance of our experienced artisans.
        Each gemstone for our pieces is carefully selected by hand from around
        the world with special care and love.
      </p>
      <Image
        src={HandmadeArtisianJwellery}
        alt="Handmade Artisan Jewelry"
        className="w-full"
      />
      <p>
        Our Jewelry carries a powerful charge of natural energy, passion, and
        richness.
      </p>
      <h2 className="text-2xl font-medium">WHY CHOOSE US?</h2>
      <ul className="ml-12 list-disc">
        <li>At KAPIL JEWELS, your satisfaction is our priority.</li>{" "}
        <li>Only Natural Gemstones</li>
        <li>Complimentary Lifetime Warranty</li>{" "}
        <li>If you need to return an item, you have 14 days</li>{" "}
        <li>
          We offer exchanges or store credit within 21 days of your purchase.
        </li>
        <li>
          KAPIL JEWELS - A business founded on family values and nurtured in the
          warm environment of the foundress sisters. Client relationships are
          built on family values.
        </li>
      </ul>
      <p>The main our goal is to inspire you.</p>
      <p className="text-center">Breathe in, breathe out. Stay present.</p>
      <p className="text-center">Fulfill yourself with the power of nature.</p>
    </div>
  );
}
