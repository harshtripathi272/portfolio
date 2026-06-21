"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Consistent section heading used across the site: an eyebrow label,
 * a large display title, and an accent divider line.
 */
export function SectionHeader({
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          "mb-16 flex flex-col gap-5",
          align === "center" && "items-center text-center",
          className
        )}
      >
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tighter text-white md:text-6xl">
          {title}
        </h2>
        <div
          className={cn(
            "h-px w-24 bg-gradient-to-r from-violet-500/70 via-cyan-400/50 to-transparent",
            align === "center" && "from-transparent via-violet-400/60 to-transparent w-40"
          )}
        />
      </div>
    </ScrollReveal>
  );
}
