import type { Metadata } from "next";
import { CtaSection } from "@/components/home/CtaSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dự án — Sergio Agency",
  description:
    "Portfolio các dự án website, landing page và e-commerce đã thực hiện.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();
  const categories = new Set(
    projects.map((p) => p.category).filter(Boolean) as string[],
  );

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_90%_-10%,rgba(17,17,17,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_0%_30%,rgba(243,238,230,0.95),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        </div>

        <div className="relative site-container">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                Portfolio
              </p>
              <h1 className="font-display mt-5 max-w-[10ch] text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
                Dự án
                <span className="mt-2 block text-ink/35">đã thực hiện.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
                Website, landing page và trải nghiệm số cho thương hiệu — từ ý
                tưởng đến sản phẩm live, đo được hiệu quả.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="flex flex-col gap-8 border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <dl className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Dự án
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {String(projects.length).padStart(2, "0")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Danh mục
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {String(categories.size).padStart(2, "0")}
                    </dd>
                  </div>
                </dl>
                <Button href="/lien-he">Bắt đầu dự án</Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="site-container">
          <ProjectGrid
            projects={projects.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              category: p.category ?? "",
              description: p.description ?? "",
              image: p.coverImage ?? "",
              client: p.client ?? undefined,
              year: p.year ?? undefined,
            }))}
          />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
