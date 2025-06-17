import React from "react";
import PageHeader from "@/components/PageHeader";
import FaqCard from "@/components/FaqCard";
import Image from "next/image";
import Link from "next/link";

const actions = [
  {
    icon: "/images/live-chat.png",
    title: "Live Chat",
  },
  {
    icon: "/images/mail.png",
    title: "Email",
  },
  {
    icon: "/images/form.png",
    title: "Contact form",
  },
];

const Section2 = () => {
  return (
    <section className="relative py-20 pb-30 bg-[#0b131a] text-center">
      <h2 className="text-white text-3xl  mb-16">Still need Help?</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {actions.map((action, idx) => (
          <Card key={idx} icon={action.icon} title={action.title} />
        ))}
      </div>
    </section>
  );
};

function Card({ icon, title }: { icon: string; title: string }) {
  return (
    <Link
      href="/contact-us"
      className="flex cursor-pointer items-center gap-4 max-sm:gap-6 justify-center bg-white/5 border border-white/10 rounded-xl p-6 w-[282px] max-sm:w-[80%] h-[120px] backdrop-blur-sm"
    >
      <Image
        src={icon}
        alt={`${title} icon`}
        width={48}
        height={48}
        className="w-10 h-10 object-contain"
      />
      <div className="flex flex-col text-left">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
    </Link>
  );
}

export default function FAQPage() {
  const breadcrumbList = [
    { label: "Home", href: "/" },
    { label: "Trading", href: "" },
    { label: "FAQs", href: "/FAQ" },
  ];

  const details = [
    {
      question: "How do I verify my account, and what documents are needed?",
      answer: `To verify your account, you'll need to make a deposit first and provide a color photo of your valid primary identity document (passport or national ID card) containing a clear photo, full name, date and place of birth, expiration date, and country of issue.

For card deposits we might additionally ask you to provide your card statement in order to have your credit/debit card verified.

Please ensure the provided documents are clear and easy to read.`,
    },
    {
      question: "What is the minimum deposit and withdrawal amount?",
      answer:
        "Minimum deposit and withdrawal are $10 or equal amount in local currency.",
    },
    {
      question: "How do I verify my account, and what documents are needed?",
      answer:
        "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
    },
    {
      question:
        "Can I withdraw funds from the demo account or transfer them to my real account?",
      answer:
        "The funds in the demo account are virtual and cannot be withdrawn or transferred to your real trading account. The demo account is strictly meant for practice and learning purposes only.",
    },
    {
      question:
        "If my account cannot be verified after making a deposit, will I get my funds back?",
      answer:
        "Yes, if your account cannot be verified for any reason, your deposited funds will be fully refunded to the original payment method. Please do not use 3rd party wallets or cards to deposit. In cases where 3rd-party payment accounts are used for the deposit, we may not have the option for a refund, and an additional verification process may be necessary.",
    },
  ];
  return (
    <main className="min-h-screen bg-[#0B0F1A] pt-[5%]  ">
      <PageHeader title="FAQs" breadcrumbList={breadcrumbList} />
      <section className="pt-22 flex flex-col px-[7%] gap-8 pb-24">
        {details.map((info, index) => (
          <FaqCard key={index} question={info.question} answer={info.answer} />
        ))}
      </section>
      <Section2 />
    </main>
  );
}
