import {
  absoluteUrl,
  getSiteUrl,
  organizationId,
  siteConfig,
  websiteId,
} from "@/lib/seo/site";

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId(),
    name: siteConfig.name,
    url,
    logo: absoluteUrl("/images/logo.png"),
    image: absoluteUrl("/images/logo.png"),
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN",
    },
    sameAs: [],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        email: siteConfig.email,
        areaServed: "VN",
        availableLanguage: ["Vietnamese", "English"],
      },
    ],
  };
}

export function websiteJsonLd(): JsonLd {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(),
    url,
    name: siteConfig.name,
    description: siteConfig.tagline,
    inLanguage: "vi-VN",
    publisher: { "@id": organizationId() },
  };
}

export function faqPageJsonLd(
  faqs: { question: string; answer: string }[],
  pageUrl: string,
): JsonLd | null {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description?: string | null;
  path: string;
  priceFrom?: string | null;
}): JsonLd {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description ?? undefined,
    url,
    provider: { "@id": organizationId() },
    areaServed: "VN",
    serviceType: input.name,
    ...(input.priceFrom
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "VND",
            price: input.priceFrom.replace(/[^\d]/g, "") || undefined,
            description: `Từ ${input.priceFrom}`,
            url,
          },
        }
      : {}),
  };
}

export function articleJsonLd(input: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  datePublished?: Date | string | null;
  dateModified?: Date | string | null;
  author?: string | null;
}): JsonLd {
  const url = absoluteUrl(input.path);
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absoluteUrl(input.image)
    : absoluteUrl("/images/logo.png");

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description ?? undefined,
    url,
    mainEntityOfPage: url,
    image: [image],
    datePublished: input.datePublished
      ? new Date(input.datePublished).toISOString()
      : undefined,
    dateModified: input.dateModified
      ? new Date(input.dateModified).toISOString()
      : input.datePublished
        ? new Date(input.datePublished).toISOString()
        : undefined,
    author: {
      "@type": "Person",
      name: input.author || siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": organizationId(),
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo.png"),
      },
    },
    inLanguage: "vi-VN",
  };
}

export function creativeWorkJsonLd(input: {
  name: string;
  description?: string | null;
  path: string;
  image?: string | null;
  dateCreated?: string | null;
  keywords?: string[];
  url?: string | null;
}): JsonLd {
  const pageUrl = absoluteUrl(input.path);
  const image = input.image
    ? input.image.startsWith("http")
      ? input.image
      : absoluteUrl(input.image)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description ?? undefined,
    url: pageUrl,
    image,
    dateCreated: input.dateCreated ?? undefined,
    keywords: input.keywords?.join(", "),
    creator: { "@id": organizationId() },
    ...(input.url
      ? {
          sameAs: [input.url],
        }
      : {}),
  };
}

export function personJsonLd(input: {
  name: string;
  jobTitle: string;
  description: string;
  email: string;
  telephone: string;
  path: string;
  address?: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    jobTitle: input.jobTitle,
    description: input.description,
    email: input.email,
    telephone: input.telephone,
    url: absoluteUrl(input.path),
    worksFor: { "@id": organizationId() },
    address: input.address
      ? {
          "@type": "PostalAddress",
          addressLocality: input.address,
          addressCountry: "VN",
        }
      : undefined,
    knowsAbout: [
      "WordPress",
      "WooCommerce",
      "Shopify",
      "PHP",
      "JavaScript",
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
