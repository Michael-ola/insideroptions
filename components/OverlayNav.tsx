import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import React from "react";
import { navItems } from "@/lib/constants";

export default function MobileNav({
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-70 bg-black/50 backdrop-blur-[10px] min-h-screen text-white flex flex-col px-6 pt-6 pb-10"
    >
      {/* Centered logo */}
      <Link href="/">
        <div className="flex items-center justify-center cursor-pointer">
          <Image
            width={186}
            height={32}
            src="/images/logo-extended.png"
            alt="Insider Options"
            className="w-[186px] h-[32px]"
          />
        </div>
      </Link>
      <div className="nav-bottom-line mt-6 w-full"></div>
      <div className="w-screen mt-[3%] ml-[10%] max-sm:mx-auto max-sm:mt-[10%]">
        <div className="flex justify-between items-center w-[250px] max-sm:w-[90%] pl-8 py-4 rounded-[12px] mb-4 bg-white/10">
          <button
            onClick={onClose}
            className={`cursor-pointer ${expanded && "max-sm:hidden"}`}
          >
            <Image src="/images/close.png" alt="Close" width={18} height={18} />
          </button>
          <button
            onClick={() => setExpanded(null)}
            className={`sm:hidden cursor-pointer ${!expanded && "hidden"}`}
          >
            <Image src="/images/left.png" alt="Close" width={18} height={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div
          className={`flex-1 flex flex-col w-[250px] max-sm:w-[90%] items-start bg-white/10 pt-10 pb-25  ${
            expanded && "max-sm:pt-0 max-sm:bg-transparent"
          } rounded-[14px]`}
        >
          {navItems.map((item, idx) => (
            <React.Fragment key={idx}>
              {expanded === item.label && (
                <div className="flex-1 flex flex-col w-[250px] max-sm:w-full sm:hidden items-start bg-white/10 pt-10 pb-10 rounded-[14px]">
                  {item.submenu?.map((sub, i) => (
                    <Link
                      key={i}
                      href={sub.href}
                      onClick={onClose}
                      className="cursor-pointer font-semibold py-2 pl-8 w-full hover:bg-white/10 "
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className={`w-full relative ${expanded && "max-sm:hidden"}`}>
                {item.submenu ? (
                  <>
                    <div
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className={`cursor-pointer font-semibold py-2 pl-8 w-full hover:bg-white/10 ${
                        expanded === item.label
                          ? "border-r border-[#79DA7E]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </div>
                    {expanded === item.label && (
                      <div
                        className={`max-sm:hidden absolute -top-10 left-[100%] w-[140%] pl-10 flex flex-col text-sm text-white/80 space-y-2 ${
                          expanded === "Company" && "-top-20"
                        }`}
                      >
                        {item.submenu.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={onClose}
                            className="hover:underline"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-2 pl-8 font-semibold hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer Logos */}
      <div className="flex justify-center items-center gap-6 self-center flex-wrap mt-auto">
        {[
          "/images/_mastercard.png",
          "/images/_visa.png",
          "/images/pcidss-white.png",
          "/images/digicerf.png",
        ].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`footer-logo-${i}`}
            width={60}
            height={24}
          />
        ))}
      </div>
    </motion.div>
  );
}
