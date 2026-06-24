"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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

      {expandable && (
        <div className={cn("acc-body", open && "is-open")}>
          <div className="acc-body-inner">
            <p>{item.description}</p>
            {item.tags && item.tags.length > 0 && (
              <div className="exp-tags">
                {item.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
