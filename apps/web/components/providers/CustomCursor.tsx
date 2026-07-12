"use client";

import { useEffect, useRef, useState } from "react";

function isDarkSurface(el: HTMLElement | null): boolean {
  let node: HTMLElement | null = el;
  while (node && node !== document.documentElement) {
    if (node.getAttribute("data-cursor") === "light") return true;
    const cls = node.classList;
    if (
      cls.contains("bg-ink") ||
      cls.contains("bg-[#111]") ||
      cls.contains("bg-[#0a0a0a]") ||
      cls.contains("bg-[#1C1C1C]") ||
      cls.contains("bg-[#222]")
    ) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onDark, setOnDark] = useState(false);
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

      const stack = document.elementsFromPoint(e.clientX, e.clientY);
      const under = stack.find((node) => {
        if (!(node instanceof HTMLElement)) return false;
        if (node.closest("[data-cursor-root]")) return false;
        return true;
      }) as HTMLElement | undefined;

      setOnDark(isDarkSurface(under ?? null));
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
      data-cursor-root
      className={`pointer-events-none fixed inset-0 z-[9999] hidden md:block ${
        visible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
      aria-hidden
    >
      <div
        ref={dotRef}
        className={`absolute top-0 left-0 h-1.5 w-1.5 rounded-full will-change-transform transition-[width,height,background-color,opacity] duration-300 ${
          onDark ? "bg-cream" : "bg-ink"
        } ${hovering ? "h-0 w-0 opacity-0" : ""}`}
      />
      <div
        ref={ringRef}
        className={`absolute top-0 left-0 rounded-full will-change-transform transition-[width,height,border-color,background-color] duration-300 ease-out ${
          hovering
            ? onDark
              ? "h-14 w-14 border border-cream/55 bg-cream/15"
              : "h-14 w-14 border border-ink/40 bg-ink/10"
            : onDark
              ? "h-9 w-9 border border-cream/85 bg-transparent"
              : "h-9 w-9 border border-ink/70 bg-transparent"
        }`}
      />
    </div>
  );
}
