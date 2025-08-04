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
import DownlineTickets from "./DownlineTickets";
import TicketConversation from "./TicketConversation";
import ConfirmModal from "../ConfirmationModal";
import SearchStructure from "./SearchStructure";
import PortalWrapper from "../PortalWrapper";

export default function AssetManagerModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const { switchAssetManagerModal, setSwitchAssetManagerModal } =
    useDashboardContext();
  const [confirmCloseTicket, setConfirmCloseTicket] = useState<boolean>(false);
  const [view, setView] = useState<string>("Asset Manager");
  const [iconOrImage, setIconOrImage] = useState<StaticImageData | string>("");

  const handleViewChange = (nextView: string) => setView(nextView);
  const handleCloseTicket = () => {
    console.log("Ticket Closed");
    handleViewChange("Downline Tickets");
  };
  const renderView = () => {
    switch (true) {
      case view === "Asset Manager":
        return <Welcome handleViewChange={handleViewChange} />;
      case view === "Logging Downline Complains":
        return <DownlineComplains handleViewChange={handleViewChange} />;
      case view === "Downline Tickets":
        return <DownlineTickets handleViewChange={handleViewChange} />;
      case view.startsWith("#"):
        return (
          <TicketConversation openConfirm={() => setConfirmCloseTicket(true)} />
        );
      case view.startsWith(" "):
        return <SearchStructure handleViewChange={handleViewChange} />;

      default:
        return null;
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
              setSwitchAssetManagerModal(false);
            }}
            handleViewChange={handleViewChange}
          >
            {renderView()}
          </InnerModalWrapper>
        </AnimatePresence>
      </motion.div>

      {confirmCloseTicket && (
        <PortalWrapper>
          <ConfirmModal
            onCancel={() => setConfirmCloseTicket(false)}
            onConfirm={handleCloseTicket}
            title="Close Ticket"
            message="Are you sure you want to close this Ticket?"
          />
        </PortalWrapper>
      )}
    </div>
  );
}
