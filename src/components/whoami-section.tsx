"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { GithubActivity } from "@/components/github-activity";

const EASE = [0.22, 1, 0.36, 1] as const;

const ROWS: { key: string; values: string[] }[] = [
  { key: "proof", values: ["2x intl hackathon winner", "research-to-prod AI systems", "edge ML deployment"] },
  { key: "focus", values: ["machine learning", "edge & systems", "full-stack products"] },
  { key: "stack", values: ["python", "pytorch", "fastapi", "next.js", "docker"] },
];

export function WhoamiSection() {
  return (
    <section id="whoami" className="content-section">
      <motion.div
        className="terminal"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <div className="terminal-bar">
          <span className="tdot" />
          <span className="tdot" />
          <span className="tdot" />
          <span className="terminal-title font-mono">~/portfolio — zsh</span>
        </div>

        <div className="terminal-body font-mono">
          <p className="terminal-prompt">
            <span className="accent">$</span> whoami
          </p>

          <h2 className="terminal-name">{DATA.name}</h2>
          <p className="terminal-role">
            ML Engineer <span className="sep">/</span> AI Builder{" "}
            <span className="sep">/</span> Researcher
          </p>

          <p className="terminal-desc">{DATA.summary}</p>

          <div className="terminal-rows">
            {ROWS.map((row, i) => (
              <motion.div
                key={row.key}
                className="terminal-row"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
              >
                <span className="terminal-key">{row.key}:</span>
                <span className="terminal-vals">
                  {row.values.map((v) => (
                    <span key={v} className="terminal-tag">
                      {v}
                    </span>
                  ))}
                </span>
              </motion.div>
            ))}
          </div>

          <p className="terminal-cursor-line">
            <span className="accent">$</span>{" "}
            <span className="terminal-cursor" />
          </p>

          <GithubActivity />
        </div>
      </motion.div>
    </section>
  );
}
