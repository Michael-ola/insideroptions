import React from "react";
import * as CheckboxPrimitives from "@radix-ui/react-checkbox";
import { focusRing } from "@/lib/constants";
import { cn } from "@/lib/authUtils";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root> & { hasError?: boolean }
>(({ className, checked, hasError, ...props }, forwardedRef) => {
  return (
    <CheckboxPrimitives.Root
      ref={forwardedRef}
      {...props}
      checked={checked}
      className={cn(
        "relative inline-flex size-4 shrink-0 appearance-none items-center justify-center rounded-sm shadow-xs outline-hidden ring-1 ring-inset transition duration-100 enabled:cursor-pointer",
        "text-white",
        "bg-transparent",
        "ring-gray-300",
        "data-disabled:bg-gray-100 data-disabled:text-gray-400 data-disabled:ring-gray-300",
        "enabled:data-[state=checked]:bg-primary enabled:data-[state=checked]:ring-0 enabled:data-[state=checked]:ring-transparent",
        "enabled:data-[state=indeterminate]:bg-primary enabled:data-[state=indeterminate]:ring-0 enabled:data-[state=indeterminate]:ring-transparent",
        hasError ? "ring-red-500" : "ring-gray-300",
        "data-disabled:bg-gray-100 data-disabled:text-gray-400 data-disabled:ring-gray-300",
        "enabled:data-[state=checked]:bg-primary enabled:data-[state=checked]:ring-0 enabled:data-[state=checked]:ring-transparent",
        "enabled:data-[state=indeterminate]:bg-primary enabled:data-[state=indeterminate]:ring-0 enabled:data-[state=indeterminate]:ring-transparent",
        focusRing,
        className
      )}
    >
      <CheckboxPrimitives.Indicator
        asChild
        className="flex size-full items-center justify-center"
      >
        {checked === "indeterminate" ? (
          <svg
            aria-hidden="true"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              x1="4"
              x2="12"
              y1="8"
              y2="8"
            ></line>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.2 5.59998L6.79999 9.99998L4.79999 7.99998"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
          </svg>
        )}
      </CheckboxPrimitives.Indicator>
    </CheckboxPrimitives.Root>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
