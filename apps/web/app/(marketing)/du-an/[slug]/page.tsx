import type { Metadata } from "next";
import Image from "next/image";
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

  const related = await getRelatedProjects(slug);

  return (
    <>
      <section className="relative pt-28 sm:pt-32">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <AnimateOnScroll>
            <Link
              href="/du-an"
              className="mb-6 inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
            >
              ← Tất cả dự án
            </Link>
          </AnimateOnScroll>

          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-ink/5 ring-1 ring-ink/10">
            {project.coverImage && (
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            )}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${project.color ?? ""} via-transparent to-transparent`}
            />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-ink/50">
                  {project.category}
                </span>
                <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {project.title}
                </h1>
                <p className="mt-6 text-base leading-relaxed text-ink/70 sm:text-lg">
                  {project.content}
                </p>
              </AnimateOnScroll>

              {project.images.length > 1 && (
                <div className="mt-12 grid gap-4 sm:grid-cols-2">
                  {project.images.slice(1).map((img, i) => (
                    <AnimateOnScroll key={img} delay={i * 0.1}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-ink/10">
                        <Image
                          src={img}
                          alt={`${project.title} ${i + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </AnimateOnScroll>
                  ))}
                </div>
              )}
            </div>

            <AnimateOnScroll delay={0.1}>
              <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5 lg:sticky lg:top-28">
                <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-6">
                  <dl className="space-y-5 text-sm">
                    {project.client && (
                      <div>
                        <dt className="text-ink/50">Khách hàng</dt>
                        <dd className="mt-1 font-medium text-ink">
                          {project.client}
                        </dd>
                      </div>
                    )}
                    {project.year && (
                      <div>
                        <dt className="text-ink/50">Năm</dt>
                        <dd className="mt-1 font-medium text-ink">
                          {project.year}
                        </dd>
                      </div>
                    )}
                    {project.techStack.length > 0 && (
                      <div>
                        <dt className="text-ink/50">Công nghệ</dt>
                        <dd className="mt-2 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-ink/5 px-3 py-1 text-xs font-medium text-ink/70"
                            >
                              {tech}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                  <div className="mt-8 flex flex-col gap-3">
                    {project.url && (
                      <Button href={project.url} external variant="secondary">
                        Xem live demo
                      </Button>
                    )}
                    <Button href="/lien-he">Dự án tương tự?</Button>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Dự án liên quan
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/du-an/${p.slug}`}
                  className="group flex gap-4 rounded-2xl bg-ink/[0.03] p-4 ring-1 ring-ink/5 transition-all hover:ring-ink/10"
                >
                  {p.coverImage && (
                    <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={p.coverImage}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="128px"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-ink/50">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-display font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-ink/60">
                      {p.description}
                    </p>
                  </div>
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
