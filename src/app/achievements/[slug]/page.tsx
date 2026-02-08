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
          </div>
        </BlurFade>
      </section>
    </main>
  );
}
