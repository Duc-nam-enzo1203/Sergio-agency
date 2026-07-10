"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/dashboard", label: "Tổng quan", icon: "◉" },
  { href: "/dashboard/du-an", label: "Dự án", icon: "◈" },
  { href: "/dashboard/bai-viet", label: "Bài viết", icon: "◇" },
  { href: "/dashboard/settings", label: "Settings", icon: "◎" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0a0a0a] text-white">
      <div className="border-b border-white/10 px-6 py-5">
        <Link href="/" className="font-display text-lg font-semibold">
          Sergio Agency
        </Link>
        <p className="mt-1 text-xs text-white/40">Admin Dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const active =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-base opacity-60">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          className="mb-2 block rounded-xl px-4 py-2 text-sm text-white/50 hover:bg-white/5 hover:text-white"
        >
          ← Về website
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/dang-nhap" })}
          className="w-full rounded-xl px-4 py-2 text-left text-sm text-white/50 hover:bg-white/5 hover:text-white"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
