import type { Metadata } from "next";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/home/CtaSection";
import { Button } from "@/components/ui/Button";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import {
  getProjectBySlug,
  getPublishedProjects,
  getRelatedProjects,
} from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Không tìm thấy" };
  return {
    title: `${project.title} — Sergio Agency`,
    description: project.description ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const all = await getPublishedProjects();
  const index = Math.max(
    0,
    all.findIndex((p) => p.id === project.id),
  );
  const num = String(index + 1).padStart(2, "0");
  const related = await getRelatedProjects(slug);
  const gallery = project.images.filter(
    (img) => img && img !== project.coverImage,
  );
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <>
      <section
        data-cursor="light"
        className="relative overflow-hidden bg-ink text-cream"
      >
        <div className="relative site-container pt-28 pb-10 sm:pt-32 sm:pb-12">
          <AnimateOnScroll>
            <Link
              href="/du-an"
              className="inline-flex items-center gap-2 text-sm text-cream/45 transition-colors hover:text-cream"
            >
              ← Tất cả dự án
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
              <span>{num}</span>
              {project.category ? (
                <>
                  <span className="h-px w-6 bg-cream/25" />
                  <span>{project.category}</span>
                </>
              ) : null}
              {project.year ? (
                <>
                  <span className="h-px w-6 bg-cream/25" />
                  <span>{project.year}</span>
                </>
              ) : null}
            </div>

            <h1 className="font-display mt-5 max-w-[16ch] text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              {project.title}
            </h1>
          </AnimateOnScroll>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink/80 sm:aspect-[21/9]">
          {project.coverImage ? (
            <SafeImage
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-24">
        <div className="site-container">
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <AnimateOnScroll>
              {project.description ? (
                <p className="font-display text-xl font-medium leading-snug tracking-tight text-ink sm:text-2xl lg:text-[1.75rem]">
                  {project.description}
                </p>
              ) : null}
              {project.content ? (
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
                  {project.content}
                </p>
              ) : null}
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.08}>
              <div className="border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <dl className="space-y-7">
                  {project.client ? (
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                        Khách hàng
                      </dt>
                      <dd className="mt-2 text-base font-medium text-ink">
                        {project.client}
                      </dd>
                    </div>
                  ) : null}
                  {project.year ? (
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                        Năm
                      </dt>
                      <dd className="mt-2 text-base font-medium text-ink">
                        {project.year}
                      </dd>
                    </div>
                  ) : null}
                  {project.category ? (
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                        Danh mục
                      </dt>
                      <dd className="mt-2 text-base font-medium text-ink">
                        {project.category}
                      </dd>
                    </div>
                  ) : null}
                  {project.techStack.length > 0 ? (
                    <div>
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                        Công nghệ
                      </dt>
                      <dd className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-sm text-ink/70">
                        {project.techStack.map((tech, i) => (
                          <span key={tech} className="inline-flex items-center gap-3">
                            {i > 0 ? (
                              <span
                                aria-hidden
                                className="h-1 w-1 rounded-full bg-ink/25"
                              />
                            ) : null}
                            {tech}
                          </span>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {project.url ? (
                    <Button href={project.url} external variant="secondary">
                      Xem live demo
                    </Button>
                  ) : null}
                  <Button href="/lien-he">Dự án tương tự?</Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-[#F3EEE6] py-16 sm:py-24">
          <div className="site-container">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Gallery
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Hình ảnh dự án.
              </h2>
            </AnimateOnScroll>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {gallery.map((img, i) => (
                <AnimateOnScroll key={img} delay={i * 0.06}>
                  <div
                    className={`relative overflow-hidden bg-ink/5 ring-1 ring-ink/10 ${
                      i === 0 && gallery.length > 2
                        ? "sm:col-span-2 aspect-[21/9]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${project.title} ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes={
                        i === 0 && gallery.length > 2
                          ? "100vw"
                          : "(max-width: 768px) 100vw, 50vw"
                      }
                    />
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="site-container">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                More work
              </p>
              <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Dự án liên quan.
              </h2>
            </AnimateOnScroll>

            <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
              {related.map((p, i) => (
                <AnimateOnScroll key={p.id} delay={0.05 + i * 0.06}>
                  <Link
                    href={`/du-an/${p.slug}`}
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
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                        {p.category}
                      </span>
                      <h3 className="font-display mt-2 text-xl font-semibold text-ink transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">
                        {p.title}
                      </h3>
                      {p.description ? (
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/55 line-clamp-2">
                          {p.description}
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
            {prev && prev.id !== project.id ? (
              <Link
                href={`/du-an/${prev.slug}`}
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
            {next && next.id !== project.id ? (
              <Link
                href={`/du-an/${next.slug}`}
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
