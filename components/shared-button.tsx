import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap cursor-pointer font-medium",
    "border border-transparent transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:bg-text-secondary/50 disabled:text-text-secondary/50",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-top-right text-secondary from-primary-btn-gradient-start to-primary-btn-gradient-end text-base leading-none",
        sm: "bg-primary text-secondary text-sm hover:opacity-90",
        outline: "border-white/6 bg-transparent hover:opacity-90",
        secondary: "",
        ghost: "text-primary hover:opacity-90",
      },
      size: {
        sm: "p-3 h-11 rounded-md",
        default: "p-4 h-14 rounded-xl",
        bulky: "",
        lg: "",
      },
      withGradient: {
        true: "bg-top-right from-primary-btn-gradient-start to-primary-btn-gradient-end",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export function SharedButton(
  props: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & { asChild?: boolean }
) {
  const { className, asChild, variant, size, ...arg } = props;
  const BtnComp = asChild ? Slot : "button";

  return (
    <BtnComp
      className={cn(buttonVariants({ variant, size, className }), className)}
      {...arg}
    />
  );
}
