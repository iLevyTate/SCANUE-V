import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

export interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  className?: string;
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 px-6 py-3 text-base font-medium text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
GradientButton.displayName = "GradientButton";

export { GradientButton };
