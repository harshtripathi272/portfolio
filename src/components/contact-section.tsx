"use client";

import React, { useRef } from "react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      ".contact-reveal",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top bottom-=120", once: true },
      }
    );
  }, { scope: containerRef });

  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-foreground px-6 pt-28 pb-12 text-background md:px-10 md:pt-40"
    >
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow contact-reveal !text-background/50">
          <span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" />
          Let&apos;s talk
        </span>

        <h2 className="contact-reveal mt-8 font-serif text-6xl font-light leading-[0.92] tracking-tight md:text-[10vw]">
          Let&apos;s craft <br />
          <span className="italic accent">the future.</span>
        </h2>

        <div className="contact-reveal mt-12 flex flex-wrap items-center gap-4">
          <Link
            href={DATA.contact.social.email.url}
            data-interactive
            className="group inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-base font-semibold text-foreground transition-all duration-300 hover:gap-4"
          >
            {DATA.contact.email}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={DATA.contact.social.LinkedIn.url}
            data-interactive
            className="inline-flex items-center gap-2 rounded-full border border-background/25 px-8 py-4 text-base font-semibold transition-colors duration-300 hover:border-background"
          >
            LinkedIn ↗
          </Link>
        </div>

        {/* Footer row */}
        <div className="contact-reveal mt-28 flex flex-col gap-6 border-t border-background/15 pt-8 md:flex-row md:items-center md:justify-between">
          <span className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-[0.2em]">
            {DATA.name}
          </span>
          <div className="flex flex-wrap gap-6 text-sm text-background/60">
            {Object.entries(DATA.contact.social)
              .filter(([, s]) => s.navbar)
              .map(([name, s]) => (
                <Link key={name} href={s.url} target="_blank" data-interactive className="ed-link hover:text-background">
                  {name}
                </Link>
              ))}
          </div>
          <span className="text-sm text-background/45">© {year} — All rights reserved</span>
        </div>
      </div>
    </section>
  );
}
