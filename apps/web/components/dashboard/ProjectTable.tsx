"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

type ProjectRow = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  published: boolean;
  featured: boolean;
};

export function ProjectTable({ projects }: { projects: ProjectRow[] }) {
  const router = useRouter();

  async function handleDelete(id: string) {
    if (!confirm("Xóa dự án này?")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-white/10 bg-white/5">
          <tr>
            <th className="px-4 py-3 font-medium">Tiêu đề</th>
            <th className="px-4 py-3 font-medium">Danh mục</th>
            <th className="px-4 py-3 font-medium">Trạng thái</th>
            <th className="px-4 py-3 font-medium" />
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {projects.map((p) => (
            <tr key={p.id} className="hover:bg-white/5">
              <td className="px-4 py-3">
                <p className="font-medium">{p.title}</p>
                <p className="text-xs text-white/40">/du-an/{p.slug}</p>
              </td>
              <td className="px-4 py-3 text-white/60">{p.category}</td>
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
                {p.featured && (
                  <span className="ml-2 rounded-full bg-violet-500/20 px-2 py-0.5 text-xs text-violet-300">
                    Featured
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/dashboard/du-an/${p.id}`}
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
  );
}
