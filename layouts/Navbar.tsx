"use client";

import React, { useState } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button2";
import OverlayNav from "@/components/OverlayNav";
import { AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <Menu onClick={() => setIsMobileMenuOpen(true)} className="w-5 h-5" />
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
        <Link href="/">
          <div
            className={`flex items-center max-sm:hidden cursor-pointer ${
              isMobileMenuOpen ? "hidden" : ""
            }`}
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
        <div className="flex items-center gap-6">
          <Link href="/login">
            <button className="cursor-pointer max-sm:hidden">Login</button>
          </Link>

          <Button link="/signup" caret>
            Register
          </Button>
        </div>
        <div className="nav-bottom-line absolute left-0 right-0 bottom-0 w-full"></div>
      </nav>
    </>
  );
}
