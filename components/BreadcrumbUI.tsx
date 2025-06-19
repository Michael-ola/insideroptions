"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbItemProps = {
  href: string;
  label: string;
  isLast: boolean;
};

type Crumb = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

function BreadcrumbItem({ href, label, isLast }: BreadcrumbItemProps) {
  const pathname = usePathname();
  console.log(pathname);
  const isActive = pathname === href;

  return (
    <div className="flex items-center gap-1">
      <Link
        href={href}
        className={`text-sm md:text-base ${
          isActive ? "text-[#99E39E] font-medium" : "text-white/70"
        } transition-all`}
      >
        {label}
      </Link>

      {!isLast && <span className="text-white/30 pl-2">/</span>}
    </div>
  );
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <div className="mb-8">
      <div className="flex h-full items-center gap-2">
        {crumbs.map((crumb, index) => (
          <BreadcrumbItem
            key={crumb.href}
            href={crumb.href}
            label={crumb.label}
            isLast={index === crumbs.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
