"use client";

import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projectCategories } from "@/lib/data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export type ProjectListItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  client?: string;
  year?: string;
};

type ProjectGridProps = {
  projects: ProjectListItem[];
  /** How many editorial rows to show before "Xem thêm". Default 4. */
  pageSize?: number;
};

const DEFAULT_PAGE_SIZE = 4;

export function ProjectGrid({
  projects,
  pageSize = DEFAULT_PAGE_SIZE,
}: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [visibleCount, setVisibleCount] = useState(pageSize);

  const filtered = useMemo(
    () =>
      activeCategory === "Tất cả"
        ? projects
        : projects.filter((p) => p.category === activeCategory),
    [activeCategory, projects],
  );

  const visible = filtered.slice(0, visibleCount);
  const remaining = Math.max(0, filtered.length - visible.length);
  const hasMore = remaining > 0;

  function selectCategory(cat: string) {
    setActiveCategory(cat);
    setVisibleCount(pageSize);
  }

  function loadMore() {
    setVisibleCount((n) => n + pageSize);
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Lọc theo danh mục"
        className="flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-ink/10"
      >
        {projectCategories.map((cat) => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectCategory(cat)}
              className={`relative px-3 py-4 text-sm font-medium transition-colors duration-300 sm:px-4 ${
                active ? "text-ink" : "text-ink/40 hover:text-ink/70"
              }`}
            >
              {cat}
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
          Hiển thị {visible.length} / {filtered.length} dự án
        </p>
      ) : null}

      <div className="divide-y divide-ink/10">
        {visible.map((project, i) => {
          const num = String(i + 1).padStart(2, "0");
          const reverse = i % 2 === 1;

          return (
            <AnimateOnScroll key={project.id} delay={Math.min(i % pageSize, 3) * 0.05}>
              <Link
                href={`/du-an/${project.slug}`}
                className="group grid items-center gap-8 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-ink/5 ring-1 ring-ink/10 sm:aspect-[16/9] ${
                    reverse ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  {project.image ? (
                    <SafeImage
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.15s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.05]"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/5" />
                  )}
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/15" />
                  <span className="absolute left-4 top-4 font-display text-xs font-semibold tracking-[0.16em] text-cream/90 mix-blend-difference sm:left-5 sm:top-5">
                    {num}
                  </span>
                </div>

                <div
                  className={`flex flex-col ${
                    reverse ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                    {project.category ? <span>{project.category}</span> : null}
                    {project.year ? (
                      <>
                        <span className="h-px w-6 bg-ink/20" />
                        <span>{project.year}</span>
                      </>
                    ) : null}
                    {project.client ? (
                      <>
                        <span className="h-px w-6 bg-ink/20" />
                        <span className="normal-case tracking-normal text-ink/50">
                          {project.client}
                        </span>
                      </>
                    ) : null}
                  </div>

                  <h2 className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
                    {project.title}
                  </h2>

                  {project.description ? (
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55 sm:text-base line-clamp-3">
                      {project.description}
                    </p>
                  ) : null}

                  <span className="mt-8 inline-flex w-fit items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink/55 transition-all duration-500 group-hover:gap-4 group-hover:text-ink">
                    Xem dự án
                    <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-ink/20">
                      <span className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100" />
                      <span className="relative text-ink transition-colors duration-500 group-hover:text-cream">
                        →
                      </span>
                    </span>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          );
        })}
      </div>

      {hasMore ? (
        <div className="flex flex-col items-center gap-3 border-t border-ink/10 py-12">
          <button
            type="button"
            onClick={loadMore}
            className="group inline-flex items-center gap-3 rounded-full border border-ink/15 bg-cream px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-all duration-500 hover:border-ink hover:bg-ink hover:text-cream"
          >
            Xem thêm {Math.min(pageSize, remaining)} dự án
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
          <p className="text-sm text-ink/40">
            Còn {remaining} dự án trong danh mục này
          </p>
        </div>
      ) : null}

      {filtered.length === 0 && (
        <p className="py-20 text-center text-sm text-ink/45">
          Chưa có dự án trong danh mục này.
        </p>
      )}
    </div>
  );
}
