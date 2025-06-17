import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/BreadcrumbUI";

interface propTypes {
  title: string;
  breadcrumbList: { label: string; href: string }[];
  className?: string;
}
const PageHeader = ({ title, breadcrumbList, className }: propTypes) => {
  return (
    <div
      className={`relative bg-[#070c17] px-[7%] py-[3%] max-sm:top-12 max-sm:py-[7%] ${className}`}
    >
      <Image
        src={`/images/dots3.png`}
        width={320}
        height={500}
        alt="..."
        className="absolute top-0 right-0 max-sm:w-[272px] max-sm:h-auto"
      />
      <h1 className="text-white text-3xl font-bold mb-4">{title}</h1>
      <Breadcrumb crumbs={breadcrumbList} />
    </div>
  );
};

export default PageHeader;
