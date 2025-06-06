"use client";
import { Button, buttonVariants } from "@/components/Button1";
import Link from "next/link";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import hexDeco from "@/lib/assets/hex_deco.png";
import Image from "next/image";
import { RiArrowRightSLine } from "@remixicon/react";
import { Divider } from "@/components/divider";
import appleLogo from "@/lib/assets/apple_icon.png";
import googleLogo from "@/lib/assets/google_logo_logos_icon.png";
import facebookLogo from "@/lib/assets/facebook_logo_icon.png";
import { Checkbox } from "@/components/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { useRouter } from "next/navigation";

const country = [
  {
    value: "living-area",
    label: "Living area",
  },
  {
    value: "shopping-area",
    label: "Shopping area",
  },
  {
    value: "business-park",
    label: "Business park",
  },
];

const schema = z.object({
  surname: z.string().min(1, "Surname is required").trim(),
  firstName: z.string().min(1, "First name is required").trim(),
  email: z.string().email("Invalid email address").trim(),
  country: z.string().min(1, "Country is required").trim(),
  referral: z.string().trim().optional(),
  am: z.string().email("Invalid email address").optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  isUS: z.boolean().default(false).optional(),
});

export default function SignupPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log("data", data);
    router.replace(`/verify-account?email=${data.email}`);
  };

  return (
    <section className="z-0 bg-secondary relative min-h-screen overflow-hidden pb-8 bg-gradient-to-t from-bg-gradient-start/20 to-bg-gradient-end/20">
      <section className=" grid place-items-center px-4 py-10">
        <section className="z-10 w-full max-w-[792px] rounded-2xl p-5 py-12 bg-gradient-to-b from-bg-card-gradient-end/5 to-bg-card-gradient-start/5 text-white border-2 border-white/5">
          <form
            className="space-y-6 max-w-[442px] mx-auto"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-3 max-w-[442px] mx-auto">
              <Button size="sm" variant={"default"} className="flex-1">
                Register
              </Button>
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
                  <Label htmlFor="surname">Legal Surname</Label>
                  <Input
                    id="surname"
                    className="mt-2"
                    placeholder="Legal surname"
                    hasError={!!form.formState.errors.surname}
                    {...form.register("surname")}
                  />
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
              </div>
              <div>
                <Label htmlFor="country" className="sr-only">
                  Country of residence
                </Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {country.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="referral">Referral</Label>
                <Input
                  id="referral"
                  className="mt-2"
                  placeholder="Referral's link"
                  hasError={!!form.formState.errors.referral}
                  {...form.register("referral")}
                />
                <span className="text-text-secondary text-sm inline-block mt-2">
                  (Note: If you were invited by other user, you should specify
                  here the email address of his/her account otherwise leave
                  blank)
                </span>
              </div>

              <div>
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
              </div>

              <div className="flex items-center gap-4">
                <Checkbox id="terms" />
                <Label
                  htmlFor="terms"
                  className="text-text-secondary text-xs font-normal"
                  {...form.register("terms")}
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

            <Button type="submit" className="w-full">
              Continue <RiArrowRightSLine className="h-4 w-4" />
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
