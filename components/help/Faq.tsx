import React from "react";

const faqs = [
  {
    question: "How do I verify my account, and what documents are needed?",
    answer: `To verify your account, you’ll need to make a deposit first and provide a color photo of your valid primary identity document (passport or national ID card) containing a clear photo, full name, date and place of birth, expiration date, and country of issue.

For card deposits we might additionally ask you to provide your card statement in order to have your credit/debit card verified.

Please ensure the provided documents are clear and easy to read.`,
  },
  {
    question: "What is the minimum deposit and withdrawal amount?",
    answer:
      "Minimum deposit and withdrawal are $10 or equal amount in local currency.",
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
      "Yes, if your account cannot be verified for any reason, your deposited funds will be fully refunded to the original payment method. Please do not use 3rd party wallets or cards to deposit, in cases where 3rd-party payment accounts are used for the deposit, we may not have the option for a refund, and an additional verification process may be neccessary.",
  },
];
const Faq = () => {
  return (
    <div className="w-full h-full text-white pl-8 pr-4 pt-6 space-y-5 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-6">
        <h2 className="text-base font-semibold text-center p-2">
          Our Frequently Asked Questions (FAQ) section is designed to provide
          you with quick and clear answers to common questions.
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#0a1317] border border-white/5 p-6 rounded-xl shadow-sm space-y-3"
          >
            <h3 className="text-primary font-medium text-sm">{faq.question}</h3>
            <p className="text-sm text-white/60 font-light whitespace-pre-line">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
