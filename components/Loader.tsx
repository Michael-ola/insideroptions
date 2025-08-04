import React from "react";

export default function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-28 h-28 border-6 border-t-transparent border-primary rounded-full animate-spin"></div>
    </div>
  );
}
