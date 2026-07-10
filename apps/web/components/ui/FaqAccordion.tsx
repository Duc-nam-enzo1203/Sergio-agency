"use client";

import { useState } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink/10">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <AnimateOnScroll key={item.question} delay={i * 0.05}>
            <div className="py-5">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold text-ink sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink transition-transform duration-500 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="pt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        );
      })}
    </div>
  );
}
