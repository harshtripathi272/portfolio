"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

/**
 * Editorial section heading: numbered index, eyebrow label and
 * a large serif title over a hairline rule.
 */
export function SectionHeader({
  index,
  eyebrow,
  title,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <ScrollReveal>
      <div
        className={cn(
          "border-t border-foreground/15 pt-6",
          align === "center" && "text-center",
          className
        )}
      >
        <div
          className={cn(
            "mb-6 flex items-baseline gap-4",
            align === "center" && "justify-center"
          )}
        >
          <span className="eyebrow">
            {index && <span className="accent">{index} —</span>}
            {eyebrow}
          </span>
        </div>
        <h2 className="font-serif text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          {title}
        </h2>
      </div>
    </ScrollReveal>
  );
}
