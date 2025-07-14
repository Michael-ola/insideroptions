"use client";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SharedButton } from "@/components/shared-button";
import Image from "next/image";
import hexDeco from "@/lib/assets/hex_deco.png";
import { PasswordResetConfirmation } from "@/components/confirmations/password-reset";
import React, { useState } from "react";
import { RiArrowRightSLine, RiLoader4Line } from "@remixicon/react";
import { useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { getErrorMessage, passwordResetSchema } from "@/lib/authUtils";
import { toast } from "react-toastify";

export default function PasswordResetContent() {
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  const [sentConfirmation, setSentConfirmation] = useState<boolean>(false);
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof passwordResetSchema>) => {
    try {
      console.log("data ", data);
      const url = `/auth/reset-password`;
      const form = {
        password: data.password,
        passwordResetCode: code,
      };
      await apiClient.put(url, form);
      setSentConfirmation(true);
    } catch (error) {
      const err = getErrorMessage(error);
      toast.error(err);
      console.log(error);
    }
  };
  return (
    <section className="bg-secondary relative z-0 h-screen overflow-hidden">
      <section className="h-screen bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20 grid place-items-center px-4">
        <section className="z-10 w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5">
          <form
            className="space-y-2 max-w-[442px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {!sentConfirmation ? (
              <>
                <div className="flex items-center gap-3">
                  <h3 className="font-medium text-3xl md:text-4xl">
                    Please enter you new password
                  </h3>
                </div>

                <div className="h-[424px] flex flex-col justify-center space-y-6">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      className="mt-2"
                      placeholder="Password"
                      type="password"
                      {...form.register("password")}
                      hasError={!!form.formState.errors.password}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Repeat Password</Label>
                    <Input
                      type="password"
                      className="mt-2"
                      placeholder="Password"
                      {...form.register("confirmPassword")}
                      hasError={!!form.formState.errors.confirmPassword}
                    />
                  </div>
                  <SharedButton
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    {form.formState.isSubmitting && (
                      <RiLoader4Line className="size-5 mr-2 animate-spin" />
                    )}{" "}
                    Submit
                    {!form.formState.isSubmitting && (
                      <RiArrowRightSLine className="h-4 w-4" />
                    )}
                  </SharedButton>
                </div>
              </>
            ) : null}
            {sentConfirmation ? <PasswordResetConfirmation /> : null}
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
