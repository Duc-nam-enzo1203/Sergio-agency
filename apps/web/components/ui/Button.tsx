import Link from "next/link";
import type { ReactNode } from "react";
import { isSafeHttpUrl } from "@/lib/validations";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-ink text-cream hover:bg-ink/90 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset]",
  secondary:
    "bg-cream-dark text-ink ring-1 ring-ink/10 hover:bg-cream-dark/80",
  ghost: "text-ink/70 hover:text-ink hover:bg-ink/5",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]";

  const content = (
    <>
      <span>{children}</span>
      {variant === "primary" && (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M3 11L11 3M11 3H5M11 3V9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );

  if (external) {
    if (!isSafeHttpUrl(href) || href.startsWith("/")) {
      return null;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </a>
    );
  }

  if (!href.startsWith("/") || href.startsWith("//")) {
    return null;
  }

  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </Link>
  );
}
