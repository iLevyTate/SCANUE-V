"use client";

import { Copy, ThumbsUp } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Message } from "@/types/chat";
import { cn } from "@/utils/ui";

interface MessageContextMenuProps {
  children: React.ReactNode;
  message: Message;
  onFeedback: (messageId: string, type: "positive" | "negative") => void;
  onCopy: (content: string) => void;
}

export function MessageContextMenu({
  children,
  message,
  onFeedback,
  onCopy,
}: MessageContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className={cn("glass-card text-white/80")}>
        <ContextMenuItem
          className={cn("hover:text-white focus:text-white")}
          onClick={() => onCopy(message.content)}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Message
        </ContextMenuItem>
        {!message.isUser && (
          <ContextMenuItem
            className={cn("hover:text-white focus:text-white")}
            onClick={() => onFeedback(message.id, "positive")}
          >
            <ThumbsUp className="mr-2 h-4 w-4" />
            Mark as Helpful
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
