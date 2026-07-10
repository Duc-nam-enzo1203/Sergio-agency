import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaSection } from "@/components/home/CtaSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedPosts } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Bài viết — Sergio Agency",
  description: "Kiến thức về thiết kế web, landing page và digital marketing.",
};

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN").format(date);
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Kiến thức & xu hướng"
        description="Chia sẻ kinh nghiệm thiết kế web, landing page và các xu hướng digital mới nhất."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post, i) => (
              <AnimateOnScroll
                key={post.id}
                delay={i * 0.06}
                className={i === 0 ? "sm:col-span-2" : ""}
              >
                <Link
                  href={`/bai-viet/${post.slug}`}
                  className={`group flex h-full overflow-hidden rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5 transition-all duration-500 hover:ring-ink/10 ${
                    i === 0 ? "sm:flex-row" : "flex-col"
                  }`}
                >
                  {post.coverImage && (
                    <div
                      className={`relative overflow-hidden rounded-[calc(1.75rem-0.375rem)] ${
                        i === 0
                          ? "aspect-[16/10] sm:aspect-auto sm:min-h-[280px] sm:w-1/2"
                          : "aspect-[16/10]"
                      }`}
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={
                          i === 0
                            ? "(max-width: 640px) 100vw, 50vw"
                            : "(max-width: 768px) 100vw, 50vw"
                        }
                      />
                    </div>
                  )}
                  <div
                    className={`flex flex-col justify-center p-6 ${
                      i === 0 ? "sm:w-1/2 sm:p-8" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs text-ink/50">
                      {post.tag && (
                        <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-medium text-ink/60">
                          {post.tag}
                        </span>
                      )}
                      <time>{formatDate(post.publishedAt)}</time>
                      {post.readTime && <span>· {post.readTime}</span>}
                    </div>
                    <h2
                      className={`mt-3 font-display font-semibold leading-snug text-ink transition-colors group-hover:text-ink/80 ${
                        i === 0 ? "text-2xl sm:text-3xl" : "text-xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 sm:text-base">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
                      Đọc thêm →
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
