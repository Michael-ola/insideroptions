import React from "react";
import ModalHeader from "@/components/ModalHeader";
import Button from "@/components/Button2";
import { useState } from "react";

const NINModal = ({ setModal }: { setModal: (val: string) => void }) => {
  const [nin, setNin] = useState("");

  const isValidNin = /^\d{11,}$/.test(nin);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setNin(input);
    }
  };

  const verifyClicked = () => {
    console.log("NIN submitted:", nin);
    setModal("");
  };

  return (
    <div className="w-full h-full">
      <ModalHeader title="Verify Account" onClose={() => setModal("")} />

      <div className="pt-[98px] h-full w-full flex flex-col items-center px-6">
        <h1 className="text-white text-center text-lg font-medium mb-10">
          Kindly provide your NIN number
        </h1>

        <div className="w-full max-w-sm">
          <label className="text-white text-sm mb-2 block" htmlFor="nin">
            Your NIN
          </label>
          <input
            id="nin"
            type="text"
            inputMode="numeric"
            value={nin}
            onChange={handleChange}
            placeholder="Enter your NIN"
            className="w-full px-4 py-3 rounded-lg bg-transparent border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <Button
            disabled={!isValidNin}
            onClick={verifyClicked}
            className={`mt-10 w-full py-3 rounded-lg text-sm font-medium transition ${
              !isValidNin
                ? "!bg-white/10 text-white opacity-40 !cursor-not-allowed hover:bg-gradient-to-r hover:from-[white/10] hover:to-[white/10]"
                : ""
            }`}
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NINModal;
