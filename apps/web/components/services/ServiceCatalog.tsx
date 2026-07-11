"use client";

import Link from "next/link";
import { useRef, useState } from "react";

export type ServiceCatalogItem = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  priceFrom: string | null;
  features: string[];
  icon: string | null;
};

const tones = [
  {
    base: "bg-ink text-cream",
    fill: "bg-cream/[0.05]",
    glow: "rgba(253,251,247,0.12)",
    muted: "text-cream/55",
    soft: "text-cream/70",
    line: "bg-cream/35",
    chip: "border-cream/20 text-cream/80",
  },
  {
    base: "bg-[#E8E0D4] text-ink",
    fill: "bg-ink/[0.04]",
    glow: "rgba(17,17,17,0.08)",
    muted: "text-ink/45",
    soft: "text-ink/65",
    line: "bg-ink/25",
    chip: "border-ink/15 text-ink/70",
  },
  {
    base: "bg-[#1C1C1C] text-cream",
    fill: "bg-cream/[0.05]",
    glow: "rgba(253,251,247,0.1)",
    muted: "text-cream/50",
    soft: "text-cream/65",
    line: "bg-cream/30",
    chip: "border-cream/20 text-cream/75",
  },
  {
    base: "bg-[#F3EEE6] text-ink",
    fill: "bg-ink/[0.035]",
    glow: "rgba(17,17,17,0.07)",
    muted: "text-ink/40",
    soft: "text-ink/60",
    line: "bg-ink/20",
    chip: "border-ink/15 text-ink/65",
  },
];

function ServicePanel({
  service,
  index,
}: {
  service: ServiceCatalogItem;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [hover, setHover] = useState(false);
  const tone = tones[index % tones.length]!;
  const num = String(index + 1).padStart(2, "0");

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <Link
      ref={ref}
      href={`/dich-vu/${service.slug}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`group relative grid min-h-[320px] overflow-hidden border-t border-ink/10 lg:min-h-[380px] lg:grid-cols-[1.15fr_0.85fr] ${tone.base}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0 ${tone.fill} transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full`}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: hover
            ? `radial-gradient(520px circle at ${pos.x}% ${pos.y}%, ${tone.glow}, transparent 55%)`
            : undefined,
        }}
      />
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 ${tone.line} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100`}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 bottom-[-0.25em] font-display text-[8rem] font-semibold leading-none tracking-tighter opacity-[0.06] transition-all duration-700 group-hover:translate-x-[-4%] group-hover:opacity-[0.11] sm:text-[10rem] lg:text-[12rem]"
      >
        {num}
      </span>

      <div className="relative z-10 flex flex-col justify-between px-7 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
        <div>
          <div className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] ${tone.muted}`}>
            <span>{num}</span>
            {service.icon ? (
              <>
                <span className="h-px w-8 bg-current/30" />
                <span className="text-base tracking-normal opacity-70">
                  {service.icon}
                </span>
              </>
            ) : null}
          </div>
          <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(1.85rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            {service.title}
          </h2>
          {service.description ? (
            <p
              className={`mt-5 max-w-lg text-sm leading-relaxed sm:text-base ${tone.soft}`}
            >
              {service.description}
            </p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          {service.priceFrom ? (
            <p className={`text-sm ${tone.muted}`}>
              Từ{" "}
              <span className="font-display text-xl font-semibold tracking-tight opacity-100 sm:text-2xl">
                {service.priceFrom}
              </span>
            </p>
          ) : (
            <span />
          )}
          <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-60 transition-all duration-500 group-hover:gap-4 group-hover:opacity-100">
            Xem chi tiết
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-current/25">
              <span className="absolute inset-0 origin-left scale-x-0 bg-current/10 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="relative transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-center border-t border-current/10 px-7 py-8 sm:px-10 lg:border-t-0 lg:border-l lg:border-current/10 lg:px-12 lg:py-14">
        <p
          className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${tone.muted}`}
        >
          Bao gồm
        </p>
        <ul className="mt-5 space-y-3">
          {service.features.slice(0, 4).map((feature) => (
            <li
              key={feature}
              className={`flex items-start gap-3 text-sm leading-snug ${tone.soft}`}
            >
              <span
                aria-hidden
                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-current opacity-50"
              />
              {feature}
            </li>
          ))}
        </ul>
        {service.features.length > 4 ? (
          <span
            className={`mt-6 inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-medium ${tone.chip}`}
          >
            +{service.features.length - 4} hạng mục khác
          </span>
        ) : null}
      </div>
    </Link>
  );
}

export function ServiceCatalog({ items }: { items: ServiceCatalogItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-ink/10">
      {items.map((service, i) => (
        <ServicePanel key={service.id} service={service} index={i} />
      ))}
    </div>
  );
}
