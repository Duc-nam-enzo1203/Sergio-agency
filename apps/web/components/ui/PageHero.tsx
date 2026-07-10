import { AnimateOnScroll } from "./AnimateOnScroll";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 right-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-violet-300/20 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-teal-300/15 to-transparent blur-3xl" />
      </div>
      <div className="relative site-container">
        <AnimateOnScroll>
          <span className="mb-4 inline-block rounded-full bg-ink/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
            {eyebrow}
          </span>
          <h1 className="font-display max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/60 sm:text-lg">
              {description}
            </p>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
