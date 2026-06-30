"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

// Allow the experimental View Transitions API without TS errors
type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const toggle = async () => {
    const next = theme === "dark" ? "light" : "dark";
    const doc = document as DocWithVT;

    // Fallback: no View Transitions support or reduced motion
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    // Origin = center of the toggle button
    const rect = btnRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = doc.startViewTransition(() => {
      setTheme(next);
    });

    try {
      await transition.ready;
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    } catch {
      /* no-op */
    }
  };

  return (
    <Magnetic>
      <button
        ref={btnRef}
        type="button"
        className="icon-btn"
        aria-label="Toggle theme"
        onClick={toggle}
      >
        <AnimatePresence mode="wait" initial={false}>
          {mounted && (
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.35, ease: EASE }}
              style={{ display: "inline-flex" }}
            >
              {theme === "dark" ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </Magnetic>
  );
}
