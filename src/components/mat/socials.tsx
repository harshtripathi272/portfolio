"use client";

import { Github, Linkedin, Mail, Twitter, FileText } from "lucide-react";
import { socialMedia, type SocialPlatform } from "@/data/portfolio";

const ICON: Record<SocialPlatform, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  twitter: Twitter,
  resume: FileText,
};

export function Socials({ className = "" }: { className?: string }) {
  return (
    <div className={"mat-socials " + className}>
      {socialMedia.map((s) => {
        const Icon = ICON[s.platform];
        return (
          <a
            key={s.id}
            href={s.link}
            target={s.platform === "mail" ? undefined : "_blank"}
            rel="noreferrer noopener"
            aria-label={s.label}
            className="mat-social"
          >
            <Icon className="size-[18px]" />
          </a>
        );
      })}
    </div>
  );
}
