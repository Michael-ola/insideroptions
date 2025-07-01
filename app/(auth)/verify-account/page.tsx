"use client";
import { SharedButton, buttonVariants } from "@/components/shared-button";
import hexDeco from "@/lib/assets/hex_deco.png";
import Image from "next/image";
import featuredIcon from "@/lib/assets/featured_icon.png";
import { RiArrowRightSLine, RiErrorWarningFill } from "@remixicon/react";
import { InputOTP, InputOTPSlot } from "@/components/input-otp";
import React, { Suspense } from "react";
import { LegalAgreementConfirmation } from "@/components/confirmations/legal-agreement";
import { useSearchParams } from "next/navigation";
import { LegalAgreementPayload } from "@/lib/models";
import { EMPTY_STRING } from "@/lib/constants";

const VerifyAccountPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccountContent />
    </Suspense>
  );
}
export default VerifyAccountPage;

const VerifyAccountContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || EMPTY_STRING;
  const [hasLegalAgreement, setHasLegalAgreement] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [otpError, setOtpError] = React.useState<string | null>(null);
  const [payload, setPayload] = React.useState<LegalAgreementPayload>({
    email: email,
    otp: otp,
    legalAgreement: hasLegalAgreement,
  });

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (otpError) setOtpError(null);
  };

  const handleNext = () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit code.");
      return;
    }
    setHasLegalAgreement(true);
    setPayload((prev: LegalAgreementPayload) => ({
      ...prev,
      email,
      otp,
      legalAgreement: false,
    }));
  };

  const handleResend = () => {
    // Logic to resend the email verification code
  };

  const handleAgree = () => {
    setPayload(prev => {
      const updated = { ...prev, email, legalAgreement: true };
      console.log("User has agreed to the terms.", updated);
      return updated;
    });
    console.log(`User has agreed to the terms:`, payload);
    
    // Logic to handle agreement confirmation
    // console.log("User has agreed to the terms.", payload);
  };

  return (
    <section className="z-0 bg-secondary relative min-h-screen overflow-hidden pb-8 bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20">
      <section className="h-full grid place-items-center px-4 py-10">
        <section className="z-10 w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5 mt-24">
          {!hasLegalAgreement ? (
            <div className="grid place-content-center space-y-8 mt-9">
              <div className="h-[124px] w-[124px] rounded-full grid place-content-center mx-auto">
                <Image src={featuredIcon} alt="send" />
              </div>
              <p className="text-lg text-center font-medium">
                A 6-digit verification code has been sent to {email}
              </p>
              <div className="grid place-content-center">
                <InputOTP maxLength={6} value={otp} onChange={handleOtpChange}>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTP>
                {otpError && (
                  <span className="text-red-500 text-sm mt-2 block text-center">{otpError}</span>
                )}
              </div>

              <div className="bg-primary/5 p-6 rounded-lg">
                <p className="font-thin flex items-center text-lg leading-none mb-3">
                  <RiErrorWarningFill className="text-primary mr-3" />
                  Didn’t receive the mail?
                </p>
                <ul className="list-disc list-inside font-thin text-lg">
                  <li>Make sure you&apos;ve entered your email correctly.</li>
                  <li>Check your spam folder.</li>
                  <li>
                    Make sure the email isn&apos;t blocked by firewalls or
                    filters.
                  </li>
                </ul>
              </div>
              <div className="max-w-[395px] mx-auto space-y-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className={buttonVariants({ className: "w-full" })}
                >
                  Confirm
                  <RiArrowRightSLine className="h-4 w-4" />
                </button>
                <SharedButton
                  type="button"
                  className="w-full"
                  variant={"ghost"}
                  onClick={handleResend}
                >
                  Resend email in 60s
                </SharedButton>
              </div>
            </div>
          ) : null}
          {hasLegalAgreement ? (
            <>
              <h3 className="font-semibold text-3xl text-center">
                Legal Documents
              </h3>
              <LegalAgreementConfirmation
                onBack={() => setHasLegalAgreement(false)}
                onAgree={handleAgree}
              />
            </>
          ) : null}
        </section>
      </section>

      <Image
        src={hexDeco}
        height={190}
        width={190}
        alt="Hexagonal Decoration"
        className="absolute inset-0 left-[13%] top-[25%]"
      />
      <Image
        src={hexDeco}
        height={220}
        width={220}
        alt="Hexagonal Decoration"
        className="absolute inset-0 left-[78%] top-[60%]"
      />
      <Image
        src={hexDeco}
        height={150}
        width={150}
        alt="Hexagonal Decoration"
        className="absolute inset-0 left-[5%] top-[90%]"
      />
    </section>
  );
}
