import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

type SiteLogoProps = {
  href?: string;
  /** Visual size of the mark */
  size?: "sm" | "md" | "lg";
  /** Show wordmark next to the mark */
  withWordmark?: boolean;
  /**
   * true = nền tối → logo trắng
   * false = nền sáng → logo đen
   */
  light?: boolean;
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: { box: 32, img: 32 },
  md: { box: 40, img: 40 },
  lg: { box: 48, img: 48 },
};

export function SiteLogo({
  href = "/",
  size = "md",
  withWordmark = true,
  light = false,
  className = "",
  priority = false,
}: SiteLogoProps) {
  const dim = sizes[size];

  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="relative shrink-0 overflow-hidden rounded-lg"
        style={{ width: dim.box, height: dim.box }}
      >
        <Image
          src="/images/logo.png"
          alt={siteConfig.name}
          width={dim.img}
          height={dim.img}
          priority={priority}
          className={`h-full w-full object-cover transition-[filter] duration-500 ${
            light
              ? "invert" /* nền tối → đảo thành logo sáng */
              : "invert-0" /* nền sáng → giữ logo tối gốc */
          }`}
        />
      </span>
      {withWordmark ? (
        <span
          className={`font-display font-semibold tracking-tight transition-colors duration-500 ${
            size === "lg" ? "text-xl" : size === "sm" ? "text-base" : "text-lg"
          } ${light ? "text-cream" : "text-ink"}`}
        >
          {siteConfig.name}
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="inline-flex transition-opacity hover:opacity-90"
      aria-label={siteConfig.name}
    >
      {mark}
    </Link>
  );
}
