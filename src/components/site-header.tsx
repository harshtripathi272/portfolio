"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "lucide-react";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#work", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

export function SiteHeader() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Home">
        <img src="/me-circle.png" alt={DATA.name} />
        <span className="hidden sm:inline">{DATA.initials}</span>
      </Link>

      <nav className={cn("nav", !open && "nav-links-desktop")}>
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <button
          type="button"
          className="icon-btn"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <SunIcon className="hidden size-4 dark:block" />
          <MoonIcon className="block size-4 dark:hidden" />
        </button>
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
      {open && (
        <div className="absolute inset-x-0 top-full z-30 flex flex-col border-b border-[var(--line)] bg-[var(--bg)] p-4 sm:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-[var(--line)] py-3 text-[var(--muted)] last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
