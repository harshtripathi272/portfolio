"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  logoUrl: string;
  title: string;
  subtitle?: string;
  period: string;
  description?: string;
  badges?: readonly string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="border-t border-foreground/15">
      {items.map((item, i) => (
        <ScrollReveal key={item.title} delay={0.05 * i}>
          <TimelineRow item={item} />
        </ScrollReveal>
      ))}
    </div>
  );
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);
  const hasDesc = Boolean(item.description);

  return (
    <div
      className={cn(
        "group border-b border-foreground/15 py-6 transition-colors duration-300",
        hasDesc && "cursor-pointer hover:bg-foreground/[0.03]"
      )}
      onClick={() => hasDesc && setOpen((v) => !v)}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex size-11 flex-none items-center justify-center rounded-full border border-foreground/15 bg-background p-1.5">
          <Image
            src={item.logoUrl}
            alt={item.title}
            width={32}
            height={32}
            className="size-full rounded-full object-contain"
          />
        </div>

        <div className="flex-grow">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h4 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug">
              {item.title}
            </h4>
            <span className="shrink-0 whitespace-nowrap text-xs font-medium tabular-nums text-foreground/45">
              {item.period}
            </span>
          </div>
          {item.subtitle && (
            <p className="mt-0.5 text-sm text-foreground/60">{item.subtitle}</p>
          )}

          {item.badges && item.badges.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {item.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[hsl(var(--accent))]/30 bg-[hsl(var(--accent))]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--accent))]"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {hasDesc && (
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-sm leading-relaxed text-foreground/65">
                  {item.description}
                </p>
              </div>
            </div>
          )}

          {hasDesc && (
            <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-widest text-foreground/40 transition-colors group-hover:text-[hsl(var(--accent))]">
              {open ? "− Less" : "+ Read more"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
