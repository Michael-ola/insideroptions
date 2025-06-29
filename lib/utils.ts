import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const focusInput = "focus:border-primary";

export const focusRing =
  "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary dark:outline-primary";

export const hasErrorInput =
  "ring-2 border-red-500 dark:border-red-700 ring-red-200 dark:ring-red-700/30";

export const navItems = [
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
      { label: "About Us", href: "/company/about" },
      { label: "Contact Us", href: "/company/contact" },
      { label: "Terms & Conditions", href: "/company/terms-and-conditions" },
      { label: "Payment Policy", href: "/company/payment-policy" },
      { label: "Return Policy", href: "/company/return-policy" },
      { label: "Privacy Policy", href: "/company/privacy-policy" },
      { label: "AML & KYC", href: "/company/aml-and-kyc" },
      {
        label: "Referral Program Terms & Conditions",
        href: "/company/referral-program-terms-and-conditions",
      },
      {
        label: "Regulatory Environment",
        href: "/company/regulatory-environment",
      },
    ],
  },
];
