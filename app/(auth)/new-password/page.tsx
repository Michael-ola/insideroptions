"use client";
import { Input } from "@/components/input";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/button";
import Image from "next/image";
import hexDeco from "@/lib/assets/hex_deco.png";
import { PasswordResetConfirmation } from "@/components/confirmations/password-reset";
import React from "react";
import { RiArrowRightSLine } from "@remixicon/react";

const schema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .trim(),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters")
      .trim(),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function NewPasswordPage() {
  const [sentConfirmation, setSentConfirmation] = React.useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data ", data);
    // Handle password reset logic here
    setSentConfirmation(true);
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
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full"
                  >
                    Submit
                    <RiArrowRightSLine className="h-4 w-4" />
                  </Button>
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
