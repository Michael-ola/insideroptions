"use client";

import { ChevronRight, LucideMessageCircleMore, Mail } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";
import { apiClient } from "@/lib/api-client";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/authUtils";
import { RiLoader4Line } from "@remixicon/react";
import { ContactUsFormData } from "@/lib/models";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    reset,
  } = useForm<ContactUsFormData>();

  const onSubmit = async (data: ContactUsFormData) => {
    const url = ('/devops/contact-us')
    try {
      setIsSubmitting(true);
      if (!data.recaptchaToken) {
        setError("recaptchaToken", {
          type: "manual",
          message: "Please complete the reCAPTCHA",
        });
        setIsSubmitting(false);
        return;
      }
      await apiClient.post(url, data);
      toast.success("Submission Successful!");
      setIsSubmitting(false);
      reset();
      recaptchaRef.current?.reset();
    } catch (error) {
      console.log(error);
      const err = getErrorMessage(error);
      toast.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#070c17] pt-[5%]">
      <section className="px-3 sm:px-16 py-20 bg-[#070c17] text-white">
        <div className="max-w-7xl mx-auto bg-[#070c17] px-16 flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 md:space-y-12">
            <h2 className="sm:text-5xl text-2xl font-medium text-center sm:text-left sm:font-semibold">
              Contact Us
            </h2>
            <div className="py-6 flex flex-row items-center justify-center gap-6 sm:flex-col sm:items-start">
              <div className="flex items-center gap-3 text-sm text-white whitespace-nowrap">
                <LucideMessageCircleMore className="text-[#79DA7E]" />
                <span>Live chat</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white">
                <Mail className="text-[#79DA7E]" /> <span>help@eo.support</span>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="md:w-2/3 bg-[#0d121c] p-6 text-sm border border-gray-50/15 rounded-xl"
          >
            <div className="flex flex-col sm:flex-row gap-12">
              <div className="w-full space-y-8">
                {/* First Name */}
                <div>
                  <label className="block mb-1">First name</label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                    type="text"
                    placeholder="First name"
                    className={`w-full bg-transparent border px-3 py-2 rounded-xl outline-none ${
                      errors.firstName ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block mb-1">Last name</label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                    type="text"
                    placeholder="Last name"
                    className={`w-full bg-transparent border px-3 py-2 rounded-xl outline-none ${
                      errors.lastName ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-1">Email</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className={`w-full bg-transparent border px-3 py-2 rounded-xl outline-none ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-1">Phone number</label>
                  <input
                    {...register("phoneNumber")}
                    type="tel"
                    placeholder="Phone number"
                    className="w-full bg-transparent border border-gray-700 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="w-full space-y-8">
                {/* Message */}
                <div>
                  <label className="block mb-1">Message</label>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    placeholder="Enter your message"
                    rows={6}
                    className={`w-full bg-transparent border px-3 py-2 rounded-xl outline-none ${
                      errors.message ? "border-red-500" : "border-gray-700"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* reCAPTCHA */}
                <div className="scale-[0.75] origin-top-left sm:scale-100 mx-auto">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
                    onChange={(token) => {
                      if (token) {
                        clearErrors("recaptchaToken");
                        setValue("recaptchaToken", token);
                      }
                    }}
                    ref={recaptchaRef}
                  />
                  {errors.recaptchaToken && (
                    <p className="text-red-500 text-xs mt-1 text-center">
                      {errors.recaptchaToken.message}
                    </p>
                  )}
                </div>

                <input
                  type="hidden"
                  {...register("recaptchaToken", {
                    required: "Please complete the reCAPTCHA",
                  })}
                />

                <div className="flex items-start">
                  <button
                    type="submit"
                    className={`text-center px-10 py-3 rounded-xl text-[#545c5c] bg-[#74d67f] font-medium text-sm transition-opacity flex items-center justify-center gap-3 ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "text-black cursor-pointer"
                    }`}
                  >
                    {isSubmitting && (
                      <RiLoader4Line className="size-5 mr-2 animate-spin" />
                    )}
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 sm:px-16 py-18 bg-[#00050f]">
        <div className="mx-auto p-16 max-w-7xl">
          <div className="bg-gradient-to-r from-[#070d17] to-[#0d121c] bg-no-repeat flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center p-6 sm:p-13 border-1 border-gray-50/15 rounded-xl">
            <h3 className="w-full whitespace-nowrap text-white text-lg md:text-xl font-medium">
              Frequently Asked Questions
            </h3>
            <Link
              href="/trading/faq"
              className="bg-[#79DA7E] text-black px-6 py-3 rounded-md text-sm flex items-center gap-3"
            >
              <span className="whitespace-nowrap">View All</span>
              <ChevronRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
