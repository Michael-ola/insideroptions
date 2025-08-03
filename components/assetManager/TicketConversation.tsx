"use client";
import Image from "next/image";
import avatar from "@/lib/assets/aM_avatar.png";
import { useState } from "react";

const messages = [
  {
    name: "Prince Maxwell",
    email: "Princemax222@gmail.com",
    time: "Sat. June 20th, 2025 (11:56AM)",
    text: "I requested for my profit but its over 2days. It has not dropped",
    isSupport: false,
    avatar: avatar,
  },
  {
    name: "Udo David",
    email: "Support team",
    time: "Sat. June 20th, 2025 (12:00PM)",
    text: "Hello Prince,\nThanks for your mail.\nAre you sure it up to the matured date?",
    isSupport: true,
    avatar: avatar,
  },
  {
    name: "Udo David",
    email: "Support team",
    time: "Sat. June 20th, 2025 (12:00PM)",
    text: "Hello Prince,\nThanks for your mail.\nAre you sure it up to the matured date?",
    isSupport: true,
    avatar: avatar,
  },
  {
    name: "Udo David",
    email: "Support team",
    time: "Sat. June 20th, 2025 (12:00PM)",
    text: "Hello Prince,\nThanks for your mail.\nAre you sure it up to the matured date?",
    isSupport: true,
    avatar: avatar,
  },
  {
    name: "Udo David",
    email: "Support team",
    time: "Sat. June 20th, 2025 (12:00PM)",
    text: "Hello Prince,\nThanks for your mail.\nAre you sure it up to the matured date?",
    isSupport: true,
    avatar: avatar,
  },
  {
    name: "Udo David",
    email: "Support team",
    time: "Sat. June 20th, 2025 (12:00PM)",
    text: "Hello Prince,\nThanks for your mail.\nAre you sure it up to the matured date?",
    isSupport: true,
    avatar: avatar,
  },
];

export default function TicketConversation({
  openConfirm,
}: {
  openConfirm: () => void;
}) {
  const [canReply, setCanReply] = useState<boolean>(false);
  const [replyText, setReplyText] = useState("");
  const [messageList, setMessageList] = useState(messages);
  const [formData, setFormData] = useState({
    reply: "",
    file: null as File | null,
  });

  const handleReply = () => {
    if (!replyText.trim()) return;

    const newReply = {
      name: "Support Agent",
      email: "support@company.com",
      time: new Date().toLocaleString(),
      text: replyText.trim(),
      isSupport: true,
      avatar,
    };

    setMessageList([...messageList, newReply]);
    setReplyText("");
    setCanReply(false);
  };

//   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };
  return (
    <div className="bg-[79DA7E]/10 text-white rounded-xl px-8 pt-6 w-full max-w-[50%] mx-auto border border-white/5 shadow-md space-y-8 overflow-y-auto custom-scrollbar">
      {messageList.map((msg, i) => (
        <div
          key={i}
          onClick={() => setCanReply(true)}
          className={`flex flex-col gap-6 pb-3 border border-primary/5`}
        >
          <div className="bg-gradient-to-r from-[#111f1d] to-[#2a3836] flex justify-between px-9 py-4 items-center mb-2">
            <div className="w-full flex items-center gap-2.5">
              <Image
                src={msg.avatar}
                alt="Avatar"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />

              <div>
                <h4 className="text-sm font-semibold">{msg.name}</h4>
                <p className="text-xs text-white/50">{msg.email}</p>
              </div>
            </div>

            <span className="text-xs text-center text-white/60">
              {msg.time}
            </span>
          </div>
          <p className="px-9 text-sm text-white/60 whitespace-pre-line">
            {msg.text}
          </p>
        </div>
      ))}

      {canReply && (
        <>
          <div className="px-9 py-3 border border-white/5">
            <textarea
              name="reply"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={4}
              placeholder="Reply Here...."
              className="w-full bg-transparent border border-white/10 px-4 py-2 rounded-xl text-sm outline-none focus:border-0 focus:ring-1 focus-within:ring-primary"
            />
            <p className="text-xs text-white/60 mt-1">
              Must be at least 10 characters long
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="text-sm block">Attachments</label>
            <div className="w-full py-3 border border-white/5">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-white/60 file:bg-[#B3B3B3] file:px-6 file:py-2.5 file:rounded-xl file:text-black file:cursor-pointer"
              />
            </div>
            <p className="text-xs text-white/60">
              Allowed File Extensions: .jpg, .gif, .jpeg, .png, .zip, .pdf,
              .xls, .docx, .txt
            </p>
          </div>
        </>
      )}

      <div className="flex items-center gap-2 py-4 px-1 sticky bottom-0 bg-black/10">
        <button
          onClick={openConfirm}
          className="px-6 py-2.5 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary/10"
        >
          Close Ticket
        </button>
        <button
          onClick={handleReply}
          disabled={!canReply || replyText.trim().length < 10}
          className={`px-6 py-2.5 rounded-xl text-sm font-medium ${
            canReply && replyText.trim().length >= 10
              ? "bg-primary text-black cursor-pointer"
              : "bg-gray-700/50 text-white/60 cursor-not-allowed"
          }`}
        >
          {replyText.trim().length ? "Send Reply" : "Add Reply"}
        </button>
      </div>
    </div>
  );
}
