"use client";
import { SharedButton, buttonVariants } from "@/components/shared-button";
import Link from "next/link";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";
import { signUpSchema, registerTrader, getErrorMessage } from "@/lib/authUtils";
import hexDeco from "@/lib/assets/hex_deco.png";
import Image from "next/image";
import { RiArrowRightSLine, RiLoader4Line } from "@remixicon/react";
import { Divider } from "@/components/divider";
import { Checkbox } from "@/components/checkbox";
import { SubmitHandler } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useRouter } from "next/navigation";
import { countries, EMPTY_STRING } from "@/lib/constants";
import SocialLogin from "@/components/SocialLogin";


export default function SignupPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange", // enables real-time validation
  });

  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(countries[1]?.value || EMPTY_STRING);
  // const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    form.setValue("country", selectedCountry);
  }, [selectedCountry, form]);

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (data) => {
    // setSubmitted(true);
    registerTrader(data)
      .then((response: any) => {
        setErrorBanner(null);
        console.log("Registration response:", response);
        // Redirect to the next step or dashboard
        router.replace(`/verify-account?email=${response.email}`);
      })
      .catch((error) => {
        setErrorBanner(getErrorMessage(error));
        // setSubmitted(false);
      });
  };

  return (
    <section className="z-0 bg-secondary relative min-h-screen overflow-hidden pb-8 bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20">
      <section className="grid place-items-center px-4 py-10">
        {/* @Todo: Move Error Banner to a different component */}
        {/* <ErrorBanner message={errorBanner} onClose={() => setErrorBanner(null)} /> */}
        {/* Error Banner */}
        {errorBanner && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
            <div className="w-full max-w-[792px] mt-24 pointer-events-auto">
              <div className="flex flex-col rounded-lg bg-red-600 shadow-2xl px-6 py-4">
                <div className="flex items-center">
                  <span className="mr-3">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#fff" fillOpacity="0.25" />
                      <path d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-semibold text-white text-base flex-1">{errorBanner}</span>
                  <button
                    onClick={() => setErrorBanner(null)}
                    className="ml-4 text-white text-2xl hover:text-red-200 cursor-pointer"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <span className="text-white text-xs mt-1 opacity-90">
                  Perhaps you signed up with a social account?
                </span>
              </div>
            </div>
          </div>
        )}
        <section className="z-10 w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5 mt-24">
          <form
            className="space-y-6 max-w-[442px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 max-w-[442px] mx-auto">
              <SharedButton
                size="sm"
                type="button"
                variant={"default"}
                className="flex-1"
              >
                Register
              </SharedButton>
              <Link
                href={"/login"}
                className={buttonVariants({
                  size: "sm",
                  variant: "outline",
                  className: "flex-1",
                })}
              >
                Login
              </Link>
            </div>
            <h2 className="max-w-[550px] font-medium text-3xl">
              Join 3M+ Traders Today!
            </h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="lastName">Legal Surname</Label>
                  <Input
                    id="lastName"
                    className="mt-2"
                    placeholder="Legal surname"
                    hasError={!!form.formState.errors.lastName}
                    {...form.register("lastName")}
                  />
                  {form.formState.errors.lastName && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.lastName.message}
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="firstName">Legal First Name</Label>
                  <Input
                    id="firstName"
                    className="mt-2"
                    hasError={!!form.formState.errors.firstName}
                    placeholder="Legal first name"
                    {...form.register("firstName")}
                  />
                  {form.formState.errors.firstName && (
                    <span className="text-red-500 text-xs">
                      {form.formState.errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="mt-2"
                  placeholder="Email"
                  hasError={!!form.formState.errors.email}
                  type="email"
                  autoComplete="email"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="mt-2"
                  placeholder="Password"
                  hasError={!!form.formState.errors.password}
                  type="password"
                  autoComplete="new-password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <span className="text-red-500 text-xs">
                    {form.formState.errors.password.message}
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="country" className="sr-only">
                  Country of residence
                </Label>
                <Select
                  value={selectedCountry}
                  onValueChange={(val) => {
                    setSelectedCountry(val);
                    form.setValue("country", val);
                  }}
                  disabled={true}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="refererCode">Referral</Label>
                <Input
                  id="refererCode"
                  className="mt-2"
                  placeholder="Referral's Code"
                  hasError={!!form.formState.errors.refererCode}
                  {...form.register("refererCode")}
                />
                <span className="text-text-secondary text-sm inline-block mt-2">
                  (Note: If you were invited by other user, you should specify
                  here the email address of his/her account otherwise leave
                  blank)
                </span>
              </div>

              {/* <div>
                <Label htmlFor="am">Asset Manager (AM)</Label>
                <Input
                  id="referral"
                  className="mt-2"
                  hasError={!!form.formState.errors.am}
                  placeholder="Asset Manager Email"
                  {...form.register("am")}
                />
                <span className="text-text-secondary text-sm inline-block mt-2">
                  (It is required if you already have an AM otherwise leave
                  blank)
                </span>
              </div> */}

              <div className="flex items-center gap-4">
                <Checkbox id="terms"
                  hasError={!!form.formState.errors.terms}
                  checked={!!form.watch("terms")}
                  onCheckedChange={(checked) => {
                    form.setValue("terms", !!checked, { shouldValidate: true });
                  }}
                />
                <Label
                  htmlFor="terms"
                  className="text-text-secondary text-xs font-normal"
                >
                  By creating an account, you confirm you are 18+ and understand
                  we may send you updates and marketing materials (see Security
                  and privacy policy). Unsubscribe in your account settings
                  anytime. By signing up, you agree to our terms and conditions.
                </Label>
              </div>

              <div className="flex items-center gap-4">
                <Checkbox id="isUS" />
                <Label
                  htmlFor="isUS"
                  {...form.register("isUS")}
                  className="text-text-secondary text-xs font-normal"
                >
                  I am not a USA resident
                </Label>
              </div>
            </div>

            <SharedButton type="submit" className="w-full"
              withGradient={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && form.formState.isValid && (
                <RiLoader4Line className="size-5 mr-2 animate-spin" />
              )}
              Continue <RiArrowRightSLine className="h-4 w-4" />
            </SharedButton>

            <Divider>Or continue with</Divider>
            <div className="flex items-center justify-center gap-5">
              <SocialLogin />
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
