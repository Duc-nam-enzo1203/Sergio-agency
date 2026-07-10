import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { posts, projects, services, siteConfig } from "../lib/data";

const prisma = new PrismaClient();

async function main() {
  const email =
    process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase() ||
    "admin@sergioagency.com";
  const password = process.env.SEED_ADMIN_PASSWORD;
  const weakPasswords = new Set([
    "admin123",
    "password",
    "12345678",
    "changeme",
    "admin",
  ]);

  if (!password || password.length < 12) {
    throw new Error(
      "Set SEED_ADMIN_PASSWORD (min 12 chars) before seeding. Example: SEED_ADMIN_PASSWORD='...' npx prisma db seed",
    );
  }
  if (weakPasswords.has(password.toLowerCase())) {
    throw new Error("SEED_ADMIN_PASSWORD is too weak. Choose a stronger password.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email,
      name: "Admin",
      passwordHash,
      role: "ADMIN",
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {
      siteName: siteConfig.name,
      tagline: siteConfig.tagline,
      email: siteConfig.email,
      phone: siteConfig.phone,
      address: siteConfig.address,
    },
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
  console.log(`Admin login: ${email} (password from SEED_ADMIN_PASSWORD)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
