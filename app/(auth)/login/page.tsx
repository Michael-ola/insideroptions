"use client";
import { SharedButton, buttonVariants } from "@/components/shared-button";
import hexDeco from "@/lib/assets/hex_deco.png";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RiArrowRightSLine, RiLoader4Line } from "@remixicon/react";
import { Divider } from "@/components/divider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/SocialLogin";
import { getErrorMessage, loginSchema, loginTrader } from "@/lib/authUtils";
import { toast } from "react-toastify";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await loginTrader(data);
      data.email = "";
      data.password = "";
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      const err = getErrorMessage(error);
      toast.error(err);
      form.setError("email", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };

  return (
    <section className="z-0 bg-secondary relative h-screen overflow-hidden pt-8">
      <section className="h-screen bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20 grid place-items-center px-4">
        <section className="z-10 w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5">
          <form
            className="space-y-6 max-w-[442px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3">
              <Link
                href={"/signup"}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className: "flex-1",
                })}
              >
                Register
              </Link>
              <SharedButton
                type="button"
                size="sm"
                variant={"default"}
                className="flex-1"
              >
                Login
              </SharedButton>
            </div>

            <h2 className="font-medium text-2xl md:text-[28px]">
              Welcome Back!
            </h2>

            <div className="px-3 space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="mt-2"
                  placeholder="Email"
                  {...form.register("email")}
                  hasError={!!form.formState.errors.email}
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  className="mt-2"
                  placeholder="Password"
                  {...form.register("password")}
                  type="password"
                  hasError={!!form.formState.errors.password}
                />
                {form.formState.errors.password && (
                  <>
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.password.message}
                    </span>
                    <br />
                  </>
                )}
                <Link
                  href="/forgot-password"
                  className="text-text-secondary text-sm font-medium inline-block"
                >
                  Forgot password?
                </Link>
              </div>
              <SharedButton
                withGradient={form.formState.isSubmitting}
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <RiLoader4Line className="size-5 mr-2 animate-spin" />
                ) : null}
                Login{" "}
                {form.formState.isSubmitting ? null : (
                  <RiArrowRightSLine className="h-4 w-4" />
                )}
              </SharedButton>
              <Divider>Or continue with</Divider>
              <div className="flex items-center justify-center gap-5">
                <SocialLogin />
              </div>
            </div>
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
