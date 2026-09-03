import { MatBackground } from "@/components/mat/mat-background";
import { FloatingNav } from "@/components/mat/floating-nav";
import { Profile } from "@/components/mat/profile";
import { Hackathons } from "@/components/mat/hackathons";
import { Timeline } from "@/components/mat/timeline";
import { Projects } from "@/components/mat/projects";
import { Connect } from "@/components/mat/connect";

export default function Page() {
  return (
    <div className="mat-root">
      <MatBackground />
      <FloatingNav />
      <main className="mat-main">
        <Profile />
        <Hackathons />
        <Timeline />
        <Projects />
        <Connect />
      </main>
    </div>
  );
}
