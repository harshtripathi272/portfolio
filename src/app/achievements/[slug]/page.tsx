import { DATA } from "@/data/resume";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";

const BLUR_FADE_DELAY = 0.04;

export async function generateStaticParams() {
  return DATA.achievements.map((achievement) => ({
    slug: achievement.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = DATA.achievements.find((a) => a.slug === params.slug);

  if (!achievement) {
    return {};
  }

  return {
    title: `${achievement.title} | ${DATA.name}`,
    description: achievement.description,
  };
}

export default async function AchievementPage({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = DATA.achievements.find((a) => a.slug === params.slug);

  if (!achievement) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section className="w-full max-w-2xl mx-auto">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <Link
            href="/#achievements"
            className="text-sm text-muted-foreground hover:text-foreground mb-4 inline-block"
          >
            ← Back to Achievements
          </Link>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl">{achievement.icon}</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {achievement.title}
              </h1>
              <p className="text-muted-foreground">{achievement.date}</p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="rounded-lg border bg-card p-6 space-y-6">
            {/* Event Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Event
                </h3>
                <p className="font-semibold">{achievement.details.event}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Placement
                </h3>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {achievement.details.placement}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Competition Size
                </h3>
                <p className="font-semibold">{achievement.details.participants}</p>
              </div>
              {achievement.details.project && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">
                    Project
                  </h3>
                  <p className="font-semibold">{achievement.details.project}</p>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {achievement.details.techStack.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {achievement.details.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Long Description */}
            {achievement.longDescription && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  About
                </h3>
                <p className="text-sm leading-relaxed">
                  {achievement.longDescription}
                </p>
              </div>
            )}

            {/* Highlights */}
            {achievement.details.highlights.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Key Highlights
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {achievement.details.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {"links" in achievement && achievement.links && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {achievement.links.github && (
                    <Link
                      href={achievement.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-md transition-colors"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Repository
                    </Link>
                  )}
                  {achievement.links.pr && (
                    <Link
                      href={achievement.links.pr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-md transition-colors"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 3a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-3 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm12-9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-3 3a3 3 0 1 1 6 0 3 3 0 0 1-6 0zM6 8.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V9a.5.5 0 0 1 .5-.5zm8.5 3.5a.5.5 0 0 0-1 0v3.5a.5.5 0 0 0 .5.5h3.5a.5.5 0 0 0 0-1H15v-3z"/>
                      </svg>
                      View Pull Request
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
