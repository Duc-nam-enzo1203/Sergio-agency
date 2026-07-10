import Image from "next/image";
import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
  const [main, ...rest] = items;
  if (!main) return null;

  return (
    <section className="bg-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Dự án"
            title="Những công trình tiêu biểu"
            description="Mỗi dự án là một câu chuyện — kết hợp thẩm mỹ, công nghệ và mục tiêu kinh doanh."
          />
          <AnimateOnScroll>
            <Button
              href="/du-an"
              variant="secondary"
              className="!bg-cream/10 !text-cream !ring-cream/20 shrink-0"
            >
              Xem tất cả
            </Button>
          </AnimateOnScroll>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <AnimateOnScroll className="lg:row-span-2">
            <ProjectCard project={main} large />
          </AnimateOnScroll>
          {rest.map((project, i) => (
            <AnimateOnScroll key={project.id} delay={(i + 1) * 0.1}>
              <ProjectCard project={project} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

type ProjectCardProps = {
  project: ProjectItem;
  large?: boolean;
};

function ProjectCard({ project, large = false }: ProjectCardProps) {
  return (
    <Link
      href={`/du-an/${project.slug}`}
      className="group block h-full overflow-hidden rounded-[1.75rem] bg-cream/5 p-1.5 ring-1 ring-cream/10 transition-all duration-500 hover:ring-cream/20"
    >
      <div className="h-full overflow-hidden rounded-[calc(1.75rem-0.375rem)]">
        <div
          className={`relative overflow-hidden ${
            large ? "aspect-[4/5] lg:aspect-auto lg:min-h-[520px]" : "aspect-[16/10]"
          }`}
        >
          <Image
            src={project.coverImage ?? "/next.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
            sizes={large ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"}
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${project.color ?? ""} to-transparent`}
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <span className="mb-2 inline-block rounded-full bg-cream/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-cream/80 backdrop-blur-sm">
              {project.category}
            </span>
            <h3
              className={`font-display font-semibold text-cream ${
                large ? "text-2xl sm:text-4xl" : "text-xl sm:text-2xl"
              }`}
            >
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-cream/70">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
