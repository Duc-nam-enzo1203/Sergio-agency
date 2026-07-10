"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ServiceBands } from "@/components/home/ServiceBands";
import { siteConfig } from "@/lib/data";

type ServiceBand = {
  id: string;
  title: string;
  description: string;
  slug: string;
};

type HeroProps = {
  bands?: ServiceBand[];
  visualImage?: string | null;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ bands = [], visualImage }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const reduce = !!prefersReducedMotion;

  return (
    <section className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-[#F3EEE6]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(17,17,17,0.04),transparent_50%),radial-gradient(ellipse_at_90%_40%,rgba(17,17,17,0.03),transparent_45%)]"
      />

      <div className="relative site-container flex flex-1 flex-col justify-center pb-10 pt-28 sm:pt-32 lg:pb-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="font-display text-sm font-semibold tracking-[0.08em] text-ink sm:text-base"
            >
              {siteConfig.name}
            </motion.p>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease }}
              className="font-display mt-5 max-w-[11ch] text-[clamp(2.75rem,7.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink"
            >
              Thiết kế website thúc đẩy tăng trưởng.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="mt-6 max-w-md text-base leading-relaxed text-ink/60 sm:text-lg"
            >
              Từ landing page chuyển đổi cao đến website doanh nghiệp — trải
              nghiệm số rõ ràng, đẹp và đo được kết quả.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.32, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="/du-an">Xem showcase</Button>
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-cream">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M3 1.5v9l7.5-4.5L3 1.5z" />
                  </svg>
                </span>
                Bắt đầu dự án
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.18, ease }}
            className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none"
          >
            <div className="absolute inset-[8%] rounded-[2rem] bg-ink/5" />
            <div className="absolute -right-2 top-[12%] h-24 w-24 rounded-3xl bg-ink sm:h-28 sm:w-28" />
            <div className="absolute bottom-[10%] left-[-4%] h-16 w-16 rounded-full bg-[#D4C4B0] sm:h-20 sm:w-20" />
            <div className="absolute right-[8%] bottom-[18%] h-10 w-28 -rotate-6 rounded-full bg-ink/10" />

            <div className="absolute inset-[14%] overflow-hidden rounded-[1.75rem] bg-cream shadow-[0_30px_80px_-40px_rgba(17,17,17,0.45)] ring-1 ring-ink/10">
              {visualImage ? (
                <Image
                  src={visualImage}
                  alt=""
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 80vw, 420px"
                />
              ) : (
                <div className="flex h-full items-end bg-gradient-to-br from-[#E8E0D4] to-[#C8B8A4] p-6">
                  <p className="font-display text-2xl font-semibold text-ink">
                    Digital
                    <br />
                    Craft
                  </p>
                </div>
              )}
            </div>

            <div className="absolute left-[6%] top-[18%] rounded-2xl bg-cream px-4 py-3 shadow-lg ring-1 ring-ink/10">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink/45">
                Focus
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">Web & Landing</p>
            </div>
          </motion.div>
        </div>
      </div>

      <ServiceBands bands={bands} />
    </section>
  );
}
