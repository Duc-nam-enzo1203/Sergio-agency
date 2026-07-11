"use client";

import { useEffect, useId, useState } from "react";
import { siteConfig } from "@/lib/data";

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

const actions = [
  {
    id: "phone",
    label: "Gọi ngay",
    href: `tel:${phoneDigits}`,
    external: false,
    icon: PhoneIcon,
  },
  {
    id: "zalo",
    label: "Chat Zalo",
    href: `https://zalo.me/${phoneDigits}`,
    external: true,
    icon: ZaloIcon,
  },
  {
    id: "email",
    label: "Gửi email",
    href: `mailto:${siteConfig.email}`,
    external: false,
    icon: MailIcon,
  },
  {
    id: "contact",
    label: "Form liên hệ",
    href: "/lien-he",
    external: false,
    icon: MessageIcon,
  },
] as const;

export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div
        id={panelId}
        role="menu"
        aria-hidden={!open}
        className={`flex flex-col items-end gap-2 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={action.id}
              role="menuitem"
              href={action.href}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
              style={{
                transitionDelay: open ? `${(actions.length - index) * 40}ms` : "0ms",
              }}
            >
              <span className="rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink shadow-[0_8px_24px_rgba(17,17,17,0.12)] ring-1 ring-ink/10 opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 sm:opacity-100 sm:translate-x-0">
                {action.label}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-cream shadow-[0_10px_28px_rgba(17,17,17,0.22)] ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                <Icon />
              </span>
            </a>
          );
        })}
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-ink text-cream shadow-[0_12px_32px_rgba(17,17,17,0.28)] ring-1 ring-white/10 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span
          className={`absolute inset-0 rounded-full bg-ink/30 motion-safe:animate-ping ${
            open ? "opacity-0" : "opacity-25"
          }`}
          aria-hidden
        />
        <span
          className={`relative transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          <PlusIcon />
        </span>
      </button>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8.5 4.5h2.2l1.1 3.3-1.4 1.4a12.5 12.5 0 0 0 4.9 4.9l1.4-1.4 3.3 1.1v2.2A2 2 0 0 1 18 18.5 13.5 13.5 0 0 1 4.5 5a2 2 0 0 1 2-2.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZaloIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18.2 6.3 15A7.2 7.2 0 1 1 9 18.8L5 18.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 9.2h2.8l-2.6 5.6h1.1L13.2 9.2H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 18.5 6.2 15A7.5 7.5 0 1 1 9 19.2L5 18.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v16M4 12h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
