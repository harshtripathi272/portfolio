"use client";

import Image from "next/image";
import { identity, introBullets, type IntroSegment } from "@/data/portfolio";
import { Socials } from "./socials";
import { GithubGraph } from "./github-graph";

function Segment({ seg }: { seg: IntroSegment }) {
  if (seg.type === "text") return <span>{seg.value}</span>;
  if (seg.type === "hand") return <span className="ink-hand">{seg.value}</span>;
  return (
    <a className="ink-link" href={seg.href} target="_blank" rel="noreferrer noopener">
      {seg.label}
    </a>
  );
}

export function Profile() {
  return (
    <section id="about" className="mat-section mat-profile">
      <Socials className="mat-socials-float" />

      <div className="mat-profile-top">
        <figure className="polaroid polaroid-me" style={{ ["--rot" as string]: "-5deg" }}>
          <div className="polaroid-photo">
            <Image
              src="/me.jpg"
              alt="Harsh Tripathi"
              width={220}
              height={260}
              priority
              className="polaroid-img"
            />
          </div>
          <figcaption className="polaroid-caption">that&apos;s me →</figcaption>
        </figure>

        <div className="mat-profile-intro">
          <h1 className="mat-name">{identity.name}</h1>
          <p className="mat-tagline">
            {identity.tagline.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="mat-dot"> • </span>}
                {t}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="sticky-card mat-about">
        <ul className="mat-about-list">
          {introBullets.map((b) => (
            <li key={b.id}>
              {b.segments.map((seg, i) => (
                <Segment key={i} seg={seg} />
              ))}
            </li>
          ))}
        </ul>
      </div>

      <GithubGraph />
    </section>
  );
}
