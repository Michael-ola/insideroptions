import React from "react";

export default function Loader({
  dashboard,
  className,
}: {
  dashboard?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${
        dashboard ? "fixed inset-0 z-60 bg-black/60 w-screen !h-[100dvh]" : ""
      } ${className}`}
    >
      <div
        className={`w-28 h-28 ${
          dashboard ? "!w-10 !h-10" : ""
        } border-6 border-t-transparent border-primary rounded-full animate-spin`}
      ></div>
    </div>
  );
}
