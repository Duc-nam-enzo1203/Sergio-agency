import type { MetadataRoute } from "next";
import {
  getPublishedPosts,
  getPublishedProjects,
  getPublishedServices,
} from "@/lib/queries";
import { getSiteUrl } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/dich-vu",
    "/du-an",
    "/bai-viet",
    "/portfolio",
    "/lien-he",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const [services, projects, posts] = await Promise.all([
    getPublishedServices(),
    getPublishedProjects(),
    getPublishedPosts(),
  ]);

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/dich-vu/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/du-an/${p.slug}`,
    lastModified: p.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/bai-viet/${p.slug}`,
    lastModified: p.publishedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes, ...postRoutes];
}
