import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type Capability = {
  title: string;
  description: string;
};

const capabilities: Capability[] = [
  {
    title: "Website & Landing Page",
    description:
      "Thiết kế hiện đại, tốc độ cao, tối ưu chuyển đổi — từ trang giới thiệu đến funnel bán hàng.",
  },
  {
    title: "UI/UX & Art Direction",
    description:
      "Hệ thống hình ảnh nhất quán, trải nghiệm rõ ràng giúp thương hiệu dễ nhớ và dễ tin.",
  },
  {
    title: "Phát triển & Bàn giao",
    description:
      "Code sạch, dễ mở rộng trên Next.js / WordPress — bàn giao đúng hạn, dễ vận hành.",
  },
];

export function Capabilities() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Capabilities
            </p>
            <h2 className="font-display mt-4 max-w-[12ch] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Studio full-service với nghệ thuật & công nghệ.
            </h2>
          </AnimateOnScroll>

          <div className="flex flex-col justify-end">
            <AnimateOnScroll delay={0.1}>
              <p className="max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
                Đội ngũ thiết kế và phát triển hướng tới sản phẩm số rõ ràng,
                đẹp mắt và đo được hiệu quả kinh doanh.
              </p>
            </AnimateOnScroll>

            <ul className="mt-12 space-y-8 border-t border-ink/10 pt-10">
              {capabilities.map((item, i) => (
                <AnimateOnScroll key={item.title} delay={0.12 + i * 0.08}>
                  <li className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_1.2fr] sm:gap-8">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/60 sm:text-base">
                      {item.description}
                    </p>
                  </li>
                </AnimateOnScroll>
              ))}
            </ul>

            <AnimateOnScroll delay={0.4}>
              <Link
                href="/dich-vu"
                className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-ink transition-all hover:gap-3"
              >
                Xem toàn bộ dịch vụ
                <span aria-hidden>→</span>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
