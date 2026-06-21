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
    <div className="relative">
      {/* vertical spine */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent md:left-[31px]" />

      <div className="space-y-4">
        {items.map((item, i) => (
          <ScrollReveal key={item.title} delay={0.06 * i}>
            <TimelineRow item={item} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

function TimelineRow({ item }: { item: TimelineItem }) {
  const [open, setOpen] = useState(false);
  const hasDesc = Boolean(item.description);

  return (
    <div
      className={cn(
        "group relative flex gap-5 rounded-2xl p-3 transition-colors duration-300 md:gap-7 md:p-4",
        hasDesc && "cursor-pointer hover:bg-white/[0.02]"
      )}
      onClick={() => hasDesc && setOpen((v) => !v)}
    >
      {/* node / logo */}
      <div className="relative z-10 flex-none">
        <div className="flex size-14 items-center justify-center rounded-full border border-white/10 bg-[#0a0a0a] p-2 transition-colors duration-300 group-hover:border-violet-400/40 md:size-16">
          <Image
            src={item.logoUrl}
            alt={item.title}
            width={40}
            height={40}
            className="size-full rounded-full object-contain"
          />
        </div>
      </div>

      {/* content */}
      <div className="flex-grow pt-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-base font-semibold text-white md:text-lg">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="mt-0.5 text-sm text-violet-300/70">{item.subtitle}</p>
            )}
          </div>
          <span className="shrink-0 whitespace-nowrap font-[family-name:var(--font-display)] text-xs font-medium tabular-nums text-neutral-500 md:text-sm">
            {item.period}
          </span>
        </div>

        {item.badges && item.badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200"
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
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                {item.description}
              </p>
            </div>
          </div>
        )}

        {hasDesc && (
          <span className="mt-2 inline-block text-[11px] font-semibold uppercase tracking-widest text-neutral-600 transition-colors group-hover:text-violet-300">
            {open ? "− Less" : "+ Read more"}
          </span>
        )}
      </div>
    </div>
  );
}
