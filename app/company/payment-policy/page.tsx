import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Payment Policy", href: "/company/payment-policy" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="Payment Policy"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <PaymentPolicy />
    </main>
  );
};

export default page;

interface HeadingProps {
  children: ReactNode;
}

interface NumberedParagraphProps {
  number: string;
  children: ReactNode;
}

const Heading: React.FC<HeadingProps> = ({ children }) => (
  <h2 className="text-xl sm:text-2xl font-bold mb-4">{children}</h2>
);

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
}) => (
  <div className="mb-4 flex">
    <span className="font-semibold min-w-[40px]">{number}.</span>
    <div className="flex-1">{children}</div>
  </div>
);

const PaymentPolicy: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%]  mx-auto px-4 sm:px-6 lg:px-8 pt-18 py-8 max-md:mt-13 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <section className="mb-8">
          {/* <Heading>1. Account Management</Heading> */}

          <NumberedParagraph number="1.1">
            The Company is responsible for maintaining an accurate record of the
            Client&apos;s Account balance at all times.
          </NumberedParagraph>

          <NumberedParagraph number="1.2">
            The Company&apos;s responsibility begins when the first deposit is
            recorded, adjusts based on the Client&apos;s trading activities, and
            ends once the Client&apos;s full withdrawal request has been
            processed.
          </NumberedParagraph>

          <NumberedParagraph number="1.3">
            Clients may request to withdraw any available funds in their Account
            at the time of their enquiry.
          </NumberedParagraph>

          <NumberedParagraph number="1.4">
            Only the deposit and withdrawal methods listed on the Site are
            considered official. Clients assume all risks associated with using
            these payment methods, as the providers are not partners of the
            Company. The Company is not liable for any delays or failures caused
            by these providers. If issues arise, the Client must contact the
            payment provider directly and also inform the Company.
          </NumberedParagraph>

          <NumberedParagraph number="1.5">
            The Company is not responsible for the actions or omissions of any
            third-party service providers used by the Client for deposits or
            withdrawals. The Company&apos;s responsibility for the Client&apos;s
            funds begins once the funds reach the Company&apos;s bank account or
            other authorized accounts listed on the Site. Responsibility ends
            once the funds are sent out from these accounts. If any fraud is
            detected, the Company may cancel the transaction and suspend the
            Client&apos;s account.
          </NumberedParagraph>

          <NumberedParagraph number="1.6">
            If technical errors occur during a transaction, the Company reserves
            the right to cancel the transaction and suspend all the
            Client&apos;s activities on the Site.
          </NumberedParagraph>
        </section>

        <section className="mb-8">
          <Heading>2. Client Registration</Heading>

          <NumberedParagraph number="2.1">
            Client registration involves two steps: creating an account on the
            Site and verifying the Client&apos;s identity. To register, the
            Client must provide accurate personal and contact information and
            agree to the Company&apos;s Contract, its appendices, and related
            policies.
          </NumberedParagraph>

          <NumberedParagraph number="2.2">
            Identity verification ensures the accuracy of the Client&apos;s
            details. Clients must provide a clear scan or photo of a
            government-issued ID (passport, ID card) showing their photo and
            personal information. Additional documents, such as utility bills,
            bank contracts, or scans of bank cards, may be requested if further
            verification is needed.
          </NumberedParagraph>

          <NumberedParagraph number="2.3">
            Identity verification must be completed within ten (10) business
            days of the Company&apos;s request, though it may be extended up to
            thirty (30) business days in certain cases.
          </NumberedParagraph>
        </section>

        <section className="mb-8">
          <Heading>3. Deposit Process</Heading>

          <NumberedParagraph number="3.1">
            To make a deposit, the Client must submit a request through their
            &quot;personal cabinet&quot; on the Site, selecting a payment method
            from the listed options and providing all necessary information to
            proceed with payment.
          </NumberedParagraph>

          <NumberedParagraph number="3.2">
            Processing times vary depending on the payment method. Electronic
            payments may take from seconds to several days, while bank wire
            transfers may take up to forty-five (45) business days.
          </NumberedParagraph>
        </section>

        <section className="mb-8">
          <Heading>4. Taxes</Heading>

          <NumberedParagraph number="4.1">
            The Company is not responsible for reporting Client tax obligations
            and will only share Client information with third parties if legally
            required by government authorities.
          </NumberedParagraph>
        </section>

        <section className="mb-8">
          <Heading>5. Miscellaneous</Heading>

          <NumberedParagraph number="5.1">
            By agreeing to the Contract and related policies, the Client
            confirms they are legally authorized to use banking or payment
            services and have reached the legal age required by relevant
            jurisdictions.
          </NumberedParagraph>

          <NumberedParagraph number="5.2">
            The Client accepts full legal responsibility for ensuring that using
            the Company&apos;s Services does not violate any applicable laws in
            their jurisdiction. The Company is not liable for any unlawful use.
          </NumberedParagraph>

          <NumberedParagraph number="5.3">
            Payments made for Services on the Site are final and cannot be
            revoked. If the Client no longer wishes to use the Services, they
            can manage their preferences through their account profile on the
            Site.
          </NumberedParagraph>

          <NumberedParagraph number="5.4">
            The Company is not liable for any failures in payment processing
            caused by third-party systems used by the Client or by any issues
            with payment authorizations. The Company is not responsible for the
            quality, pricing, or conditions of the Services ordered through the
            Site.
          </NumberedParagraph>

          <NumberedParagraph number="5.5">
            The Client is solely responsible for all payments made, including
            any additional fees. The Company only facilitates the payment amount
            stated on the Site and does not control pricing or total costs. The
            Client acknowledges that any foreign exchange fees from their bank
            or payment provider are their own responsibility and that the
            Company is not liable for reimbursing such fees.
          </NumberedParagraph>

          <NumberedParagraph number="5.6">
            If the Client disagrees with any terms or conditions, they must
            cancel the payment and, if necessary, contact the Site&apos;s
            support team.
          </NumberedParagraph>
        </section>
      </article>
    </div>
  );
};
