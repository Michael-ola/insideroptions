import Image, { StaticImageData } from "next/image";
import React from "react";
import suggest from "@/lib/assets/suggest_icon.png";
import support from "@/lib/assets/support_icon.png";
import faq from "@/lib/assets/faq_icon.png";
import regulation from "@/lib/assets/regulation_icon.png";

export interface HelpList {
  label: "Support" | "FAQ" | "Suggestions" | "Regulations";
  icon: StaticImageData;
}

interface Props {
  handleViewChange: (view: string) => void;
  setIconOrImage: React.Dispatch<
    React.SetStateAction<StaticImageData | string>
  >;
}

export const helpOptions: HelpList[] = [
  { label: "Support", icon: support },
  { label: "FAQ", icon: faq },
  { label: "Suggestions", icon: suggest },
  { label: "Regulations", icon: regulation },
];

const HelpList = ({ handleViewChange, setIconOrImage }: Props) => {
  return (
    <div className="space-y-6">
      {helpOptions.map(({ label, icon }) => (
        <div
          key={label}
          className="flex items-center px-6 gap-3 cursor-pointer text-gray-400 hover:text-primary"
          onClick={() => {
            setIconOrImage(icon);
            handleViewChange(label as string);
            return;
          }}
        >
          <Image src={icon} alt="label" />
          <span className="text-sm">{label}</span>
        </div>
      ))}
    </div>
  );
};

export default HelpList;
