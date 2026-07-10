"use client";

import { useState } from "react";
import { DarkSelect } from "@/components/dashboard/DarkSelect";

type SettingsData = {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
};

type SettingsFormProps = {
  initial: SettingsData;
  leads: {
    id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: string;
  }[];
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none";

export function SettingsForm({ initial, leads }: SettingsFormProps) {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [leadList, setLeadList] = useState(leads);

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

  async function updateLeadStatus(id: string, status: string) {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeadList((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div>
        <h2 className="mb-6 font-display text-xl font-semibold">
          Thông tin site
        </h2>
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
            )
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

      <div>
        <h2 className="mb-6 font-display text-xl font-semibold">
          Quản lý Leads
        </h2>
        {leadList.length === 0 ? (
          <p className="text-sm text-white/40">Chưa có lead.</p>
        ) : (
          <ul className="space-y-4">
            {leadList.map((lead) => (
              <li
                key={lead.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-white/50">{lead.email}</p>
                    <p className="mt-2 text-sm text-white/70">{lead.message}</p>
                  </div>
                  <div className="w-36 shrink-0">
                    <DarkSelect
                      value={lead.status}
                      onChange={(value) => updateLeadStatus(lead.id, value)}
                      options={[
                        { value: "NEW", label: "NEW" },
                        { value: "CONTACTED", label: "CONTACTED" },
                        { value: "QUALIFIED", label: "QUALIFIED" },
                        { value: "CLOSED", label: "CLOSED" },
                      ]}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
