import { DATA } from "@/data/resume";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = Object.entries(DATA.contact.social).filter(([, s]) => s.navbar);

  return (
    <footer className="site-footer-pro">
      <div className="footer-cta">
        <p className="footer-eyebrow font-mono">
          <span className="footer-dot" /> Open to opportunities
        </p>
        <h2 className="footer-title font-mono">
          Let&apos;s build something <span className="accent">great</span>.
        </h2>
        <a href={DATA.contact.social.email.url} className="cta-button footer-mail">
          {DATA.contact.email} →
        </a>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© {year} {DATA.name}</span>

        <div className="footer-socials">
          {socials.map(([name, s]) => (
            <Link
              key={name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="footer-social"
            >
              <s.icon />
            </Link>
          ))}
        </div>

        <span className="footer-built font-mono">Built with Next.js</span>
      </div>
    </footer>
  );
}
