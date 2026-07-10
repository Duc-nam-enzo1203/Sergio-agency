import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="site-container py-16 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-xl font-semibold text-ink"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60">
              Agency thiết kế website và landing page hiện đại — giúp thương
              hiệu của bạn tỏa sáng trên môi trường số.
            </p>
            <div className="mt-6 flex gap-4">
              {["Facebook", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs uppercase tracking-wider text-ink/40 transition-colors hover:text-ink"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink/40">
              Liên kết
            </h3>
            <ul className="mt-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/60 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-ink/40">
              Liên hệ
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-ink/60">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-ink"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink/40">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-ink/40">
            <Link href="#" className="hover:text-ink">
              Chính sách bảo mật
            </Link>
            <Link href="#" className="hover:text-ink">
              Điều khoản sử dụng
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
