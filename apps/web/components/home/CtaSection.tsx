import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="bg-[#F3EEE6] py-24 sm:py-32">
      <div className="site-container">
        <AnimateOnScroll>
          <div className="grid items-end gap-10 border-t border-ink/10 pt-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                Let’s collaborate
              </p>
              <h2 className="font-display mt-4 max-w-[10ch] text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
                Có dự án trong đầu?
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg">
                Chúng tôi giúp thương hiệu kể chuyện bằng website và landing
                page — rõ ràng, hiện đại, sẵn sàng chuyển đổi.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end lg:pb-2">
              <Button href="/lien-he">Nhận báo giá</Button>
              <p className="text-sm text-ink/45 lg:text-right">
                Phản hồi trong 24 giờ làm việc
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
