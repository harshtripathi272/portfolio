import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-28 pt-32 md:px-10">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <span className="eyebrow">
          <span className="size-1.5 rounded-full bg-[hsl(var(--accent))]" />
          Writing
        </span>
        <h1 className="mt-5 font-serif text-6xl font-light tracking-tight md:text-7xl">
          Blog
        </h1>
      </BlurFade>

      <div className="mt-14 border-t border-foreground/15">
        {posts
          .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="group flex items-center justify-between gap-6 border-b border-foreground/15 py-6 transition-colors duration-300 hover:bg-foreground/[0.03]"
                href={`/blog/${post.slug}`}
              >
                <span className="font-serif text-xl font-light tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:italic md:text-3xl">
                  {post.metadata.title}
                </span>
                <span className="shrink-0 text-sm tabular-nums text-foreground/45">
                  {post.metadata.publishedAt}
                </span>
              </Link>
            </BlurFade>
          ))}
      </div>
    </main>
  );
}
