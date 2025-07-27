"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import CI from "./CI";


export default function AutoTradeModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<string>("Current Investment");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");

  const handleViewChange = (nextView: string) => setView(nextView);

  const renderView = () => {
    switch (view) {
      case "Current Investment":
    return <CI />;
      default:
        return null;
    }
  };

  return (
    <div>
      <motion.div layout>
        <AnimatePresence>
          <ModalWrapper
            title={view}
            icon={iconOrImage}
            onClose={() => {
              onClose();
            }}
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          >
            {renderView()}
          </ModalWrapper>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
