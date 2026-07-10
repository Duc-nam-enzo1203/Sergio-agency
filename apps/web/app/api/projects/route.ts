import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/api-auth";
import { toJson } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const data = parsed.data;
    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        images: toJson(data.images ?? []),
        client: data.client,
        category: data.category,
        year: data.year,
        techStack: toJson(data.techStack ?? []),
        url: data.url,
        color: data.color,
        featured: data.featured ?? false,
        order: data.order ?? 0,
        published: data.published ?? false,
      },
    });

    revalidatePath("/du-an");
    revalidatePath("/");
    if (project.published) revalidatePath(`/du-an/${project.slug}`);

    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Không thể tạo dự án" }, { status: 500 });
  }
}
