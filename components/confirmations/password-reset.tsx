import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../button";

export function PasswordResetConfirmation() {
  return (
    <div className="h-[424px] space-y-14 mt-9">
      <div className="h-[124px] w-[124px] rounded-full grid place-content-center mx-auto bg-gray-100">
        <Image src={""} alt="send" />
      </div>
      <p className="text-lg text-center">
        Congratulations, your password has been changed
      </p>
      <div className="mx-auto space-y-6">
        <Link href="/login" className={buttonVariants({ className: "w-full" })}>
          Login
        </Link>
      </div>
    </div>
  );
}
