"use client";

import { useRef, useState } from "react";
import ModalWrapper from "../modalWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { StaticImageData } from "next/image";
import HelpList from "./HelpList";
import Support from "./Support";
import Faq from "./Faq";
import Suggestion from "./Suggestion";
import ConfirmModal from "../ConfirmationModal";
import { SuggestionFormRef } from "./SuggestionForm";
import Regulations from "./Regulations";
import PortalWrapper from "../PortalWrapper";

export default function HelpModal({ onClose }: { onClose: () => void }) {
  const [view, setView] = useState<string>("Help");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");
  const [isClear, setIsClear] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const handleViewChange = (nextView: string) => setView(nextView);

  const suggestionFormRef = useRef<SuggestionFormRef>(null);

  const triggerClear = () => {
    suggestionFormRef.current?.clearForm();
  };

  const triggerConfirm = () => {
    suggestionFormRef.current?.confirmForm();
  };

  const renderView = () => {
    switch (view) {
      case "Help":
        return (
          <HelpList
            handleViewChange={handleViewChange}
            setIconOrImage={setIconOrImage}
          />
        );
      case "Support":
        return <Support />;
      case "FAQ":
        return <Faq />;
      case "Suggestions":
        return (
          <Suggestion
            ref={suggestionFormRef}
            setIsClear={setIsClear}
            setIsConfirm={setIsConfirm}
          />
        );
      case "Regulations":
        return <Regulations />;
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

      {isClear && (
        <PortalWrapper>
          <ConfirmModal
            onCancel={() => setIsClear(false)}
            onConfirm={triggerClear}
            title="Close Deal"
            message="Are you sure you want to clear the Suggestion?"
          />
        </PortalWrapper>
      )}
      {isConfirm && (
        <PortalWrapper>
          <ConfirmModal
            onCancel={() => setIsConfirm(false)}
            onConfirm={triggerConfirm}
            title="Confirm submission"
            message="Are you sure you want to submit the Suggestion?"
          />
        </PortalWrapper>
      )}
    </div>
  );
}
