import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

type PostItem = {
  id: string;
  title: string;
  excerpt: string | null;
  slug: string;
  tag: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
};

type BlogPreviewProps = {
  items: PostItem[];
};

function formatDate(date: Date | null) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN").format(date);
}

export function BlogPreview({ items }: BlogPreviewProps) {
  return (
    <section className="bg-cream-dark/30 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Bài viết"
            title="Kiến thức & xu hướng"
            description="Chia sẻ kinh nghiệm thiết kế web, landing page và digital marketing."
          />
          <AnimateOnScroll>
            <Button href="/bai-viet" variant="secondary" className="shrink-0">
              Xem tất cả
            </Button>
          </AnimateOnScroll>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post, i) => (
            <AnimateOnScroll key={post.id} delay={i * 0.1}>
              <Link
                href={`/bai-viet/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream p-1.5 ring-1 ring-ink/5 transition-all duration-500 hover:ring-ink/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
                  <Image
                    src={post.coverImage ?? "/next.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3 text-xs text-ink/50">
                    <span className="rounded-full bg-ink/5 px-2.5 py-0.5 font-medium text-ink/60">
                      {post.tag}
                    </span>
                    <time>{formatDate(post.publishedAt)}</time>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-ink/80">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                    {post.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
                    Đọc thêm
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 11L11 3M11 3H5M11 3V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
