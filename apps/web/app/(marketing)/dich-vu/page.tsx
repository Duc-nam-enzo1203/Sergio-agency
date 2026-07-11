import type { Metadata } from "next";
import { CtaSection } from "@/components/home/CtaSection";
import { ServiceCatalog } from "@/components/services/ServiceCatalog";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";
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
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_10%_-10%,rgba(17,17,17,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_90%_20%,rgba(232,224,212,0.9),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        </div>

        <div className="relative site-container">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                Services
              </p>
              <h1 className="font-display mt-5 max-w-[11ch] text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
                Sergio Agency
                <span className="mt-2 block text-ink/35">dịch vụ số.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
                Từ website doanh nghiệp đến landing chuyển đổi, branding và bảo
                trì — một studio đồng hành xuyên suốt vòng đời sản phẩm digital.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="flex flex-col gap-8 border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <dl className="grid grid-cols-2 gap-6">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Dịch vụ
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      {String(services.length).padStart(2, "0")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                      Phản hồi
                    </dt>
                    <dd className="font-display mt-2 text-3xl font-semibold tracking-tight text-ink">
                      24h
                    </dd>
                  </div>
                </dl>
                <Button href="/lien-he">Nhận tư vấn miễn phí</Button>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section>
        <div className="site-container pb-6 pt-2">
          <AnimateOnScroll>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  Catalog
                </p>
                <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  Chọn hướng đi phù hợp.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink/50">
                Hover từng panel để khám phá — chạm để xem đầy đủ phạm vi và quy
                trình.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
        <ServiceCatalog
          items={services.map((s) => ({
            id: s.id,
            slug: s.slug,
            title: s.title,
            description: s.description,
            priceFrom: s.priceFrom,
            features: s.features,
            icon: s.icon,
          }))}
        />
      </section>

      <ServicesProcess />
      <CtaSection />
    </>
  );
}
