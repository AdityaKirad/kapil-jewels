const terms: Array<{ title: string; content: string }> = [
  {
    title: "TERMS & CONDITIONS",
    content:
      "We appreciate your visit. To enhance your website experience, we've provided the following guidelines. Kindly take a moment to familiarize yourself with the fundamental rules governing site usage. Please be aware that KAPIL JEWELS may update this agreement as needed, so we recommend checking this page regularly to stay informed about the terms. If you have any inquiries about our policies, don't hesitate to get in touch with us at info@kapiljewels.com",
  },
  {
    title: "COLLECTION INFORMATION",
    content:
      "Gather customer information for several purposes, including delivering excellent customer service and keeping our customers informed about new products, promotions, and services. This data includes personal details like your name, phone number, email, and mailing kapiljewels.com address, which you provide when subscribing to our site, making an order, or contacting us through email.",
  },
  {
    title: "PRICING",
    content:
      "kapiljewels.com has the authority to change prices at her discretion. Unfortunately, we can't apply promotional discounts to orders that have already been placed. Please make sure you've added the intended promotional code to your order before proceeding to checkout.",
  },
  {
    title: "COOKIES",
    content:
      "Cookies are tiny files that a website or its service provider places on your computer's hard drive, provided you give permission. These cookies enable the website or service provider to recognize your browser, store, and remember specific information. At kapiljewels.com we utilize cookies to assist in processing items in your shopping cart, comprehend your preferences, and ensure a positive shopping experience for you.",
  },
  {
    title: "OUR EMAIL LIST",
    content: `When you subscribe to our email list, you'll receive early notifications about sales, new products, and other updates. Rest assured, the email addresses we gather on our website are strictly for internal use and will never be shared with third parties. If you ever decide you no longer want to receive our emails, you can easily unsubscribe by contacting us with "REMOVE" at as the subject at info@kapiljewels.com or by clicking the "Safe-Unsubscribe" link at the bottom of our newsletter.`,
  },
];

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6">
      <h1 className="font-libre-baskerville text-center text-4xl">
        Terms & Conditions
      </h1>
      {terms.map((term, index) => (
        <div key={index}>
          <h2 className="mb-4 font-medium">{term.title}</h2>
          <p className="text-sm">{term.content}</p>
        </div>
      ))}
    </div>
  );
}
