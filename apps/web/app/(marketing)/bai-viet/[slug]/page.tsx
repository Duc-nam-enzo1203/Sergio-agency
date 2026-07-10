import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/home/CtaSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  getPostBySlug,
  getPublishedPosts,
  getRelatedPosts,
} from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy" };
  return {
    title: `${post.title} — Sergio Agency`,
    description: post.excerpt ?? undefined,
  };
}

function renderMarkdown(content: string) {
  const blocks = content.split("\n\n");
  return blocks.map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display mt-10 mb-4 text-2xl font-semibold text-ink"
        >
          {block.replace("## ", "")}
        </h2>
      );
    }
    return (
      <p key={i} className="mb-4 text-base leading-relaxed text-ink/70">
        {block}
      </p>
    );
  });
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN").format(date);
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <>
      <article className="pt-28 sm:pt-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <AnimateOnScroll>
            <Link
              href="/bai-viet"
              className="mb-6 inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
            >
              ← Tất cả bài viết
            </Link>
            <div className="flex flex-wrap items-center gap-3 text-xs text-ink/50">
              {post.tag && (
                <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-medium text-ink/60">
                  {post.tag}
                </span>
              )}
              <time>{formatDate(post.publishedAt)}</time>
              {post.readTime && <span>· {post.readTime}</span>}
              {post.author && <span>· {post.author}</span>}
            </div>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-ink/60">
                {post.excerpt}
              </p>
            )}
          </AnimateOnScroll>

          {post.coverImage && (
            <AnimateOnScroll delay={0.1}>
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-ink/10">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={0.15}>
            <div className="prose-custom mt-12 pb-16">
              {renderMarkdown(post.content)}
            </div>
          </AnimateOnScroll>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-cream-dark/30 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-xl font-semibold text-ink">
              Bài viết liên quan
            </h2>
            <div className="mt-6 space-y-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/bai-viet/${p.slug}`}
                  className="group block rounded-2xl bg-cream p-5 ring-1 ring-ink/5 transition-all hover:ring-ink/10"
                >
                  {p.tag && (
                    <span className="text-[10px] uppercase tracking-wider text-ink/50">
                      {p.tag}
                    </span>
                  )}
                  <h3 className="mt-1 font-display font-semibold text-ink group-hover:text-ink/80">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
