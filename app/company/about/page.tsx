import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";
import Image from "next/image";
import insiderOption from "@/lib/assets/insider_option.png";
import tradeView from "@/lib/assets/feat-mockup03.png";

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
  <h2 className="w-full text-white/60 text-sm lg:text-base text-left">
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
      <section className="mb-8">
        <h2 className="text-2xl sm:text-5xl text-left w-[70%] sm:w-[40%] font-semibold p-2 bg-yellow-300 text-black rounded-lg mb-8">
          Africa Market Leader
        </h2>
        <div className="relative space-y-4 sm:flex sm:flex-col">
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
    </div>
  );
};
