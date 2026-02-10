"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large" | "wide" | "tall";
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(200px,auto)] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoCard({ children, className, size = "medium" }: BentoCardProps) {
  const sizeClasses = {
    small: "sm:col-span-1 sm:row-span-1",
    medium: "sm:col-span-1 sm:row-span-1",
    large: "sm:col-span-2 sm:row-span-2",
    wide: "sm:col-span-2 sm:row-span-1",
    tall: "sm:col-span-1 sm:row-span-2",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-900/60 p-6 transition-all duration-300 hover:border-white/15",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
}
