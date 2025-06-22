"use client";
import Image from "next/image";
import Link from "next/link";
import hexDeco from "@/lib/assets/hex_deco.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { SharedButton } from "@/components/shared-button";
import React from "react";
import { EmailSentConfirmation } from "@/components/confirmations/email-sent";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const [sentConfirmation, setSentConfirmation] = React.useState(true);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data ", data);
    setSentConfirmation(true);
  };
  return (
    <section className="z-0 bg-secondary relative h-screen overflow-hidden">
      <section className="z-10 h-screen bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20 grid place-items-center px-4">
        <section className="w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5">
          <form
            className="space-y-2 max-w-[442px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3">
              <Link href="/login">
                <RiArrowLeftSLine className="h-4 w-4" />
              </Link>
              <h3 className="font-medium text-lg">Forgot Password</h3>
            </div>
            {!sentConfirmation ? (
              <div className="h-[424px] grid place-content-center space-y-6">
                <p className="text-lg">
                  Please enter the email address you used to register the
                  account and we will send you a link to reset your password.
                </p>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="mt-2"
                    placeholder="Enter your email"
                    {...form.register("email")}
                    hasError={!!form.formState.errors.email}
                  />
                </div>
                <SharedButton
                  type="submit"
                  disabled={
                    form.formState.isSubmitting || !form.formState.isValid
                  }
                  className="mt-4"
                >
                  Reset Password
                  <RiArrowRightSLine className="h-4 w-4" />
                </SharedButton>
              </div>
            ) : null}
            {sentConfirmation ? (
              <EmailSentConfirmation email={form.getValues("email")} />
            ) : null}
          </form>
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
