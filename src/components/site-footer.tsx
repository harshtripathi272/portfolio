import { DATA } from "@/data/resume";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-bar">
      <span>
        © {year} {DATA.name}
      </span>
      <span>{DATA.location}</span>
      <span>Next.js · Framer Motion</span>
    </footer>
  );
}
