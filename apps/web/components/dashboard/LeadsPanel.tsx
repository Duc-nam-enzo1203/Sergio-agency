"use client";

import { useState } from "react";
import { DarkSelect } from "@/components/dashboard/DarkSelect";

type LeadItem = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

export function LeadsPanel({ leads }: { leads: LeadItem[] }) {
  const [leadList, setLeadList] = useState(leads);

  async function updateLeadStatus(id: string, status: string) {
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeadList((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l)),
      );
    }
  }

  if (leadList.length === 0) {
    return <p className="text-sm text-white/40">Chưa có lead.</p>;
  }

  return (
    <ul className="space-y-4">
      {leadList.map((lead) => (
        <li
          key={lead.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div>
              <p className="font-medium break-words">{lead.name}</p>
              <p className="text-sm text-white/50 break-all">{lead.email}</p>
              <p className="mt-2 text-sm text-white/70">{lead.message}</p>
            </div>
            <div className="w-full sm:w-36 sm:shrink-0">
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
  );
}
