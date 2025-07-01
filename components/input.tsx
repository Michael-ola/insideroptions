import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { focusInput, focusRing, hasErrorInput } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { RiEye2Line, RiEyeOffLine, RiSearchLine } from "@remixicon/react";

const inputStyle = cva(
  [
    "relative block w-full appearance-none rounded-md border px-2.5 py-2 shadow-xs outline-hidden transition sm:text-sm",
    "border-white/6",
    "text-white",
    "placeholder-gray-400",
    "bg-transparent",
    "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
    [
      "file:-my-2 file:-ml-2.5 file:cursor-pointer file:rounded-l-[5px] file:rounded-r-none file:border-0 file:px-3 file:py-2 file:outline-hidden focus:outline-hidden disabled:pointer-events-none file:disabled:pointer-events-none",
      "file:border-solid file:border-gray-300 file:bg-gray-50 file:text-gray-500 file:hover:bg-gray-100",
      "file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]",
      "file:disabled:bg-gray-100 file:disabled:text-gray-500",
    ],
    focusInput,
    "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
  ],
  {
    variants: {
      hasError: {
        true: hasErrorInput,
      },
      enableStepper: {
        false:
          "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      },
    },
  }
);

export function Input({
  className,
  type,
  hasError = false,
  enableStepper = true,
  inputClassname,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputStyle> & { inputClassname?: string }) {
  const [typeState, setTypeState] = React.useState(type);
  const isPassword = type === "password";
  const isSearch = type === "search";

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type={isPassword ? typeState : type}
        className={cn(
          inputStyle({ hasError, enableStepper }),
          {
            "pl-8": isSearch,
            "pr-10": isPassword,
          },
          inputClassname
        )}
        {...props}
      />
      {isSearch && (
        <div
          className={cn(
            "pointer-events-none absolute bottom-0 left-2 flex h-full items-center justify-center",
            "text-gray-400 dark:text-gray-600"
          )}
        >
          <RiSearchLine
            className="size-[1.125rem] shrink-0"
            aria-hidden="true"
          />
        </div>
      )}
      {isPassword && (
        <div
          className={cn(
            "absolute bottom-0 right-0 flex h-full items-center justify-center px-3"
          )}
        >
          <button
            aria-label="Change password visibility"
            className={cn(
              "h-fit w-fit rounded-xs outline-hidden transition-all",
              "text-gray-400 dark:text-gray-600",
              "hover:text-gray-500 dark:hover:text-gray-500",
              focusRing
            )}
            type="button"
            onClick={() => {
              setTypeState(typeState === "password" ? "text" : "password");
            }}
          >
            <span className="sr-only">
              {typeState === "password" ? "Show password" : "Hide password"}
            </span>
            {typeState === "password" ? (
              <RiEye2Line aria-hidden="true" className="size-5 shrink-0" />
            ) : (
              <RiEyeOffLine aria-hidden="true" className="size-5 shrink-0" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
