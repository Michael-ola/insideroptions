"use client";

import { useState } from "react";
import ModalWrapper from "../modalWrapper";
import { StaticImageData } from "next/image";
import PartnerTab from "./PartnerTab";

const PartnerModal = ({ onClose }: { onClose: () => void }) => {
  const [view, setView] = useState<string>("Partner");
  const [canBack, setCanBack] = useState<boolean>(false);
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");
  const viewMap: Record<string, string> = {
    "Page 2": "Page 1",
  };
   const [newView, setNewView] = useState<string>("Page 1");
    const handleNewView = (nextView: string) => setNewView(nextView);

  const handleViewChange = (nextView: string) => setView(nextView);

  function handleBackNavigationForPartner() {
    const previousView = viewMap[view] || "Page 1";
    handleNewView(previousView);
  }

  const renderView = () => {
    switch (view) {
      case "Partner":
        return <PartnerTab setCanBack={setCanBack} handleNewView={handleNewView} newView={newView} />;
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
      canBack={canBack}
      handleBackNavigationForPartner={handleBackNavigationForPartner}
    >
      {renderView()}
    </ModalWrapper>
  );
};

export default PartnerModal;
