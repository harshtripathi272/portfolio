"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export interface ExpItem {
  logoUrl: string;
  title: string;
  subtitle?: string;
  period: string;
  description?: string;
  tags?: string[];
}

export function ExperienceAccordion({ items }: { items: ExpItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <AccordionRow key={item.title + i} item={item} />
      ))}
    </div>
  );
}

function AccordionRow({ item }: { item: ExpItem }) {
  const [open, setOpen] = useState(false);
  const expandable = Boolean(item.description);

  return (
    <div className="acc-item">
      <button
        type="button"
        className={cn("acc-head", open && "is-open")}
        onClick={() => expandable && setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="acc-icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.logoUrl} alt={item.title} />
        </span>
        <span className="acc-meta">
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </span>
        <span className="acc-period">{item.period}</span>
        {expandable && <ChevronDownIcon className="acc-arrow size-4" />}
      </button>

      <AnimatePresence initial={false}>
        {expandable && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div className="pl-[52px] pr-2 pt-1">
              <motion.p
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
                className="mb-3 text-sm leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                {item.description}
              </motion.p>
              {item.tags && item.tags.length > 0 && (
                <div className="exp-tags">
                  {item.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
