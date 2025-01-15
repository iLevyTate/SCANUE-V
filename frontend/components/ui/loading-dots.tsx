"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingDotsProps {
  className?: string;
  color?: string;
}

export function LoadingDots({ className, color = "currentColor" }: LoadingDotsProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className={cn("h-2 w-2 rounded-full", color)}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0.5 }}
          transition={{
            duration: 0.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: dot * 0.2,
          }}
        />
      ))}
    </span>
  );
}
