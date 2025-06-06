import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const Button = ({
  children,
  link,
  className,
  caret,
}: {
  children: ReactNode;
  link: string;
  className?: string;
  caret?: boolean;
}) => {
  return (
    <Link href={link}>
      <button
        className={`flex items-center justify-center cursor-pointer gap-4 bg-[#99E39E] text-black w-[148px] h-[44px] rounded-[12px] font-semibold transition-all duration-300 hover:bg-gradient-to-r hover:from-[#99E39E] hover:to-[#b3ffb8] ${className}`}
      >
        {children}
        {caret ? (
          <Image
            width={7.36}
            height={12.73}
            src="/images/right-caret.png"
            alt=">"
          />
        ) : (
          <></>
        )}
      </button>
    </Link>
  );
};

export default Button;
