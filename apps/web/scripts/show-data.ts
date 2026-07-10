import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      slug: true,
      tag: true,
      published: true,
      author: true,
    },
  });
  const projects = await prisma.project.findMany({
    select: {
      title: true,
      slug: true,
      category: true,
      client: true,
      featured: true,
      published: true,
    },
    orderBy: { order: "asc" },
  });
  const services = await prisma.service.findMany({
    select: {
      title: true,
      slug: true,
      priceFrom: true,
      published: true,
      order: true,
    },
    orderBy: { order: "asc" },
  });
  const leads = await prisma.lead.findMany({
    select: {
      name: true,
      email: true,
      status: true,
      message: true,
      createdAt: true,
    },
  });
  const settings = await prisma.siteSettings.findMany();

  console.log("\n=== USER ===");
  console.table(users);

  console.log("\n=== POST ===");
  console.table(posts);

  console.log("\n=== PROJECT ===");
  console.table(projects);

  console.log("\n=== SERVICE ===");
  console.table(services);

  console.log("\n=== LEAD ===");
  if (leads.length === 0) console.log("(trống)");
  else console.table(leads);

  console.log("\n=== SITE SETTINGS ===");
  console.log(JSON.stringify(settings, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
