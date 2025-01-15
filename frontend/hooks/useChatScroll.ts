import { useEffect, useRef, useCallback } from 'react';
import type { Message } from '@/types/chat';

interface UseChatScrollProps {
  messages: readonly Message[];
  behavior?: ScrollBehavior;
}

type ScrollRef = HTMLDivElement | null;

export function useChatScroll({ messages, behavior = 'smooth' }: UseChatScrollProps) {
  const scrollRef = useRef<ScrollRef>(null);

  const scrollToBottom = useCallback(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.scrollTo({
      top: scrollElement.scrollHeight,
      behavior,
    });
  }, [behavior]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, messages.length]);

  return { scrollRef } as const;
}
