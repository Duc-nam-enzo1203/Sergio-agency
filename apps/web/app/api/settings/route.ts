import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { parseJsonObject, toJson } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";
import { settingsSchema } from "@/lib/validations";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });
  if (!settings) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    ...settings,
    socialLinks: parseJsonObject(settings.socialLinks, {}),
    seoDefaults: parseJsonObject(settings.seoDefaults, {}),
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const data = parsed.data;
    const settings = await prisma.siteSettings.upsert({
      where: { id: "default" },
      update: {
        siteName: data.siteName,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        address: data.address,
        socialLinks: data.socialLinks ? toJson(data.socialLinks) : undefined,
        seoDefaults: data.seoDefaults ? toJson(data.seoDefaults) : undefined,
      },
      create: {
        id: "default",
        siteName: data.siteName,
        tagline: data.tagline,
        email: data.email,
        phone: data.phone,
        address: data.address,
        socialLinks: toJson(data.socialLinks ?? {}),
        seoDefaults: toJson(data.seoDefaults ?? {}),
      },
    });

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}
