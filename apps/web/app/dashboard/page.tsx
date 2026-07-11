import Link from "next/link";
import { getDashboardStats, getRecentLeads } from "@/lib/queries";

export default async function DashboardPage() {
  const [stats, leads] = await Promise.all([
    getDashboardStats(),
    getRecentLeads(5),
  ]);

  const cards = [
    { label: "Tổng dự án", value: stats.projects, href: "/dashboard/du-an" },
    { label: "Tổng bài viết", value: stats.posts, href: "/dashboard/bai-viet" },
    {
      label: "Leads mới",
      value: stats.leadsNew,
      href: "/dashboard/leads",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">Tổng quan</h1>
        <p className="mt-1 text-sm text-white/50">
          Chào mừng trở lại dashboard quản trị.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
          >
            <p className="text-sm text-white/50">{card.label}</p>
            <p className="mt-2 font-display text-4xl font-semibold">
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/dashboard/du-an/new"
          className="rounded-2xl border border-dashed border-white/20 p-6 text-center transition-colors hover:border-white/40 hover:bg-white/5"
        >
          <p className="font-medium">+ Tạo dự án mới</p>
        </Link>
        <Link
          href="/dashboard/bai-viet/new"
          className="rounded-2xl border border-dashed border-white/20 p-6 text-center transition-colors hover:border-white/40 hover:bg-white/5"
        >
          <p className="font-medium">+ Tạo bài viết mới</p>
        </Link>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 px-6 py-4">
          <h2 className="font-medium">Leads gần đây</h2>
        </div>
        {leads.length === 0 ? (
          <p className="px-6 py-8 text-sm text-white/40">Chưa có lead nào.</p>
        ) : (
          <ul className="divide-y divide-white/10">
            {leads.map((lead) => (
              <li key={lead.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-white/50">{lead.email}</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {lead.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
