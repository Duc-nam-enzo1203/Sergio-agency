import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { posts, projects, services, siteConfig } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@sergioagency.com" },
    update: {},
    create: {
      email: "admin@sergioagency.com",
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: siteConfig.name,
      tagline: siteConfig.tagline,
      email: siteConfig.email,
      phone: siteConfig.phone,
      address: siteConfig.address,
      socialLinks: JSON.stringify({
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      }),
      seoDefaults: JSON.stringify({
        title: "Sergio Agency — Thiết kế Website & Landing Page",
        description: siteConfig.tagline,
      }),
    },
  });

  for (const [index, service] of services.entries()) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: JSON.stringify(service.features),
        process: JSON.stringify(service.process),
        faq: JSON.stringify(service.faq),
        priceFrom: service.priceFrom,
        order: index,
        published: true,
      },
      create: {
        slug: service.slug,
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: JSON.stringify(service.features),
        process: JSON.stringify(service.process),
        faq: JSON.stringify(service.faq),
        priceFrom: service.priceFrom,
        order: index,
        published: true,
      },
    });
  }

  for (const [index, project] of projects.entries()) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        description: project.description,
        content: project.content,
        coverImage: project.image,
        images: JSON.stringify(project.images),
        client: project.client,
        category: project.category,
        year: project.year,
        techStack: JSON.stringify(project.techStack),
        url: project.url ?? null,
        color: project.color,
        featured: project.featured,
        order: index,
        published: true,
      },
      create: {
        slug: project.slug,
        title: project.title,
        description: project.description,
        content: project.content,
        coverImage: project.image,
        images: JSON.stringify(project.images),
        client: project.client,
        category: project.category,
        year: project.year,
        techStack: JSON.stringify(project.techStack),
        url: project.url ?? null,
        color: project.color,
        featured: project.featured,
        order: index,
        published: true,
      },
    });
  }

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.image,
        tag: post.tag,
        readTime: post.readTime,
        author: post.author,
        published: true,
        publishedAt: new Date(),
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.image,
        tag: post.tag,
        readTime: post.readTime,
        author: post.author,
        published: true,
        publishedAt: new Date(),
      },
    });
  }

  console.log("Seed completed.");
  console.log("Admin login: admin@sergioagency.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
