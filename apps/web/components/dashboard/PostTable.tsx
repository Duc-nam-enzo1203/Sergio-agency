"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  tag: string | null;
  published: boolean;
};

export function PostTable({ posts }: { posts: PostRow[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Xóa bài viết này?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (posts.length === 0) {
    return <p className="text-sm text-white/40">Chưa có bài viết.</p>;
  }

  return (
    <>
      <ul className="space-y-3 md:hidden">
        {posts.map((p) => (
          <li
            key={p.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="font-medium leading-snug">{p.title}</p>
            <p className="mt-1 truncate text-xs text-white/40">
              /bai-viet/{p.slug}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {p.tag ? (
                <span className="text-xs text-white/50">{p.tag}</span>
              ) : null}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  p.published
                    ? "bg-green-500/20 text-green-300"
                    : "bg-white/10 text-white/50"
                }`}
              >
                {p.published ? "Published" : "Draft"}
              </span>
            </div>
            <div className="mt-4 flex gap-4 border-t border-white/10 pt-3 text-sm">
              <Link
                href={`/dashboard/bai-viet/${p.id}`}
                className="text-white/70 hover:text-white"
              >
                Sửa
              </Link>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="text-red-400 hover:text-red-300"
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-2xl border border-white/10 md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 font-medium">Tiêu đề</th>
              <th className="px-4 py-3 font-medium">Tag</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-white/5">
                <td className="px-4 py-3">
                  <p className="font-medium">{p.title}</p>
                  <p className="text-xs text-white/40">/bai-viet/{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-white/60">{p.tag}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      p.published
                        ? "bg-green-500/20 text-green-300"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <Link
                    href={`/dashboard/bai-viet/${p.id}`}
                    className="mr-3 text-white/60 hover:text-white"
                  >
                    Sửa
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
