"use client";

import { cn } from "@/lib/utils";
import { useChatScroll } from "@/hooks/use-chat-scroll";
import type { Message } from "@/types/chat";
import { ChatMessage } from "./ChatMessage";

interface ChatContainerProps {
  messages: Message[];
  onDelete?: (id: string) => void;
  className?: string;
}

export function ChatContainer({ messages, onDelete, className }: ChatContainerProps) {
  const { scrollRef } = useChatScroll({ messages });

  return (
    <div
      className={cn(
        "h-full w-full",
        "flex flex-col overflow-hidden",
        "px-4 sm:px-6 lg:px-8",
        "mx-auto max-w-4xl",
        className,
      )}
    >
      <div
        ref={scrollRef}
        className={cn(
          "flex-1",
          "overflow-y-auto overflow-x-hidden",
          "overscroll-none scroll-smooth",
          "py-4 sm:py-6 lg:py-8",
          "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700",
          "scrollbar-track-transparent scrollbar-thumb-rounded-full",
        )}
      >
        <ul className="flex flex-col space-y-2">
          {messages.map((message, i) => (
            <ChatMessage
              key={message.id}
              message={message}
              isPartOfGroup={i > 0 && messages[i - 1].isUser === message.isUser}
              showTimestamp={true}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
