"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { CountUp } from "@/components/ui/count-up";
import { Spotlight } from "@/components/ui/spotlight";

const EASE = [0.16, 1, 0.3, 1] as const;

const STATS = [
  { value: DATA.projects.length, suffix: "+", label: "Projects shipped" },
  { value: DATA.work.length, suffix: "", label: "Internships" },
  { value: 2, suffix: "x", label: "Hackathon wins" },
  { value: DATA.skills.length, suffix: "+", label: "Technologies" },
];

export function StatsDashboard() {
  return (
    <section id="stats" className="content-section">
      <div className="stats-grid">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <Spotlight className="stat-card" radius={260}>
              <span className="stat-value font-mono">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
