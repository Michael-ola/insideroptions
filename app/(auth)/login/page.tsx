"use client";
import { Button, buttonVariants } from "@/components/button";
import hexDeco from "@/lib/assets/hex_deco.png";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { RiArrowRightSLine } from "@remixicon/react";
import { Divider } from "@/components/divider";
import appleLogo from "@/lib/assets/apple_icon.png";
import googleLogo from "@/lib/assets/google_logo_logos_icon.png";
import facebookLogo from "@/lib/assets/facebook_logo_icon.png";
import Link from "next/link";
import AuthenticationService from "@/services/authentication.services";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6).max(100).nonempty("Password is required"),
});

export default function LoginPage() {
  const authService = AuthenticationService.getInstance();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", data);
    authService.login(data);
  };

  return (
    <section className="z-0 bg-secondary relative h-screen overflow-hidden">
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
              <Button size="sm" variant={"default"} className="flex-1">
                Login
              </Button>
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
                <Link
                  href="/forgot-password"
                  className="text-text-secondary text-sm font-medium inline-block"
                >
                  Forgot password?
                </Link>
              </div>
              <Button className="w-full" type="submit">
                Login <RiArrowRightSLine className="h-4 w-4" />
              </Button>
              <Divider>Or continue with</Divider>
              <div className="flex items-center justify-center gap-5">
                <button
                  type="button"
                  className="bg-white rounded-full p-2 h-12 w-12"
                >
                  <Image src={appleLogo} alt="apple" />
                </button>
                <button
                  type="button"
                  className="bg-white rounded-full p-2 h-12 w-12"
                >
                  <Image src={googleLogo} alt="google" />
                </button>
                <button
                  type="button"
                  className="bg-white rounded-full p-2 h-12 w-12"
                >
                  <Image src={facebookLogo} alt="facebook" />
                </button>
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
