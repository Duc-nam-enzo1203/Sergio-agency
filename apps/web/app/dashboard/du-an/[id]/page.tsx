import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { parseJsonArray } from "@/lib/db-utils";
import { prisma } from "@/lib/prisma";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Sửa dự án</h1>
      <ProjectForm
        initial={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          description: project.description ?? "",
          content: project.content ?? "",
          coverImage: project.coverImage ?? "",
          client: project.client ?? "",
          category: project.category ?? "",
          year: project.year ?? "",
          url: project.url ?? "",
          color: project.color ?? "",
          techStack: parseJsonArray<string>(project.techStack).join(", "),
          featured: project.featured,
          published: project.published,
        }}
      />
    </div>
  );
}
