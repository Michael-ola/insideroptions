import Image from "next/image";
import Button from "@/components/Button2";

export default function Section7() {
  return (
    <section className="bg-[#0f191f] relative py-24 max-sm:pt-15 px-[10%] max-sm:px-[5%] flex items-center justify-center gap-16 xl:gap-28 2xl:gap-28 max-sm:flex-col-reverse">
      <div
        className="absolute top-[60%] max-sm:top-[10%] left-[25%] max-sm:left-[10%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "460px",
          height: "200px",
          background: "rgba(153, 227, 158, 0.25)",
          borderRadius: "50% / 60%",
          filter: "blur(100px)",
        }}
      />

      <div
        className="absolute top-[50%] left-[35%] -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "800px",
          height: "700px",
          background:
            "radial-gradient(ellipse at center, rgba(153, 227, 158, 0.08) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      <div className="relative w-[500px] max-w-full rounded-xl overflow-hidden shadow-lg">
        <Image
          src="/images/trading-presentation.png"
          alt="Trading Presentation"
          width={800}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="max-w-[500px] max-sm:max-w-full max-sm:w-full space-y-6 text-white">
        <p className="text-[18px] leading-[28px] font-medium text-[#47D36F]">
          Master the Markets:
        </p>
        <h2 className="text-[40px] leading-[48px] font-bold">
          Learn the Art of <br /> Trading in Minutes
        </h2>
        <p className="text-[16px] leading-[26px] text-[#A0A8B5]">
          Watch this quick guide to learn how you can trade
          <br />
          {"like a pro, even if you're a beginner!"}
        </p>
        <Button link="/signup" caret>
          Register
        </Button>
      </div>
    </section>
  );
}
