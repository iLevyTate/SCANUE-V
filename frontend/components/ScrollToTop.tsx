import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import debounce from "lodash/debounce";
import type { DebouncedFunc } from "lodash/debounce";
import { cn } from "@/utils/ui";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  // TODO: Need to fix this warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll: DebouncedFunc<() => void> = useCallback(
    debounce(() => {
      setShow(window.scrollY > 300);
    }, 100),
    [],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={cn("fixed bottom-20 right-4 rounded-full bg-primary p-2 text-white shadow-lg")}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
