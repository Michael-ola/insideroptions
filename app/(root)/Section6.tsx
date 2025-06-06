"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CardProps = {
  number: number;
  observed: boolean;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

function HowItWorksCard({
  number,
  observed,
  title,
  description,
  image,
}: CardProps) {
  return (
    <div className={`relative ${number == 2 ? "pt-8" : ""}`}>
      <div
        className={`max-h-[370px] overflow-clip rounded-xl bg-gradient-to-b from-[#0D141B] to-[#0B1017] pt-[13%] px-[8%] flex flex-col items-center text-center ${
          number == 2 ? "self-start top-10" : ""
        }`}
      >
        <Image
          src={`/images/Number-${number}.png`}
          width={100}
          height={500}
          alt="num"
          className={`absolute -top-[22%] z-20 -right-9 select-none w-[180px] h-[180px] transition-opacity duration-4500 ${
            observed ? "opacity-100" : "opacity-0"
          } ${number == 2 && "top-0 -mt-14"}`}
        />

        <div className="text-left w-full">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-sm text-[#B3B8C1]">{description}</p>
        </div>
        <div className="mt-8 w-full flex justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={`object-contain translate-y-[100%] ${
              observed ? "animate-up" : ""
            } ${number == 2 ? "w-[140px] h-[230px]" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);
  return (
    <section className="bg-[#050B11] py-16 px-[12%] text-white">
      <h2 className="text-center text-3xl md:text-4xl font-medium mb-14">
        How it <span className="text-[#48D17E] font-semibold">Works</span>
      </h2>

      <div ref={sectionRef} className={`grid grid-cols-1 md:grid-cols-3 gap-8`}>
        <HowItWorksCard
          observed={inView}
          number={1}
          title="Deposit"
          description="Open a real account and add funds. We work with more than 20 payment systems."
          image={{
            src: "/images/man.png",
            alt: "Deposit",
            width: 220,
            height: 200,
          }}
        />
        <HowItWorksCard
          observed={inView}
          number={2}
          title="Trade"
          description="Trade any of 100 assets and stocks. Use technical analysis and trade the news."
          image={{
            src: "/images/phone1.png",
            alt: "Trade",
            width: 220,
            height: 200,
          }}
        />
        <HowItWorksCard
          observed={inView}
          number={3}
          title="Withdraw"
          description="Get funds easily to your bank card or e-wallet. We take no commission."
          image={{
            src: "/images/man.png",
            alt: "Withdraw",
            width: 220,
            height: 200,
          }}
        />
      </div>
    </section>
  );
}
