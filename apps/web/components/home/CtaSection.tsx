import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button } from "@/components/ui/Button";

export function CtaSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <AnimateOnScroll>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-1.5 ring-1 ring-ink/10">
            <div className="relative overflow-hidden rounded-[calc(2rem-0.375rem)] bg-gradient-to-br from-ink via-ink to-violet-950 px-8 py-16 sm:px-16 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
              />

              <div className="relative max-w-2xl">
                <span className="mb-4 inline-block rounded-full bg-cream/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream/70">
                  Sẵn sàng bắt đầu?
                </span>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-cream sm:text-4xl lg:text-5xl">
                  Hãy cùng tạo nên điều gì đó tuyệt vời
                </h2>
                <p className="mt-4 text-base leading-relaxed text-cream/70 sm:text-lg">
                  Chia sẻ ý tưởng của bạn — chúng tôi sẽ phản hồi trong vòng 24
                  giờ với đề xuất và báo giá sơ bộ.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href="/lien-he"
                    className="!bg-cream !text-ink hover:!bg-cream/90"
                  >
                    Liên hệ ngay
                  </Button>
                  <Button
                    href="/dich-vu"
                    variant="secondary"
                    className="!bg-cream/10 !text-cream !ring-cream/20"
                  >
                    Xem dịch vụ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
