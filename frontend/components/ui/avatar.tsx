"use client";

import { cn } from "@/utils/ui";
import type { ReactNode } from "react";

interface AvatarProps {
  children: ReactNode;
  className?: string;
}

export function Avatar({ children, className }: AvatarProps) {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

interface AvatarFallbackProps {
  children: ReactNode;
  className?: string;
}

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center", className)}>
      {children}
    </div>
  );
}
