"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SectionMarkets() {
  return (
    <section className="relative bg-[#090f1a] text-white py-24 pb-35 px-6 md:px-20 overflow-hidden">
      <div
        className="absolute top-[60%] max-sm:top-[25%] right-[25%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "200px",
          height: "260px",
          background: "rgba(153, 227, 158, 0.25)",
          borderRadius: "50% / 60%",
          filter: "blur(90px)",
        }}
      />

      <div
        className="absolute top-[40%] max-sm:top-[15%] right-[15%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(153, 227, 158, 0.08) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      <div className="w-full px-[8%] max-sm:px-[3%] relative z-10">
        <h2 className="text-3xl md:text-5xl font-light text-center mb-32 leading-12">
          All your markets in{" "}
          <span className="text-[#99E39E] font-bold">One Place</span>
        </h2>

        <div className="flex justify-center max-sm:flex-col-reverse">
          <div className="space-y-10 max-w-md max-sm:max-w-full max-sm:w-full">
            <MarketItem
              title="Currencies"
              description="Trade the most popular currency pairs with high leverage, tight spreads, and fast execution."
            />
            <MarketItem
              title="Stocks"
              description="Trade global market leaders like Apple, Tesla, and NVIDIA."
            />
            <MarketItem
              title="Crypto"
              description="Trade round the clock on the volatility of cryptocurrencies like Bitcoin and Ethereum."
            />
            <MarketItem
              title="Commodities"
              description="Trade gold, silver, oil, natural gas, sugar, and more."
            />
          </div>
          <div className="flex justify-center items-center pl-[13%] pr-[10%] max-sm:pl-[1%]">
            <AnimatedSection />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1">
        <Image
          className=""
          width={42}
          height={42}
          src="/images/check-icon.png"
          alt="img"
        />
      </div>
      <div>
        <h3 className="text-lg md:text-[22px] font-medium">{title}</h3>
        <p className=" md:text-[17px] text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
}

function AnimatedSection() {
  const assetLabels = ["Stocks", "Indicies", "Metals", "Commodities", "ETF"];
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center -mt-12 max-sm:-mt-8 max-sm:mb-[20%]"
    >
      <div
        className={`z-20 transition-opacity duration-6000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/phone1.png"
          alt="iPhone"
          width={300}
          height={400}
          className="h-[520px]"
        />
      </div>

      <div
        className={`absolute -bottom-1 -right-12 z-10 transition-opacity duration-6000 ${
          inView ? "opacity-100 animate-float-delay" : "opacity-0"
        } `}
      >
        <Image src="/images/bitcoin.png" alt="Bitcoin" width={80} height={80} />
      </div>

      {/* Apple Icon */}
      <div
        className={`absolute z-30 -left-12 top-1/4 transition-opacity duration-6000 ${
          inView ? "opacity-100 animate-float-delay" : "opacity-0"
        }`}
      >
        <Image
          src="/images/apple-logo.png"
          alt="Apple"
          width={80}
          height={80}
        />
      </div>

      <div className="absolute z-40 right-[15%] top-1/4 flex flex-col items-start gap-4">
        {assetLabels.map((label) => (
          <div
            key={label}
            className={`bg-[#99E39E] text-black px-6 max-sm:px-3 max-sm:text-sm -mr-60 py-2 rounded-lg shadow-md font-semibold transform transition-all duration-700 ease-out ${
              inView
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }`}
          >
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
