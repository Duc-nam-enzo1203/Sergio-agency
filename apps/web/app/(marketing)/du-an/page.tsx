import type { Metadata } from "next";
import { CtaSection } from "@/components/home/CtaSection";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dự án — Sergio Agency",
  description: "Portfolio các dự án website, landing page và e-commerce đã thực hiện.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Dự án tiêu biểu"
        description="Khám phá những công trình chúng tôi đã đồng hành cùng khách hàng — từ startup đến doanh nghiệp lớn."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ProjectGrid
            projects={projects.map((p) => ({
              id: p.id,
              slug: p.slug,
              title: p.title,
              category: p.category ?? "",
              description: p.description ?? "",
              image: p.coverImage ?? "",
              color: p.color ?? "",
            }))}
          />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
