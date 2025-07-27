import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

type MyButtonProps = {
  children: ReactNode;
  link?: string;
  caret?: boolean;
  image?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<MyButtonProps> = ({
  children,
  link,
  className,
  caret,
  image,
  ...rest
}) => {
  return link ? (
    <Link href={link}>
      <button
        {...rest}
        className={`flex items-center justify-center cursor-pointer gap-4 bg-[#99E39E] text-black w-[148px] h-[44px] rounded-[12px] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#99E39E] hover:to-[#b3ffb8] ${className}`}
      >
        {children}
        {(caret || image) && (
          <Image
            width={7.36}
            height={12.73}
            src={image || "/images/right-caret.png"}
            alt=">"
          />
        )}
      </button>
    </Link>
  ) : (
    <button
      {...rest}
      className={`flex items-center justify-center cursor-pointer gap-4 bg-[#99E39E] text-black w-[148px] h-[44px] rounded-[12px] transition-all duration-300 hover:bg-gradient-to-r hover:from-[#99E39E] hover:to-[#b3ffb8] ${className}`}
    >
      {children}
      {(caret || image) && (
        <Image
          width={7.36}
          height={12.73}
          src={image || "/images/right-caret.png"}
          alt=">"
        />
      )}
    </button>
  );
};

export default Button;
