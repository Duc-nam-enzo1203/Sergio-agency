import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/home/CtaSection";
import { PortfolioSkills } from "@/components/portfolio/PortfolioSkills";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
import {
  portfolioCerts,
  portfolioEducation,
  portfolioExperience,
  portfolioProfile,
  portfolioSkills,
  portfolioTraits,
} from "@/lib/portfolio";
import { getFeaturedProjects, getPublishedProjects } from "@/lib/queries";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio — Đoàn Đức Nam",
  description: portfolioProfile.summary,
  path: "/portfolio",
});

const phoneDigits = portfolioProfile.phone.replace(/\D/g, "");

export default async function PortfolioPage() {
  const featured = await getFeaturedProjects(12);
  const projects =
    featured.length > 0
      ? featured
      : (await getPublishedProjects()).slice(0, 8);

  return (
    <>
      <JsonLd
        data={[
          personJsonLd({
            name: portfolioProfile.name,
            jobTitle: portfolioProfile.title,
            description: portfolioProfile.summary,
            email: portfolioProfile.email,
            telephone: portfolioProfile.phone,
            path: "/portfolio",
            address: portfolioProfile.location,
          }),
          breadcrumbJsonLd([
            { name: "Trang chủ", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
        ]}
      />
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(17,17,17,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_20%,rgba(243,238,230,0.9),transparent_45%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        </div>

        <div className="relative site-container">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
              Portfolio · WordPress Developer
            </p>
            <h1 className="font-display mt-6 max-w-[14ch] text-[clamp(3rem,9vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
              {portfolioProfile.name}
            </h1>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-ink/45">
              {portfolioProfile.title}
            </p>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink/55 sm:text-lg">
              {portfolioProfile.summary}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/lien-he">Nhận tư vấn dự án</Button>
              <a
                href={`mailto:${portfolioProfile.email}`}
                className="inline-flex items-center gap-3 rounded-full bg-cream-dark px-6 py-3 text-sm font-medium text-ink ring-1 ring-ink/10 transition-all duration-500 hover:bg-cream-dark/80 active:scale-[0.98]"
              >
                Gửi email
              </a>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.12}>
            <div className="mt-14 grid gap-8 border-t border-ink/10 pt-10 sm:grid-cols-3 sm:gap-6">
              <div>
                <p className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {portfolioProfile.years}
                </p>
                <p className="mt-2 text-sm text-ink/50">
                  năm kinh nghiệm WordPress / Woo / Shopify
                </p>
              </div>
              <div className="sm:border-l sm:border-ink/10 sm:pl-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                  Liên hệ
                </p>
                <a
                  href={`tel:${phoneDigits}`}
                  className="mt-3 block text-base font-medium text-ink transition-colors hover:text-ink/70"
                >
                  {portfolioProfile.phone}
                </a>
                <a
                  href={`mailto:${portfolioProfile.email}`}
                  className="mt-1 block text-sm text-ink/55 transition-colors hover:text-ink"
                >
                  {portfolioProfile.email}
                </a>
              </div>
              <div className="sm:border-l sm:border-ink/10 sm:pl-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                  Địa điểm
                </p>
                <p className="mt-3 text-base font-medium text-ink">
                  {portfolioProfile.location}
                </p>
                <a
                  href={portfolioProfile.zalo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-ink/55 transition-colors hover:text-ink"
                >
                  Chat Zalo →
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <PortfolioSkills groups={portfolioSkills} />

      {/* Experience */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Experience
              </p>
              <h2 className="font-display mt-4 max-w-[10ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                Hành trình nghề nghiệp.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">
                Từ triển khai website thương mại đến phát triển plugin WordPress
                chuyên sâu.
              </p>
            </AnimateOnScroll>

            <div className="divide-y divide-ink/10 border-y border-ink/10">
              {portfolioExperience.map((job, i) => (
                <AnimateOnScroll key={`${job.company}-${job.period}`} delay={0.06 + i * 0.07}>
                  <article className="grid gap-4 py-8 sm:grid-cols-[140px_1fr] sm:gap-8 sm:py-10">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                      {job.period}
                    </p>
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-ink/55">
                        {job.company}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {job.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-relaxed text-ink/65"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/30"
                            />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects from admin */}
      <section
        data-cursor="light"
        className="bg-ink text-cream py-20 sm:py-28"
      >
        <div className="site-container">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cream/40">
              Selected work
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              Dự án nổi bật.
            </h2>
          </AnimateOnScroll>

          {projects.length > 0 ? (
            <ul className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
              {projects.map((project) => {
                const meta = [project.category, project.year]
                  .filter(Boolean)
                  .join(" · ");

                return (
                  <li key={project.id}>
                    <Link
                      href={`/du-an/${project.slug}`}
                      className="group flex flex-col gap-2 py-5 transition-colors hover:bg-cream/[0.04] sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-6"
                    >
                      <div className="min-w-0">
                        <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                          {project.title}
                        </span>
                        {meta ? (
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-cream/40">
                            {meta}
                          </p>
                        ) : null}
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream/45 transition-all duration-500 group-hover:gap-3 group-hover:text-cream">
                        Xem dự án
                        <span aria-hidden>→</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-12 text-sm text-cream/50">
              Chưa có dự án nổi bật. Đánh dấu Featured trong admin để hiện tại đây.
            </p>
          )}

          <AnimateOnScroll delay={0.2}>
            <div className="mt-12">
              <Link
                href="/du-an"
                className="inline-flex items-center gap-2 text-sm font-medium text-cream/70 transition-all hover:gap-3 hover:text-cream"
              >
                Xem tất cả dự án
                <span aria-hidden>→</span>
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Education + traits */}
      <section className="bg-cream py-20 sm:py-28">
        <div className="site-container">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Education
              </p>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Học vấn & chứng chỉ.
              </h2>
              <div className="mt-8 border-t border-ink/10 pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                  {portfolioEducation.period}
                </p>
                <h3 className="font-display mt-3 text-xl font-semibold text-ink">
                  {portfolioEducation.school}
                </h3>
                <p className="mt-2 text-sm text-ink/60 sm:text-base">
                  {portfolioEducation.degree}
                </p>
                <p className="mt-1 text-sm text-ink/45">{portfolioEducation.gpa}</p>
              </div>
              <ul className="mt-8 space-y-4 border-t border-ink/10 pt-8">
                {portfolioCerts.map((cert) => (
                  <li key={cert.title}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                      {cert.year}
                    </p>
                    <p className="mt-2 text-sm font-medium text-ink sm:text-base">
                      {cert.title}
                    </p>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Strengths
              </p>
              <h2 className="font-display mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Điểm mạnh.
              </h2>
              <ul className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
                {portfolioTraits.map((trait, i) => (
                  <li
                    key={trait}
                    className="flex items-center gap-5 py-5 text-base text-ink/75 sm:text-lg"
                  >
                    <span className="font-display w-8 text-sm font-semibold text-ink/25">
                      0{i + 1}
                    </span>
                    {trait}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={portfolioProfile.zalo} external>
                  Chat Zalo
                </Button>
                <a
                  href={`tel:${phoneDigits}`}
                  className="inline-flex items-center gap-3 rounded-full bg-cream-dark px-6 py-3 text-sm font-medium text-ink ring-1 ring-ink/10 transition-all duration-500 hover:bg-cream-dark/80 active:scale-[0.98]"
                >
                  Gọi {portfolioProfile.phone}
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
