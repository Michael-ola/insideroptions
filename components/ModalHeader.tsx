// components/ModalHeader.tsx
import Image from "next/image";
import { X } from "lucide-react";

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  showLeftIcon?: boolean;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  onClose,
  className,
}) => {
  return (
    <div
      className={`${
        title === "Profile"
          ? "max-sm:bg-gradient-to-r from-[#00040d] to-[#13171f]"
          : ""
      } absolute inset-x-0 px-6 top-0 flex justify-between items-center max-sm:py-5 mb-4 ${className}`}
    >
      <button onClick={onClose}>
        {title === "Profile" ? (
          <></>
        ) : (
          <Image
            src="/images/left.png"
            alt="Left Arrow"
            width={5}
            height={5}
            className="w-2 h-[14px] text-white"
          />
        )}
      </button>
      <h2 className="text-lg font-semibold cursor-default">{title}</h2>
      <X className="text-white cursor-pointer" onClick={onClose} />
    </div>
  );
};

export default ModalHeader;
