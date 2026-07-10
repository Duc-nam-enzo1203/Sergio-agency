import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { PageHero } from "@/components/ui/PageHero";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Liên hệ — Sergio Agency",
  description: "Liên hệ Sergio Agency để nhận tư vấn và báo giá thiết kế website, landing page.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Liên hệ"
        title="Bắt đầu dự án của bạn"
        description="Chia sẻ ý tưởng — chúng tôi sẽ phản hồi trong vòng 24 giờ với đề xuất và báo giá sơ bộ."
      />

      <section className="pb-24 sm:pb-32">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <h2 className="font-display text-xl font-semibold text-ink">
                  Thông tin liên hệ
                </h2>
                <ul className="mt-6 space-y-6">
                  <li>
                    <p className="text-xs uppercase tracking-wider text-ink/50">
                      Email
                    </p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="mt-1 block text-base font-medium text-ink transition-colors hover:text-ink/70"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-ink/50">
                      Điện thoại
                    </p>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-base font-medium text-ink transition-colors hover:text-ink/70"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wider text-ink/50">
                      Địa chỉ
                    </p>
                    <p className="mt-1 text-base text-ink/70">
                      {siteConfig.address}
                    </p>
                  </li>
                </ul>

                <div className="mt-10 rounded-2xl bg-ink/[0.03] p-6 ring-1 ring-ink/5">
                  <p className="text-sm font-medium text-ink">
                    Giờ làm việc
                  </p>
                  <p className="mt-2 text-sm text-ink/60">
                    Thứ 2 – Thứ 6: 9:00 – 18:00
                    <br />
                    Thứ 7: 9:00 – 12:00
                  </p>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
