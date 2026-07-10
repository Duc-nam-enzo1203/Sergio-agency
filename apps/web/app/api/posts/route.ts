import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = postSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
    }

    const data = parsed.data;
    const post = await prisma.post.create({
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
      },
    });

    revalidatePath("/bai-viet");
    revalidatePath("/");
    if (post.published) revalidatePath(`/bai-viet/${post.slug}`);

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Không thể tạo bài viết" }, { status: 500 });
  }
}
