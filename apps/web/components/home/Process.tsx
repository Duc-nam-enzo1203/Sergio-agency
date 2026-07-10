import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Quy trình"
          title="Làm việc minh bạch, bàn giao đúng hạn"
          description="Quy trình 4 bước rõ ràng giúp bạn theo dõi tiến độ và đưa ra quyết định kịp thời."
          align="center"
        />

        <div className="relative mt-20">
          <div
            aria-hidden
            className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-ink/20 via-ink/10 to-transparent md:left-1/2 md:block md:-translate-x-px"
          />

          <div className="space-y-12 md:space-y-0">
            {processSteps.map((step, i) => (
              <AnimateOnScroll key={step.step} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col gap-6 md:flex-row md:items-center md:gap-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 md:text-right">
                    <div
                      className={`md:max-w-md ${
                        i % 2 === 1 ? "md:ml-auto md:text-left" : "md:mr-auto"
                      }`}
                    >
                      <span className="font-display text-5xl font-semibold text-ink/10">
                        {step.step}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-semibold text-ink sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex shrink-0 items-center justify-center md:w-16">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-sm font-medium text-cream ring-4 ring-cream">
                      {step.step}
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
