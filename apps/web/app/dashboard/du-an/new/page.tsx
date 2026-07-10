import { ProjectForm } from "@/components/dashboard/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Tạo dự án mới</h1>
      <ProjectForm />
    </div>
  );
}
