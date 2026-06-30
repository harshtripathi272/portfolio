"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const EASE = [0.16, 1, 0.3, 1] as const;

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#work", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.replace("/#", "/"));

  return (
    <motion.header
      className={cn("site-header", scrolled && "is-scrolled")}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <Link href="/" className="logo" aria-label="Home">
        <motion.img
          src="/me-circle.png"
          alt={DATA.name}
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ type: "spring", stiffness: 300, damping: 12 }}
        />
        <span className="logo-name hidden sm:inline">{DATA.name}</span>
      </Link>

      {/* Pill nav with sliding hover indicator */}
      <nav
        className="nav-pill nav-links-desktop"
        onMouseLeave={() => setHovered(null)}
      >
        {NAV.map((item) => {
          const active = isActive(item.href);
          const showBg = hovered ? hovered === item.href : active;
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              className={cn("nav-pill-link", active && "is-active")}
            >
              <AnimatePresence>
                {showBg && (
                  <motion.span
                    layoutId="nav-pill-bg"
                    className="nav-pill-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </AnimatePresence>
              <span className="nav-pill-text">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="header-actions">
        <ThemeToggle />

        <button
          type="button"
          className="icon-btn sm:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
        </button>
      </div>

      {/* mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-x-0 top-full z-30 flex flex-col border-b border-[var(--line)] bg-[var(--bg)] p-4 sm:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            {NAV.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-[var(--line)] py-3 text-[var(--muted)]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
