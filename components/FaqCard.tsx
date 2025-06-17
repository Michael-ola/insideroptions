// components/FaqCard.tsx
import React from "react";

export default function FaqCard({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <div className="bg-[#0B0F1A]/30 border border-white/10 rounded-[8px] p-6 md:p-10 text-white/80">
      <h3 className="text-[#79DA7E] text-lg md:text-xl font-semibold mb-4">
        {question}
      </h3>
      <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">
        {answer}
      </p>
    </div>
  );
}
