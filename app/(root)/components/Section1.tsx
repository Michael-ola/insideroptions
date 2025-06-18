import React from "react";
import Image from "next/image";
import Button from "@/components/Button2";
import { FaTelegram, FaWhatsapp } from "react-icons/fa";

const Section1 = () => {
  return (
    <section className="relative pb-20 flex max-sm:flex-col bg-[#000510] pt-[10%] max-sm:pt-[30%]">
      <div className="absolute top-[30%] max-sm:top-[50%] right-[8%] z-[1] w-[65%] max-sm:w-[30%] h-[273px] bg-[#99E39E] blur-[1073.97px] max-sm:blur-[250px]"></div>
      <div className="absolute top-[40%] max-sm:top-[50%] right-[15%] z-[2] w-[232px] h-[264px] bg-[#99E39E] blur-[476.71px] max-sm:blur-[276px]"></div>
      <Image
        className="absolute w-[740px] h-[550px] z-[3] right-[9%] -bottom-6"
        width={780}
        height={655}
        src="/images/group-bg.png"
        alt="img"
      />
      <div className="w-1/2 max-sm:w-full pl-[7%] text-white">
        <div className="max-w-xl w-full space-y-6 text-left">
          <p className="text-5xl font-[400] leading-tight max-sm:text-3xl max-sm:leading-snug">
            Trade Smarter
            <br />
            Win Better
            <br />
            <span className="font-bold">With In-Built AI</span>
          </p>

          <p className="text-gray-300 text-base max-sm:text-sm max-sm:leading-relaxed">
            Providing you with the opportunity to invest
            <br className="max-sm:hidden" />
            in more than 100 assets for continuous income
          </p>

          <SocialIcons />

          <Button link="/register" caret>
            Register
          </Button>

          <OfficialChannels />
        </div>
      </div>
      <div className="relative w-1/2 max-sm:w-[90%] max-sm:ml-[5%] max-sm:mt-[15%] overflow-x-clip max-sm:h-[520px]">
        <Image
          className=" absolute left-0 my-auto z-10 h-[520px]  w-[290px] max-sm:w-[240px] animate-up-down"
          width={332}
          height={679}
          src="/images/phone1.png"
          alt="img"
        />
        <Image
          className="absolute left-[19%] top-5 z-10 w-[461px] h-[650px] animate-down-up"
          width={461}
          height={650}
          src="/images/phone2.png"
          alt="img"
        />
      </div>
    </section>
  );
};

const SocialIcons = () => {
  const list = [
    "/images/Facebook.png",
    "/images/Amazon WC.png",
    "/images/Google WC.png",
    "/images/Telegram.png",
    "/images/Uber.png",
    "/images/Apple WC.png",
  ];
  return (
    <div className="flex flex-wrap items-center">
      {list.map((src, id) => (
        <Image
          key={id}
          className={`${id > 0 ? "-ml-2" : ""}`}
          width={38}
          height={38}
          src={src}
          alt="icon"
        />
      ))}

      <div className="ml-6 px-4 py-1 h-[48px] w-[140px] rounded-full bg-[#1d292b] text-white text-center flex gap-1 items-center justify-center">
        <span className="font-semibold">+100</span>assets
      </div>
    </div>
  );
};

export const OfficialChannels = () => (
  <div className="flex items-center gap-4 mt-6">
    <span className="text-white font-bold">Join our official channels</span>
    <FaWhatsapp className="text-green-400 w-10 h-10" />
    <FaTelegram className="text-blue-400 w-10 h-10" />
  </div>
);

export default Section1;
