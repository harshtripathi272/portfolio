"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 1400; // ms for the counter to reach 100

/**
 * Counts to 100, then lifts away. Shown once per tab session so navigating
 * back to the home page doesn't replay it.
 */
export function Preloader() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem("preloaded")) return;

    setDone(false);
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // Ease-out so it sprints early and settles on 100.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("preloaded", "1");
        setTimeout(() => setDone(true), 260);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [reduced]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.span
            className="preloader-count"
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {String(count).padStart(3, "0")}
          </motion.span>

          <div className="preloader-bar">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
