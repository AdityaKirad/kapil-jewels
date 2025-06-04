import { Table, TableBody, TableCell, TableRow } from "~/components/ui/table";

export default function Page() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-6 text-sm">
      <h1 className="font-libre-baskerville text-center text-4xl">
        Shipping Policy
      </h1>
      <p>Sorry. We currently only offer shipping within the India and USA</p>
      <p>
        All shipping rates are calculated through FedEx, UPS or DHL and are
        insured at to protect your merchandise.
      </p>
      <p>
        Unfortunately, In the event of a return or exchange, domestic taxes, and
        shipping fees will not be refunded.
      </p>
      <p>
        Delays in shipping are not the responsibility of KAPIL JEWELS Jewelry.
        Estimated Delivery Lead Times:
      </p>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>India</TableCell>
            <TableCell>1-3 day</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>USA</TableCell>
            <TableCell>3-5 day</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p>
        Taxes are applied at check-out according to the state/province of the
        shipping address.
      </p>
    </div>
  );
}
