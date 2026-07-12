import type { Metadata } from "next";
import { SafeImage } from "@/components/ui/SafeImage";
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
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-display mt-12 mb-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          {trimmed.replace(/^##\s+/, "")}
        </h2>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="font-display mt-8 mb-3 text-xl font-semibold text-ink"
        >
          {trimmed.replace(/^###\s+/, "")}
        </h3>
      );
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items = trimmed.split("\n").filter((l) => /^[-*]\s+/.test(l));
      return (
        <ul key={i} className="my-6 space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base leading-relaxed text-ink/70"
            >
              <span
                aria-hidden
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink/40"
              />
              {item.replace(/^[-*]\s+/, "")}
            </li>
          ))}
        </ul>
      );
    }

    return (
      <p key={i} className="mb-5 text-base leading-[1.75] text-ink/70 sm:text-lg">
        {trimmed}
      </p>
    );
  });
}

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const all = await getPublishedPosts();
  const index = Math.max(
    0,
    all.findIndex((p) => p.id === post.id),
  );
  const num = String(index + 1).padStart(2, "0");
  const related = await getRelatedPosts(slug);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <>
      <article>
        <section className="relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_0%,rgba(243,238,230,0.9),transparent_55%)]" />
          </div>

          <div className="relative site-container">
            <AnimateOnScroll>
              <Link
                href="/bai-viet"
                className="inline-flex items-center gap-2 text-sm text-ink/45 transition-colors hover:text-ink"
              >
                ← Tất cả bài viết
              </Link>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                <span>{num}</span>
                {post.tag ? (
                  <>
                    <span className="h-px w-6 bg-ink/20" />
                    <span>{post.tag}</span>
                  </>
                ) : null}
                {post.publishedAt ? (
                  <>
                    <span className="h-px w-6 bg-ink/20" />
                    <time className="normal-case tracking-normal">
                      {formatDate(post.publishedAt)}
                    </time>
                  </>
                ) : null}
                {post.readTime ? (
                  <>
                    <span className="h-px w-6 bg-ink/20" />
                    <span>{post.readTime}</span>
                  </>
                ) : null}
              </div>

              <h1 className="font-display mt-5 max-w-[18ch] text-[clamp(2.25rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
                {post.title}
              </h1>

              {post.excerpt ? (
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/55 sm:text-xl">
                  {post.excerpt}
                </p>
              ) : null}

              {post.author ? (
                <p className="mt-8 text-sm text-ink/45">
                  Viết bởi{" "}
                  <span className="font-medium text-ink/70">{post.author}</span>
                </p>
              ) : null}
            </AnimateOnScroll>
          </div>
        </section>

        {post.coverImage ? (
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/5 sm:aspect-[21/9]">
            <SafeImage
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-transparent opacity-40" />
          </div>
        ) : null}

        <section className="bg-cream py-14 sm:py-20">
          <div className="site-container">
            <div className="mx-auto max-w-2xl">
              <AnimateOnScroll>
                <div className="border-t border-ink/10 pt-2">
                  {renderMarkdown(post.content)}
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="border-t border-ink/10 bg-[#F3EEE6] py-20 sm:py-28">
          <div className="site-container">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Keep reading
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Bài viết liên quan.
              </h2>
            </AnimateOnScroll>

            <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
              {related.map((p, i) => (
                <AnimateOnScroll key={p.id} delay={0.05 + i * 0.06}>
                  <Link
                    href={`/bai-viet/${p.slug}`}
                    className="group grid items-center gap-6 py-8 sm:grid-cols-[180px_1fr] sm:gap-10 sm:py-10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 ring-1 ring-ink/10">
                      {p.coverImage ? (
                        <SafeImage
                          src={p.coverImage}
                          alt={p.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="180px"
                        />
                      ) : null}
                    </div>
                    <div>
                      {p.tag ? (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                          {p.tag}
                        </span>
                      ) : null}
                      <h3 className="font-display mt-2 text-xl font-semibold text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                        {p.title}
                      </h3>
                      {p.excerpt ? (
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/55 line-clamp-2">
                          {p.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <section className="border-y border-ink/10 bg-cream">
          <div className="site-container grid sm:grid-cols-2">
            {prev && prev.id !== post.id ? (
              <Link
                href={`/bai-viet/${prev.slug}`}
                className="group flex flex-col gap-2 border-b border-ink/10 py-10 pr-6 transition-colors hover:bg-ink/[0.02] sm:border-b-0 sm:border-r sm:py-12 sm:pr-10"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                  Trước
                </span>
                <span className="font-display text-xl font-semibold text-ink transition-transform duration-500 group-hover:-translate-x-1 sm:text-2xl">
                  ← {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next && next.id !== post.id ? (
              <Link
                href={`/bai-viet/${next.slug}`}
                className="group flex flex-col items-start gap-2 py-10 transition-colors hover:bg-ink/[0.02] sm:items-end sm:py-12 sm:pl-10"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                  Tiếp theo
                </span>
                <span className="font-display text-xl font-semibold text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                  {next.title} →
                </span>
              </Link>
            ) : null}
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
