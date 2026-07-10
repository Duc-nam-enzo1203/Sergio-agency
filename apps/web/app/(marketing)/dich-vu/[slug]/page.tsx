import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/home/CtaSection";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { getPublishedServices, getServiceBySlug } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Không tìm thấy" };
  return {
    title: `${service.title} — Sergio Agency`,
    description: service.description ?? undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
        <div className="relative site-container">
          <AnimateOnScroll>
            <Link
              href="/dich-vu"
              className="mb-6 inline-flex items-center gap-2 text-sm text-ink/50 transition-colors hover:text-ink"
            >
              ← Tất cả dịch vụ
            </Link>
            <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-teal-500/10 text-2xl text-ink/70">
              {service.icon}
            </span>
            <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
              {service.description}
            </p>
            {service.priceFrom && (
              <p className="mt-6 text-sm text-ink/50">
                Giá từ{" "}
                <span className="font-display text-2xl font-semibold text-ink">
                  {service.priceFrom}
                </span>
              </p>
            )}
            <div className="mt-8">
              <Button href="/lien-he">Nhận báo giá</Button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="site-container">
          <div className="grid gap-16 lg:grid-cols-2">
            <AnimateOnScroll>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Bao gồm
              </h2>
              <ul className="mt-6 space-y-4">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl bg-ink/[0.03] p-4 ring-1 ring-ink/5"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] text-cream">
                      ✓
                    </span>
                    <span className="text-sm text-ink/80 sm:text-base">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Quy trình
              </h2>
              <ol className="mt-6 space-y-4">
                {service.process.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-medium text-cream">
                      {i + 1}
                    </span>
                    <p className="pt-1 text-sm text-ink/70 sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="bg-cream-dark/30 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <AnimateOnScroll>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Câu hỏi thường gặp
              </h2>
            </AnimateOnScroll>
            <div className="mt-8">
              <FaqAccordion items={service.faq} />
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
