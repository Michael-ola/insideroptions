"use client";

import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();


  const socialIcons = ["IG", "FB", "X", "TEL", "TIKTOK"];

  return (
    <footer className="bg-[#050B11] text-white py-16  px-4 lg:px-20">
      <div className="border-t border-b border-[#1B242D] py-12 flex flex-col lg:flex-row gap-12 justify-between">
        <div className="max-w-xl">
          <Link href="/">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo-extended.png"
                alt="Logo"
                width={182}
                height={32}
                className="w-[182px] h-[32px]"
              />
            </div>
          </Link>
          <p className="text-sm text-[#B3B8C1]">
            The Company does not provide services to citizens and/or residents
            of Australia, Austria, Belarus, Belgium, Bulgaria, Canada, Croatia,
            Republic of Cyprus, Czech Republic, Denmark, Estonia, Finland,
            France, Germany, Greece, Hungary, Iceland, Iran, Ireland, Israel,
            Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Myanmar,
            Netherlands, New Zealand, North Korea, Norway, Poland, Portugal,
            Puerto Rico, Romania, Russia, Singapore, Slovakia, Slovenia, South
            Sudan, Spain, Sudan, Sweden, Switzerland, UK, Ukraine, the USA,
            Yemen.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {navLinks.map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold mb-3 text-white/90">{title}</h4>
              <ul className="space-y-1">
                {links.map(({name,href}) => (
                  <li key={name}>
                    <Link
                      href={href}
                      className="text-[#B3B8C1] hover:text-white transition"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="md:flex justify-between gap-12">
        <div className="text-sm text-[#B3B8C1] py-8 space-y-6 flex-1 max-w-4xl">
          <p>
            InsiderOption LLC is partners with Multi-Regulated across African &
            Europe.{" "}
            <Link href="#" className="text-white font-medium">
              ABOUT US
            </Link>
          </p>

          <p>
            Trading and investing involves significant level of risk and is not
            suitable and/or appropriate for all clients. Please make sure you
            carefully consider your investment objectives, level of experience
            and risk appetite before buying, selling or using Auto Trades using
            Artificial system.{" "}
            <span className="font-semibold text-white">TERMS & CONDITION</span>,
            Buying or selling entails financial risks and could result in a
            partial or complete loss of your funds, therefore, you should not
            invest funds you cannot afford to lose. You should be aware of and
            fully understand all the risks associated with trading and
            investing, and seek advice from an independent financial advisor if
            you have any doubts. You are granted limited non–exclusive rights to
            use the IP contained in this site for personal, non–commercial,
            non–transferable use only in relation to the services offered on the
            site.
          </p>

          <p>
            Since InsiderOption LLC & its partners is not under the supervision
            of the JAPAN FINANCIAL SERVICES AGENCY (JFSA), it is not involved
            with any acts considered to be offering financial products and
            solicitation for financial services to Japan and this website is not
            aimed at residents in Japan.
          </p>

          <p>
            Insider Option LLC, Company, having its registered address at First
            Floor, SVG Teachers Credit Union Uptown Building, Corner of James
            and Middle Street, Kingstown P.O., St Vincent and the Grenadines
          </p>
        </div>

        <div className="flex flex-col  items-start max-sm:items-center justify-center py-8 gap-16 w-full md:w-auto">
          <p className="text-sm text-[#B3B8C1] text-center md:text-left">
            ©2021–{currentYear} InsiderOption LLC.{" "}
            <br className="block md:hidden" />
            All rights reserved
          </p>
          {/* Social Icons needs reworking - should be replaced with icons from a library or custom SVGs */}
          <div className="flex gap-4 justify-center md:justify-end">
            {socialIcons.map((icon) => (
              <Link href="#" key={icon}  className="rounded-full transition-all hover:bg-[#7FCC88]">
                <Image
                  src={`/images/${icon}.png`}
                  alt={icon}
                  width={38}
                  height={38}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
