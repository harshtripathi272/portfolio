"use client";

import { motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { MapPinIcon, ArrowUpRightIcon } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.85, delay, ease: EASE },
});

export function HeroIntro() {
  return (
    <section className="profile-row">
      <motion.div
        className="avatar-frame"
        initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: EASE }}
        whileHover={{ scale: 1.04, rotate: 2 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/me-circle.png" alt={DATA.name} />
      </motion.div>

      <div>
        <motion.span className="status-badge" {...fadeUp(0.15)}>
          <span className="dot" /> Available for work
        </motion.span>

        <motion.h1 className="profile-name" {...fadeUp(0.25)}>
          {DATA.name}
        </motion.h1>

        <motion.p className="role-text" {...fadeUp(0.35)}>
          {DATA.description}
        </motion.p>

        <motion.span className="location-badge" {...fadeUp(0.45)}>
          <MapPinIcon className="size-4 opacity-60" /> {DATA.location}
        </motion.span>

        {/* CTAs + socials */}
        <motion.div className="hero-actions" {...fadeUp(0.55)}>
          <Magnetic strength={0.4}>
            <a href="/#projects" className="cta-button">
              Explore Projects <ArrowUpRightIcon className="size-4" />
            </a>
          </Magnetic>
          <Magnetic strength={0.4}>
            <a href={DATA.contact.social.email.url} className="ghost-button">
              Get in touch
            </a>
          </Magnetic>
          <span className="hero-socials">
            {Object.entries(DATA.contact.social)
              .filter(([, s]) => s.navbar)
              .map(([name, s]) => (
                <Magnetic key={name} strength={0.5}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="hero-social-icon"
                  >
                    <s.icon />
                  </a>
                </Magnetic>
              ))}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
