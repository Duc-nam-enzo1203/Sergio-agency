"use client";

import { useRef, useState } from "react";

type CoverImageFieldProps = {
  value: string;
  onChange: (url: string) => void;
  inputClass: string;
};

export function CoverImageField({
  value,
  onChange,
  inputClass,
}: CoverImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError("");

    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload thất bại");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Không thể upload ảnh");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <label className="mb-2 block text-sm text-white/60">Ảnh cover</label>

      {value ? (
        <div className="overflow-hidden rounded-xl border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Cover preview"
            className="h-40 w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10 disabled:opacity-50"
        >
          {uploading ? "Đang upload..." : "Upload ảnh"}
        </button>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-sm text-white/50 hover:text-white"
          >
            Xóa ảnh
          </button>
        ) : null}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => void handleFile(e.target.files?.[0])}
        />
      </div>

      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Hoặc dán URL ảnh..."
      />

      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
