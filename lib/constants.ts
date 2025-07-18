import mck1 from "./assets/feat-mockup00.png";
import mck2 from "./assets/feat-mockup01.png";
import mck3 from "./assets/feat-mockup02.png";

export const BASE_URL = "https://insider-option-api.onrender.com/api/v1";

export const EMPTY_STRING = "";

export const focusInput = "focus:border-primary";

export const focusRing =
  "outline outline-offset-2 outline-0 focus-visible:outline-2 outline-primary dark:outline-primary";

export const hasErrorInput =
  "ring-2 border-red-500 dark:border-red-700 ring-red-200 dark:ring-red-700/30";

export const AUTH_API_URL = `${BASE_URL}/auth`;

export const featuresLists = [
  {
    title: "Auto Trade AI Intelligence mode",
    desc: "Let AI handle your trades. It picks top-performing assets, opens smart deals based on technical analysis, and adapts to any risk level. Try it with a $10,000 demo account and earn up to 0.8% daily profit on your real balance.",
    img: mck1,
  },
  {
    title: "Technical analysis tools",
    desc: "Enjoy the convenience of accessing your accounts anytime, anywhere through our secure online banking platform. Check balances, transfer funds, and pay bills with ease.",
    img: mck2,
  },
  {
    title: "All your markets in one place",
    desc: "Trade the most popular currency pairs with high leverage, tight spreads, and fast execution. Over 100 assets including popular stocks like Apple, Facebook etc.",
    img: mck3,
  },
];

export const navLinks = [
  {
    title: "Home",
    links: [
      // { name: "Free demo", href: "" },
      { name: "Login", href: "/login" },
      { name: "Register", href: "/signup" },
    ],
  },
  {
    title: "Trading",
    links: [
      { name: "Features", href: "/trading/features" },
      // { name: "Social trading", href: "" },
      { name: "FAQs", href: "/trading/faq" },
    ],
  },
  {
    title: "Education",
    links: [
      // { name: "Glossary", href: "" },
      // { name: "Technical Analysis", href: "" },
      // { name: "Graphical analysis", href: "" },
      // { name: "Fundamental analysis", href:""},
      // { name: "Psychology of trading", href:"" },
      // { name: "Trading strategies", href: "" },
      // { name: "Webinars", href: "" },
      // { name: "Tutorials", href: "" },
    ],
  },
  {
    title: "Other Pages",
    links: [
      { name: "About company", href: "/company/about" },
      { name: "Terms and Conditions", href: "/company/terms-and-conditions" },
      { name: "Payment Policy", href: "/company/payment-policy" },
      { name: "Return Policy", href: "/company/return-policy" },
      { name: "Privacy Policy", href: "/company/privacy-policy" },
      { name: "AML & KYC", href: "/company/aml-and-kyc" },
      {
        name: "Referral Program Terms & Conditions",
        href: "/company/referral-program-terms-and-conditions",
      },
    ],
  },
];

export const countries = [
  { value: "Select your country", label: "Select your country" },
  { value: "Nigeria", label: "Nigeria" },
];

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
    ],
  },
];

export const breadcrumbList = [
  { label: "Home", href: "/" },
  { label: "Company" },
  { label: "AML & KYC", href: "/company/aml-and-kyc" },
];

// List of auth endpoints to exclude from interceptors
// This is used to prevent attaching auth tokens to these requests
export const AUTH_ENDPOINTS = [
  "/auth/login",
  "/auth/register",
  "/auth/password-recovery",
  "/auth/verify-email",
  "/auth/refresh-token",
  "/devops/contact-us",
  // Add more as needed
];

export const EXCLUDEFROMNAV_ENDPOINTS = [
  "/login",
  "/signup",
  "/reset-password",
  "/verify-account",
  "password-reset",
];

export const stats = [
  {
    value: "120M+",
    label: "Monthly deals",
  },
  {
    value: "3M+",
    label: "Customers world wide",
  },
  {
    value: "$1M+",
    label: "Monthly volume",
  },
  {
    value: "2021",
    label: "Established since",
  },
];
