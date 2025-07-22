import social from "@/lib/assets/social_icon.png";
import graduation from "@/lib/assets/graduation_icon.png";
import profile from "@/lib/assets/profile_plus.png";
import videoIcon from "@/lib/assets/video_icon.png";
import Image from "next/image";

const steps = [
  {
    number: "1",
    text: "Share your referral link or promo code on social media such as Facebook, TikTok, Twitter, Instagram or LinkedIn, to reach a wider audience, create engaging content like blog posts or videos.",
    imgSrc: social,
  },

  {
    number: "3",
    text: "Create a live stream show or screencast on platforms such as Twitch or YouTube.",
    imgSrc: videoIcon,
  },
];
const steps2 = [
  {
    number: "2",
    text: "Invite friends to join through your promo code or referral link.",
    imgSrc: profile,
  },
  {
    number: "4",
    text: "Start your own trading school and share valuable knowledge in different formats, such as eBooks, webinars, or online courses.",
    imgSrc: graduation,
  },
];

const faqs = [
  {
    q: "Q1: Why can’t I see my referrals?",
    a: "Encourage your referrals to enter a promo code during registration.",
  },
  {
    q: "Q2: How do I use the promo code?",
    a: "Your friend should input the profile code on the registration page upon registration.",
  },
  {
    q: "Q3: Is the commission I earn deducted from my referrals’ losses?",
    a: "Not at all; we earn revenue from liquidity. The more active traders there are on the InsiderOption platform, the more we receive from our liquidity providers, which we then use to pay commissions.",
  },
  {
    q: "Q4: Is it possible to create my own live stream show or screencast to attract new traders to InsiderOption?",
    a: "Yes, you can create a live stream show or screencast to showcase your trading expertise and attract new traders by sharing your insights and tips on using the InsiderOption platform. Various platforms and tools, such as Twitch or YouTube, can help you create engaging and interactive content.",
  },
  {
    q: "Q5: Why haven’t I seen any profits yet?",
    a: "To earn profits from your referrals, they need to engage in active trading, which is counted as a successful referral only after they make a deposit.",
  },
  {
    q: "Q6: Can I establish my own trading school to attract new traders to InsiderOption?",
    a: "You can definitely create your own trading school to share your knowledge and experience with potential new traders, helping them learn how to navigate the InsiderOption platform. You can utilize different formats like ebooks, webinars, or online courses.",
  },
];

const Faq = () => {
  return (
    <div className="w-full h-full px-4 pt-2 text-white">
      <div className="px-4 py-8 space-y-10">
        <h2 className="text-center text-lg sm:text-2xl font-semibold">
          Suggestions for Attracting New Traders and earn bonuses:
        </h2>

        <div className="w-full flex gap-[10px]">
          <div className="w-full flex flex-col gap-6 items-start">
            {steps.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-start gap-3 px-4 py-6 bg-[#1d252b] border border-white/10 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-[#1F302C] text-sm font-medium text-white flex items-center justify-center">
                  {step.number}
                </div>
                <p className="text-sm text-white/80">{step.text}</p>

                <div className="absolute -top-8 right-[15%] pointer-events-none">
                  <Image src={step.imgSrc} alt={step.number} priority />
                </div>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-6 items-start">
            {steps2.map((step, i) => (
              <div
                key={i}
                className="relative flex flex-col items-start gap-3 px-4 py-6 bg-[#1d252b] border border-white/10 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-[#1F302C] text-sm font-medium text-white flex items-center justify-center">
                  {step.number}
                </div>
                <p className="text-sm text-white/80">{step.text}</p>

                <div className="absolute -top-8 right-[15%] pointer-events-none">
                  <Image src={step.imgSrc} alt={step.number} priority />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/3 rounded-xl p-4 space-y-4 border border-white/5">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-1 text-sm font-medium">
              <p className=" text-primary">{faq.q}</p>
              <p className="text-white/60">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
