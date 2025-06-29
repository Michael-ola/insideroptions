import React from "react";
import Image from "next/image";
import Breadcrumb from "@/components/BreadcrumbUI";

interface propTypes {
  title: string;
  breadcrumbList: { label: string; href?: string }[];
  className?: string;
  company?: boolean;
}
const PageHeader = ({
  title,
  breadcrumbList,
  className,
  company,
}: propTypes) => {
  return (
    <section
      className={`relative bg-gradient-to-tr from-[#0E151C] from-50% to-transparent px-[7%] py-12 max-sm:top-12 flex flex-col justify-center gap-4 max-sm:py-[7%] ${className}`}
    >
      {company ? (
        <Image
          src={`/images/blur.png`}
          width={1200}
          height={500}
          alt="..."
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image
          src={`/images/dots3.png`}
          width={320}
          height={500}
          alt="..."
          className="absolute top-0 right-0 max-sm:w-[272px] max-sm:h-auto"
        />
      )}
      <h1 className="text-white text-3xl font-bold">{title}</h1>
      <Breadcrumb crumbs={breadcrumbList} />
    </section>
  );
};

export default PageHeader;
