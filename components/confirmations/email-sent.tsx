import Link from "next/link";
import { buttonVariants, Button } from "../button";
import { RiArrowLeftSLine } from "@remixicon/react";
import Image from "next/image";
import mailSentIcon from "@/lib/assets/mail-sent-icon.png";

export function EmailSentConfirmation({ email }: { email: string }) {
  return (
    <div className="h-[424px] grid place-content-center space-y-8 mt-9">
      <div className="h-[124px] w-[124px] rounded-full grid place-content-center mx-auto">
        <Image src={mailSentIcon} alt="send" />
      </div>
      <p className="text-lg text-center">
        An email containing a link to reset your password has been sent to
        {email}. Please follow the instructions within the email. If you have
        not received an email, please check your junk or spam folder.
      </p>
      <div className="max-w-[395px] mx-auto space-y-6">
        <Link href="/login" className={buttonVariants({ className: "w-full" })}>
          <RiArrowLeftSLine className="h-4 w-4" />
          Back to Login
        </Link>
        <Button className="w-full" variant={"ghost"}>
          Send Again
        </Button>
      </div>
    </div>
  );
}
