"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AnimateOnScrollProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Softer Ohio-like rise (default) or scale-in for media cards */
  variant?: "rise" | "fade" | "scale";
};

const easings = {
  ohio: [0.22, 1, 0.36, 1] as const,
};

const variants = {
  rise: {
    initial: { opacity: 0, y: 56 },
    animate: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scale: {
    initial: { opacity: 0, y: 40, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
  },
};

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  variant = "rise",
}: AnimateOnScrollProps) {
  const prefersReducedMotion = useReducedMotion();
  const motionVariant = variants[variant];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={motionVariant.initial}
      whileInView={motionVariant.animate}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 1.05,
        delay,
        ease: easings.ohio,
      }}
    >
      {children}
    </motion.div>
  );
}
