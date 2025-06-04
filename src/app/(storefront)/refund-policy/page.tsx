const satisfaction = [
  "If you need to return an item, you have 14 days from the delivery date to initiate the return and receive a refund to your original form of payment.",
  "We offer exchanges or store credit within 21 days of your purchase.",
  "All returns and exchanges require approval and apply only to items bought on kapiljewels.com or at our NY showroom. Shipping costs won't be refunded, except in the case of our error.",
  "Store credits can be used for future purchases on kapiljewels.com.",
  "For the safety of your jewelry and return package, we will provide a Return Label to ensure proper insurance. Items for exchange will be examined before acceptance, and exchanges and credits will be processed, excluding original and return shipping fees. Please return the merchandise in its original condition with the KAPIL JEWELS box and pouch.",
  "If your made-to-order item is still in production and you haven't received it, we're happy to cancel the order and provide a store credit or refund to your original form of payment.",
  "Please note that due to variations in size, all rings ordered online are considered special orders and may be subject to a 15% restocking fee for exchanges or if you request to cancel a ring still in production.",
  "Engraved or embossed products, custom, and personalized items (including initials, lettering, birthstones, and custom sizes) are considered FINAL SALE and cannot be exchanged or returned.",
  "All non-jewelry accessory items are also FINAL SALE.",
  "Gift card purchases are non-refundable.",
  "Merchandise that shows signs of wear, resizing, or damage in any way will not be accepted and will be returned to the sender at the sender's expense.",
];
const exchange = [
  "Place your jewelry in a shipping box, ensuring it's within the original packaging.",
  "We will provide an insured, prepaid label. Once the label is generated, you have 7 days to have your package scanned at a local UPS or FedEx location, depending on the label provided.",
  "Affix the pre-paid label to the shipping box.",
  "Please note that for exchanges, you will be responsible for the return shipping cost as well as the shipping cost for your new order.",
  "After receiving your return, we'll examine the item within 5 business days to confirm it meets the criteria outlined in our Exchange Approval rules.",
  "Ensure the merchandise tag remains attached unaltered and the item is in brand new, unworn, and salable condition.",
];

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6">
      <h1 className="font-libre-baskerville mb-6 text-center text-4xl">
        Customer Service
      </h1>
      <h2 className="font-medium">RETURNS, EXCHANGES and WARRANTY</h2>
      <p>At KAPIL JEWELS, your satisfaction is our priority:</p>
      <ul className="list-disc pl-6 text-sm">
        {satisfaction.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <p>Here&apos;s how to process exchanges for orders:</p>
      <ul className="list-disc pl-6 text-sm">
        {exchange.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className="font-medium">WARRANTY DETAILS and REPAIR</h3>
      <p>Our Warranty Over Time</p>
      <p>
        Phase One: <strong>1-Year Unlimited</strong>
      </p>
      <ul className="list-disc pl-6 text-sm">
        <li>
          Complimentary coverage for all repairs, excluding purposeful or
          excessive damage.
        </li>
        <li>Phase One initiates upon the purchaser receiving the item.</li>
      </ul>
      <p>
        Phase Two: <strong>At Cost For Life</strong>
      </p>
      <ul className="list-disc pl-6 text-sm">
        <li>
          All repairs covered at cost, excluding purposeful or excessive damage.
        </li>
        <li>
          &quot;At cost&quot; means you pay exactly what it costs for the repair
          without additional fees. We are committed to transparency and not
          profiting from repairs.
        </li>
        <li>
          Phase Two commences immediately after the one-year expiration of the
          unlimited warranty.
        </li>
      </ul>
      <p>
        Any external jeweler&apos;s work (sizing or any service) on KAPIL JEWELS
        pieces will void the warranty.
      </p>
      <p>
        Our warranty is valid only for the original purchaser/owner. KAPIL
        JEWELS pieces obtained through resale methods do not carry a warranty
        for the new owners.
      </p>
      <p>Original receipts are mandatory for all warranty services.</p>
      <ul className="list-disc pl-6 text-sm">
        <li>
          The repair process typically takes 4-6 weeks, depending on the nature
          of the repair. Once your item is ready, we&apos;ll send it back and
          provide an email notification and a tracking number.
        </li>
        <li>
          After receiving your return, we&apos;ll examine the item within 5
          business days to confirm if it meets the criteria rules.
        </li>
        <li>
          We agree to repair or replace any items we deem damaged due to a
          manufacturing defect. This warranty expressly excludes coverage for
          excessive wear and tear and/or physical or accidental abuse and theft.
        </li>
      </ul>
      <p>
        KAPIL JEWELS retains the right to decline the exchange or repair of any
        purchase that fails to meet the specified requirements.
      </p>
      <p>Click here to initiate your return or exchange.</p>
    </div>
  );
}
