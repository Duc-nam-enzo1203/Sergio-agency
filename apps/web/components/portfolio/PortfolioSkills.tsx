"use client";

import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

type SkillGroup = {
  title: string;
  items: string[];
};

type PortfolioSkillsProps = {
  groups: SkillGroup[];
};

const tones = [
  {
    base: "bg-ink text-cream",
    cursor: "light" as const,
    muted: "text-cream/45",
    soft: "text-cream/70",
    fill: "bg-cream/[0.06]",
    glow: "rgba(253,251,247,0.14)",
    rule: "bg-cream/35",
    sep: "text-cream/25",
  },
  {
    base: "bg-[#E8E0D4] text-ink",
    cursor: undefined,
    muted: "text-ink/40",
    soft: "text-ink/65",
    fill: "bg-ink/[0.04]",
    glow: "rgba(17,17,17,0.08)",
    rule: "bg-ink/25",
    sep: "text-ink/20",
  },
  {
    base: "bg-[#1C1C1C] text-cream",
    cursor: "light" as const,
    muted: "text-cream/40",
    soft: "text-cream/65",
    fill: "bg-cream/[0.05]",
    glow: "rgba(253,251,247,0.12)",
    rule: "bg-cream/30",
    sep: "text-cream/22",
  },
  {
    base: "bg-[#F3EEE6] text-ink",
    cursor: undefined,
    muted: "text-ink/40",
    soft: "text-ink/60",
    fill: "bg-ink/[0.035]",
    glow: "rgba(17,17,17,0.07)",
    rule: "bg-ink/20",
    sep: "text-ink/18",
  },
  {
    base: "bg-[#222] text-cream",
    cursor: "light" as const,
    muted: "text-cream/40",
    soft: "text-cream/65",
    fill: "bg-cream/[0.06]",
    glow: "rgba(253,251,247,0.11)",
    rule: "bg-cream/30",
    sep: "text-cream/22",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function SkillBand({
  group,
  index,
}: {
  group: SkillGroup;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [hover, setHover] = useState(false);
  const reduce = useReducedMotion();
  const tone = tones[index % tones.length]!;
  const num = String(index + 1).padStart(2, "0");

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <motion.div
      ref={ref}
      data-cursor={tone.cursor}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={reduce ? false : { opacity: 0, y: 64 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.06, ease }}
      className={`group relative overflow-hidden border-t border-ink/10 ${tone.base}`}
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
            ? `radial-gradient(480px circle at ${pos.x}% ${pos.y}%, ${tone.glow}, transparent 55%)`
            : undefined,
        }}
      />

      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 bottom-[-0.25em] font-display text-[6.5rem] font-semibold leading-none tracking-tighter opacity-[0.07] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[-8%] group-hover:opacity-[0.14] sm:text-[8.5rem] lg:text-[10rem]"
      >
        {num}
      </span>

      <div className="relative site-container grid gap-8 py-12 sm:gap-10 sm:py-14 lg:grid-cols-[10rem_minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-12 lg:py-16">
        <div className="flex items-center gap-4 lg:block">
          <p className={`font-display text-sm font-semibold tracking-tight ${tone.muted}`}>
            {num}
          </p>
          <div
            aria-hidden
            className={`hidden h-px w-10 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 lg:mt-5 lg:block ${tone.rule}`}
          />
        </div>

        <div>
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1">
            {group.title}
          </h3>
        </div>

        <motion.ul
          className="flex flex-wrap content-start gap-x-1 gap-y-3 lg:pt-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: reduce ? 0 : 0.045,
                delayChildren: reduce ? 0 : 0.15,
              },
            },
          }}
        >
          {group.items.map((item, j) => (
            <motion.li
              key={item}
              variants={{
                hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.55, ease },
                },
              }}
              className={`inline-flex items-baseline text-[15px] leading-relaxed sm:text-base ${tone.soft}`}
            >
              {j > 0 ? (
                <span aria-hidden className={`mx-2.5 select-none ${tone.sep}`}>
                  /
                </span>
              ) : null}
              <span className="transition-colors duration-500">{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.div>
  );
}

export function PortfolioSkills({ groups }: PortfolioSkillsProps) {
  return (
    <section className="border-y border-ink/10 bg-cream">
      <div className="site-container py-20 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
          <AnimateOnScroll>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Capabilities
            </p>
            <h2 className="font-display mt-4 max-w-[11ch] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
              Kỹ năng chuyên môn.
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <p className="max-w-md text-sm leading-relaxed text-ink/55 sm:text-base lg:justify-self-end lg:pb-1 lg:text-right">
              Stack thực chiến WordPress / Woo / Shopify — theme, plugin, hiệu
              năng và vận hành.
            </p>
          </AnimateOnScroll>
        </div>
      </div>

      <div className="border-t border-ink/10">
        {groups.map((group, i) => (
          <SkillBand key={group.title} group={group} index={i} />
        ))}
      </div>
    </section>
  );
}
