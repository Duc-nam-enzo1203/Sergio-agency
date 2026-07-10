import { notFound } from "next/navigation";
import { PostForm } from "@/components/dashboard/PostForm";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Sửa bài viết</h1>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          coverImage: post.coverImage ?? "",
          tag: post.tag ?? "",
          readTime: post.readTime ?? "",
          author: post.author ?? "",
          published: post.published,
        }}
      />
    </div>
  );
}
