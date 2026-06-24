"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;
const USERNAME = "harshtripathi272";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface Week {
  days: ContributionDay[];
}

const LEVEL_COLORS = [
  "var(--panel-soft)",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

export function GithubActivity() {
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.contributions) {
          const allDays: ContributionDay[] = data.contributions;
          const totalContribs = data.total?.[year] || allDays.reduce((s, d) => s + d.count, 0);
          setTotal(totalContribs);

          // Group into weeks (7 days each)
          const grouped: Week[] = [];
          for (let i = 0; i < allDays.length; i += 7) {
            grouped.push({ days: allDays.slice(i, i + 7) });
          }
          setWeeks(grouped);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="gh-graph">
        <p style={{ color: "var(--muted)", fontSize: 13 }}>Loading GitHub activity...</p>
      </div>
    );
  }

  if (weeks.length === 0) return null;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <motion.div
      className="gh-graph"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="gh-header">
        <span className="gh-user">
          @{USERNAME} <span className="gh-label">github activity</span>
        </span>
        <span className="gh-total">{total.toLocaleString()} contributions</span>
      </div>

      <div className="gh-wrap">
        <div className="gh-months">
          {months.map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>

        <div className="gh-body">
          <div className="gh-days">
            <span>Mon</span>
            <span>Wed</span>
            <span>Fri</span>
          </div>
          <div className="gh-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="gh-week">
                {week.days.map((day, di) => (
                  <div
                    key={di}
                    className="gh-cell"
                    title={`${day.date}: ${day.count} contributions`}
                    style={{ background: LEVEL_COLORS[day.level] || LEVEL_COLORS[0] }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="gh-footer">
        <span style={{ color: "var(--muted)", fontSize: 11 }}>Less</span>
        <div className="gh-legend">
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} style={{ background: c }} className="gh-legend-cell" />
          ))}
        </div>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>More</span>
      </div>
    </motion.div>
  );
}
