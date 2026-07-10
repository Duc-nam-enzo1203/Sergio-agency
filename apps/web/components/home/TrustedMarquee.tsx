import Link from "next/link";

type ProjectItem = {
  title: string;
  slug: string;
};

type TrustedMarqueeProps = {
  projects: ProjectItem[];
};

export function TrustedMarquee({ projects }: TrustedMarqueeProps) {
  if (projects.length === 0) return null;

  const items = [...projects, ...projects];

  return (
    <section className="overflow-hidden border-b border-ink/10 bg-cream py-10">
      <div className="site-container mb-6 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
          Selected projects
        </p>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-14 pr-14">
          {items.map((project, i) => (
            <Link
              key={`a-${project.slug}-${i}`}
              href={`/du-an/${project.slug}`}
              className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink/25 transition-colors duration-300 hover:text-ink"
            >
              {project.title}
            </Link>
          ))}
        </div>
        <div
          aria-hidden
          className="animate-marquee flex shrink-0 items-center gap-14 pr-14"
        >
          {items.map((project, i) => (
            <Link
              key={`b-${project.slug}-${i}`}
              href={`/du-an/${project.slug}`}
              tabIndex={-1}
              className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink/25 transition-colors duration-300 hover:text-ink"
            >
              {project.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
