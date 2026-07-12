import { parseProject, parseService } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";

export async function getPublishedServices() {
  const items = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return items.map(parseService);
}

/** Lightweight list for homepage cards (skips heavy JSON fields). */
export async function getHomeServices() {
  return prisma.service.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      description: true,
      icon: true,
      slug: true,
    },
    orderBy: { order: "asc" },
  });
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
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      coverImage: true,
      category: true,
      color: true,
      client: true,
      year: true,
      url: true,
      featured: true,
      order: true,
      published: true,
      images: true,
      techStack: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  return items.map((p) =>
    parseProject({ ...p, content: p.description ?? "" }),
  );
}

export async function getFeaturedProjects(limit = 3) {
  return prisma.project.findMany({
    where: { published: true, featured: true },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      coverImage: true,
      category: true,
      color: true,
      client: true,
      year: true,
      url: true,
    },
    orderBy: { order: "asc" },
    take: limit,
  });
}

export async function getProjectBySlug(slug: string) {
  const item = await prisma.project.findFirst({
    where: { slug, published: true },
  });
  return item ? parseProject(item) : null;
}

export async function getRelatedProjects(slug: string, limit = 2) {
  const current = await prisma.project.findFirst({
    where: { slug, published: true },
    select: { category: true },
  });
  if (!current) return [];
  const items = await prisma.project.findMany({
    where: {
      published: true,
      category: current.category,
      slug: { not: slug },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      coverImage: true,
      category: true,
      color: true,
      client: true,
      year: true,
      url: true,
      featured: true,
      order: true,
      published: true,
      images: true,
      techStack: true,
      createdAt: true,
      updatedAt: true,
    },
    take: limit,
  });
  return items.map((p) =>
    parseProject({ ...p, content: p.description ?? "" }),
  );
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tag: true,
      publishedAt: true,
      readTime: true,
      author: true,
    },
    orderBy: { publishedAt: "desc" },
  });
}

export async function getLatestPosts(limit = 3) {
  return prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      tag: true,
      publishedAt: true,
    },
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
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
