import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/home/CtaSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedServices } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Dịch vụ — Sergio Agency",
  description:
    "Dịch vụ thiết kế website, landing page, branding và bảo trì cho doanh nghiệp.",
};

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <>
      <PageHero
        eyebrow="Dịch vụ"
        title="Giải pháp số toàn diện"
        description="Từ ý tưởng đến sản phẩm hoàn chỉnh — chúng tôi đồng hành cùng bạn ở mọi giai đoạn phát triển digital."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {services.map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 0.08}>
                <Link
                  href={`/dich-vu/${service.slug}`}
                  className="group flex h-full flex-col rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5 transition-all duration-500 hover:ring-ink/10"
                >
                  <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-cream p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-transform duration-500 group-hover:-translate-y-1">
                    <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-teal-500/10 text-2xl text-ink/70">
                      {service.icon}
                    </span>
                    <h2 className="font-display text-2xl font-semibold text-ink">
                      {service.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/60 sm:text-base">
                      {service.description}
                    </p>
                    <ul className="mt-6 space-y-2">
                      {service.features.slice(0, 3).map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-sm text-ink/70"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                      <span className="text-sm text-ink/50">
                        Từ{" "}
                        <strong className="font-semibold text-ink">
                          {service.priceFrom}
                        </strong>
                      </span>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
                        Chi tiết →
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
