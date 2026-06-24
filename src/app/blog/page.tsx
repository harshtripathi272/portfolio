import { getBlogPosts } from "@/data/blog";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="page-fade">
      <section className="content-section">
        <h1 className="section-title">
          Blog<span className="accent">.</span>
        </h1>
        <div className="project-grid">
          {posts
            .sort((a, b) =>
              new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt) ? -1 : 1
            )
            .map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="project-card">
                <div className="project-card-body" style={{ padding: "18px" }}>
                  <div className="project-card-head">
                    <h3>{post.metadata.title}</h3>
                  </div>
                  {post.metadata.summary && <p>{post.metadata.summary}</p>}
                  <span className="font-mono text-xs" style={{ color: "var(--muted)" }}>
                    {post.metadata.publishedAt}
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
