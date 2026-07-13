"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { SiteLogo } from "@/components/ui/SiteLogo";
import { navLinks } from "@/lib/data";

function isDarkHeroPath(pathname: string) {
  return (
    /^\/du-an\/[^/]+\/?$/.test(pathname) ||
    /^\/dich-vu\/[^/]+\/?$/.test(pathname)
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const darkHero = isDarkHeroPath(pathname);
  const lightNav = darkHero && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-5">
        <nav
          className={`site-container flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] sm:px-6 ${
            scrolled || menuOpen
              ? "bg-cream/80 shadow-[0_8px_32px_rgba(17,17,17,0.06)] backdrop-blur-xl ring-1 ring-ink/5"
              : lightNav
                ? "bg-cream/10 ring-1 ring-cream/15 backdrop-blur-md"
                : "bg-transparent"
          }`}
        >
          <SiteLogo
            size="sm"
            light={lightNav}
            priority
            className="transition-colors duration-500"
          />

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      active
                        ? lightNav
                          ? "bg-cream text-ink"
                          : "bg-ink text-cream"
                        : lightNav
                          ? "text-cream/70 hover:bg-cream/10 hover:text-cream"
                          : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/dang-nhap"
              className={`text-sm transition-colors ${
                lightNav
                  ? "text-cream/60 hover:text-cream"
                  : "text-ink/60 hover:text-ink"
              }`}
            >
              Đăng nhập
            </Link>
            <Link
              href="/lien-he"
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 active:scale-[0.98] ${
                lightNav
                  ? "bg-cream text-ink hover:bg-cream/90"
                  : "bg-ink text-cream hover:bg-ink/90"
              }`}
            >
              Bắt đầu dự án
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              lightNav ? "bg-cream/10" : "bg-ink/5"
            }`}
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-0.5 w-5 transition-all duration-500 ${
                lightNav ? "bg-cream" : "bg-ink"
              } ${menuOpen ? "rotate-45" : "-translate-y-1.5"}`}
            />
            <span
              className={`absolute h-0.5 w-5 transition-all duration-500 ${
                lightNav ? "bg-cream" : "bg-ink"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute h-0.5 w-5 transition-all duration-500 ${
                lightNav ? "bg-cream" : "bg-ink"
              } ${menuOpen ? "-rotate-45" : "translate-y-1.5"}`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-cream/95 backdrop-blur-3xl md:hidden"
          >
            <div className="flex min-h-[100dvh] flex-col justify-center px-8 pt-20">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={
                      prefersReducedMotion
                        ? false
                        : { opacity: 0, y: 24 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-display text-3xl font-semibold text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-10 flex flex-col gap-3"
              >
                <Link
                  href="/dang-nhap"
                  onClick={() => setMenuOpen(false)}
                  className="text-center text-ink/60"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/lien-he"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full bg-ink py-4 text-center font-medium text-cream"
                >
                  Bắt đầu dự án
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
