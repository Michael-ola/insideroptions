import Image from "next/image";
import Button from "@/components/Button2";

export default function PaymentMethods() {
  const payments = [
    { name: "Visa", src: "/images/Visa.png" },
    { name: "Mastercard", src: "/images/Mastercard.png" },
    { name: "Maestro", src: "/images/Maestro.png" },
    { name: "Binance Pay", src: "/images/binance.png" },
    { name: "Skrill", src: "/images/Skrill.png" },
    { name: "Crypto", src: "/images/crypto.png" },
  ];
  return (
    <section className="bg-[#050B11] py-28 max-sm:pb-8 px-8 lg:px-32 text-white text-center max-sm:pt-15 max-sm:px-[5%]">
      <p className=" text-[#C1C7D0] mb-8">Payment methods</p>

      <div className="flex justify-center flex-wrap gap-6 max-md:gap-4 max-md:justify-center">
        {payments.map((method) => (
          <div
            key={method.name}
            className={`bg-[#101820] rounded-xl p-6 w-[150px] h-[90px] flex items-center justify-center max-sm:w-[177px]`}
          >
            <Image
              src={method.src}
              alt={method.name}
              width={64}
              height={40}
              className={`object-contain w-[64px] h-[40px] ${
                method.name == "Binance Pay" && "scale-y-150"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 bg-transparent mt-[10%] max-w-5xl w-full mx-4 md:mx-auto rounded-[20px]  flex flex-row items-center justify-between max-sm:flex-col max-sm:max-w-full max-sm:mx-0 max-sm:mt-15">
        {/* Left Image with Gradient Fade */}
        <div className="bg-[#10131a] rounded-xl absolute left-0 right-0 bottom-0  h-[80%] backdrop-blur-sm border border-[#99e39e1a] z-0 max-sm:h-[34%] max-sm:z-20"></div>
        <div
          className="absolute top-[43%] left-[14%] -translate-y-1/2 pointer-events-none z-1 max-sm:top-[20%]"
          style={{
            width: "250px",
            height: "220px",
            background: "rgba(153, 227, 158, 0.25)",
            borderRadius: "50% / 60%",
            filter: "blur(90px)",
          }}
        />

        <div
          className="absolute top-[25%] left-[7%] -translate-y-1/2 pointer-events-none z-1 max-sm:top-[10%]"
          style={{
            width: "700px",
            height: "400px",
            background:
              "radial-gradient(ellipse at center, rgba(153, 227, 158, 0.08) 0%, transparent 60%)",
            filter: "blur(90px)",
          }}
        />
        <div className="w-1/2 relative flex justify-center items-center max-sm:w-[70%]">
          <div className="relative z-10">
            <Image
              src="/images/trader.png"
              alt="Successful Trader"
              width={400}
              height={400}
              className="object-contain w-[400px] h-auto max-sm:w-[500px]"
            />
          </div>
        </div>

        {/* Right Text and Button */}
        <div className="w-full pr-[8%] max-sm:pr-0 md:w-1/2 text-center md:text-left flex flex-col items-center md:items-end relative z-30 self-end mb-[7%] gap-6 max-sm:gap-2">
          <h2 className="text-white text-3xl md:text-5xl font-semibold text-right leading-snug md:leading-[1.2] max-sm:hidden">
            Join Millions of <br />
            <div className="text-end">Successful </div>
            <div>Traders Today</div>
          </h2>

          <h2 className="text-white text-xl font-semibold text-center leading-8 sm:hidden">
            <div>Join Millions of Successful</div>
            <div>Traders Today</div>
          </h2>

          <Button link="/signup" caret className="mt-6 max-sm:mt-3">
            Register
          </Button>
        </div>
        {/* Floating Logo */}

        <div className="absolute bottom-[-50px] max-sm:bottom-auto max-sm:top-[33%] max-sm:-right-[32%] max-sm:z-30  w-full flex items-center justify-center">
          <Image
            src="/images/logo-highlight.png"
            alt="logo"
            width={90}
            height={90}
            className="animate-up-down w-[90px] h-[90px]"
          />
        </div>
      </div>
    </section>
  );
}
