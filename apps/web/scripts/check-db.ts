import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tables = await prisma.$queryRawUnsafe<
    { table_name: string }[]
  >(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
  );
  console.log("TABLES:");
  for (const t of tables) console.log(" -", t.table_name);

  const counts = {
    User: await prisma.user.count(),
    Post: await prisma.post.count(),
    Project: await prisma.project.count(),
    Service: await prisma.service.count(),
    Lead: await prisma.lead.count(),
    SiteSettings: await prisma.siteSettings.count(),
  };
  console.log("COUNTS:", counts);

  const admin = await prisma.user.findFirst({
    select: { email: true, role: true },
  });
  console.log("ADMIN:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
