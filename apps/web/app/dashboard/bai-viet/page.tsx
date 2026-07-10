import Link from "next/link";
import { PostTable } from "@/components/dashboard/PostTable";
import { prisma } from "@/lib/prisma";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      publishedAt: true,
      tag: true,
    },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Bài viết</h1>
          <p className="mt-1 text-sm text-white/50">Quản lý blog</p>
        </div>
        <Link
          href="/dashboard/bai-viet/new"
          className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-white/90"
        >
          + Tạo mới
        </Link>
      </div>
      <PostTable posts={posts} />
    </div>
  );
}
