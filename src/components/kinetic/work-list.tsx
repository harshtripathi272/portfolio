"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { DATA } from "@/data/resume";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Row {
  logoUrl: string;
  org: string;
  role: string;
  period: string;
  description?: string;
  badges?: readonly string[];
}

const WORK: Row[] = DATA.work.map((w) => ({
  logoUrl: w.logoUrl,
  org: w.company,
  role: w.title,
  period: `${w.start} — ${w.end ?? "Present"}`,
  description: w.description,
  badges: w.badges,
}));

const EDUCATION: Row[] = DATA.education.map((e) => ({
  logoUrl: e.logoUrl,
  org: e.school,
  role: e.degree,
  period: `${e.start} — ${e.end}`,
}));

function List({ rows }: { rows: Row[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="work-list">
      {rows.map((row, i) => {
        const isOpen = open === row.org;
        const expandable = Boolean(row.description);

        return (
          <Reveal key={row.org} delay={i * 0.05}>
            <div
              className="work-row"
              onClick={() => expandable && setOpen(isOpen ? null : row.org)}
              role={expandable ? "button" : undefined}
              tabIndex={expandable ? 0 : undefined}
              aria-expanded={expandable ? isOpen : undefined}
              onKeyDown={(e) => {
                if (!expandable) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(isOpen ? null : row.org);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="work-logo" src={row.logoUrl} alt="" aria-hidden />
              <span className="work-org">{row.org}</span>
              <span className="work-role">{row.role}</span>
              <span className="work-period font-mono">
                {row.period}
                {expandable && (
                  <motion.span
                    className="ml-3 inline-block align-middle"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <Plus className="size-3.5" />
                  </motion.span>
                )}
              </span>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && row.description && (
                <motion.div
                  className="work-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div className="work-detail-inner">
                    {row.description}
                    {row.badges && row.badges.length > 0 && (
                      <div className="work-badges">
                        {row.badges.map((b) => (
                          <span className="tag" key={b}>
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </div>
  );
}

export function WorkList() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <p className="eyebrow">
          <span className="eyebrow-num">02</span> Experience
        </p>
        <MaskText as="h2" className="section-title" split="words">
          Where I have worked.
        </MaskText>

        <List rows={WORK} />

        <p className="eyebrow" style={{ marginTop: "clamp(56px, 9vh, 110px)" }}>
          <span className="eyebrow-num">03</span> Education
        </p>
        <List rows={EDUCATION} />
      </div>
    </section>
  );
}
