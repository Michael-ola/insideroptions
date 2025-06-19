import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  {
    label: "Trading",
    submenu: [
      { label: "Features", href: "/trading/features" },
      { label: "FAQ", href: "/trading/faq" },
    ],
  },
  {
    label: "Company",
    submenu: [
      { label: "About", href: "/company/about" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];

export default function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: isOpen ? 0 : "-100%" }}
      exit={{ x: "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 z-70 bg-black/90 backdrop-blur-3xl text-white flex flex-col px-6 pt-6 pb-10"
    >
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose}>
          <Image src="/images/close.png" alt="Close" width={24} height={24} />
        </button>
      </div>

      {/* Centered logo */}
      <div className="flex justify-center mb-8">
        <Image
          src="/images/logo-extended.png"
          alt="InsiderOption Logo"
          width={140}
          height={32}
        />
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col items-start gap-4">
        {navItems.map((item, idx) => (
          <div key={idx} className="w-full">
            {item.submenu ? (
              <>
                <div
                  onClick={() =>
                    setExpanded(expanded === item.label ? null : item.label)
                  }
                  className="cursor-pointer font-semibold py-2 px-4 w-full rounded-md hover:bg-white/10"
                >
                  {item.label}
                </div>
                {expanded === item.label && (
                  <div className="pl-10 flex flex-col text-sm text-white/80 space-y-2">
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
                className="block py-2 px-4 font-semibold rounded-md hover:bg-white/10"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Logos */}
      <div className="flex justify-center items-center gap-6 flex-wrap mt-10">
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
