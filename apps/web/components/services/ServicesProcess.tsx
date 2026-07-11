import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

const steps = [
  {
    title: "Khám phá",
    body: "Lắng nghe mục tiêu kinh doanh, đối thủ và ràng buộc kỹ thuật trước khi đề xuất hướng đi.",
  },
  {
    title: "Thiết kế",
    body: "Wireframe → visual → prototype. Mỗi quyết định phục vụ chuyển đổi và nhận diện thương hiệu.",
  },
  {
    title: "Xây dựng",
    body: "Code sạch, tốc độ cao, dễ mở rộng — bàn giao đúng hạn với tài liệu vận hành rõ ràng.",
  },
  {
    title: "Tối ưu",
    body: "Theo dõi hiệu suất sau launch, tinh chỉnh CTA, SEO và trải nghiệm theo dữ liệu thực.",
  },
];

export function ServicesProcess() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="site-container">
        <div className="grid gap-10 border-b border-ink/10 pb-12 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              How we work
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
              Quy trình rõ ràng, kết quả đo được.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.08}>
            <p className="max-w-md text-base leading-relaxed text-ink/55 sm:text-lg lg:justify-self-end lg:text-right">
              Không template cứng nhắc — mỗi dự án đi qua bốn bước để đảm bảo
              sản phẩm đẹp, nhanh và phục vụ mục tiêu kinh doanh.
            </p>
          </AnimateOnScroll>
        </div>

        <ol className="mt-4 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <AnimateOnScroll key={step.title} delay={0.06 + i * 0.07}>
              <li className="group relative border-t border-ink/10 py-10 pr-6 sm:border-t-0 sm:border-l sm:border-ink/10 sm:py-12 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
                <span className="font-display text-5xl font-semibold tracking-tighter text-ink/[0.08] transition-colors duration-500 group-hover:text-ink/15 sm:text-6xl">
                  0{i + 1}
                </span>
                <h3 className="font-display mt-4 text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  {step.body}
                </p>
              </li>
            </AnimateOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
