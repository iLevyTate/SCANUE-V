import { useEffect, useCallback } from "react";

type KeyHandler = (e: KeyboardEvent) => void;
interface ShortcutHandlers {
  onSearch?: () => void;
  onFocusInput?: () => void;
}

export function useChatShortcuts(handlers: ShortcutHandlers = {}) {
  const handleKeyPress: KeyHandler = useCallback(
    (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            handlers.onSearch?.();
            break;
          case "/":
            e.preventDefault();
            handlers.onFocusInput?.();
            break;
        }
      }
    },
    [handlers],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);
}
