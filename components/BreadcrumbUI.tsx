"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type BreadcrumbItemProps = {
  href?: string;
  label: string;
  isLast: boolean;
};

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  crumbs: Crumb[];
};

function BreadcrumbItem({ href, label, isLast }: BreadcrumbItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="flex items-center gap-1">
      {href ? (
        <Link
          href={href}
          className={`cursor-pointer text-sm md:text-base ${
            isActive ? "text-[#99E39E] font-medium" : "text-white/70"
          } transition-all`}
        >
          {label}
        </Link>
      ) : (
        <div
          className={`text-sm md:text-base ${
            isActive ? "text-[#99E39E] font-medium" : "text-white/70"
          } transition-all`}
        >
          {label}
        </div>
      )}
      {!isLast && <span className="text-white/30 pl-2">/</span>}
    </div>
  );
}

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <div className="mb-8">
      <div className="flex h-full items-center gap-2">
        {crumbs.map((crumb, index) => {
          return crumb.href ? (
            <BreadcrumbItem
              key={index}
              href={crumb.href}
              label={crumb.label}
              isLast={index === crumbs.length - 1}
            />
          ) : (
            <BreadcrumbItem
              key={index}
              label={crumb.label}
              isLast={index === crumbs.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}
