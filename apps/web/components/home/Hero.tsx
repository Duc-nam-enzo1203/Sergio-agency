"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const words = ["Thiết kế", "website", "&", "landing", "page", "đẳng cấp"];

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-28 pb-20 sm:pt-32">
      {/* Background mesh */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-1/4 right-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/30 to-transparent blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-teal-300/25 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(17,17,17,0.03),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.span
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-6 inline-block rounded-full bg-ink/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60"
        >
          Creative Digital Agency
        </motion.span>

        <h1 className="font-display max-w-4xl text-[clamp(2.5rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-tight text-ink">
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 40, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.08,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="mr-[0.2em] inline-block last:mr-0"
            >
              {word === "&" ? (
                <span className="bg-gradient-to-r from-violet-600 to-teal-500 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg"
        >
          Sergio Agency biến ý tưởng thành trải nghiệm số ấn tượng — từ website
          doanh nghiệp đến landing page chuyển đổi cao, với thiết kế hiện đại
          và công nghệ tiên tiến.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.32, 0.72, 0, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/lien-he">Bắt đầu dự án</Button>
          <Button href="/du-an" variant="secondary">
            Xem dự án
          </Button>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-3 gap-6 border-t border-ink/10 pt-10 sm:max-w-lg"
        >
          {[
            { value: "50+", label: "Dự án hoàn thành" },
            { value: "98%", label: "Khách hàng hài lòng" },
            { value: "5+", label: "Năm kinh nghiệm" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-ink/50">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
