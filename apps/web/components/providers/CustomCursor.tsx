"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, label, .cursor-grow",
      );
      setHovering(!!interactive);
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.14;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      aria-hidden
    >
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 h-1.5 w-1.5 rounded-full bg-ink will-change-transform transition-[width,height,background-color] duration-300 ${
          hovering ? "h-0 w-0 bg-ink/0" : ""
        }`}
      />
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full border border-ink will-change-transform transition-[width,height,border-color,background-color] duration-300 ease-out ${
          hovering
            ? "h-14 w-14 border-ink/40 bg-ink/10"
            : "h-9 w-9 border-ink/70 bg-transparent"
        }`}
      />
    </div>
  );
}
