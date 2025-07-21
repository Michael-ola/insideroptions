import Image from "next/image";
export default function UserMenu() {
  return (
    <div className="w-10 h-10 ml-4 rounded-full bg-[#335E35]/20 flex items-center justify-center max-sm:hidden cursor-pointer">
      <Image
        src="/images/user.png"
        width={18}
        height={18}
        className="text-white w-6 h-6"
        alt="User"
      />
    </div>
  );
}
