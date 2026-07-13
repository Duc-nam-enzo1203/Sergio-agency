"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CoverImageField } from "@/components/dashboard/CoverImageField";
import { DarkSelect } from "@/components/dashboard/DarkSelect";
import { slugify } from "@/lib/validations";

type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  client: string;
  category: string;
  year: string;
  url: string;
  color: string;
  techStack: string;
  featured: boolean;
  published: boolean;
};

type ProjectFormProps = {
  initial?: Partial<ProjectFormData>;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none";

const CATEGORY_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Landing Page", label: "Landing Page" },
  { value: "E-commerce", label: "E-commerce" },
];

export function ProjectForm({ initial }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ProjectFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    description: initial?.description ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    client: initial?.client ?? "",
    category: initial?.category || "Website",
    year: initial?.year ?? new Date().getFullYear().toString(),
    url: initial?.url ?? "",
    color: initial?.color ?? "from-violet-500/20 to-indigo-500/10",
    techStack: initial?.techStack ?? "",
    featured: initial?.featured ?? false,
    published: initial?.published ?? false,
    id: initial?.id,
  });

  function update(field: keyof ProjectFormData, value: string | boolean) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "title") {
        next.slug = slugify(value as string);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      images: form.coverImage ? [form.coverImage] : [],
    };

    const url = form.id ? `/api/projects/${form.id}` : "/api/projects";
    const method = form.id ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Có lỗi xảy ra");
        setLoading(false);
        return;
      }

      router.push("/dashboard/du-an");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-5">
      {error && (
        <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/60">Tiêu đề</label>
          <input
            className={inputClass}
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/60">Slug</label>
          <input
            className={`${inputClass} text-white/70`}
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            required
            title="Tự cập nhật theo tiêu đề"
          />
          <p className="mt-1 text-xs text-white/35">
            Tự tạo từ tiêu đề (dấu - giữa các từ)
          </p>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">Mô tả ngắn</label>
        <textarea
          className={`${inputClass} min-h-[80px]`}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">Nội dung chi tiết</label>
        <textarea
          className={`${inputClass} min-h-[120px]`}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
        />
      </div>

      <CoverImageField
        value={form.coverImage}
        onChange={(url) => update("coverImage", url)}
        inputClass={inputClass}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/60">Khách hàng</label>
          <input
            className={inputClass}
            value={form.client}
            onChange={(e) => update("client", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/60">Danh mục</label>
          <DarkSelect
            value={form.category}
            onChange={(value) => update("category", value)}
            options={CATEGORY_OPTIONS}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">URL live demo</label>
        <input
          className={inputClass}
          type="url"
          value={form.url}
          onChange={(e) => update("url", e.target.value)}
          placeholder="https://ten-du-an.com"
        />
        <p className="mt-1 text-xs text-white/35">
          Link nút &quot;Xem live demo&quot; trên trang dự án. Để trống nếu chưa có.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">
          Tech stack (phân cách bằng dấu phẩy)
        </label>
        <input
          className={inputClass}
          value={form.techStack}
          onChange={(e) => update("techStack", e.target.value)}
          placeholder="Next.js, Tailwind CSS, Vercel"
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => update("featured", e.target.checked)}
            className="rounded"
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => update("published", e.target.checked)}
            className="rounded"
          />
          Published
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Đang lưu..." : form.id ? "Cập nhật" : "Tạo dự án"}
      </button>
    </form>
  );
}
