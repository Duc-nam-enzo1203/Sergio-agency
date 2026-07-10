import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type ProjectItem = {
  id: string;
  title: string;
  category: string | null;
  description: string | null;
  coverImage: string | null;
  slug: string;
  color: string | null;
};

type FeaturedProjectsProps = {
  items: ProjectItem[];
};

export function FeaturedProjects({ items }: FeaturedProjectsProps) {
  const projects = items.slice(0, 3);
  if (projects.length === 0) return null;

  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="site-container">
        <div className="flex flex-col gap-8 border-b border-ink/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Our recent projects
            </p>
            <h2 className="font-display mt-4 max-w-[10ch] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink">
              Dự án gần đây.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-all hover:gap-3"
            >
              Xem tất cả dự án
              <span aria-hidden>→</span>
            </Link>
          </AnimateOnScroll>
        </div>

        <div className="mt-4 divide-y divide-ink/10">
          {projects.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={0.08 + i * 0.08}>
              <Link
                href={`/du-an/${project.slug}`}
                className="group grid items-center gap-6 py-10 sm:gap-10 sm:py-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
              >
                <div className="order-2 flex flex-col lg:order-1">
                  <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                    <span>0{i + 1}</span>
                    {project.category ? (
                      <>
                        <span className="h-px w-6 bg-ink/20" />
                        <span>{project.category}</span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-3xl lg:text-4xl">
                    {project.title}
                  </h3>
                  {project.description ? (
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55 sm:text-base line-clamp-3">
                      {project.description}
                    </p>
                  ) : null}
                  <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-500 group-hover:gap-3 group-hover:border-ink group-hover:bg-ink group-hover:text-cream">
                    Show project
                    <span aria-hidden>→</span>
                  </span>
                </div>

                <div className="order-1 relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-ink/5 ring-1 ring-ink/10 sm:aspect-[16/9] lg:order-2 lg:aspect-[5/3]">
                  {project.coverImage ? (
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      priority={i === 0}
                      className="object-cover transition-transform duration-[1.15s] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06]"
                      sizes="(max-width: 1024px) 100vw, 700px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/5" />
                  )}
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
