import { LockKeyhole } from "lucide-react";
export default function CashierButton() {
  return (
    <button className="bg-[#79DA7E] h-[70%] ml-3 max-sm:ml-0 text-black px-3 py-1 rounded-xl font-medium text-xs flex items-center gap-2">
      MY CASHIER
      <LockKeyhole className="w-3 h-5 max-sm:hidden" />
    </button>
  );
}
