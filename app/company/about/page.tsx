import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";
import Image from "next/image";
import insiderOption from "@/lib/assets/insider_option.png";
import tradeView from "@/lib/assets/feat-mockup03.png";
import avatar from "@/lib/assets/avatar.png";
import reliabilty from "@/lib/assets/reliability_icon.png";
import speed from "@/lib/assets/speed.png";
import simplicity from "@/lib/assets/target.png";
import map from "@/lib/assets/map.png";

const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "About", href: "/company/about" },
];
const page = () => {
  return (
    <main className="min-h-screen bg-[#030912] pt-[5%]">
      <PageHeader
        title="About Us"
        breadcrumbList={breadcrumbList}
        company
        className="flex-col"
      />
      <AboutUs />
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
  <h2 className="text-xl sm:text-2xl font-bold">{children}</h2>
);

const Paragraph: React.FC<HeadingProps> = ({ children }) => (
  <h2 className="w-full min-w-full text-white/60 text-sm lg:text-base">
    {children}
  </h2>
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

const values = [
  {
    title: "Clients",
    description:
      "Providing the best customer service is our top priority. More than 100 account managers are focused on the needs of our clients.",
    icon: avatar,
  },
  {
    title: "Reliability",
    description:
      "As an industry leader, we provide our clients with exceptional reliability. We do more than anyone else to satisfy the needs of our clients.",
    icon: reliabilty,
  },
  {
    title: "Simplicity",
    description:
      "Anybody can become a trader with our easy-to-use trading platform. InsiderOption is available on all platforms: Web, Windows, MacOS, iPhone, and Android.",
    icon: simplicity,
  },
  {
    title: "Speed",
    description:
      "We provide the fastest trading using cutting-edge technologies. No delays in order execution and no lag in the user interface.",
    icon: speed,
  },
];

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-[90%] max-sm:max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pt-18 py-8 max-md:mt-13 text-white">
      <section className="mb-8">
        <Image
          src={insiderOption}
          alt="Insider Option Image"
          className="w-full h-auto"
          priority
        />
      </section>
      <section className="px-4 py-6 sm:px-30 sm:py-12 space-y-12">
        <h2 className="text-2xl sm:text-5xl text-left whitespace-nowrap sm:w-[40%] font-semibold p-2 bg-yellow-300 text-black rounded-lg">
          Africa Market Leader
        </h2>
        <div className="relative space-y-4 sm:space-y-16 sm:flex sm:flex-col">
          <div className="space-y-4 sm:w-[50%]">
            <Paragraph>
              Established in 2020, InsiderOption LLC is an innovative, market
              leading provider of online trading services & using Artificial
              intelligence (AI) to ensure traders gain maximum profit using our
              Automated Trade system. Today InsiderOption is a partner with
              multi-regulated brokers across African & Europe , who are members
              of the Finacom Management Ltd referred as financial commission
              with offices & client in Australia, Asia, Japan, Europe, UK, UAE.
            </Paragraph>
          </div>
          <div className="border-1 border-gray-50/15 rounded-xl px-6 py-8 sm:p-[50px] space-y-10">
            <div className="space-y-3 sm:space-y-6 sm:w-[50%]">
              <Heading>Cutting-edge Technology</Heading>
              <Paragraph>
                We empower traders with the latest technology across a wide
                range of financial markets on our award-winning trading
                platform,
              </Paragraph>
              <button className="bg-[#79DA7E] text-black px-6 py-2 rounded-xl">
                Create Account
              </button>
            </div>
            <div className="flex justify-center sm:absolute sm:top-0 sm:right-[25%]">
              <Image
                src={tradeView}
                alt="phone trade view"
                priority
                className="h-auto"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 py-12 sm:px-30 sm:py-0 space-y-16">
        <div className="w-full sm:text-center">
          <Heading>Our Values</Heading>
        </div>

        <div className="space-y-10 sm:flex sm:gap-[18px]">
          {values.map((value, idx) => (
            <div className="space-y-6" key={idx}>
              <Image src={value.icon} alt="Profile Icon" />
              <div className="space-y-3">
                <h4 className="font-medium text-xl">{value.title}</h4>
                <Paragraph>{value.description}</Paragraph>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-0 py-12">
        <div className="w-full text-center break-words">
          <Heading>A brand with presence all over Africa</Heading>
        </div>

        <div className="space-y-10 sm:flex sm:gap-[18px]">
          <Image src={map} alt="map of africa" className="w-full h-auto" />
        </div>
      </section>
      <section className="px-4 sm:px-30 py-12 space-y-4 sm:space-y-12">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full space-y-3">
            <Heading>Committed to your success</Heading>

            <Paragraph>
              At Insideroption, we are committed to enhancing the trading
              journey of our clients by providing them with excellent
              conditions, cutting-edge tools, in-depth educational resources and
              world-class customer support.
            </Paragraph>
            <Paragraph>
              Whether you’re a new or experienced trader, InsiderOption is here
              to help you maximise your trading potential & profit using our
              Artificial intelligence ( AI) auto trading system.
            </Paragraph>

            <button className="bg-[#79DA7E] text-black px-6 py-2 rounded-xl">
              Trade with us
            </button>
          </div>
          <div className="flex-1 space-y-6"></div>
        </div>

        <div className="space-y-10 sm:flex sm:gap-[18px]">
          <Image src={map} alt="map of africa" className="w-full h-auto" />
        </div>
      </section>
    </div>
  );
};
