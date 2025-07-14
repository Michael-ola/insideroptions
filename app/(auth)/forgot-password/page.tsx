"use client";
import Image from "next/image";
import Link from "next/link";
import hexDeco from "@/lib/assets/hex_deco.png";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiLoader4Line,
} from "@remixicon/react";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { SharedButton } from "@/components/shared-button";
import React, { useState } from "react";
import { EmailSentConfirmation } from "@/components/confirmations/email-sent";
import { getErrorMessage } from "@/lib/authUtils";
import { apiClient } from "@/lib/api-client";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgotPasswordPage() {
  const [sentConfirmation, setSentConfirmation] = useState<boolean>(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      console.log("data ", data);
      const url = `/auth/password-recovery-mail/${data.email}`;
      await apiClient.post(url);
      setSentConfirmation(true);
    } catch (error) {
      const err = getErrorMessage(error);
      toast.error(err);
      console.log(error);
    }
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
                  {form.formState.isSubmitting && (
                    <RiLoader4Line className="size-5 mr-2 animate-spin" />
                  )}{" "}
                  Reset Password
                  {!form.formState.isSubmitting && (
                    <RiArrowRightSLine className="h-4 w-4" />
                  )}
                </SharedButton>
              </div>
            ) : null}
            {sentConfirmation ? (
              <EmailSentConfirmation
                email={form.getValues("email")}
                onSubmit={form.handleSubmit(onSubmit)}
                isSubmitting={form.formState.isSubmitting}
              />
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
