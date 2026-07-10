import { trustedLogos } from "@/lib/data";

export function TrustedMarquee() {
  const logos = [...trustedLogos, ...trustedLogos];

  return (
    <section className="overflow-hidden border-y border-ink/10 bg-cream-dark/50 py-8">
      <p className="mb-6 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
        Được tin tưởng bởi
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12">
          {logos.map((logo, i) => (
            <span
              key={`a-${logo}-${i}`}
              className="whitespace-nowrap font-display text-lg font-medium text-ink/30"
            >
              {logo}
            </span>
          ))}
        </div>
        <div
          aria-hidden
          className="animate-marquee flex shrink-0 items-center gap-12 pr-12"
        >
          {logos.map((logo, i) => (
            <span
              key={`b-${logo}-${i}`}
              className="whitespace-nowrap font-display text-lg font-medium text-ink/30"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
