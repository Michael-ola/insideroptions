import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Privacy Policy", href: "/company/privacy-policy" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="Privacy Policy"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <PrivacyPolicy />
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

interface ContentListProps {
  items: ReactNode[];
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => (
  <h2 className="text-xl sm:text-2xl font-bold mb-4">{children}</h2>
);

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
}) => (
  <div className="mb-4 flex">
    <span className="font-semibold min-w-[30px]">{number}.</span>
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

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%] max-md:mt-13 pt-18 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        {/* <h1 className="text-2xl sm:text-3xl font-bold mb-6">Privacy Policy</h1> */}

        <section className="mb-8">
          <NumberedParagraph number="1">
            By visiting{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>{" "}
            and using InsiderOption LLC&apos;s services, you agree to the
            collection and processing of your personal information by
            InsiderOption LLC.
          </NumberedParagraph>

          <NumberedParagraph number="2">
            When you register on{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>{" "}
            or use InsiderOption LLC&apos;s services, the company may collect
            information such as:
            <ContentList
              items={[
                "Full name",
                "Date of birth",
                "Gender",
                "Email address",
                "Complete mailing address",
                "Telephone number",
                "Transaction history",
                "Registration date",
                "IP address",
                "Location data",
                "Browser details (type and version)",
                "Operating system",
                "Referral source",
                "Session duration",
                "Page visits, among others",
              ]}
            />
          </NumberedParagraph>

          <NumberedParagraph number="3">
            When accessing{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>{" "}
            or its services and software, you may need to provide personal
            information. This data helps InsiderOption LLC manage the site,
            maintain client databases, process transactions, and send marketing
            materials. By voluntarily providing contact details (email, phone,
            address), you consent to being contacted through these means.
          </NumberedParagraph>

          <NumberedParagraph number="4">
            InsiderOption LLC treats all collected personal information as
            confidential and will use it for purposes such as:
            <ContentList
              items={[
                "Meeting legal requirements related to anti-money laundering and terrorism prevention;",
                "Operating and improving the site and services;",
                "Managing trading accounts;",
                "Enhancing security measures;",
                "Maintaining database backups;",
                "Communicating with clients;",
                "Keeping accurate records;",
                "Conducting statistical and marketing analysis.",
              ]}
            />
          </NumberedParagraph>

          <NumberedParagraph number="5">
            When registering at{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>
            , you must provide certain identification details, including for
            compliance with anti-money laundering laws.
          </NumberedParagraph>

          <NumberedParagraph number="6">
            Clients are required to provide accurate, truthful, and up-to-date
            information about their identity and must not impersonate others.
            Any changes to personal details must be reported to the company
            within 30 days.
          </NumberedParagraph>

          <NumberedParagraph number="7">
            InsiderOption LLC may use the information provided during
            registration and use of the site to send promotional content to
            clients.
          </NumberedParagraph>

          <NumberedParagraph number="8">
            Personal information may only be disclosed to government authorities
            if required by law, and only to the extent necessary.
          </NumberedParagraph>

          <NumberedParagraph number="9">
            Non-personal client data may be used freely by InsiderOption LLC for
            advertising and marketing purposes.
          </NumberedParagraph>

          <NumberedParagraph number="10">
            To perform transactions on the site, clients may be required to
            submit identification documents. Failure to provide these documents
            may lead to account suspension or closure at the company&apos;s
            discretion. The company may also refuse account openings without
            obligation to explain.
          </NumberedParagraph>

          <NumberedParagraph number="11">
            InsiderOption LLC will not share personal client information without
            written consent, except when required by law. Only employees
            involved in account management will have access to this information,
            stored securely according to legal standards.
          </NumberedParagraph>

          <NumberedParagraph number="12">
            Clients agree that all data relating to their accounts and
            activities may be retained by the company and used in case of
            disputes.
          </NumberedParagraph>

          <NumberedParagraph number="13">
            The company reserves the right, but is not obligated, to review
            client-provided information. Clients acknowledge that such review
            does not imply responsibility or guarantee by the company.
          </NumberedParagraph>

          <NumberedParagraph number="14">
            InsiderOption LLC commits to adopting and updating advanced security
            measures to protect client information.
          </NumberedParagraph>

          <NumberedParagraph number="15">
            During registration, clients must create a username and password,
            which must be kept confidential. Sharing login credentials with
            others is strictly prohibited. InsiderOption LLC is not liable for
            any damage resulting from misuse or unauthorized access.
          </NumberedParagraph>

          <NumberedParagraph number="16">
            All actions performed using a client&apos;s login credentials are
            the client&apos;s sole responsibility. The company bears no
            liability for verifying that the account is used by the rightful
            owner.
          </NumberedParagraph>

          <NumberedParagraph number="17">
            Clients must immediately inform customer support if they suspect any
            unauthorized account access.
          </NumberedParagraph>

          <NumberedParagraph number="18">
            InsiderOption LLC does not store or process bank card data. Customer
            card details are secured through Transport Layer Security (TLS 1.2)
            and AES-256 encryption standards.
          </NumberedParagraph>

          <NumberedParagraph number="19">
            Clients can request the deletion of their personal information by
            contacting{" "}
            <a href="mailto:help@eo.support" className="underline">
              help@eo.support
            </a>
            . However, the company may retain necessary data to comply with
            legal obligations, protect against fraud, or maintain essential
            services. Deleting crucial information may result in service
            discontinuation.
          </NumberedParagraph>

          <NumberedParagraph number="20">
            InsiderOption LLC retains personal data as long as necessary to
            provide services or as required by law. Changes to the Privacy
            Policy will be published on{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>
            , and continued use of the site implies acceptance of the updated
            policy.
          </NumberedParagraph>

          <Heading>Cookie Policy</Heading>

          <NumberedParagraph number="21">
            <strong>Cookies Overview:</strong>
            <br />A cookie is a small data file with a unique identifier sent
            from a website&apos;s server to your browser and stored on your
            device. Websites use cookies to track user behavior and improve user
            experience. Clients can configure browsers to reject cookies if
            desired.
          </NumberedParagraph>

          <NumberedParagraph number="22">
            <strong>Company&apos;s Cookie Policy:</strong>
            <br />
            When you visit{" "}
            <a href="https://insideroption.com" className="underline">
              https://insideroption.com
            </a>
            , cookies are saved to your device&apos;s storage and cache. These
            cookies help the company understand user navigation patterns and
            site preferences. However, InsiderOption LLC ensures client privacy
            by not storing personal details in cookies, using the information
            instead to enhance site functionality.
          </NumberedParagraph>
        </section>
      </article>
    </div>
  );
};
