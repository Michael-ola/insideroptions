import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  {
    label: "Referral Program Terms & Conditions",
    href: "/company/referral-program-terms-and-conditions",
  },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="Referral Program Terms & Conditions"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col-reverse"
      />
      <Referral />
    </main>
  );
};

export default page;

interface HeadingProps {
  children: ReactNode;
}

interface ParagraphProps {
  children: ReactNode;
}

interface ContentListProps {
  items: ReactNode[];
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children }) => (
  <h2 className="text-base sm:text-lg font-semibold">{children}</h2>
);

const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <div className="flex-1 text-lg font-light">{children}</div>
);

const ContentList: React.FC<ContentListProps> = ({ items, className = "" }) => (
  <ul className={`list-disc pl-6 space-y-2 mb-4 ${className}`}>
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const Referral: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%] max-md:mt-13 pt-18 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <section className="space-y-3">
          <Paragraph>Last Updated: 26th July, 2024</Paragraph>
          <Paragraph>
            Please read these Referral Program Terms and Conditions
            (&quot;Terms&quot;) carefully. By participating, you accept and
            agree to these Terms.
          </Paragraph>
          <Heading>Eligibility</Heading>
          <Paragraph>
            The Referral Program is open to both new and existing clients of
            InsiderOption with either demo or real accounts. <br />
            To Qualify:
          </Paragraph>
          <ContentList
            items={[
              "You and the person you refer must be at least 18 years old.",
              "Participation must be legal in your country of residence.",
              "Employees of InsiderOption and their families or household members are not eligible.",
              "Accounts that are suspended, banned, or closed are not eligible.",
            ]}
          />
          <Paragraph>
            We reserve the right to disqualify participants at our sole
            discretion.
          </Paragraph>
          <Heading>How It Works</Heading>
          <ContentList
            items={[
              "Demo account users must click “Become a Partner” to receive a personal referral link and promo code.",
              "Real account users must log in and follow similar steps to get their referral link.",
              'A "Valid Referral" means your invitee must be a first-time user of InsiderOption, not an existing customer.',
              "You earn rewards once your referred friend registers a real account, deposits at least $10 (or equivalent), and starts trading.",
            ]}
          />
          <Paragraph>
            If referrals are rejected or you breach any conditions, you will not
            receive rewards.
          </Paragraph>
          <Heading>Restrictions</Heading>
          <ContentList
            items={[
              "You cannot refer yourself or household members.",
              "Creating fake accounts or engaging in fraudulent activities is prohibited.",
              "Promotional materials must include disclaimers and risk warnings.",
              "It’s forbidden to promise guaranteed returns, mislead referrals, or violate advertising laws.",
            ]}
          />
          <Heading>Referral Rewards</Heading>
          <ContentList
            items={[
              "You can earn up to 6% commission based on the trading volume of your referred clients.",
              "To withdraw rewards:",
            ]}
          />
          <ContentList
            className="pl-12"
            items={[
              "Your account must be verified.",
              "Your referred client must make a qualifying deposit and start trading.",
              "You must have referred a minimum number of active users.",
            ]}
          />
          <ContentList
            items={[
              "Rewards cannot be transferred, sold, or assigned.",
              "Rewards must be used for trading or can be withdrawn in the selected currency.",
              "InsiderOption reserves the right to adjust or withhold rewards in cases of fraud or unethical behavior.",
            ]}
          />
          <Paragraph>
            You can also earn 10% of the referral income if your referees refer
            at least five new clients themselves. <br /> Rewards will gradually
            decline over time for older referrals.
          </Paragraph>
          <Heading>Taxes</Heading>
          <Paragraph>
            You are responsible for any taxes due on your referral earnings,
            according to your local laws.
          </Paragraph>
          <Heading>Confidentiality</Heading>
          <Paragraph>
            Any sensitive information you receive must be kept confidential,
            even after you stop participating.
          </Paragraph>
          <Heading>Trademarks</Heading>
          <Paragraph>
            Participation does not give you the right to use InsiderOption’s
            trademarks, copyrights, or logos.
          </Paragraph>
          <Heading>Liability</Heading>
          <Paragraph>
            InsiderOption and its affiliates are not liable for any damages,
            losses, or issues resulting from participating in the program.
            <br />
            You agree to indemnify and hold the company harmless from any claims
            related to your participation.
          </Paragraph>
          <Heading>Disclaimer</Heading>
          <Paragraph>
            The program is provided “as is.” <br /> We do not guarantee
            uninterrupted or error-free service and are not responsible for any
            technical problems or failures.
          </Paragraph>
          <Heading>Release</Heading>
          <Paragraph>
            By participating, you waive any claims for damages against
            InsiderOption and its affiliates regarding the Referral Program.
          </Paragraph>
          <Heading>Termination</Heading>
          <Paragraph>
            We reserve the right to modify, suspend, or cancel the Referral
            Program at any time without notice. <br /> We can also terminate
            your participation and withhold rewards if:
          </Paragraph>
          <ContentList
            items={[
              "You violate these Terms or InsiderOption’s main Terms.",
              "Illegal activities are detected.",
              "KYC (Know Your Customer) checks cannot be completed.",
              "Directed by authorities or regulatory bodies.",
            ]}
          />
          <Heading>Ammendments</Heading>
          <Paragraph>
            These Terms may be updated without prior notice. Updates take effect
            immediately, and the &quot;Last Update&quot; date will change.{" "}
            <br /> Continued participation after changes means you accept the
            new Terms.
          </Paragraph>
          <Heading>Acceptance</Heading>
          <Paragraph>
            By participating, you confirm that you have read, understood, and
            agreed to these Terms.
          </Paragraph>
          <Paragraph>
            These Terms are part of InsiderOption’s overall Terms and
            Conditions, available at:{" "}
            <a
              href="https://insideroption.com/company/policy/terms/"
              className="underline"
            >
              https://insideroption.com/company/policy/terms/
            </a>
          </Paragraph>
          <Heading>Privacy</Heading>
          <Paragraph>
            Your personal information will be handled according to our Privacy
            Policy:{" "}
            <a
              href="https://insideroption.com/company/policy/privacy-policy/"
              className="underline"
            >
              https://insideroption.com/company/policy/privacy-policy/
            </a>
          </Paragraph>
          <Heading>Assignment</Heading>
          <Paragraph>
            You cannot transfer your rights or obligations without our written
            permission. <br /> We can assign our rights and obligations without
            notifying you.
          </Paragraph>
          <Heading>Disputes</Heading>
          <Paragraph>
            For any disputes, we encourage you to contact us first at
            help@eo.support to resolve the issue amicably.
          </Paragraph>
          <Heading>Feedback</Heading>
          <Paragraph>
            Questions about the Referral Program? Reach out to us at
            help@eo.support.
          </Paragraph>
        </section>
      </article>
    </div>
  );
};
