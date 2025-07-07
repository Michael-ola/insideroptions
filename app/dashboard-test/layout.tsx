// app/dashboard-test/layout.tsx
import { DM_Sans } from "next/font/google";
import "./../globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export default function DashboardTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
