"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { StaticImageData } from "next/image";
import PartnerTab from "./PartnerTab";

const PartnerModal = ({ onClose }: { onClose: () => void }) => {
  const [view, setView] = useState<string>("Partner");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");

  const handleViewChange = (nextView: string) => setView(nextView);
  const renderView = () => {
    switch (view) {
      case "Partner":
        return <PartnerTab />;
      default:
        return null;
    }
  };
  return (
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
  );
};

export default PartnerModal;
