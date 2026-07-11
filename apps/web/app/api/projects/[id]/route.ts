import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireStaff } from "@/lib/api-auth";
import { toJson } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const auth = await requireStaff();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: Request, { params }: Props) {
  const auth = await requireStaff();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = projectSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = parsed.data;
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        coverImage: data.coverImage,
        images: data.images ? toJson(data.images) : undefined,
        client: data.client,
        category: data.category,
        year: data.year,
        techStack: data.techStack ? toJson(data.techStack) : undefined,
        url: data.url,
        color: data.color,
        featured: data.featured,
        order: data.order,
        published: data.published,
      },
    });

    revalidatePath("/du-an");
    revalidatePath("/");
    revalidatePath(`/du-an/${existing.slug}`);
    if (project.slug !== existing.slug) revalidatePath(`/du-an/${project.slug}`);

    return NextResponse.json(project);
  } catch {
    return NextResponse.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const auth = await requireStaff();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.project.delete({ where: { id } });

  revalidatePath("/du-an");
  revalidatePath("/");
  revalidatePath(`/du-an/${existing.slug}`);

  return NextResponse.json({ success: true });
}
