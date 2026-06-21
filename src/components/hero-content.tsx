"use client";

import { useRef } from "react";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);

  const firstName = DATA.name.split(" ")[0] ?? "";
  const lastName = DATA.name.split(" ").slice(1).join(" ");

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 0.2 });

    tl.fromTo(
      ".hero-line .word",
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.3, stagger: 0.08 }
    )
      .fromTo(
        ".hero-meta",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.12 },
        "-=0.7"
      );
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-20 pt-28 md:px-10"
    >
      {/* top meta row */}
      <div className="hero-meta mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-foreground/15 pb-5 opacity-0">
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" />
          Available for work — 2026
        </span>
        <span className="font-[family-name:var(--font-display)] text-xs uppercase tracking-[0.25em] text-foreground/50">
          {DATA.location}
        </span>
      </div>

      {/* Giant serif name */}
      <h1 className="font-serif text-[19vw] font-light leading-[0.86] tracking-[-0.02em] md:text-[15vw] lg:text-[13rem]">
        <span className="hero-line block overflow-hidden">
          <span className="word inline-block">{firstName}</span>
        </span>
        <span className="hero-line block overflow-hidden">
          <span className="word inline-block italic accent">{lastName}</span>
        </span>
      </h1>

      {/* bottom row: description + roles + socials */}
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-foreground/15 pt-8 md:grid-cols-12">
        <div className="hero-meta opacity-0 md:col-span-5">
          <p className="max-w-md text-lg leading-relaxed text-foreground/70">
            {DATA.description}
          </p>
        </div>

        <div className="hero-meta opacity-0 md:col-span-4 md:col-start-7">
          <p className="eyebrow mb-3">Disciplines</p>
          <ul className="space-y-1 font-[family-name:var(--font-display)] text-base font-medium">
            <li>Machine Learning / AI</li>
            <li>Full-Stack Engineering</li>
            <li>Edge & Systems</li>
          </ul>
        </div>

        <div className="hero-meta flex items-end opacity-0 md:col-span-2 md:col-start-11">
          <div className="flex flex-col gap-2">
            {Object.entries(DATA.contact.social)
              .filter(([, s]) => s.navbar)
              .map(([name, s]) => (
                <Link
                  key={name}
                  href={s.url}
                  target="_blank"
                  data-interactive
                  className="ed-link text-sm font-medium text-foreground/70 hover:text-foreground"
                >
                  {name} ↗
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-meta mt-16 flex items-center gap-3 opacity-0">
        <div className="relative h-10 w-px overflow-hidden bg-foreground/15">
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[hsl(var(--accent))] animate-[scroll-line_2s_ease-in-out_infinite]" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
          Scroll to explore
        </span>
      </div>
    </div>
  );
}
