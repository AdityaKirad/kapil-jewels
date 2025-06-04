import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../_components/ui/table";

const sizingGuide: Array<{
  circumference: number | null;
  diameter: number;
  usa_and_canada: number;
  europe: number | null;
  uk: string | null;
  asia: number | null;
}> = [
  {
    circumference: 42,
    diameter: 13.3,
    usa_and_canada: 2,
    europe: 42,
    uk: "E",
    asia: 4,
  },
  {
    circumference: 43,
    diameter: 13.7,
    usa_and_canada: 2.5,
    europe: 43,
    uk: "E.5",
    asia: 5,
  },
  {
    circumference: 44,
    diameter: 14.1,
    usa_and_canada: 3,
    europe: 44,
    uk: "F",
    asia: 5.5,
  },
  {
    circumference: 45,
    diameter: 14.3,
    usa_and_canada: 3.25,
    europe: 45,
    uk: "G",
    asia: 6,
  },
  {
    circumference: null,
    diameter: 14.5,
    usa_and_canada: 3.5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 46,
    diameter: 14.7,
    usa_and_canada: 3.75,
    europe: 46,
    uk: "H",
    asia: 7,
  },
  {
    circumference: 47,
    diameter: 14.9,
    usa_and_canada: 4,
    europe: 47,
    uk: "H.5",
    asia: 7.5,
  },
  {
    circumference: null,
    diameter: 15.1,
    usa_and_canada: 4.25,
    europe: null,
    uk: null,
    asia: 8,
  },
  {
    circumference: 48,
    diameter: 15.3,
    usa_and_canada: 4.5,
    europe: 48,
    uk: "I.5",
    asia: 8.5,
  },
  {
    circumference: 49,
    diameter: 15.5,
    usa_and_canada: 4.75,
    europe: 49,
    uk: "J.5",
    asia: 9,
  },
  {
    circumference: null,
    diameter: 15.7,
    usa_and_canada: 5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 50,
    diameter: 15.9,
    usa_and_canada: 5.25,
    europe: 50,
    uk: "K",
    asia: 10,
  },
  {
    circumference: null,
    diameter: 16.1,
    usa_and_canada: 5.5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 51,
    diameter: 16.3,
    usa_and_canada: 5.75,
    europe: 51,
    uk: "L",
    asia: 11,
  },
  {
    circumference: 52,
    diameter: 16.5,
    usa_and_canada: 6,
    europe: 52,
    uk: "L.5",
    asia: 12,
  },
  {
    circumference: 53,
    diameter: 16.7,
    usa_and_canada: 6.25,
    europe: 53,
    uk: "M.5",
    asia: 13,
  },
  {
    circumference: null,
    diameter: 16.9,
    usa_and_canada: 6.5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 54,
    diameter: 17.1,
    usa_and_canada: 6.75,
    europe: 54,
    uk: "N.5",
    asia: 14,
  },
  {
    circumference: null,
    diameter: 17.3,
    usa_and_canada: 7,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 55,
    diameter: 17.5,
    usa_and_canada: 7.25,
    europe: 55,
    uk: "O",
    asia: 15,
  },
  {
    circumference: 56,
    diameter: 17.7,
    usa_and_canada: 7.5,
    europe: 56,
    uk: "P",
    asia: 16,
  },
  {
    circumference: null,
    diameter: 17.9,
    usa_and_canada: 7.75,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 57,
    diameter: 18.1,
    usa_and_canada: 8,
    europe: 57,
    uk: "P.5",
    asia: 17,
  },
  {
    circumference: 58,
    diameter: 18.3,
    usa_and_canada: 8.25,
    europe: 58,
    uk: "Q.5",
    asia: 18,
  },
  {
    circumference: null,
    diameter: 18.5,
    usa_and_canada: 8.5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 59,
    diameter: 18.8,
    usa_and_canada: 8.75,
    europe: 59,
    uk: "R",
    asia: 19,
  },
  {
    circumference: 60,
    diameter: 19.0,
    usa_and_canada: 9,
    europe: 60,
    uk: "S",
    asia: 20,
  },
  {
    circumference: null,
    diameter: 19.2,
    usa_and_canada: 9.25,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 61,
    diameter: 19.4,
    usa_and_canada: 9.5,
    europe: 61,
    uk: "S.5",
    asia: 21,
  },
  {
    circumference: null,
    diameter: 19.6,
    usa_and_canada: 9.75,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 62,
    diameter: 19.8,
    usa_and_canada: 10,
    europe: 62,
    uk: "T.5",
    asia: 22,
  },
  {
    circumference: 63,
    diameter: 20.0,
    usa_and_canada: 10.25,
    europe: 63,
    uk: "U.5",
    asia: 23,
  },
  {
    circumference: null,
    diameter: 20.2,
    usa_and_canada: 10.5,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 64,
    diameter: 20.4,
    usa_and_canada: 10.75,
    europe: 64,
    uk: "V",
    asia: 24,
  },
  {
    circumference: 65,
    diameter: 20.6,
    usa_and_canada: 11,
    europe: 65,
    uk: "W",
    asia: 25,
  },
  {
    circumference: null,
    diameter: 20.8,
    usa_and_canada: 11.25,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 66,
    diameter: 21.0,
    usa_and_canada: 11.5,
    europe: 66,
    uk: "W.5",
    asia: 26,
  },
  {
    circumference: 67,
    diameter: 21.2,
    usa_and_canada: 11.75,
    europe: 67,
    uk: "X.5",
    asia: 27,
  },
  {
    circumference: null,
    diameter: 21.4,
    usa_and_canada: 12,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 68,
    diameter: 21.6,
    usa_and_canada: 12.25,
    europe: 68,
    uk: "Z",
    asia: 28,
  },
  {
    circumference: 69,
    diameter: 21.8,
    usa_and_canada: 12.5,
    europe: 69,
    uk: "12.5",
    asia: 29,
  },
  {
    circumference: null,
    diameter: 22.0,
    usa_and_canada: 12.75,
    europe: null,
    uk: null,
    asia: null,
  },
  {
    circumference: 70,
    diameter: 22.2,
    usa_and_canada: 13,
    europe: 70,
    uk: null,
    asia: 30,
  },
];

export default function Page() {
  return (
    <div className="container mx-auto flex flex-col gap-6 px-4 py-8 text-xl max-md:text-sm">
      <h1 className="font-libre-baskerville text-center text-4xl">
        Sizing Guide
      </h1>
      <h2 className="text-2xl font-medium">Rings</h2>
      <p>Discover your ring size with these simple methods:</p>
      <h3 className="text-xl font-medium">
        Option 1: Measure an existing ring
      </h3>
      <p>
        If you have a KAPIL JEWELS ring, this method is ideal. After completing
        this step, ordering in the future will be unchallenging. Alternatively,
        you can measure one of your other beloved rings.
      </p>
      <p>How to Measure:</p>
      <ol className="ml-6 list-decimal">
        <li>
          Ensure that the internal diameter of your ring (in millimeters)
          matches the corresponding size on the ring chart provided below. Be
          sure to use millimeters for accuracy.
        </li>
      </ol>
      <h3 className="text-xl font-medium">Option 2: Measure Your Finger</h3>
      <p>
        Determine your ring size by measuring your finger with a string or a
        thin strip of paper. Follow these steps for an accurate fit:
      </p>
      <ol className="ml-6 list-decimal">
        <li>Cut a 6-inch long string or piece of paper.</li>{" "}
        <li>
          Wrap it snugly around the base of your finger, ensuring it&apos;s not
          stretched during the process.
        </li>
        <li>
          Mark where the string or paper meets your finger and measure the
          distance with a ruler (in millimeters).
        </li>{" "}
        <li>
          Match your finger measurement (in millimeters) with the nearest
          circumference in the chart below.
        </li>
      </ol>
      <p>
        If you&apos;re already aware of your size, kindly convert it to the
        corresponding USA size as provided below:
      </p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CIRCUMFERENCE (MM)</TableHead>
            <TableHead>DIAMETER (MM)</TableHead>
            <TableHead>USA & CANADA</TableHead>
            <TableHead>EUROPE</TableHead>
            <TableHead>UK</TableHead>
            <TableHead>ASIA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sizingGuide.map((size, index) => (
            <TableRow key={index}>
              <TableCell>{size.circumference}</TableCell>
              <TableCell>{size.diameter}</TableCell>
              <TableCell>{size.usa_and_canada}</TableCell>
              <TableCell>{size.europe}</TableCell>
              <TableCell>{size.uk}</TableCell>
              <TableCell>{size.asia}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-2xl font-medium">Bracelet</h2>
      <h3 className="text-xl font-medium">
        Option 1: Measure an Existing Bracelet or Bangle
      </h3>
      <p>How to Measure a Bracelet:</p>
      <ol className="ml-6 list-decimal">
        <li>Take a bracelet that fits you well and lay it flat.</li>{" "}
        <li>
          Measure from the clasp to the end of the bracelet (in inches), and
          select the size closest to your measurement. For a comfortable fit,
          consider adding half an inch. You can adjust by half an inch to
          achieve your preferred loose or tight fit.
        </li>
      </ol>
      <p>How to Measure a Bangle:</p>
      <ol className="ml-6 list-decimal">
        <li>Use a well-fitting bangle and lay it flat.</li>{" "}
        <li>
          Measure from the clasp to the end of the bangle (in centimeters), and
          choose the size closest to your measurement. For added comfort,
          consider adding 1.5 centimeters. You can adjust by adding or
          subtracting centimeters to achieve your desired fit, whether loose or
          snug.
        </li>
      </ol>
      <h3 className="text-xl font-medium">Option 2: Use a Tape Measure</h3>
      <p>
        If you have a measuring tape at home, this method provides the most
        precise results.
      </p>
      <ol className="ml-6 list-decimal">
        <li>
          Find a flexible measuring tape with both inches and centimeters on its
          ruler.
        </li>
        <li>
          Wrap it around your wrist where you&apos;d like your bracelet to sit,
          aiming for a snug yet comfortable fit. Ensure the measuring tape
          starts at the 0 mark.
        </li>
        <li>
          Note the measurement where it aligns with the 0 mark. Record the
          number of inches for bracelets and centimeters for bangles.
        </li>
        <li>
          Purchase the size that closely matches your measurement, using inches
          for bracelets and centimeters for bangles.
        </li>
      </ol>
      <p>
        This guide serves as a reference. If you have any uncertainties,
        don&apos;t hesitate to contact our customer service team. They are
        available to assist with styling and any other inquiries.
      </p>
    </div>
  );
}
