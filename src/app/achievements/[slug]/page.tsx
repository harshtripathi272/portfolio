import { DATA } from "@/data/resume";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/magicui/blur-fade";
import Image from "next/image";

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

// Detailed content for Perforated AI Hackathon
const PerforatedAIContent = () => (
  <div className="space-y-8">
    {/* Why Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span> Why We Did This
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          Object detection is fundamental to numerous real-world applications including <strong>autonomous vehicles</strong>, <strong>surveillance systems</strong>, <strong>robotics</strong>, and <strong>medical imaging</strong>. YOLOv11n represents the latest evolution in the YOLO family, designed for real-time detection with high accuracy.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Improving the accuracy of an object detection system matters because:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
          <li><strong>Safety-Critical Applications:</strong> In autonomous driving and medical imaging, even small improvements in detection accuracy can prevent accidents or catch diseases earlier, potentially saving lives.</li>
          <li><strong>Data Efficiency:</strong> Many real-world scenarios have limited labeled data. If dendrites can achieve higher accuracy with the same data (or match baseline accuracy with less data), this reduces annotation costs and enables deployment in data-scarce domains.</li>
          <li><strong>Resource Optimization:</strong> Better accuracy with the same model architecture means organizations don&apos;t need to scale up to larger, more expensive models to achieve their performance targets.</li>
          <li><strong>Scalability:</strong> Improvements on benchmark datasets like VOC2007 typically transfer to custom datasets, making this research applicable across industries from retail to agriculture to manufacturing.</li>
        </ul>
      </div>
    </section>

    {/* What Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span> What We Built
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          We demonstrated the application of <strong>PerforatedAI&apos;s dendritic neural network optimization</strong> to YOLOv11n object detection on the Pascal VOC2007 dataset. The goal was to prove that dendrite-enhanced networks can achieve <strong>higher accuracy</strong> on the same data compared to traditional neural networks.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We implemented a custom training loop that integrates PAI&apos;s dendritic optimization with Ultralytics&apos; YOLOv11n, enabling:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
          <li><strong>Adaptive plateau detection</strong> (DOING_HISTORY mode) for optimal dendrite addition using Open Source PAI Dendrites</li>
          <li><strong>Data efficiency experiments</strong> at multiple training set sizes (100%, 50%)</li>
          <li><strong>Reproducible results</strong> with seed=42 and deterministic settings</li>
        </ul>
      </div>
    </section>

    {/* How Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚙️</span> How We Did It
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-lg font-semibold mt-4 mb-2">Key Implementation Details</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Custom Training Loop:</strong> We implemented a custom training loop because Ultralytics&apos; default YOLO.train() cannot be used with PAI - add_validation_score() must be called every epoch.</li>
          <li><strong>Module Configuration:</strong> We configured PAI to add dendrites to YOLO&apos;s feature extraction blocks (C3k2, C3k, C2PSA, Bottleneck, PSABlock) while tracking but not modifying normalization layers.</li>
          <li><strong>Reproducibility:</strong> All experiments use seed=42 with deterministic settings for reproducibility.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-2">Dataset: Pascal VOC2007</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>20 object classes</li>
          <li>~5,000 training images</li>
          <li>~5,000 test images</li>
          <li>Standard object detection benchmark</li>
        </ul>
      </div>
    </section>

    {/* Results Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span> Results
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-border rounded-lg">
          <thead>
            <tr className="bg-muted">
              <th className="border border-border px-4 py-2 text-left">Metric</th>
              <th className="border border-border px-4 py-2 text-center">100% Data</th>
              <th className="border border-border px-4 py-2 text-center">50% Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border px-4 py-2 font-medium">Baseline mAP50</td>
              <td className="border border-border px-4 py-2 text-center">54.30</td>
              <td className="border border-border px-4 py-2 text-center">49.55</td>
            </tr>
            <tr>
              <td className="border border-border px-4 py-2 font-medium">With Dendrites mAP50</td>
              <td className="border border-border px-4 py-2 text-center text-green-600 dark:text-green-400 font-bold">56.60</td>
              <td className="border border-border px-4 py-2 text-center text-green-600 dark:text-green-400 font-bold">52.45</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-2 font-medium">Absolute Improvement</td>
              <td className="border border-border px-4 py-2 text-center text-green-600 dark:text-green-400 font-bold">+2.30</td>
              <td className="border border-border px-4 py-2 text-center text-green-600 dark:text-green-400 font-bold">+2.90</td>
            </tr>
            <tr className="bg-muted/50">
              <td className="border border-border px-4 py-2 font-medium">Remaining Error Reduced</td>
              <td className="border border-border px-4 py-2 text-center">5.03%</td>
              <td className="border border-border px-4 py-2 text-center">5.75%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4">
        <strong>Key Insight:</strong> The remaining error improvement percentage remains stable (or slightly increases) as data decreases, suggesting dendrites are particularly valuable in data-constrained scenarios.
      </p>
    </section>

    {/* Graphs Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">📈</span> Training Graphs
      </h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-3">Comparison Graph - 100% Data</h3>
          <div className="rounded-lg overflow-hidden border bg-card">
            <Image
              src="/achievements/full_comparison.jpeg"
              alt="Comparison Graph for 100% Data showing baseline vs dendrite performance"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-3">Comparison Graph - 50% Data</h3>
          <div className="rounded-lg overflow-hidden border bg-card">
            <Image
              src="/achievements/half_comparison.jpeg"
              alt="Comparison Graph for 50% Data showing baseline vs dendrite performance"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold mb-3">PAI Graph - 100% Data</h3>
            <div className="rounded-lg overflow-hidden border bg-card">
              <Image
                src="/achievements/dendrite_100.png"
                alt="PAI Graph for 100% Data"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">PAI Graph - 50% Data</h3>
            <div className="rounded-lg overflow-hidden border bg-card">
              <Image
                src="/achievements/dendrite_50.png"
                alt="PAI Graph for 50% Data"
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Impact Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🏆</span> Recognition & Impact
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Secured <strong>3rd place globally</strong> among 693 participants</li>
          <li>Our submission was <strong>officially adopted</strong> as a base example in PerforatedAI&apos;s official GitHub repository</li>
          <li>Demonstrated practical application of dendritic neural networks in production-ready object detection</li>
        </ul>
      </div>
    </section>
  </div>
);

export default async function AchievementPage({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = DATA.achievements.find((a) => a.slug === params.slug);

  if (!achievement) {
    notFound();
  }

  const isPerforatedAI = achievement.slug === "perforated-ai-hackathon";

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section className="w-full max-w-3xl mx-auto">
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                      <svg className="size-4" viewBox="0 0 16 16" fill="currentColor">
                        <path fillRule="evenodd" d="M7.177 3.073L9.573.677A.25.25 0 0110 .854v4.792a.25.25 0 01-.427.177L7.177 3.427a.25.25 0 010-.354zM3.75 2.5a.75.75 0 100 1.5.75.75 0 000-1.5zm-2.25.75a2.25 2.25 0 113 2.122v5.256a2.251 2.251 0 11-1.5 0V5.372A2.25 2.25 0 011.5 3.25zM11 2.5h-1V4h1a1 1 0 011 1v5.628a2.251 2.251 0 101.5 0V5A2.5 2.5 0 0011 2.5zm1 10.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zM3.75 12a.75.75 0 100 1.5.75.75 0 000-1.5z"/>
                      </svg>
                      View Pull Request
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </BlurFade>

        {/* Detailed Content for Perforated AI */}
        {isPerforatedAI && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-8">
              <PerforatedAIContent />
            </div>
          </BlurFade>
        )}

        {/* Generic content for other achievements */}
        {!isPerforatedAI && achievement.longDescription && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-8 rounded-lg border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {achievement.longDescription}
              </p>
              
              {achievement.details.highlights.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Key Highlights</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {achievement.details.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </BlurFade>
        )}
      </section>
    </main>
  );
}
