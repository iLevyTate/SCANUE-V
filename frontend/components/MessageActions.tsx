"use client";

import { memo } from "react";
import { MoreVertical, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { Message } from "@/types/chat";
import { cn } from "@/utils/ui";

interface MessageActionsProps {
  message: Message;
  onDelete?: (id: string) => void;
}

function MessageActionsComponent({ message, onDelete }: MessageActionsProps) {
  if (!onDelete) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      onDelete(message.id);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            "rounded-full",
            "hover:bg-gray-200 dark:hover:bg-gray-700",
            "focus-visible:ring-2 focus-visible:ring-primary",
            "transition-colors duration-200",
          )}
          aria-label="Message actions"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        sideOffset={8}
        className={cn(
          "w-48",
          "bg-white dark:bg-gray-800",
          "border border-gray-200 dark:border-gray-700",
          "shadow-lg",
          "animate-in fade-in-0 zoom-in-95",
          "duration-200",
        )}
      >
        <DropdownMenuItem
          className={cn(
            "flex items-center gap-2",
            "text-red-600 dark:text-red-400",
            "focus:text-red-600 dark:focus:text-red-400",
            "cursor-pointer",
          )}
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const MessageActions = memo(MessageActionsComponent);
