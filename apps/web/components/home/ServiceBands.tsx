"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type ServiceBand = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

type ServiceBandsProps = {
  bands: ServiceBand[];
};

const tones = [
  {
    base: "bg-ink text-cream",
    cursor: "light" as const,
    fill: "bg-cream/[0.06]",
    glow: "rgba(253,251,247,0.14)",
    line: "bg-cream/40",
  },
  {
    base: "bg-[#E7DFD4] text-ink",
    cursor: undefined,
    fill: "bg-ink/[0.04]",
    glow: "rgba(17,17,17,0.09)",
    line: "bg-ink/30",
  },
  {
    base: "bg-[#222] text-cream",
    cursor: "light" as const,
    fill: "bg-cream/[0.06]",
    glow: "rgba(253,251,247,0.12)",
    line: "bg-cream/35",
  },
];

function BandCard({
  band,
  index,
}: {
  band: ServiceBand;
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [hover, setHover] = useState(false);
  const tone = tones[index] ?? tones[0];

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
      href={`/dich-vu/${band.slug}`}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor={tone.cursor}
      className={`group relative flex min-h-[240px] flex-col justify-between overflow-hidden px-7 py-10 sm:min-h-[280px] sm:px-9 sm:py-12 lg:min-h-[320px] ${tone.base}`}
    >
      {/* Soft fill rising from bottom — no box jump */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-0 ${tone.fill} transition-[height] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-full`}
      />

      {/* Cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: hover
            ? `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, ${tone.glow}, transparent 55%)`
            : undefined,
        }}
      />

      {/* Giant index watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-2 bottom-[-0.2em] font-display text-[7.5rem] font-semibold leading-none tracking-tighter opacity-[0.06] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-6%] group-hover:opacity-[0.12] sm:text-[9rem]"
      >
        0{index + 1}
      </span>

      {/* Top accent line grows on hover */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 ${tone.line} transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100`}
      />

      <div className="relative z-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] opacity-45 transition-opacity duration-500 group-hover:opacity-80 sm:text-sm">
          0{index + 1}
        </p>
        <h2 className="font-display mt-5 max-w-[12ch] text-2xl font-semibold tracking-tight transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 sm:text-3xl lg:text-[2.05rem]">
          {band.title}
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-60 transition-[opacity,transform] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-2px] group-hover:opacity-90 sm:text-base line-clamp-3">
          {band.description}
        </p>
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-between gap-4">
        <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] opacity-55 transition-all duration-500 group-hover:gap-4 group-hover:opacity-100 sm:text-[13px]">
          Khám phá
          <span
            aria-hidden
            className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-current/25"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-current/10 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
            <span className="relative transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </span>

        <span
          aria-hidden
          className="hidden h-px w-0 bg-current/25 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-16 sm:block"
        />
      </div>
    </Link>
  );
}

export function ServiceBands({ bands }: ServiceBandsProps) {
  if (bands.length === 0) return null;

  const count = Math.min(bands.length, 3);

  return (
    <div
      className={`relative grid border-t border-ink/10 ${
        count === 1
          ? "md:grid-cols-1"
          : count === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3"
      }`}
    >
      {bands.slice(0, 3).map((band, i) => (
        <BandCard key={band.id} band={band} index={i} />
      ))}
    </div>
  );
}
