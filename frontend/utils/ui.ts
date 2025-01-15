import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const uiConfig = {
  transitions: {
    default: "transition-all duration-200",
    slow: "transition-all duration-300",
    fast: "transition-all duration-150",
  },
  gradients: {
    primary: "bg-gradient-to-br from-blue-500 to-purple-600",
    secondary: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  glassMorphism: {
    light: "bg-white/80 backdrop-blur-md",
    dark: "bg-gray-900/80 backdrop-blur-md",
  },
} as const;
