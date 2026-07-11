import type { Metadata } from "next";
import { CtaSection } from "@/components/home/CtaSection";
import { PostList } from "@/components/blog/PostList";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Bài viết — Sergio Agency",
  description: "Kiến thức về thiết kế web, landing page và digital marketing.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const tags = new Set(posts.map((p) => p.tag).filter(Boolean) as string[]);

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_15%_-10%,rgba(17,17,17,0.05),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_10%,rgba(243,238,230,0.95),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        </div>

        <div className="relative site-container">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                Insights
              </p>
              <h1 className="font-display mt-5 max-w-[11ch] text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
                Bài viết
                <span className="mt-2 block text-ink/35">& kiến thức.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
                Kinh nghiệm thiết kế web, landing page, branding và các xu hướng
                digital giúp thương hiệu tăng trưởng.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="flex flex-col gap-8 border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <dl className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Bài viết
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {String(posts.length).padStart(2, "0")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Chủ đề
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {String(tags.size).padStart(2, "0")}
                    </dd>
                  </div>
                </dl>
                <Button href="/lien-he" variant="secondary">
                  Đặt lịch tư vấn
                </Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="site-container">
          <PostList
            posts={posts.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              coverImage: p.coverImage,
              tag: p.tag,
              publishedAt: p.publishedAt,
              readTime: p.readTime,
              author: p.author,
            }))}
          />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
