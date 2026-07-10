import { AnimateOnScroll } from "./AnimateOnScroll";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <AnimateOnScroll className={`max-w-2xl ${alignClass}`}>
      <span className="mb-4 inline-block rounded-full bg-ink/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-ink/60 sm:text-lg">
          {description}
        </p>
      )}
    </AnimateOnScroll>
  );
}
