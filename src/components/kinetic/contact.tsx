"use client";

import { DATA } from "@/data/resume";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";

const SOCIALS = Object.entries(DATA.contact.social).filter(([, s]) => s.navbar);

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="shell">
        <p className="eyebrow">
          <span className="eyebrow-num">05</span> Contact
        </p>

        <h2 className="contact-title display">
          <MaskText as="span" className="big-line" split="words" stagger={0.05}>
            {"Let’s build"}
          </MaskText>
          <MaskText as="span" className="big-line" split="words" stagger={0.05} delay={0.1}>
            something great.
          </MaskText>
        </h2>

        <Reveal delay={0.2}>
          <Magnetic strength={0.2} className="inline-block">
            <a href={DATA.contact.social.email.url} className="contact-mail">
              {DATA.contact.email}
              <span aria-hidden>→</span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="socials">
            {SOCIALS.map(([name, s]) => (
              <Magnetic key={name} strength={0.25}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                >
                  <s.icon />
                  {s.name}
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
