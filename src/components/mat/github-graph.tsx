"use client";

import { useEffect, useState } from "react";
import { identity } from "@/data/portfolio";

type Day = { date: string; level: number } | null;
type Week = Day[];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toWeeks(days: { date: string; level: number }[]): Week[] {
  const weeks: Week[] = [];
  let week: Week = new Array(7).fill(null);
  days.forEach((d) => {
    const wd = new Date(d.date).getDay();
    week[wd] = d;
    if (wd === 6) {
      weeks.push(week);
      week = new Array(7).fill(null);
    }
  });
  if (week.some((v) => v !== null)) weeks.push(week);
  return weeks;
}

// Deterministic fallback so the card never renders empty/broken.
function fauxDays(): { date: string; level: number }[] {
  const out: { date: string; level: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const seed = (d.getDate() * 7 + d.getMonth() * 13 + d.getDay() * 3) % 11;
    const level = seed > 8 ? 4 : seed > 6 ? 3 : seed > 4 ? 2 : seed > 2 ? 1 : 0;
    out.push({ date: d.toISOString().slice(0, 10), level });
  }
  return out;
}

export function GithubGraph() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${identity.githubUser}?y=last`
        );
        if (!res.ok) throw new Error("bad status");
        const json = await res.json();
        const days: { date: string; level: number }[] = json.contributions ?? [];
        if (!days.length) throw new Error("empty");
        if (!alive) return;
        setWeeks(toWeeks(days));
        const t = json.total
          ? Object.values(json.total).reduce((a: number, b) => a + (b as number), 0)
          : null;
        setTotal(t);
      } catch {
        if (!alive) return;
        setWeeks(toWeeks(fauxDays()));
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  // Month labels: mark a column when its first dated cell crosses into a new
  // month. Skip the leading partial week so the first two labels don't collide.
  const monthLabels = weeks.map((w, i) => {
    if (i === 0) return null;
    const first = w.find((d) => d);
    if (!first) return null;
    const m = new Date(first.date).getMonth();
    const prev = weeks[i - 1]?.find((d) => d);
    const pm = prev ? new Date(prev.date).getMonth() : -1;
    return m !== pm ? MONTHS[m] : null;
  });

  return (
    <div className="sticky-card gh-card">
      <div className="gh-head">
        <span className="gh-title">GitHub activity</span>
        <a
          className="gh-handle"
          href={`https://github.com/${identity.githubUser}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          @{identity.githubUser}
          {total != null ? ` · ${total} contributions` : ""}
        </a>
      </div>

      <div className="gh-scroll">
        <div className="gh-months">
          {monthLabels.map((m, i) => (
            <span key={i} className="gh-month" style={{ ["--col" as string]: i }}>
              {m}
            </span>
          ))}
        </div>
        <div className="gh-grid">
          {weeks.map((w, i) => (
            <div key={i} className="gh-week">
              {w.map((d, j) => (
                <span
                  key={j}
                  className="gh-cell"
                  data-level={d ? d.level : 0}
                  title={d ? d.date : ""}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="gh-legend">
        <span>Less</span>
        <span className="gh-cell" data-level={0} />
        <span className="gh-cell" data-level={1} />
        <span className="gh-cell" data-level={2} />
        <span className="gh-cell" data-level={3} />
        <span className="gh-cell" data-level={4} />
        <span>More</span>
      </div>
    </div>
  );
}
