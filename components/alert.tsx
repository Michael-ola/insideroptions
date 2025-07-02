import { RiErrorWarningLine } from "@remixicon/react";
import { cn } from "@/lib/authUtils";
import { cva, type VariantProps } from "class-variance-authority";

const alertStyle = cva("p-6 rounded-md", {
  variants: {
    type: {
      info: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    },
  },
});
type Props = {
  title: string;
  desc?: string;
  type?: "info" | "success" | "warning" | "error";
};

export function Alert(
  props: React.ComponentProps<"div"> & Props & VariantProps<typeof alertStyle>
) {
  const { className, desc, type = "info", ...rest } = props;

  return (
    <div className={cn(alertStyle({ type }), className)} {...rest}>
      <RiErrorWarningLine className="text-lg" />
      <span>{desc}</span>
    </div>
  );
}
