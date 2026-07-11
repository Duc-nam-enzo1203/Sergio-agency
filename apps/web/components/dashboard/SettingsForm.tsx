"use client";

import { useState } from "react";

type SettingsData = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
};

type SettingsFormProps = {
  initial: SettingsData;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none";

export function SettingsForm({ initial }: SettingsFormProps) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setMessage(res.ok ? "Đã lưu cài đặt." : "Không thể lưu.");
  }

  return (
    <div className="max-w-xl">
      <h2 className="mb-6 font-display text-xl font-semibold">Thông tin site</h2>
      <form onSubmit={handleSave} className="space-y-4">
        {(["siteName", "tagline", "email", "phone", "address"] as const).map(
          (field) => (
            <div key={field}>
              <label className="mb-2 block text-sm capitalize text-white/60">
                {field === "siteName" ? "Tên site" : field}
              </label>
              <input
                className={inputClass}
                value={form[field]}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field]: e.target.value }))
                }
              />
            </div>
          ),
        )}
        {message && <p className="text-sm text-green-400">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? "Đang lưu..." : "Lưu cài đặt"}
        </button>
      </form>
    </div>
  );
}
