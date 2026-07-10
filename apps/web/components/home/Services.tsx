import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string | null;
  slug: string;
};

type ServicesProps = {
  items: ServiceItem[];
};

export function Services({ items }: ServicesProps) {
  return (
    <section className="py-24 sm:py-32">
      <div className="site-container">
        <SectionHeading
          eyebrow="Dịch vụ"
          title="Giải pháp số toàn diện cho doanh nghiệp"
          description="Từ ý tưởng đến sản phẩm hoàn chỉnh — chúng tôi đồng hành cùng bạn ở mọi giai đoạn."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.length === 0 ? (
            <p className="col-span-full text-center text-ink/50">
              Chưa có dịch vụ nào.
            </p>
          ) : (
            items.map((service, i) => (
              <AnimateOnScroll key={service.id} delay={i * 0.1}>
                <Link
                  href={`/dich-vu/${service.slug}`}
                className="group relative flex h-full flex-col rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5 transition-all duration-500 hover:bg-ink/[0.05] hover:ring-ink/10"
              >
                <div className="flex h-full flex-col rounded-[calc(1.75rem-0.375rem)] bg-cream p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-transform duration-500 group-hover:-translate-y-1">
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/10 to-teal-500/10 text-xl text-ink/70">
                    {service.icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors group-hover:text-ink">
                    Tìm hiểu thêm
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden
                      className="transition-transform duration-500 group-hover:translate-x-1"
                    >
                      <path
                        d="M3 11L11 3M11 3H5M11 3V9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
