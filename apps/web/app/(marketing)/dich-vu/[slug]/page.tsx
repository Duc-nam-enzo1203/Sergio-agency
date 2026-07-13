import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaSection } from "@/components/home/CtaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { getPublishedServices, getServiceBySlug } from "@/lib/queries";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  serviceJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Không tìm thấy" };
  return buildPageMetadata({
    title: service.title,
    description: service.description,
    path: `/dich-vu/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const all = await getPublishedServices();
  const index = Math.max(
    0,
    all.findIndex((s) => s.id === service.id),
  );
  const num = String(index + 1).padStart(2, "0");
  const next = all[(index + 1) % all.length];
  const prev = all[(index - 1 + all.length) % all.length];

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: service.title,
            description: service.description,
            path: `/dich-vu/${service.slug}`,
            priceFrom: service.priceFrom,
          }),
          faqPageJsonLd(service.faq, absoluteUrl(`/dich-vu/${service.slug}`)),
          breadcrumbJsonLd([
            { name: "Trang chủ", path: "/" },
            { name: "Dịch vụ", path: "/dich-vu" },
            { name: service.title, path: `/dich-vu/${service.slug}` },
          ]),
        ]}
      />
      <section
        data-cursor="light"
        className="relative overflow-hidden bg-ink text-cream"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 top-10 font-display text-[18rem] font-semibold leading-none tracking-tighter text-cream/[0.04] sm:text-[22rem]">
            {num}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_80%_0%,rgba(253,251,247,0.08),transparent_55%)]" />
        </div>

        <div className="relative site-container pt-28 pb-16 sm:pt-36 sm:pb-24">
          <AnimateOnScroll>
            <Link
              href="/dich-vu"
              className="inline-flex items-center gap-2 text-sm text-cream/45 transition-colors hover:text-cream"
            >
              ← Tất cả dịch vụ
            </Link>

            <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cream/40">
                  <span>{num}</span>
                  {service.icon ? (
                    <>
                      <span className="h-px w-8 bg-cream/25" />
                      <span className="text-base tracking-normal text-cream/55">
                        {service.icon}
                      </span>
                    </>
                  ) : null}
                </div>
                <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(2.5rem,7vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                  {service.title}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/55 sm:text-lg">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-col gap-6 border-t border-cream/15 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                {service.priceFrom ? (
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                      Giá từ
                    </p>
                    <p className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {service.priceFrom}
                    </p>
                  </div>
                ) : null}
                <Button
                  href="/lien-he"
                  className="!bg-cream !text-ink hover:!bg-cream/90"
                >
                  Nhận báo giá
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="site-container">
          <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Scope
              </p>
              <h2 className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
                Phạm vi công việc.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/55 sm:text-base">
                Mỗi hạng mục được thiết kế để bàn giao rõ ràng — bạn biết mình
                nhận được gì trước khi bắt đầu.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.08}>
              <ul className="divide-y divide-ink/10 border-y border-ink/10">
                {service.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="group flex items-start gap-5 py-5 transition-colors sm:gap-8 sm:py-6"
                  >
                    <span className="font-display w-8 shrink-0 text-sm font-semibold text-ink/25 transition-colors group-hover:text-ink/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed text-ink/80 sm:text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE6] py-20 sm:py-28">
        <div className="site-container">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Process
            </p>
            <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
              Quy trình triển khai.
            </h2>
          </AnimateOnScroll>

          <ol className="mt-12 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <AnimateOnScroll key={step} delay={0.06 + i * 0.06}>
                <li className="relative border-t border-ink/10 py-8 pr-4 sm:border-t-0 sm:border-l sm:border-ink/10 sm:py-2 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
                  <span className="font-display text-4xl font-semibold tracking-tighter text-ink/[0.1]">
                    0{i + 1}
                  </span>
                  <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
                    {step}
                  </p>
                </li>
              </AnimateOnScroll>
            ))}
          </ol>
        </div>
      </section>

      {service.faq.length > 0 && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="site-container">
            <div className="mx-auto max-w-3xl">
              <AnimateOnScroll>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  FAQ
                </p>
                <h2 className="font-display mt-4 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.03em] text-ink">
                  Câu hỏi thường gặp.
                </h2>
              </AnimateOnScroll>
              <div className="mt-10">
                <FaqAccordion items={service.faq} />
              </div>
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <section className="border-y border-ink/10 bg-cream">
          <div className="site-container grid sm:grid-cols-2">
            {prev && prev.id !== service.id ? (
              <Link
                href={`/dich-vu/${prev.slug}`}
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
            {next && next.id !== service.id ? (
              <Link
                href={`/dich-vu/${next.slug}`}
                className="group flex flex-col items-start gap-2 py-10 pl-0 transition-colors hover:bg-ink/[0.02] sm:items-end sm:py-12 sm:pl-10"
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
