import Image, { type ImageProps } from "next/image";

const OPTIMIZED_HOST_SUFFIXES = [
  "images.unsplash.com",
  "public.blob.vercel-storage.com",
  "vercel-storage.com",
  "oceancityhanoi.vn",
  "konlift.vn",
  "vinhomes.vn",
  "dav.edu.vn",
  "imagebeauty.vn",
  "thecanopyresidences.vn",
  "sassypantslingerie.co.uk",
];

function canOptimize(src: string): boolean {
  if (!src || src.startsWith("/") || src.startsWith("data:") || src.startsWith("blob:")) {
    return true;
  }
  try {
    const host = new URL(src).hostname.toLowerCase();
    return OPTIMIZED_HOST_SUFFIXES.some(
      (suffix) => host === suffix || host.endsWith(`.${suffix}`),
    );
  } catch {
    return false;
  }
}

type SafeImageProps = Omit<ImageProps, "src"> & {
  src: string;
};

/**
 * Uses next/image when hostname is allowlisted; falls back to <img>
 * so CMS remote covers never crash the page.
 */
export function SafeImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
  ...rest
}: SafeImageProps) {
  if (!src) return null;

  if (!canOptimize(src)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={
          fill
            ? `absolute inset-0 h-full w-full object-cover ${className ?? ""}`
            : className
        }
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      sizes={sizes}
      priority={priority}
      {...rest}
    />
  );
}
