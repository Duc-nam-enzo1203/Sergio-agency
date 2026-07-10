import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: Props) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = postSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const existing = await prisma.post.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = parsed.data;
    const post = await prisma.post.update({
      where: { id },
      data: {
        ...data,
        publishedAt:
          data.published === true && !existing.publishedAt
            ? new Date()
            : data.published === false
              ? null
              : existing.publishedAt,
      },
    });

    revalidatePath("/bai-viet");
    revalidatePath("/");
    revalidatePath(`/bai-viet/${existing.slug}`);
    if (post.slug !== existing.slug) revalidatePath(`/bai-viet/${post.slug}`);

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const { id } = await params;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.post.delete({ where: { id } });

  revalidatePath("/bai-viet");
  revalidatePath("/");
  revalidatePath(`/bai-viet/${existing.slug}`);

  return NextResponse.json({ success: true });
}
