"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { SiteLogo } from "@/components/ui/SiteLogo";

const links = [
  { href: "/dashboard", label: "Tổng quan", icon: "◉", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/du-an", label: "Dự án", icon: "◈", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/bai-viet", label: "Bài viết", icon: "◇", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/leads", label: "Leads", icon: "○", roles: ["ADMIN", "EDITOR"] },
  { href: "/dashboard/settings", label: "Settings", icon: "◎", roles: ["ADMIN"] },
];

type DashboardShellProps = {
  userLabel: string;
  children: ReactNode;
};

export function DashboardShell({ userLabel, children }: DashboardShellProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const role = String(session?.user?.role ?? "").toUpperCase();
  const visible = links.filter((l) => l.roles.includes(role) || role === "ADMIN");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="flex min-h-[100dvh] bg-[#111]">
      {open ? (
        <button
          type="button"
          aria-label="Đóng menu"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col border-r border-white/10 bg-[#0a0a0a] text-white transition-transform duration-300 ease-out md:static md:z-auto md:w-64 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <SiteLogo size="sm" light href="/" />
            <p className="mt-1 text-xs text-white/40">
              {role === "ADMIN" ? "Admin Dashboard" : "Editor Dashboard"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-white/50 hover:bg-white/5 hover:text-white md:hidden"
          >
            <span aria-hidden className="block text-lg leading-none">
              ✕
            </span>
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 sm:p-4">
          {visible.map((link) => {
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

        <div className="border-t border-white/10 p-3 sm:p-4">
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

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-white/10 bg-[#111]/95 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4">
          <button
            type="button"
            aria-label="Mở menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/80 hover:bg-white/5 md:hidden"
          >
            <span className="flex flex-col gap-1.5" aria-hidden>
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
            </span>
          </button>
          <p className="ml-auto truncate text-sm text-white/50">{userLabel}</p>
        </header>
        <main className="flex-1 overflow-auto p-4 text-white sm:p-6">{children}</main>
      </div>
    </div>
  );
}
