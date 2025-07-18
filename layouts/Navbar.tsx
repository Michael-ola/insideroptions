"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import hexagon from "@/lib/assets/hex_frame.png";
import years from "@/lib/assets/4years.png";
import line from "@/lib/assets/Line 610.png";
import Button from "@/components/Button2";
import OverlayNav from "@/components/OverlayNav";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { EXCLUDEFROMNAV_ENDPOINTS } from "@/lib/constants";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLogOrReg = EXCLUDEFROMNAV_ENDPOINTS.some((endpoint) =>
    pathname.startsWith(endpoint)
  );

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <OverlayNav
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <nav className="w-full absolute z-50 max-w-screen top-0 bg-[#335E350D] backdrop-blur-[40px] text-white px-[7%] py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Menu
            onClick={() => setIsMobileMenuOpen(true)}
            className="w-5 h-5 cursor-pointer"
          />
          <div className="flex items-center gap-6">
            <Image
              src="/images/uk-flag.png"
              alt="UK Flag"
              width={20}
              height={15}
            />
            <div className="flex gap-2 items-center justify-center">
              <div className="relative">
                <div className="absolute -right-[2px] -top-[3.5px] w-[7.25px] h-[7.25px] rounded-full bg-[#79DA7E]"></div>
                <Image
                  width={20.81}
                  height={17.33}
                  src="/images/messageLogo.png"
                  alt="text"
                />
              </div>
              <span className="text-sm max-sm:hidden">Online chat</span>
            </div>
          </div>
        </div>

        {!isLogOrReg && !isMobileMenuOpen && (
          <div>
            <Link href="/">
              <div
                className={`flex items-center max-sm:hidden cursor-pointer `}
              >
                <Image
                  width={186}
                  height={32}
                  src="/images/logo-extended.png"
                  alt="Insider Options"
                  className="w-[186px] h-[32px]"
                />
              </div>
            </Link>
          </div>
        )}
        <>
          {isLogOrReg ? (
            <div>
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center max-sm:hidden cursor-pointer `}
                >
                  <Image
                    width={186}
                    height={32}
                    src="/images/logo-extended.png"
                    alt="Insider Options"
                    className="w-[186px] h-[32px]"
                  />
                </div>

                <div className={`flex items-center sm:hidden cursor-pointer `}>
                  <Image
                    src={hexagon}
                    alt="Insider Options"
                    className="w-5 h-auto"
                  />
                </div>

                <Image src={line} alt="Line Or Divider" />

                <Image src={years} alt="4 years Logo" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link href="/login">
                <button className="cursor-pointer max-sm:hidden">Login</button>
              </Link>

              <Button link="/signup" caret>
                Register
              </Button>
            </div>
          )}
        </>
        <div className="nav-bottom-line absolute left-0 right-0 bottom-0 w-full"></div>
      </nav>
    </>
  );
}
