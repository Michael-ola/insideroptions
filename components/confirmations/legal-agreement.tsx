"use client";
import Link from "next/link";
import { buttonVariants } from "../shared-button";
import { RiArrowLeftSLine } from "@remixicon/react";
import { SharedButton } from "../shared-button";

export function LegalAgreementConfirmation({
  onBack,
  onAgree,
  disabled = false,
}: {
  onBack?: () => void;
  onAgree: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="h-[424px] space-y-14 mt-9 py-10 flex flex-col">
      <div className="flex-1 space-y-6 max-w-[500px] mx-auto">
        <p className="text-lg font-thin">
          I, Prince John, hereby confirm that I have read, understood and agree
          to the following:
        </p>
        <Link className="font-bold text-primary"
          href={"/company/terms-and-conditions"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms of Business
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-[500px] mx-auto">
        <button
          type="button"
          onClick={onBack}
          disabled={disabled}
          className={buttonVariants({
            className: "flex-1 border-primary! text-primary w-full",
            variant: "outline",
          })}
        >
          <RiArrowLeftSLine />
          Back
        </button>
        <SharedButton type="button"
          className="flex-1 w-full"
          onClick={onAgree}
          disabled={disabled}
        >
          I Agree
        </SharedButton>
      </div>
    </div>
  );
}
