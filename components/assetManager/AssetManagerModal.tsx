"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import AssetManager from "./index";
import { useDashboardContext } from "@/context/DashboardContext";
import InnerModalWrapper from "./modalWrapper";
import Welcome from "./Welcome";
import DownlineComplains from "./DownlineComplain";

export default function AssetManagerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { switchAssetManagerModal } = useDashboardContext();
  const [view, setView] = useState<string>("Asset Manager");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");

  const handleViewChange = (nextView: string) => setView(nextView);
  const renderView = () => {
    switch (view) {
      case "Asset Manager":
        return <Welcome handleViewChange={handleViewChange} />;
      case "Logging Downline Complains":
        return <DownlineComplains handleViewChange={handleViewChange} />;
    }
  };

  return (
    <div>
      <motion.div
        layout
        className={`${switchAssetManagerModal ? "hidden" : "block"}`}
      >
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
            <AssetManager />
          </ModalWrapper>
        </AnimatePresence>
      </motion.div>

      <motion.div
        layout
        className={`${switchAssetManagerModal ? "block" : "hidden"}`}
      >
        <AnimatePresence>
          <InnerModalWrapper
            title={view}
            onClose={() => {
              onClose();
            }}
            handleViewChange={handleViewChange}
          >
            {renderView()}
          </InnerModalWrapper>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
