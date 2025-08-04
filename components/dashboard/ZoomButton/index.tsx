import React from "react";
import Image from "next/image";

const ZoomButton = () => {
  return (
    <button className="fixed z-50 bottom-[6%] right-[8%] rounded-xl p-2 bg-[#081118] max-sm:hidden">
      <Image
        className="text-white"
        src="/images/zoom-button.png"
        width={22}
        height={22}
        alt="Zoom"
      />
    </button>
  );
};

export default ZoomButton;
