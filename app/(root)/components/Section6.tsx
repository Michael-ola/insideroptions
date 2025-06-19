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
  className?: string;
  imageStyle?: string;
};

function HowItWorksCard({
  number,
  observed,
  title,
  description,
  image,
  className,
  imageStyle,
}: CardProps) {
  return (
    <div className={`relative  ${className}`}>
      <div
        className={`max-h-[470px] h-full overflow-clip border border-[#99e39e1a]  rounded-xl bg-gradient-to-b from-[#0D141B] to-[#0B1017] opacity-80 pt-[13%] px-[10%] flex flex-col items-center text-center`}
      >
        <Image
          src={`/images/Number-${number}.png`}
          width={100}
          height={500}
          alt="num"
          className={`absolute before:content-none before:absolute before:block before:z-10 before:inset-0 before:bg-[red] -top-[22%] md:-top-[19%] z-30 -right-9 select-none w-[180px] h-[180px] transition-opacity duration-4500 ${
            observed ? "opacity-100" : "opacity-0"
          } ${number == 2 && "md:top-0 -mt-14 max-sm:-mt-22"}`}
        />

        <div className="text-left w-full">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className=" text-[#B3B8C1]">{description}</p>
        </div>
        <div className="w-full h-[270px] mt-auto flex flex-col">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={`object-contain w-full mt-auto translate-y-[100%] ${
              observed ? "animate-up" : ""
            } ${imageStyle}`}
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
    <section className="relative bg-[#050B11] py-16 pb-44 px-[15%] max-sm:px-[5%] text-white max-sm:pb-16 overflow-hidden">
      <h2 className="text-center text-3xl md:text-4xl font-medium mb-18 md:mb-28">
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
      <div
        ref={sectionRef}
        className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-sm:gap-14`}
      >
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
          imageStyle="w-full h-auto max-sm:w-[240px] max-sm:mx-auto"
        />
        <HowItWorksCard
          observed={inView}
          number={2}
          title="Trade"
          description="Trade any of 100 assets and stocks. Use technical analysis and trade the news."
          image={{
            src: "/images/phone-cut.png",
            alt: "Trade",
            width: 180,
            height: 200,
          }}
          className="md:pt-8 md:top-10"
          imageStyle="w-[150px] h-[240px]"
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
          className=""
          imageStyle="w-[184px] h-[228px] !mt-0 max-sm:!mt-6"
        />
      </div>
    </section>
  );
}
