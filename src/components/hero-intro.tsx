"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { MapPinIcon } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroIntro() {
  return (
    <section className="profile-row">
      <motion.div
        className="avatar-frame"
        initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me-circle.png" alt={DATA.name} />
      </motion.div>

      <div>
        <motion.span
          className="status-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <span className="dot" /> Available for work
        </motion.span>

        <motion.h1
          className="profile-name"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
        >
          {DATA.name}
        </motion.h1>

        <motion.p
          className="role-text"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          {DATA.description}
        </motion.p>

        <motion.span
          className="location-badge"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
        >
          <MapPinIcon className="size-4 opacity-60" /> {DATA.location}
        </motion.span>
      </div>
    </section>
  );
}
