"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CoverImageField } from "@/components/dashboard/CoverImageField";
import { slugify } from "@/lib/validations";

type PostFormData = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tag: string;
  readTime: string;
  author: string;
  published: boolean;
};

type PostFormProps = {
  initial?: Partial<PostFormData>;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#1a1a1a] px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none";

export function PostForm({ initial }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<PostFormData>({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "",
    coverImage: initial?.coverImage ?? "",
    tag: initial?.tag ?? "Website",
    readTime: initial?.readTime ?? "5 phút",
    author: initial?.author ?? "Sergio Team",
    published: initial?.published ?? false,
    id: initial?.id,
  });

  function update(field: keyof PostFormData, value: string | boolean) {
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

    const url = form.id ? `/api/posts/${form.id}` : "/api/posts";
    const method = form.id ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Có lỗi xảy ra");
        setLoading(false);
        return;
      }

      router.push("/dashboard/bai-viet");
      router.refresh();
    } catch {
      setError("Không thể kết nối máy chủ");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
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
        <label className="mb-2 block text-sm text-white/60">Tóm tắt</label>
        <textarea
          className={`${inputClass} min-h-[80px]`}
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/60">Nội dung</label>
        <textarea
          className={`${inputClass} min-h-[200px] font-mono`}
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          required
        />
      </div>

      <CoverImageField
        value={form.coverImage}
        onChange={(url) => update("coverImage", url)}
        inputClass={inputClass}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/60">Tag</label>
          <input
            className={inputClass}
            value={form.tag}
            onChange={(e) => update("tag", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/60">Thời gian đọc</label>
          <input
            className={inputClass}
            value={form.readTime}
            onChange={(e) => update("readTime", e.target.value)}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/60">Tác giả</label>
          <input
            className={inputClass}
            value={form.author}
            onChange={(e) => update("author", e.target.value)}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="rounded"
        />
        Published
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
      >
        {loading ? "Đang lưu..." : form.id ? "Cập nhật" : "Tạo bài viết"}
      </button>
    </form>
  );
}
