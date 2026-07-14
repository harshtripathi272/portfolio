import { Hero } from "@/components/kinetic/hero";
import { SkillMarquee } from "@/components/kinetic/marquee";
import { ProjectReel } from "@/components/kinetic/project-reel";
import { WorkList } from "@/components/kinetic/work-list";
import { Awards } from "@/components/kinetic/awards";
import { Stats } from "@/components/kinetic/stats";
import { Contact } from "@/components/kinetic/contact";
import { MaskText } from "@/components/motion/mask-text";
import { DATA } from "@/data/resume";

export default function Page() {
  return (
    <>
      <Hero />
      <SkillMarquee />

      {/* About — one long sentence, unmasking word by word. */}
      <section className="section" id="about">
        <div className="shell">
          <p className="eyebrow">
            <span className="eyebrow-num">00</span> About
          </p>
          <MaskText
            as="p"
            className="about-lead"
            split="words"
            stagger={0.028}
          >
            {DATA.summary}
          </MaskText>
        </div>
      </section>

      <Stats />
      <ProjectReel />
      <WorkList />
      <Awards />
      <Contact />
    </>
  );
}
