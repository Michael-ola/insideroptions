import { LockKeyhole } from "lucide-react";
export default function CashierButton() {
  return (
    <button className="bg-[#79DA7E] h-full ml-3 max-sm:ml-0 text-black px-3 py-2 rounded-xl font-medium text-md flex items-center gap-2">
      MY CASHIER
      <LockKeyhole className="w-4 h-6 max-sm:hidden" />
    </button>
  );
}
