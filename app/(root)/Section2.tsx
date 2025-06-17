import React from "react";
import Image from "next/image";

const devices = [
  {
    icon: "/images/icon-android.png",
    title: "Android",
    subtitle: "4.4 and higher",
  },
  {
    icon: "/images/icon-ios.png",
    title: "iOS",
    subtitle: "8.2 and higher",
  },
  {
    icon: "/images/icon-windows.png",
    title: "Windows",
    subtitle: "7 and higher",
  },
  {
    icon: "/images/icon-macos.png",
    title: "MacOS",
    subtitle: "Mavericks and higher",
  },
];

const Section2 = () => {
  return (
    <section className="relative py-20 pb-30 bg-[#0b131a] text-center">
      <h2 className="text-white text-3xl  mb-16">
        For All <span className="text-green-400 font-semibold">Devices</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {devices.map((device, idx) => (
          <DeviceCard
            key={idx}
            icon={device.icon}
            title={device.title}
            subtitle={device.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

function DeviceCard({
  icon,
  title,
  subtitle,
}: {
  icon: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-4 max-sm:gap-6 justify-center bg-white/5 border border-white/10 rounded-xl p-6 w-[282px] max-sm:w-[80%] h-[148px] backdrop-blur-sm">
      <Image
        src={icon}
        alt={`${title} icon`}
        width={48}
        height={48}
        className="w-10 h-10 object-contain"
      />
      <div className="flex flex-col text-left">
        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export default Section2;
