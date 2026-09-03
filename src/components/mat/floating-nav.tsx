"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "about", label: "About" },
  { id: "hackathons", label: "Hackathons" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export function FloatingNav() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ids = [...LINKS.map((l) => l.id), "connect"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="mat-nav" aria-label="Primary">
      <div className="mat-nav-pill">
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={go(l.id)}
            className={"mat-nav-link" + (active === l.id ? " is-active" : "")}
          >
            {l.label}
          </a>
        ))}
        <a href="#connect" onClick={go("connect")} className="mat-nav-cta">
          Connect
        </a>
      </div>
    </nav>
  );
}
