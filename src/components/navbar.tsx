"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Awards" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = DATA.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled
          ? "border-b border-foreground/10 bg-background/80 backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Wordmark */}
        <Link
          href="/"
          data-interactive
          className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight"
        >
          <img
            src="/me-circle.png"
            alt={DATA.name}
            className="size-7 rounded-full object-cover"
          />
          <span className="hidden sm:inline">{DATA.name}</span>
        </Link>

        {/* Center links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-interactive
              className="ed-link text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href={DATA.contact.social.email.url}
          data-interactive
          className="rounded-full bg-foreground px-5 py-2 text-xs font-semibold uppercase tracking-wider text-background transition-transform duration-300 hover:scale-[1.03]"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}
