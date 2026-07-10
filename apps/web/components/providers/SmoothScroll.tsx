"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import "lenis/dist/lenis.css";

type SmoothScrollProps = {
  children: ReactNode;
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        duration: 1.15,
        smoothWheel: true,
        touchMultiplier: 1.4,
        wheelMultiplier: 0.95,
        lerp: 0.085,
        orientation: "vertical",
        gestureOrientation: "vertical",
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
