import { parseProject, parseService } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";

export async function getPublishedServices() {
  const items = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return items.map(parseService);
}

export async function getServiceBySlug(slug: string) {
  const item = await prisma.service.findFirst({
    where: { slug, published: true },
  });
  return item ? parseService(item) : null;
}

export async function getPublishedProjects() {
  const items = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return items.map(parseProject);
}

export async function getFeaturedProjects() {
  const items = await prisma.project.findMany({
    where: { published: true, featured: true },
    orderBy: { order: "asc" },
    take: 3,
  });
  return items.map(parseProject);
}

export async function getProjectBySlug(slug: string) {
  const item = await prisma.project.findFirst({
    where: { slug, published: true },
  });
  return item ? parseProject(item) : null;
}

export async function getRelatedProjects(slug: string, limit = 2) {
  const current = await getProjectBySlug(slug);
  if (!current) return [];
  const items = await prisma.project.findMany({
    where: {
      published: true,
      category: current.category,
      slug: { not: slug },
    },
    take: limit,
  });
  return items.map(parseProject);
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getLatestPosts(limit = 3) {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: limit,
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: { slug, published: true },
  });
}

export async function getRelatedPosts(slug: string, limit = 2) {
  const current = await getPostBySlug(slug);
  if (!current) return [];
  return prisma.post.findMany({
    where: {
      published: true,
      tag: current.tag,
      slug: { not: slug },
    },
    take: limit,
  });
}

export async function getSiteSettings() {
  return prisma.siteSettings.findUnique({ where: { id: "default" } });
}

export async function getDashboardStats() {
  const [projects, posts, leadsNew] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.lead.count({ where: { status: "NEW" } }),
  ]);
  return { projects, posts, leadsNew };
}

export async function getRecentLeads(limit = 5) {
  return prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
