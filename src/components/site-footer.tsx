import { DATA } from "@/data/resume";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="stack">
        <span>© {year} {DATA.name}</span>
        <span>Built with ❤️ — Next.js</span>
      </div>
      <div className="font-mono text-xs">{DATA.location}</div>
    </footer>
  );
}
