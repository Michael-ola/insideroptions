"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Section5() {
  return (
    <section className="relative bg-[#090f1a] text-white py-24 pt-10 pb-35 px-6 md:px-20 overflow-hidden">
      <div
        className="absolute top-[60%] max-sm:top-[25%] left-[23%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "200px",
          height: "260px",
          background: "rgba(153, 227, 158, 0.25)",
          borderRadius: "50% / 60%",
          filter: "blur(90px)",
        }}
      />

      <div
        className="absolute top-[40%] max-sm:top-[15%] left-[15%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "700px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(153, 227, 158, 0.08) 0%, transparent 60%)",
          filter: "blur(90px)",
        }}
      />

      <div className="w-full px-[8%] relative z-10 max-sm:px-[3%]">
        <h2 className="text-3xl md:text-5xl leading-12 font-light text-center mb-32">
          Set up{" "}
          <span className="text-[#99E39E] font-bold">AI Trading Robot</span> in
          5 minutes
        </h2>

        <div className="flex items-center justify-center max-sm:flex-col">
          <div className="flex justify-center pl-[7%] items-center max-sm:px-[5%]">
            <AnimatedSection />
          </div>
          <div className="space-y-10 max-w-md ml-28 -mt-20 max-sm:max-w-full max-sm:w-full max-sm:ml-0 max-sm:mt-20">
            <Item description="Automatic selection of the most profitable assets" />
            <Item description="Opening deals based on technical analysis" />
            <Item description="Smart back tested strategies for all risk levels" />
            <Item description="$10 000 on Demo account to try out the robot" />
            <Item description="Get 0.8% daily profit on real balance" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ description }: { description: string }) {
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
        <p className=" md:text-[19px] text-white mt-1">{description}</p>
      </div>
    </div>
  );
}

function AnimatedSection() {
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
    <section ref={sectionRef} className="relative flex items-center -mt-12">
      <div
        className={`z-20 transition-opacity duration-6000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src="/images/phone3.png"
          alt="iPhone"
          width={300}
          height={400}
          className="h-[530px] w-[280px]"
        />
      </div>

      <div className="w-full max-sm:-left-25 absolute -bottom-18 z-20 -left-40 md:-left-32 flex justify-center overflow-hidden">
        <Image
          src="/images/strategyCard.png"
          alt="card"
          width={220}
          height={300}
          className={`object-contain translate-y-[100%] ${
            inView ? "animate-up opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </section>
  );
}
