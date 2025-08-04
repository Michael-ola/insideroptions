import React from "react";
import { TicketDetails } from "@/data/assetManager/Tickets";

export default function DownlineTickets({
  handleViewChange,
}: {
  handleViewChange: (val: string) => void;
}) {
  return (
    <div className="w-full max-w-[80%] mx-auto mt-6 h-[60%] max-h-[60%] flex flex-col bg-[#79DA7E]/10 border border-white/5 rounded-xl">
      <h3 className="text-center py-3 text-primary border-b border-primary/20">
        Ticket details
      </h3>
      <div className="w-full h-full overflow-x-auto overflow-y-auto custom-scrollbar py-1">
        <table className="w-full text-sm">
          <thead className="text-left text-white/60">
            <tr>
              {[
                "Support ID",
                "Subject",
                "Date Logged",
                "Support Reply (Nos)",
                "Status",
                "Action",
              ].map((header) => (
                <td
                  key={header}
                  className="py-2 px-4 font-semibold text-white/60"
                >
                  {header}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {TicketDetails ? (
              TicketDetails.map((ref, idx) => (
                <tr key={idx} className="hover:bg-white/5 cursor-pointer">
                  <td className="py-2 px-4">{ref.supportId}</td>
                  <td className="py-2 px-4">{ref.subject}</td>
                  <td className="py-2 px-4">{ref.dateLogged}</td>
                  <td className="py-2 px-4">{ref.supportReplyCount}</td>

                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs ${
                        ref.status === "Open" ? "text-primary" : "text-red-500"
                      }`}
                    >
                      {ref.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() =>
                        handleViewChange(`#${ref.supportId} - ${ref.subject}`)
                      }
                      className="bg-primary hover:bg-primary/20 text-black px-4 py-2 rounded-md text-xs"
                    >
                      View Ticket
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div>Check back later</div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
