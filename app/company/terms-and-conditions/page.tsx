import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "Terms & Conditions", href: "/company/terms-and-conditions" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="Terms & Conditions"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <RetailClientAgreement />
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

const SectionHeading: React.FC<HeadingProps> = ({ children }) => (
  <h2 className="text-xl sm:text-2xl font-bold mb-4">{children}</h2>
);

const SubSectionHeading: React.FC<HeadingProps> = ({ children }) => (
  <h3 className="text-lg sm:text-xl font-semibold mb-2">{children}</h3>
);

const AnnexHeading: React.FC<HeadingProps> = ({ children }) => (
  <h4 className="text-base sm:text-lg font-semibold mb-2">{children}</h4>
);

const NumberedParagraph: React.FC<NumberedParagraphProps> = ({
  number,
  children,
}) => (
  <div className="mb-2 flex">
    <span className="font-semibold min-w-[40px]">{number}.</span>
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

const RetailClientAgreement: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%]  mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-18 max-md:mt-13 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <p className="mb-4">
          This Retail Client Agreement has been drafted in English. If any
          translation is made for convenience or any other reason and
          discrepancies arise between the English and translated versions, the
          English version shall take precedence.
        </p>

        <p className="mb-4">
          This Agreement, including any referenced and updated terms and
          policies (collectively the &quot;Agreement&quot;), governs all
          business interactions between you (&quot;Client&quot;) and
          InsiderOption LLC (&quot;Company&quot;).
        </p>

        <p className="mb-4">
          By clicking accept, accessing the Site, or using the Company&apos;s
          services, you confirm that you have read, understood, and agree to be
          legally bound by this Agreement—including the Payment Policy, Return
          and Refund Policy, Privacy Policy, Bonus Terms and Conditions, AML and
          KYC Policy, and 1-Click Transaction Agreement Terms—just as if you had
          signed it physically.
        </p>

        <p className="mb-4">
          For your protection, we recommend you thoroughly review this Agreement
          and related policies available at{" "}
          <a href="https://insideroption.com" className="underline">
            https://insideroption.com
          </a>{" "}
          or Insideroption.ai before accepting, opening a trading account, or
          conducting transactions.
        </p>

        <p className="mb-6">
          If you disagree with the terms, please do not use the Site, Mobile
          Apps, or open an account. Continuing to use any services implies
          acceptance of the Agreement.
        </p>

        <p className="mb-6">
          InsiderOption LLC is registered at First Floor, SVG Teachers Credit
          Union Uptown Building, Corner of James and Middle Street, Kingstown
          P.O., St. Vincent and the Grenadines.
        </p>

        <section className="mb-8">
          <SectionHeading>1. Definitions and Interpretation</SectionHeading>
          <p className="mb-4">
            Unless otherwise stated, the following definitions apply:
          </p>

          <ContentList
            items={[
              <>
                <strong>Account:</strong> A trading account opened by the Client
                with the Company.
              </>,
              <>
                <strong>Agreement:</strong> This Retail Client Agreement and all
                referenced policies.
              </>,
              <>
                <strong>Dormant Account:</strong> An account inactive for three
                (3) months.
              </>,
              <>
                <strong>FATCA:</strong> Foreign Account Tax Compliance Act.
              </>,
              <>
                <strong>Mobile Apps:</strong> Apps designed for Android and iOS
                devices.
              </>,
              <>
                <strong>Transaction:</strong> Any activity in the Client&apos;s
                Account, including trading, deposits, and withdrawals.
              </>,
              <>
                <strong>Services:</strong> Services provided by the Company.
              </>,
              <>
                <strong>Site:</strong> The Company&apos;s website,{" "}
                <a href="https://insideroption.com" className="underline">
                  https://insideroption.com
                </a>
                .
              </>,
              <>
                <strong>US Reportable Person:</strong> Includes U.S. citizens,
                tax residents, certain partnerships, corporations, estates, and
                trusts under U.S. jurisdiction.
              </>,
            ]}
          />

          <p className="mb-4">Other interpretation rules:</p>

          <ContentList
            items={[
              `"Including" means "including without limitation."`,
              `"Or" is non-exclusive.`,
              `References to documents include amendments.`,
              `Headings are for reference only.`,
              `Singular and plural forms, as well as gendered pronouns, are interchangeable.`,
            ]}
          />
        </section>

        <section className="mb-8">
          <SectionHeading>2. Introduction</SectionHeading>

          <SubSectionHeading>Scope of Agreement:</SubSectionHeading>
          <ContentList
            items={[
              "This Agreement governs all transactions between the Company and the Client.",
              "From June 30, 2020, the Site is operated by InsiderOption LLC under the laws of Saint Vincent and the Grenadines.",
            ]}
          />

          <SubSectionHeading>Restrictions:</SubSectionHeading>
          <ContentList
            items={[
              "The Company does not serve citizens or residents of specific countries (Australia, Canada, USA, EU countries, etc.) and is not intended for residents of Japan.",
              "By agreeing, the Client confirms they are not a citizen or resident of any restricted country.",
            ]}
          />

          <SubSectionHeading>Commencement and Entirety:</SubSectionHeading>
          <ContentList
            items={[
              "This Agreement becomes effective once accepted by the Client and supersedes all previous agreements.",
            ]}
          />

          <SubSectionHeading>Amendments:</SubSectionHeading>
          <ContentList
            items={[
              "The Company may modify the Agreement at any time. Updates take immediate effect upon being posted on the Site.",
              "It is the Client&apos;s responsibility to review changes. Continued use of services constitutes acceptance of updates. If the Client disagrees, they should stop using the Site and services.",
            ]}
          />
        </section>

        {/* Section 3 */}
        <section className="mb-8">
          <SectionHeading>3. General Terms</SectionHeading>
          <p className="mb-4">The Client acknowledges and accepts:</p>

          <ContentList
            items={[
              "Online Trading involves high risks and is suitable for experienced clients only.",
              "The Company offers no investment, legal, or tax advice.",
              "The Client assumes full responsibility for trading decisions and possible losses.",
              "Trading accounts are not bank accounts and earn no interest.",
              "The Company is not liable for internet or network issues, hacking, or unauthorized account access.",
              "Information submitted may be retained for seven (7) years as per law.",
              "The Client must secure their login details and is responsible for any loss from unauthorized use.",
              "Losses will not be compensated unless due to the Company&apos;s gross negligence or fraud.",
              "Force majeure events (natural disasters, war, internet failures, etc.) release the Company from liability.",
              "Clients must ensure compliance with their local laws and refrain from using services if illegal in their jurisdiction.",
              "The Company may hold the Client&apos;s deposit for up to 180 days if KYC documents are not provided.",
            ]}
          />

          <SubSectionHeading>Client Representations:</SubSectionHeading>
          <p className="mb-2">The Client confirms:</p>

          <ContentList
            items={[
              "They have read and understood the Agreement fully.",
              "They are not coerced into entering this Agreement.",
              "They are at least 18 years old and legally allowed to trade.",
              "They are not from a prohibited country.",
              "All registration information is accurate, and any changes will be promptly reported.",
              "Trading funds are owned by them, free of liens or encumbrances.",
              "They are aware of the risks of Online Trading and accept full responsibility.",
            ]}
          />
        </section>

        {/* Section 4 */}
        <section className="mb-8">
          <SectionHeading>
            4. RIGHTS AND RESPONSIBILITIES OF THE PARTIES
          </SectionHeading>

          <SubSectionHeading>4.1. Client&apos;s Rights:</SubSectionHeading>
          <ContentList
            items={[
              "The Client may carry out Online Trades using the InsiderOption platform.",
              "The Client can request information about their Account.",
              "The Client may use funds in their Account freely.",
              "The Client can send inquiries, instructions, and orders through their Account.",
              "In case of disputes, the Client may submit a formal complaint via the Company&apos;s official email.",
              "The Client may terminate the Agreement with three (3) days&apos; written notice; pending transactions will be completed and all funds must be withdrawn before closure.",
            ]}
          />

          <SubSectionHeading>
            4.2. Client&apos;s Responsibilities:
          </SubSectionHeading>
          <ContentList
            items={[
              "The Client must adhere to the terms of this Agreement when using the Company&apos;s services.",
              "Provide all documents requested for identity verification (KYC).",
              "Prevent third parties from accessing or using their Account.",
              "Take full responsibility for all Account activities and any losses from unauthorized access.",
              "Be accountable for any investment choices and their outcomes.",
              "Keep the Company&apos;s confidential information private without written permission.",
              "Update the Company within seven (7) days if any registration information changes.",
              "Maintain only one Account; multiple Accounts can lead to termination and loss of profits.",
              "Refrain from creating new Accounts if the current one is suspended or blocked.",
            ]}
          />

          <SubSectionHeading>4.3. Company&apos;s Rights:</SubSectionHeading>
          <ContentList
            items={[
              "Modify the Agreement at any time with immediate effect upon posting.",
              "Conduct KYC and AML/CTF checks to comply with regulations.",
              "Retain Client information for at least seven years.",
              "Hold initial deposits for 180 days if KYC documents are not provided.",
              "Adjust trading terms (return rates, profit rates, etc.) at its discretion.",
              "Limit or revoke Client&apos;s access if necessary.",
              "Request additional documentation if the Account remains inactive.",
              "Appoint third parties to provide services under strict confidentiality.",
              "Use third-party providers to hold Client funds or process payments.",
              "Charge a dormant Account fee of $50 per month.",
              "Reject deposits not made from a Client&apos;s own bank account.",
              "Refuse any Client instructions without explanation.",
              "Set withdrawal limits and reject withdrawals if funds are insufficient.",
              "Charge up to 20% commission on withdrawals if trading turnover is low.",
              "Suspend or terminate Client Accounts for Agreement violations or suspected illegal activities.",
              "Deduct applicable tax payments from Client Accounts.",
              "Act at its own discretion on any matter not specified in the Agreement.",
            ]}
          />

          <SubSectionHeading>4.4. Account Closure Fees:</SubSectionHeading>
          <p className="mb-4">
            A fee of $10 may be charged if the Account is closed due to failure
            to update information, violation of terms, or upon the Client&apos;s
            request to terminate the Agreement.
          </p>

          <SubSectionHeading>
            4.5. Company&apos;s Obligations:
          </SubSectionHeading>
          <ContentList
            items={[
              "Act honestly, fairly, and professionally.",
              "Provide access to the Site and Client&apos;s Account.",
              "Process withdrawal requests within five (5) business days, subject to sufficient Account funds.",
            ]}
          />
        </section>

        {/* Section 5 */}
        <section className="mb-8">
          <SectionHeading>
            5. GOVERNING LAW AND DISPUTE RESOLUTION
          </SectionHeading>

          <NumberedParagraph number="5.1">
            This Agreement is governed by the laws of Saint Vincent and the
            Grenadines.
          </NumberedParagraph>

          <NumberedParagraph number="5.2">
            In case of disputes, the Client is encouraged to first seek a direct
            resolution with the Company.
          </NumberedParagraph>

          <NumberedParagraph number="5.3">
            Unresolved disputes after 30 days will be handled by the
            non-exclusive jurisdiction of the courts of Saint Vincent and the
            Grenadines.
          </NumberedParagraph>
        </section>

        {/* Section 6 */}
        <section className="mb-8">
          <SectionHeading>
            6. INDEMNIFICATION AND LIMITATION OF LIABILITY
          </SectionHeading>

          <NumberedParagraph number="6.1">
            The Client agrees to indemnify and defend the Company and its
            affiliates from any claims arising from misuse of the Site, Mobile
            App, or Client&apos;s Account.
          </NumberedParagraph>

          <NumberedParagraph number="6.2">
            Clients use the Company&apos;s services and enter transactions at
            their own risk. The Company is not liable for any trading losses
            unless resulting from its own wrongdoing.
          </NumberedParagraph>

          <NumberedParagraph number="6.3">
            The Company is not responsible for network failures, internet
            issues, or access problems.
          </NumberedParagraph>

          <NumberedParagraph number="6.4">
            The Company, its employees, and agents are not liable for losses
            except in cases of negligence, willful misconduct, or fraud.
          </NumberedParagraph>

          <NumberedParagraph number="6.5">
            No liability is accepted for market condition changes, reliance on
            third parties, inaccurate site content, or regulatory changes
            affecting Client&apos;s use of services.
          </NumberedParagraph>

          <NumberedParagraph number="6.6">
            Clients are responsible for safeguarding their login credentials.
            Information on the Site should not be considered advice.
          </NumberedParagraph>

          <NumberedParagraph number="6.7">
            No warranties are provided regarding the Site&apos;s content, and
            the Company is not liable for indirect or consequential losses or
            unavailability of services.
          </NumberedParagraph>

          <NumberedParagraph number="6.8">
            The Company bears no responsibility for loss due to withdrawn
            content or indirect damages such as missed profits, loss of
            opportunity, or damaged reputation.
          </NumberedParagraph>
        </section>

        {/* Section 7 */}
        <section className="mb-8">
          <SectionHeading>7. MISCELLANEOUS</SectionHeading>

          <SubSectionHeading>Language</SubSectionHeading>
          <NumberedParagraph number="7.1">
            English is the official language of the Company. Any documents or
            communications provided in other languages are only for convenience;
            the English version is legally binding and will prevail in the case
            of any disputes.
          </NumberedParagraph>

          <SubSectionHeading>Tax Obligations</SubSectionHeading>
          <NumberedParagraph number="7.2">
            Earnings from online trading may be taxable depending on the
            Client&apos;s country of residence.
          </NumberedParagraph>
          <NumberedParagraph number="7.3">
            Clients are fully responsible for determining, reporting, and paying
            any applicable taxes.
          </NumberedParagraph>
          <NumberedParagraph number="7.4">
            Since tax laws can change, the Company reserves the right to deduct
            any tax-related payments from the Client&apos;s Account if
            necessary.
          </NumberedParagraph>

          <SubSectionHeading>Single Agreement</SubSectionHeading>
          <NumberedParagraph number="7.5">
            This Agreement, along with the terms for each transaction and any
            amendments, form a single binding contract between the Company and
            the Client. Both parties rely on this understanding when entering
            transactions.
          </NumberedParagraph>

          <SubSectionHeading>Call Recording</SubSectionHeading>
          <NumberedParagraph number="7.6">
            The Company may record phone calls without notifying the Client, and
            these recordings will serve as evidence of any orders or
            instructions given. The recordings will remain the Company&apos;s
            exclusive property.
          </NumberedParagraph>

          <SubSectionHeading>Company Records</SubSectionHeading>
          <NumberedParagraph number="7.7">
            The Company&apos;s records will be considered proof of the
            Client&apos;s dealings with the Company. The Client agrees not to
            dispute the validity of these records, even if they are not
            originals or not in writing. However, the Company may, at its
            discretion, allow the Client to access these records upon request.
          </NumberedParagraph>

          <SubSectionHeading>Rights and Remedies</SubSectionHeading>
          <NumberedParagraph number="7.8">
            The rights and remedies outlined in this Agreement are in addition
            to those provided by law. The Company has no obligation to exercise
            any rights for the Client&apos;s benefit, and any delay or failure
            to do so does not mean those rights are waived.
          </NumberedParagraph>

          <SubSectionHeading>Set-off</SubSectionHeading>
          <NumberedParagraph number="7.9">
            The Company may offset any amounts owed by the Client against
            amounts it owes to the Client without prior notice, even if the
            amounts are contingent or not yet determined.
          </NumberedParagraph>

          <SubSectionHeading>Severability</SubSectionHeading>
          <NumberedParagraph number="7.10">
            If any part of this Agreement is found to be illegal or
            unenforceable, it will not affect the validity of the rest. Any
            invalid provision will apply only within the relevant jurisdiction
            and not elsewhere.
          </NumberedParagraph>

          <SubSectionHeading>Prohibited Trading</SubSectionHeading>
          <NumberedParagraph number="7.11">
            Current or former employees, associates, and affiliates of the
            Company cannot open accounts or trade without prior written
            approval.
          </NumberedParagraph>
          <NumberedParagraph number="7.12">
            If any such person trades without permission, the Company will view
            their activity as abusive, close their positions immediately, and
            write off any balance except for the original deposit.
          </NumberedParagraph>

          <SubSectionHeading>One-Click Trading Disclaimer</SubSectionHeading>
          <NumberedParagraph number="7.13">
            Clients can choose between two modes for submitting orders:
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Default Mode:</strong> A two-step process where orders
                are only submitted after confirmation.
              </li>
              <li>
                <strong>One-Click Trading:</strong> A one-step process where
                orders are submitted immediately upon a single click.
              </li>
            </ul>
          </NumberedParagraph>
          <NumberedParagraph number="7.14">
            In One-Click Trading mode, once the Client clicks to place an order,
            it cannot be changed or canceled.
          </NumberedParagraph>
          <NumberedParagraph number="7.15">
            The Client can turn One-Click Trading on or off in the terminal
            settings.
          </NumberedParagraph>
          <NumberedParagraph number="7.16">
            By enabling One-Click Trading, the Client accepts all risks
            associated with this method, including mistakes or errors.
          </NumberedParagraph>
          <NumberedParagraph number="7.17">
            The Client agrees to fully indemnify the Company for any losses
            arising from errors made while using One-Click Trading.
          </NumberedParagraph>
        </section>

        {/* Section 8 */}
        <section className="mb-8">
          <SectionHeading>8. TERM AND TERMINATION</SectionHeading>

          <SubSectionHeading>Term</SubSectionHeading>
          <NumberedParagraph number="8.1">
            This Agreement takes effect once accepted by the Client.
          </NumberedParagraph>
          <NumberedParagraph number="8.2">
            It remains active indefinitely until either the Client or the
            Company decides to end it.
          </NumberedParagraph>

          <SubSectionHeading>Termination by Client</SubSectionHeading>
          <NumberedParagraph number="8.3">
            The Client may terminate the Agreement by giving three (3)
            days&apos; written notice. During this period, pending transactions
            will be settled.
          </NumberedParagraph>
          <NumberedParagraph number="8.4">
            All funds must be withdrawn or transferred before the account can be
            fully closed.
          </NumberedParagraph>

          <SubSectionHeading>Termination by Company</SubSectionHeading>
          <NumberedParagraph number="8.5">
            The Company may immediately terminate the Agreement without prior
            notice if:
            <ContentList
              className="mt-2"
              items={[
                "The Client breaches any terms.",
                "The Client behaves abusively.",
                "The Client fails to provide verifiable documents.",
                "The Client&apos;s actions could cause legal risk.",
                "The Client engages in illegal activities.",
                "The Client uses the Company&apos;s services illegally.",
                "The Client uses multiple accounts to manipulate trading positions.",
                "The Client reopens an account after being blocked.",
                "The Company is required to act by law or court order.",
                "Or for any other reason at the Company&apos;s sole discretion.",
              ]}
            />
          </NumberedParagraph>

          <SubSectionHeading>Post-Termination</SubSectionHeading>
          <NumberedParagraph number="8.6">
            Upon termination, any outstanding fees or expenses must be paid
            immediately. If not settled, the Company will deduct the amount from
            the Client&apos;s Account.
          </NumberedParagraph>
        </section>

        {/* Annex */}
        <section>
          <SectionHeading>Annex 1 to the Terms &amp; Conditions</SectionHeading>
          <SubSectionHeading>Technical Terms and Conditions</SubSectionHeading>

          <AnnexHeading>
            1. Handling Client Requests and Orders for Transaction Execution
          </AnnexHeading>
          <NumberedParagraph number="1.1">
            The process for handling Client requests and orders is as follows:
            after a Client submits a request or order, the Site platform checks
            its validity and forwards it to the server. Upon receiving it, the
            server revalidates the request or order, processes it, and sends the
            results back to the Site platform. If the connection is stable, the
            Site platform receives the outcome, completing the process.
          </NumberedParagraph>
          <NumberedParagraph number="1.2">
            Processing times vary based on the communication quality between the
            Site platform and the server and current market conditions. Under
            normal market conditions, processing typically takes 1–4 seconds,
            but it can be longer under unusual circumstances.
          </NumberedParagraph>
          <NumberedParagraph number="1.3">
            The server may reject a Client&apos;s request or order if:
            <ContentList
              className="mt-2"
              items={[
                "It is sent before the first market quote appears;",
                "The Client&apos;s account lacks sufficient funds;",
                "It is sent before trading sessions open;",
                "Market conditions are abnormal;",
                "Technical errors occur or fund management limits (e.g., minimum/maximum rates) are exceeded.",
              ]}
            />
          </NumberedParagraph>
          <NumberedParagraph number="1.4">
            Clients must use only one browser tab when working with the Site
            platform; using multiple tabs may lead to transaction discrepancies
            or cancellations.
          </NumberedParagraph>
          <NumberedParagraph number="1.5">
            The Client agrees that the account balance and transaction data
            shown on the Site platform are final and cannot be disputed or
            altered. No compensation will be provided for expected profits from
            transactions not recorded on the Site platform.
          </NumberedParagraph>

          <AnnexHeading>2. Quotes</AnnexHeading>
          <NumberedParagraph number="2.1">
            The Client agrees that the server is the sole reliable source for
            quote information. The quotes shown on the Site platform may not
            always reflect the actual market due to connection instability.
          </NumberedParagraph>
          <NumberedParagraph number="2.2">
            Site platform charts are indicative and not guaranteed to match
            execution prices.
          </NumberedParagraph>
          <NumberedParagraph number="2.3">
            Displayed prices are calculated as (Bid + Ask)/2.
          </NumberedParagraph>
          <NumberedParagraph number="2.4">
            Non-Market Quotes:
            <ContentList
              className="mt-2"
              items={[
                "A non-market quote is a displayed price without a corresponding market price at that moment.",
                "If a transaction occurs at a non-market quote, the Company will adjust financial transactions accordingly, based on the true market price at the time.",
                "If a position opens based on a non-market quote, the Company may cancel its financial result.",
              ]}
            />
          </NumberedParagraph>

          <AnnexHeading>
            3. Processing Client Orders to Open Positions
          </AnnexHeading>
          <NumberedParagraph number="3.1">
            A position will open if the Client&apos;s available funds are
            sufficient.
          </NumberedParagraph>
          <NumberedParagraph number="3.2">
            A position will not open if funds are insufficient.
          </NumberedParagraph>
          <NumberedParagraph number="3.3">
            A Client&apos;s order is considered processed once it is logged in
            the server file, with each position assigned a unique number.
          </NumberedParagraph>
          <NumberedParagraph number="3.4">
            Closing a trading position occurs at the prevailing market price.
          </NumberedParagraph>
          <NumberedParagraph number="3.5">
            The Company may impose limits on trade volume or the number of
            trades within a 24-hour period based on market conditions. If limits
            are exceeded, the Company may reject or cancel orders without
            liability.
          </NumberedParagraph>

          <AnnexHeading>4. OTC (Over-the-Counter) Assets</AnnexHeading>
          <NumberedParagraph number="4.1">
            OTC assets are those traded outside regulated exchanges.
          </NumberedParagraph>
          <NumberedParagraph number="4.2">
            Their prices are set by the Company based on various market sources.
          </NumberedParagraph>
          <NumberedParagraph number="4.3">
            The Client acknowledges the risks of OTC trading and confirms that
            any transactions are based on their own judgment or advice from
            independent advisors.
          </NumberedParagraph>
          <NumberedParagraph number="4.4">
            The Company&apos;s platform and server are the only reliable sources
            for OTC asset quotes.
          </NumberedParagraph>

          <AnnexHeading>5. Stock Trading</AnnexHeading>
          <NumberedParagraph number="5.1">
            &quot;Stock Trading&quot; refers to non-leveraged CFD (Contract for
            Difference) trading.
          </NumberedParagraph>
          <NumberedParagraph number="5.2">
            Stocks offered are not transferable securities and are not stored in
            a depository.
          </NumberedParagraph>
          <NumberedParagraph number="5.3">
            The Client understands the risks of Stock Trading.
          </NumberedParagraph>
          <NumberedParagraph number="5.4">
            Stock prices are based on independent data sources, but the Company
            does not guarantee best market prices.
          </NumberedParagraph>
          <NumberedParagraph number="5.5">
            Market and stop orders may be executed at prices significantly
            different from the displayed quotes.
          </NumberedParagraph>
          <NumberedParagraph number="5.6">
            Underlying stock prices can change rapidly, but the Company strives
            for best execution.
          </NumberedParagraph>
          <NumberedParagraph number="5.7">
            Stock Trading orders are executed outside regulated markets.
          </NumberedParagraph>
          <NumberedParagraph number="5.8">
            Transactions are not cleared through a central counterparty.
          </NumberedParagraph>
          <NumberedParagraph number="5.9">
            Stock Trading attracts commissions based on trade value and may
            incur additional fees; Clients are informed of applicable costs.
          </NumberedParagraph>
          <NumberedParagraph number="5.10">
            If commission fees exceed a trade&apos;s market value, active
            positions may be closed automatically.
          </NumberedParagraph>
          <NumberedParagraph number="5.11">
            Clients are not entitled to physical delivery of stocks.
          </NumberedParagraph>
          <NumberedParagraph number="5.12">
            Stocks traded do not provide voting rights or conversion options.
          </NumberedParagraph>
          <NumberedParagraph number="5.13–5.16">
            The Company may impose limits, delay confirmations, reject, or close
            Client stock trading orders at its discretion.
          </NumberedParagraph>
          <NumberedParagraph number="5.17">
            The Company does not provide investment advice or recommendations;
            Clients are responsible for their own investment decisions.
          </NumberedParagraph>
          <NumberedParagraph number="5.18">
            Clients should seek independent legal or tax advice as necessary.
          </NumberedParagraph>
          <NumberedParagraph number="5.19">
            Orders placed by Clients using their credentials are binding, and
            the Company is not responsible for verifying them.
          </NumberedParagraph>
          <NumberedParagraph number="5.20">
            The Company will act strictly according to Client instructions and
            will not validate the accuracy of orders.
          </NumberedParagraph>

          <AnnexHeading>6. Fraud</AnnexHeading>
          <NumberedParagraph number="6.1">
            If fraudulent activities are detected, such as:
            <ContentList
              className="mt-2"
              items={[
                "Using someone else&apos;s credit card;",
                "Manipulating results via software or system errors;",
                "Opening conflicting positions using different accounts;",
              ]}
            />
            The Client&apos;s account will be permanently blocked, all payments
            will be canceled, and law enforcement may be involved.
          </NumberedParagraph>
          <NumberedParagraph number="6.2">
            Any form of cheating, including reverse engineering, exploiting
            bugs, hacking, database breaches, or use of bots, is strictly
            forbidden. Discovery of such actions will lead to account
            termination, payment cancellation, and seizure of funds without
            prior notice.
          </NumberedParagraph>
        </section>
      </article>
    </div>
  );
};
