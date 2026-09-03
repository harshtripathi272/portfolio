"use client";

import { identity } from "@/data/portfolio";
import { Socials } from "./socials";

export function Connect() {
  return (
    <section id="connect" className="mat-section mat-connect">
      <div className="sticky-card mat-connect-card">
        <span className="mat-connect-tape" aria-hidden />
        <h2 className="mat-h2 mat-connect-h">Let&apos;s build something.</h2>
        <p className="mat-connect-copy">
          I&apos;m open to internships and collaborations in AI / ML and full-stack.
          The fastest way to reach me is email — I reply quickly.
        </p>
        <div className="mat-connect-actions">
          <a className="mat-nav-cta mat-connect-cta" href="mailto:harsht@iitbhilai.ac.in">
            Say hello ✉
          </a>
          <Socials className="mat-connect-socials" />
        </div>
      </div>
      <p className="mat-footnote">
        Built by {identity.name} · on a cutting mat, with a knife 🔪
      </p>
    </section>
  );
}
