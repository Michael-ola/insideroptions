import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface SuggestionCardProps {
  author: string;
  avatar: StaticImageData | string;
  topic: string;
  content: string;
  upvotes: number;
  downvotes: number;
  supportReply?: string;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({
  author,
  avatar,
  topic,
  content,
  upvotes,
  downvotes,
  supportReply,
}) => {
  return (
    <div className="bg-primary/10 border border-white/5 rounded-xl p-6 space-y-3">
      {/* Author Info */}
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt={author}
          width={48}
          height={48}
        //   className="w-8 h-8 rounded-full object-cover"
        />
        <span className="font-semibold text-white text-sm">{author}</span>
      </div>

      {/* Topic */}
      <div className="text-sm font-semibold text-green-400">{topic}</div>

      {/* Content */}
      <p className="text-white text-sm">{content}</p>

      {/* Votes */}
      <div className="flex items-center justify-between">
        <span className="text-white/60 text-sm">Useful?</span>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-green-400">
            {upvotes} <ThumbsUp size={16} />
          </span>
          <span className="flex items-center gap-1 text-red-500">
            {downvotes} <ThumbsDown size={16} />
          </span>
        </div>
      </div>

      {/* Optional Support Reply */}
      {supportReply && (
        <div className="mt-2 border-t border-white/10 pt-3">
          <div className="text-white/50 text-xs font-semibold mb-1">
            Support reply:
          </div>
          <p className="text-white/80 text-sm">{supportReply}</p>
        </div>
      )}
    </div>
  );
};

export default SuggestionCard;
