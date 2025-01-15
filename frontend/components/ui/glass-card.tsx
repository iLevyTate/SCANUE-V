import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn("glass-card w-full space-y-8 rounded-3xl p-8 text-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
