"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { projectCategories } from "@/lib/data";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type ProjectItem = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
};

type ProjectGridProps = {
  projects: ProjectItem[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered =
    activeCategory === "Tất cả"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeCategory === cat
                ? "bg-ink text-cream"
                : "bg-ink/5 text-ink/70 hover:bg-ink/10 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <AnimateOnScroll key={project.id} delay={i * 0.06} variant="scale">
            <Link
              href={`/du-an/${project.slug}`}
              className="group block overflow-hidden rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:bg-ink/[0.05] hover:ring-ink/15 hover:shadow-[0_20px_50px_-28px_rgba(17,17,17,0.35)]"
            >
              <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-cream">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.08]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink/10 to-ink/5">
                      <span className="text-xs font-medium uppercase tracking-widest text-ink/30">
                        No image
                      </span>
                    </div>
                  )}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color || "from-ink/20"} to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-35`}
                  />
                </div>
                <div className="p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50">
                    {project.category}
                  </span>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">
                    {project.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-all duration-500 group-hover:gap-3 group-hover:text-ink">
                    Xem chi tiết
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
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-ink/50">
          Chưa có dự án trong danh mục này.
        </p>
      )}
    </>
  );
}
