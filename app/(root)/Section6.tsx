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
        className={`max-h-[370px] overflow-clip border border-[#99e39e1a]  rounded-xl bg-gradient-to-b from-[#0D141B] to-[#0B1017] opacity-80 pt-[13%] px-[8%] flex flex-col items-center text-center ${
          number == 2 ? "self-start top-10" : ""
        }`}
      >
        <Image
          src={`/images/Number-${number}.png`}
          width={100}
          height={500}
          alt="num"
          className={`absolute before:content-none before:absolute before:block before:z-10 before:inset-0 before:bg-[red] -top-[22%] z-30 -right-9 select-none w-[180px] h-[180px] transition-opacity duration-4500 ${
            observed ? "opacity-100" : "opacity-0"
          } ${number == 2 && "top-0 -mt-14"}`}
        />

        <div className="text-left w-full">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className=" text-[#B3B8C1]">{description}</p>
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
    <section className="relative bg-[#050B11] py-16 pb-44 px-[12%] max-sm:px-[5%] text-white max-sm:pb-16 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-medium mb-14">
        How it <span className="text-[#48D17E] font-semibold">Works</span>
      </h2>
      <Image
        src={`/images/dots.png`}
        width={150}
        height={500}
        alt="..."
        className="absolute bottom-0 left-0"
      />
      <Image
        src={`/images/dots2.png`}
        width={400}
        height={500}
        alt="..."
        className="absolute top-0 right-42 max-sm:-right-30 max-sm:-top-5"
      />
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
            src: "/images/wallet.png",
            alt: "Withdraw",
            width: 220,
            height: 200,
          }}
        />
      </div>
    </section>
  );
}
