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

// Detailed content for SafeWander (Student Innovators Without Borders)
const SafeWanderContent = () => (
  <div className="space-y-8">
    {/* Why Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span> Why We Built This
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          <strong>Dementia wandering</strong> is one of the most dangerous behaviors associated with Alzheimer&apos;s and other forms of dementia. Up to 60% of people with dementia will wander at least once, and if not found within 24 hours, up to 50% risk serious injury or death.
        </p>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We built SafeWander to address this critical need:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
          <li><strong>Early Detection:</strong> Catch wandering incidents before they become emergencies through intelligent geofencing and real-time monitoring</li>
          <li><strong>Rapid Response:</strong> Enable caregivers to respond within minutes, not hours, with live location tracking and emergency mode</li>
          <li><strong>Peace of Mind:</strong> Allow family members to monitor loved ones remotely without being physically present 24/7</li>
          <li><strong>Coordinated Search:</strong> When incidents do occur, enable rapid coordination with emergency contacts and authorities</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4 italic">
          &quot;Safe steps, peaceful mind&quot; - Our tagline reflects our mission to ensure dementia patients can maintain their independence while keeping caregivers informed and families at peace.
        </p>
      </div>
    </section>

    {/* What Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span> What We Built
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-relaxed">
          <strong>SafeWander</strong> is a comprehensive full-stack application for monitoring and ensuring the safety of dementia patients. The system provides:
        </p>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">🛡️ Prevention Features</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Real-time GPS tracking with live map updates</li>
          <li>Intelligent geofence zones with automatic boundary alerts</li>
          <li>Battery monitoring to ensure device is always active</li>
          <li>Activity timeline to understand patient patterns</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">🔍 Detection Features</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Multi-level alert system (Critical/High/Medium/Low)</li>
          <li>Intelligent escalation when alerts go unacknowledged</li>
          <li>Zone boundary detection with instant notifications</li>
          <li>Anomaly detection for unusual movement patterns</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-3">🚨 Emergency Response</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>One-click emergency activation</li>
          <li>Live location sharing with shareable links</li>
          <li>Emergency contact notifications</li>
          <li>Search radius management and visualization</li>
          <li>Missing person profile with photo and medical info</li>
        </ul>
      </div>
    </section>

    {/* How Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">⚙️</span> How We Built It
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <h3 className="text-lg font-semibold mt-4 mb-2">Frontend Stack</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li><strong>Next.js 15</strong> with App Router for a modern React framework</li>
          <li><strong>TypeScript</strong> for type safety across the entire codebase</li>
          <li><strong>Tailwind CSS v4</strong> for utility-first styling</li>
          <li><strong>shadcn/ui</strong> for polished, accessible UI components</li>
          <li><strong>Leaflet.js</strong> for interactive maps with search radius visualization</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-2">Backend Stack</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li><strong>FastAPI</strong> for a modern, high-performance Python web framework</li>
          <li><strong>SQLAlchemy</strong> for ORM-based database operations</li>
          <li><strong>SQLite</strong> for a serverless database solution</li>
          <li><strong>Pydantic</strong> for robust data validation</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-6 mb-2">Key Implementation Details</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Real-time data synchronization with auto-refresh</li>
          <li>All buttons fully functional and connected to backend APIs</li>
          <li>SQLite database tracks all patient data, alerts, and events</li>
          <li>Responsive design that works on desktop and mobile devices</li>
        </ul>
      </div>
    </section>

    {/* Demo Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🎬</span> Demo Video
      </h2>
      <div className="rounded-lg overflow-hidden border bg-card aspect-video">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/lWFLmTwNg1I"
          title="SafeWander Demo Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>

    {/* Impact Section */}
    <section>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-2xl">🏆</span> Recognition & Impact
      </h2>
      <div className="prose dark:prose-invert max-w-none">
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Secured <strong>1st place</strong> among 957 participants internationally</li>
          <li>Built a complete, production-ready full-stack application in hackathon timeframe</li>
          <li>Addressed a critical real-world problem affecting millions of dementia patients globally</li>
          <li>Demonstrated technical excellence with modern tech stack (Next.js 15, FastAPI, TypeScript)</li>
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
  const isSafeWander = achievement.slug === "student-innovators-without-borders";

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
                  {"devpost" in achievement.links && achievement.links.devpost && (
                    <Link
                      href={achievement.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-md transition-colors"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853H10.112z"/>
                      </svg>
                      View on Devpost
                    </Link>
                  )}
                  {"demo" in achievement.links && achievement.links.demo && (
                    <Link
                      href={achievement.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition-colors"
                    >
                      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch Demo
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

        {/* Detailed Content for SafeWander */}
        {isSafeWander && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="mt-8">
              <SafeWanderContent />
            </div>
          </BlurFade>
        )}
      </section>
    </main>
  );
}
