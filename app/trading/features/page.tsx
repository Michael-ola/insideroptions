import Image from "next/image";
import asbstractDot from "@/lib/assets/abstract-dot.png";
import { featuresLists } from "@/lib/constants";
import { cn } from "@/lib/authUtils";
export default function FeaturesPage() {
  return (
    <main className="pt-[5%] bg-[#000510] text-white">
      <section className="bg-gradient-to-tr from-[#0E151C] z-0 from-50% to-transparent relative text-white py-16 px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-2xl font-medium md:font-semibold md:text-4xl md:mb-8 mb-2">
            Features
          </h1>
          <div className="flex items-center gap-4 text-sm md:text-lg md:font-semibold">
            <span className="text-primary">Home</span>
            <span>/</span>
            <span>Trading</span>
            <span>/</span>
            <span>Features</span>
          </div>
        </div>
        <Image
          src={asbstractDot}
          alt="Abstract Dot"
          className="absolute top-0 right-0 opacity-20 z-10"
        />
      </section>
      <section className="py-12 md:py-[124px] px-4 space-y-12">
        <p className="mx-auto max-w-6xl">
          We provide the fastest trading using modern technologies, with no
          delays in order executions and the most accurate quotes. Our trading
          platform is available around the clock, including weekends.
          InsiderOption customer service is available 24/7. We are continuously
          adding new financial instruments.
        </p>

        <section className="space-y-12">
          {featuresLists.map((i, idx) => (
            <div
              className="bg-primary-container-overlay px-6 md:px-[50px] py-6 md:py-0 rounded-lg border-text-secondary/50 border mx-auto max-w-6xl sm:max-h-[151px] md:max-h-[326px] flex flex-col md:flex-row items-center gap-10 overflow-hidden"
              key={`${idx}-${i.title}`}
            >
              <div className="flex-1 space-y-3">
                <h4 className="md:font-medium text-xl">{i.title}</h4>
                <p className="text-base md:text-lg font-light text-[#B3B3B3]">
                  {i.desc}
                </p>
              </div>
              <div
                className={cn(
                  "relative flex-1 min-h-[280px] h-full md:aspect-square w-full md:w-auto",
                  idx === 2 && "overflow-hidden"
                )}
              >
                <Image
                  src={i.img}
                  alt={i.title}
                  height={280}
                  width={281}
                  className={cn(
                    "object-contain h-[280px] w-full md:h-full",
                    idx == 0 &&
                      "relative scale-[185%] md:scale-100 md:absolute top-30",
                    idx === 2 &&
                      "md:scale-[130%] scale-[190%] relative -top-2 md:top-0",
                    idx === 1 && "scale-150 md:scale-none relative top-20"
                  )}
                />
              </div>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
