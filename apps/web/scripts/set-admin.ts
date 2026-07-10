/**
 * Set / rotate admin credentials.
 * Run:
 *   SEED_ADMIN_EMAIL=namdoan.ka@gmail.com SEED_ADMIN_PASSWORD='***' npx tsx scripts/set-admin.ts
 */
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = (process.env.SEED_ADMIN_EMAIL ?? "").trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD ?? "";
  const removeEmail = (process.env.SEED_REMOVE_EMAIL ?? "admin@sergioagency.com")
    .trim()
    .toLowerCase();

  if (!email || !email.includes("@")) {
    throw new Error("Set SEED_ADMIN_EMAIL");
  }
  if (password.length < 12) {
    throw new Error("Set SEED_ADMIN_PASSWORD (min 12 chars)");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Nam Doan",
      passwordHash,
      role: "ADMIN",
    },
    create: {
      email,
      name: "Nam Doan",
      passwordHash,
      role: "ADMIN",
    },
  });

  if (removeEmail && removeEmail !== email) {
    await prisma.user.deleteMany({ where: { email: removeEmail } });
  }

  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: { email },
    create: {
      id: "default",
      siteName: "Sergio Agency",
      tagline: "Thiết kế website & landing page",
      email,
      phone: "0866634302",
      address: "Hà Nội, Việt Nam",
      socialLinks: "{}",
      seoDefaults: "{}",
    },
  });

  console.log(`Admin updated: ${email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
