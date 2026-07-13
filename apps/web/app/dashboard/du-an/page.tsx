import Link from "next/link";
import { ProjectTable } from "@/components/dashboard/ProjectTable";
import { prisma } from "@/lib/prisma";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      published: true,
      featured: true,
    },
    orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Dự án</h1>
          <p className="mt-1 text-sm text-white/50">
            Quản lý portfolio dự án
          </p>
        </div>
        <Link
          href="/dashboard/du-an/new"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black hover:bg-white/90"
        >
          + Tạo mới
        </Link>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
}
