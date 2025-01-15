import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash/debounce";

const SCROLL_THRESHOLD = 50;
const DEBOUNCE_DELAY = 10; // milliseconds

interface ScrollState {
  isScrollingDown: boolean;
  lastScrollY: number;
}

export function useScrollDirection() {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrollingDown: false,
    lastScrollY: 0,
  });

  const handleScroll = useCallback(
    debounce(() => {
      if (typeof window === "undefined") return;

      setScrollState((prev) => {
        const currentScrollY = window.scrollY;
        const isScrollingDownNow =
          currentScrollY > prev.lastScrollY && currentScrollY > SCROLL_THRESHOLD;

        if (isScrollingDownNow === prev.isScrollingDown) {
          return prev;
        }

        return {
          isScrollingDown: isScrollingDownNow,
          lastScrollY: currentScrollY,
        };
      });
    }, DEBOUNCE_DELAY),
    [],
  );

  useEffect(() => {
    // Check if window is available (SSR)
    if (typeof window === "undefined") return;

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Cancel any pending debounced calls
    };
  }, [handleScroll]);

  return scrollState.isScrollingDown;
}
