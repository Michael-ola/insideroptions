import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "AML & KYC", href: "/company/aml-and-kyc" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="AML & KYC"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <AMLKycPolicy />
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
  className?: string;
}

interface ContentListProps {
  items: ReactNode[];
  className?: string;
}

// const Heading: React.FC<HeadingProps> = ({ children }) => (
//   <h2 className="text-xl sm:text-2xl font-bold mb-4">{children}</h2>
// );

const SubHeading: React.FC<HeadingProps> = ({ children }) => (
  <h3 className="text-lg sm:text-xl font-semibold mb-2">{children}</h3>
);

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
  className,
}) => (
  <div className="mb-4 flex">
    <span className={`font-semibold min-w-[30px] ${className}`}>{number}.</span>
    <div className="flex-1">{children}</div>
  </div>
);

const ContentList: React.FC<ContentListProps> = ({ items, className = "" }) => (
  <ul className={`list-disc pl-6 space-y-2 mb-4 ${className}`}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const AMLKycPolicy: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%]  max-md:mt-13 pt-18 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          AML & KYC Policy
        </h1> */}

        <section className="mb-8">
          <NumberedParagraph number="1">
            At{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>{" "}
            and its affiliates (collectively referred to as the
            &quot;Company&quot;), it is our strict policy to prevent and
            actively combat money laundering, terrorism financing, and any
            criminal activities. All officers, employees, and affiliates must
            strictly follow these standards to ensure the Company&apos;s
            services are not misused for illegal activities.
          </NumberedParagraph>

          <NumberedParagraph number="2">
            In this context, money laundering is defined as actions taken to
            hide or disguise the true source of illegally obtained funds, making
            them appear legitimate.
          </NumberedParagraph>

          <NumberedParagraph number="3">
            Typically, money laundering occurs in three phases:
            <ContentList
              items={[
                <>
                  <strong>Placement:</strong> Illicit cash enters the financial
                  system.
                </>,
                <>
                  <strong>Layering:</strong> The funds are moved around to
                  distance them from their criminal origins.
                </>,
                <>
                  <strong>Integration:</strong> The money is reintroduced into
                  the economy as seemingly lawful assets.
                </>,
              ]}
            />
            Terrorist financing, while similar, may involve legal funds intended
            for illegal uses, bypassing the need for criminal origin.
          </NumberedParagraph>

          <NumberedParagraph number="4">
            Employees who deal directly or indirectly with clients must be aware
            of and comply with all laws and regulations related to anti-money
            laundering and customer verification, as part of their daily duties.
          </NumberedParagraph>

          <NumberedParagraph number="5">
            To support this policy, the Company has implemented a comprehensive
            and ongoing compliance program that ensures adherence to legal
            requirements and protects against the risk of money laundering and
            terrorism financing across all departments and affiliated entities.
          </NumberedParagraph>

          <NumberedParagraph number="6">
            Every affiliate of the Company must comply fully with the
            Company&apos;s AML and KYC procedures.
          </NumberedParagraph>

          <NumberedParagraph number="7">
            Identification documents and service records must be stored for at
            least the period mandated by local regulations.
          </NumberedParagraph>

          <NumberedParagraph number="8">
            All new employees must undergo anti-money laundering training during
            their onboarding process. Additionally, relevant employees are
            required to complete annual AML and KYC training, with more
            specialized training provided for those who handle these
            responsibilities daily.
          </NumberedParagraph>

          <SubHeading>
            9. <span className="w-2 inline-block"></span>Client Responsibilities
          </SubHeading>

          <NumberedParagraph number="9.1" className="pl-8">
            Clients must comply with all applicable laws, including
            international laws, aimed at preventing illegal trade, financial
            fraud, money laundering, and the legitimization of illicit funds.
          </NumberedParagraph>

          <NumberedParagraph number="9.2" className="pl-8">
            Clients must not be involved, directly or indirectly, in any illegal
            financial activities through the platform.
          </NumberedParagraph>

          <NumberedParagraph number="10">
            Clients guarantee that all funds deposited into their accounts are
            from legitimate sources, legally owned, and rightfully available for
            their use.
          </NumberedParagraph>

          <NumberedParagraph number="11">
            The Company reserves the right to perform KYC and/or AML/CTF
            (Counter-Terrorist Financing) procedures on clients according to the
            laws of Saint Vincent and the Grenadines. Clients must provide
            necessary identification and documentation when requested. Failure
            or refusal to do so may lead the Company to delay deposits, trade
            executions, withdrawals, or even suspend services until the
            documents are verified.
          </NumberedParagraph>

          <NumberedParagraph number="12">
            If any suspicious or fraudulent financial activities are
            detected—such as the use of stolen credit cards or chargebacks—the
            Company may suspend services, freeze client accounts, cancel
            transactions, and investigate the source of the funds before
            resuming operations.
          </NumberedParagraph>

          <NumberedParagraph number="13">
            During investigations, the Company may request copies of identity
            documents (e.g., passports), bank cards used for deposits, and other
            materials to verify the lawful origin and ownership of the funds.
          </NumberedParagraph>

          <NumberedParagraph number="14">
            Clients are prohibited from using the Company&apos;s services or
            software for any illegal or fraudulent activities, including money
            laundering, under the laws of either the client&apos;s jurisdiction
            or the Company&apos;s.
          </NumberedParagraph>

          <NumberedParagraph number="15">
            The Company&apos;s decision to refuse suspicious transactions does
            not create any civil liability towards the client or third parties
            for failing to fulfill any obligations towards them.
          </NumberedParagraph>
        </section>
      </article>
    </div>
  );
};
