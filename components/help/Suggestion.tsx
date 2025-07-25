import React, { useState } from "react";
import SuggestionForm from "./SuggestionForm";

const Suggestion = () => {
  const [form, setForm] = useState<boolean>(false);
  return (
    <div className="px-8 pt-6 w-full h-full space-y-12 overflow-y-auto custom-scrollbar">
      {!form ? (
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-base text-center">
              Recommend a new feature
            </h4>
            <p className="text-white/60 text-sm font-light text-center">
              Send us your suggestions for adding cool and convenient features
              to the referral program. We will review them and implement the
              most interesting ones.
            </p>
          </div>
          <button
            onClick={() => setForm(true)}
            className="bg-primary px-6 py-3 flex items-center justify-center rounded-xl text-black text-sm font-semibold hover:bg-gradient-to-tr  from-primary to-[#b4e6b8] cursor-pointer"
          >
            Recommend a feature
          </button>
          <div className="space-y-2">
            <h4 className="font-semibold text-base text-center">
              Latest Suggestion
            </h4>
            <p className="text-white/60 text-sm font-light text-center">
              Take a look at the existing suggestions. You can vote for those
              you like, or don&apos;t
            </p>
          </div>
        </div>
      ) : (
        <SuggestionForm />
      )}
    </div>
  );
};

export default Suggestion;
