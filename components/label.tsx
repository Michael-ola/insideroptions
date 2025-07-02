import React from "react";
import * as LabelPrimitives from "@radix-ui/react-label";
import { cn } from "@/lib/authUtils";

interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitives.Root> {
  disabled?: boolean;
}

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitives.Root>,
  LabelProps
>(({ className, disabled, ...props }, forwardedRef) => (
  <LabelPrimitives.Root
    ref={forwardedRef}
    className={cn(
      "text-base font-medium leading-none",
      "text-neutral",
      {
        "text-neutral/50": disabled,
      },
      className
    )}
    aria-disabled={disabled}
    {...props}
  />
));

Label.displayName = "Label";

export { Label };
