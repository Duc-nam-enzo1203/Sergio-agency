"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export type PostListItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  tag: string | null;
  publishedAt: Date | string | null;
  readTime: string | null;
  author: string | null;
};

type PostListProps = {
  posts: PostListItem[];
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 5;

function formatDate(date: Date | string | null) {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

export function PostList({ posts, pageSize = DEFAULT_PAGE_SIZE }: PostListProps) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const p of posts) {
      if (p.tag) set.add(p.tag);
    }
    return ["Tất cả", ...Array.from(set)];
  }, [posts]);

  const [activeTag, setActiveTag] = useState("Tất cả");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(
    () =>
      activeTag === "Tất cả"
        ? posts
        : posts.filter((p) => p.tag === activeTag),
    [activeTag, posts],
  );

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);
  const visibleRest = rest.slice(0, Math.max(0, visibleCount - 1));
  const shownCount = (featured ? 1 : 0) + visibleRest.length;
  const remaining = Math.max(0, filtered.length - shownCount);

  function selectTag(tag: string) {
    setActiveTag(tag);
    setVisibleCount(pageSize);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Lọc theo chủ đề"
        className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-ink/10"
      >
        {tags.map((tag) => {
          const active = activeTag === tag;
          return (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectTag(tag)}
              className={`relative px-3 py-4 text-sm font-medium transition-colors duration-300 sm:px-4 ${
                active ? "text-ink" : "text-ink/40 hover:text-ink/70"
              }`}
            >
              {tag}
              <span
                aria-hidden
                className={`absolute inset-x-3 bottom-0 h-[2px] origin-left bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-x-4 ${
                  active ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          );
        })}
      </div>

      {filtered.length > 0 ? (
        <p className="pt-6 text-xs font-medium uppercase tracking-[0.14em] text-ink/40">
          Hiển thị {shownCount} / {filtered.length} bài viết
        </p>
      ) : null}

      {featured ? (
        <AnimateOnScroll>
          <Link
            href={`/bai-viet/${featured.slug}`}
            className="group grid items-center gap-8 border-b border-ink/10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 ring-1 ring-ink/10 sm:aspect-[16/9]">
              {featured.coverImage ? (
                <SafeImage
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-[1.15s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/5" />
              )}
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
              <span className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream mix-blend-difference sm:left-5 sm:top-5">
                Featured
              </span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                {featured.tag ? <span>{featured.tag}</span> : null}
                {featured.publishedAt ? (
                  <>
                    <span className="h-px w-6 bg-ink/20" />
                    <time className="normal-case tracking-normal">
                      {formatDate(featured.publishedAt)}
                    </time>
                  </>
                ) : null}
                {featured.readTime ? (
                  <>
                    <span className="h-px w-6 bg-ink/20" />
                    <span>{featured.readTime}</span>
                  </>
                ) : null}
              </div>
              <h2 className="font-display mt-4 text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink transition-transform duration-500 group-hover:translate-x-1">
                {featured.title}
              </h2>
              {featured.excerpt ? (
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55 sm:text-base line-clamp-3">
                  {featured.excerpt}
                </p>
              ) : null}
              <span className="mt-8 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/55 transition-all duration-500 group-hover:gap-4 group-hover:text-ink">
                Đọc bài viết
                <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ink/20">
                  <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100" />
                  <span className="relative transition-colors duration-500 group-hover:text-cream">
                    →
                  </span>
                </span>
              </span>
            </div>
          </Link>
        </AnimateOnScroll>
      ) : null}

      <div className="divide-y divide-ink/10">
        {visibleRest.map((post, i) => (
          <AnimateOnScroll key={post.id} delay={Math.min(i, 4) * 0.05}>
            <Link
              href={`/bai-viet/${post.slug}`}
              className="group grid items-center gap-6 py-8 sm:grid-cols-[200px_1fr] sm:gap-10 sm:py-10 lg:grid-cols-[240px_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5 ring-1 ring-ink/10">
                {post.coverImage ? (
                  <SafeImage
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="240px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/5" />
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                  {post.tag ? <span>{post.tag}</span> : null}
                  {post.publishedAt ? (
                    <>
                      <span className="h-px w-5 bg-ink/20" />
                      <time className="normal-case tracking-normal">
                        {formatDate(post.publishedAt)}
                      </time>
                    </>
                  ) : null}
                  {post.readTime ? (
                    <>
                      <span className="h-px w-5 bg-ink/20" />
                      <span>{post.readTime}</span>
                    </>
                  ) : null}
                </div>
                <h2 className="font-display mt-3 text-xl font-semibold tracking-tight text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                  {post.title}
                </h2>
                {post.excerpt ? (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/55 line-clamp-2 sm:text-base">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

      {remaining > 0 ? (
        <div className="flex flex-col items-center gap-3 border-t border-ink/10 py-12">
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + pageSize)}
            className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-cream px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-cream"
          >
            Xem thêm {Math.min(pageSize, remaining)} bài
            <span
              aria-hidden
              className="transition-transform duration-500 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </button>
          <p className="text-sm text-ink/40">Còn {remaining} bài viết</p>
        </div>
      ) : null}

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-ink/45">
          Chưa có bài viết trong chủ đề này.
        </p>
      )}
    </div>
  );
}
