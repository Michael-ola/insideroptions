import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Return Policy", href: "/company/return-policy" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="Return Policy"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <ReturnPolicy />
    </main>
  );
};

export default page;

// interface HeadingProps {
//   children: ReactNode;
// }

interface NumberedParagraphProps {
  number: string;
  children: ReactNode;
}

// const Heading: React.FC<HeadingProps> = ({ children }) => (
//   <h2 className="text-xl sm:text-2xl font-bold mb-4">{children}</h2>
// );

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
}) => (
  <div className="mb-4 flex">
    <span className="font-semibold min-w-[40px]">{number}.</span>
    <div className="flex-1">{children}</div>
  </div>
);

const ReturnPolicy: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%]  max-md:mt-13 pt-18 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6">Return and Refund Policy</h1> */}

        <section className="mb-8">
          {/* <Heading>1. Withdrawal Process</Heading> */}

          <NumberedParagraph number="1.1">
            To initiate a withdrawal, the Client must submit a request through
            their &quot;personal zone&quot; on the Site. The Client must select
            a withdrawal method from the available options and complete all
            required fields.
          </NumberedParagraph>

          <NumberedParagraph number="1.2">
            Once a withdrawal request is submitted, it is marked as
            &quot;Requested.&quot; When processing begins, the status updates to
            &quot;In Process,&quot; and the requested amount is deducted from
            the Client&apos;s balance. Funds are transferred to the payment
            system wallet when the status changes to &quot;Processed.&quot;
          </NumberedParagraph>

          <NumberedParagraph number="1.3">
            The Company&apos;s financial department processes withdrawal
            requests individually. The processing period may take up to five (5)
            business days, and the Company may extend this timeframe if
            necessary.
          </NumberedParagraph>

          <NumberedParagraph number="1.4">
            Withdrawals must be made to the same payment system account that was
            used for the deposit. If a technical issue prevents this, the
            Company will select an alternative withdrawal method that matches
            the Client&apos;s personal information.
          </NumberedParagraph>

          <NumberedParagraph number="1.5">
            The Client is solely responsible for ensuring the accuracy of the
            information provided when requesting a withdrawal.
          </NumberedParagraph>

          <NumberedParagraph number="1.6">
            If the Client made a deposit via bank card, any withdrawals must
            initially be sent back to that same card. Only after the total
            withdrawal amount exceeds the original deposit can the Client choose
            a different withdrawal method.
          </NumberedParagraph>

          <NumberedParagraph number="1.7">
            If a Client submits a withdrawal request immediately after making a
            deposit without conducting any trading activity, the withdrawal must
            be made using the same payment credentials and system as the
            original deposit. The Company may apply fees for returning the funds
            and for processing through the payment system.
          </NumberedParagraph>

          <NumberedParagraph number="1.8">
            If the Client&apos;s account is closed due to a breach of the Terms
            and Conditions, the Company reserves the right to withhold all
            profits made by the Client.
          </NumberedParagraph>

          <NumberedParagraph number="1.9">
            In cases where the Client&apos;s account is closed due to a
            violation, the Company, at its sole discretion, may refund the
            Client&apos;s initial deposit after deducting all applicable charges
            and fees.
          </NumberedParagraph>
        </section>
      </article>
    </div>
  );
};
