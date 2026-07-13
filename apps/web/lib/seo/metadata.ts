import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl, siteConfig } from "@/lib/seo/site";

type BuildMetaInput = {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: BuildMetaInput): Metadata {
  const url = absoluteUrl(path);
  const desc =
    description?.trim() ||
    "Agency thiết kế website và landing page hiện đại cho doanh nghiệp và startup.";
  const ogImage = image?.startsWith("http")
    ? image
    : image
      ? absoluteUrl(image)
      : absoluteUrl("/images/logo.png");

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: [ogImage],
    },
  };
}

export function rootMetadataDefaults(): Metadata {
  const base = getSiteUrl();
  return {
    metadataBase: new URL(base),
    title: {
      default: `${siteConfig.name} — ${siteConfig.tagline}`,
      template: `%s | ${siteConfig.name}`,
    },
    description:
      "Agency thiết kế website và landing page hiện đại. Giúp thương hiệu của bạn tỏa sáng với thiết kế đẹp mắt và công nghệ tiên tiến.",
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: base }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: { telephone: true, email: true, address: true },
    icons: {
      icon: "/images/logo.png",
      apple: "/images/logo.png",
    },
    openGraph: {
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description:
        "Agency thiết kế website và landing page hiện đại cho doanh nghiệp và startup.",
      type: "website",
      locale: "vi_VN",
      siteName: siteConfig.name,
      url: base,
      images: [
        {
          url: "/images/logo.png",
          width: 512,
          height: 512,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${siteConfig.name} — ${siteConfig.tagline}`,
      description:
        "Agency thiết kế website và landing page hiện đại cho doanh nghiệp và startup.",
      images: ["/images/logo.png"],
    },
    alternates: { canonical: base },
  };
}
