import React from "react";
import PageHeader from "@/components/PageHeader";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import insiderOption from "@/lib/assets/insider_option.png";
import tradeView from "@/lib/assets/feat-mockup03.png";
import avatar from "@/lib/assets/avatar.png";
import reliabilty from "@/lib/assets/reliability_icon.png";
import speed from "@/lib/assets/speed.png";
import simplicity from "@/lib/assets/target.png";
import map from "@/lib/assets/map.png";
import io_icon from "@/lib/assets/io_icon.png";
import robot from "@/lib/assets/robot.png";
import sa from "@/lib/assets/sa_flag.png";
import au from "@/lib/assets/AUIcon.png";
import eu from "@/lib/assets/EU.png";
import zar from "@/lib/assets/ZARIcon.png";

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
  className?: string;
}
interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, className = "" }) => (
  <h2 className={`text-xl sm:text-2xl font-bold ${className}`}>{children}</h2>
);

const Paragraph: React.FC<ParagraphProps> = ({ children, className = "" }) => (
  <h2
    className={`w-full text-white/60 text-sm lg:text-base ${className}`}
  >
    {children}
  </h2>
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

const timelineData = [
  {
    year: "2025",
    description:
      "Launch Artificial intelligence AI trading/ investment in Nigeria to help improve Life & Well being, by giving traders value for their money rather than losing it with financial institutions & brokers with manipulative spread",
    icons: [
      { src: io_icon, alt: "io" },
      { src: robot, alt: "robot" },
    ],
  },
  {
    year: "2024",
    description:
      "Partners with Regulated Brokers across Africa and in different Jurisdictions.",
    icons: [{ src: sa, alt: "sa" }],
  },
  {
    year: "2023",
    description: "Acquired Trade Interceptor. Launched investment services",
    icons: [{ src: io_icon, alt: "io" }],
  },
  {
    year: "2022",
    description: "Launch of CFD trading services in Australia",
    icons: [{ src: eu, alt: "eu" }],
  },
  {
    year: "2021",
    description:
      "Partners with Multi regulated brokers across Africa & Europe that are Regulated under the Australian Securities and Investments Commission (ASIC) & the Financial Conduct Authority (FCA) in the UK",
    icons: [
      { src: au, alt: "au" },
      { src: zar, alt: "zar" },
    ],
  },
  {
    year: "2020",
    description: "Creation of OctopusFX, forerunner of InsiderOption",
    icons: [{ src: io_icon, alt: "io" }],
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
        <Heading>Africa Market Leader</Heading>
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
              <Link href="/signup" className="bg-[#79DA7E] text-black px-6 py-2 rounded-xl">
                Create Account
              </Link>
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
      <section className="px-4 py-12 sm:px-30 space-y-16">
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
        <div className="flex flex-col sm:flex-row gap-11">
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
          <div className="w-full space-y-[18px]">
            <div className="w-full space-y-6 border-l border-dashed border-[#79DA7E]">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className="w-full space-y-3"
                >
                  <div className="inline-block bg-[#2D5B2F] text-[#79DA7E] text-sm px-4 py-1 rounded-tl-full rounded-r-full">
                    {item.year}
                  </div>
                  <div className="flex items-center gap-[18px] pl-6">
                    <div className="flex flex-col gap-4">
                      {item.icons.map((icon, idx) => (
                        <div
                          key={idx}
                          className="relative w-5 h-5 rounded-full"
                        >
                          <Image
                            src={icon.src}
                            alt={icon.alt}
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      ))}
                    </div>
                    <Paragraph className="break-words w-[90%]">
                      {item.description}
                    </Paragraph>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#EFEFEF]/3 px-0 py-12 sm:p-16 flex flex-col gap-6 sm:gap-9 border-1 border-gray-50/15 rounded-xl">
        <Heading className="text-center">
          Discover the ultimate trading experience.
        </Heading>

        <div className="flex flex-col items-center justify-center sm:flex-row gap-4 sm:gap-6">
          <Link href="/signup" className="bg-[#79DA7E] text-black px-6 py-2 rounded-xl">
            Create Live Account
          </Link>
          <button className="text-[#79DA7E] text-base font-semibold">
            Or Try Demo
          </button>
        </div>
      </section>
    </div>
  );
};
