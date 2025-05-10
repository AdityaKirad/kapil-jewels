import { AmazonPay } from "./amazon-pay";
import { AmericanExpress } from "./american-express";
import { ApplePay } from "./apple-pay";
import { DinersClub } from "./diners-club";
import { Discover } from "./discover";
import { GooglePay } from "./google-pay";
import { MasterCard } from "./mastercard";
import { PayPal } from "./paypal";
import { ShopifyPay } from "./shopify-pay";
import { Venmo } from "./venmo";
import { Visa } from "./visa";

export const paymentIcons: Array<{
  PaymentIcon: React.FC<React.SVGProps<SVGSVGElement>>;
  name: string;
}> = [
  { PaymentIcon: AmazonPay, name: "Amazon Pay" },
  { PaymentIcon: AmericanExpress, name: "American Express" },
  { PaymentIcon: ApplePay, name: "Apple Pay" },
  { PaymentIcon: DinersClub, name: "Diners Club" },
  { PaymentIcon: Discover, name: "Discover" },
  { PaymentIcon: GooglePay, name: "GooglePay" },
  { PaymentIcon: MasterCard, name: "Master Card" },
  { PaymentIcon: PayPal, name: "PayPal" },
  { PaymentIcon: ShopifyPay, name: "Shopify Pay" },
  { PaymentIcon: Venmo, name: "Venmo" },
  { PaymentIcon: Visa, name: "Visa" },
];
