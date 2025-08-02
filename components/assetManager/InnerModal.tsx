"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDashboardContext } from "@/context/DashboardContext";
import ModalWrapper from "./modalWrapper";
import Welcome from "./Welcome";

export default function AssetManagerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { switchAssetManagerModal } = useDashboardContext();
  const [view, setView] = useState<string>("Asset Manager");

  const handleViewChange = (nextView: string) => setView(nextView);
  const renderView = () => {
    switch (view) {
      case "Asset Manager":
        return <Welcome handleViewChange={handleViewChange} />;
    }
  };
  return (
    <div className={`${switchAssetManagerModal ? "block" : "hidden"}`}>
      <motion.div layout>
        <AnimatePresence>
          <ModalWrapper
            title={view}
            onClose={() => {
              onClose();
            }}
            handleViewChange={handleViewChange}
          >
            {renderView()}
          </ModalWrapper>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
