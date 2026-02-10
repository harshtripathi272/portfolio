"use client";

import { cn } from "@/lib/utils";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderClassName?: string;
  animate?: boolean;
}

export function GradientBorder({
  children,
  className,
  borderClassName,
  animate = true,
}: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-2xl p-[1px] overflow-hidden group", className)}>
      <div
        className={cn(
          "absolute inset-0 rounded-2xl",
          animate && "animate-[spin_6s_linear_infinite]",
          borderClassName
        )}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.08) 10%, transparent 20%, transparent 30%, rgba(255,255,255,0.12) 40%, transparent 50%, transparent 60%, rgba(255,255,255,0.06) 70%, transparent 80%, transparent 90%, rgba(255,255,255,0.08) 100%)",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="relative rounded-2xl bg-zinc-950 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
