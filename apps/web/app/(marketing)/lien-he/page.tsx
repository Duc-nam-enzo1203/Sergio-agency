import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "Liên hệ — Sergio Agency",
  description:
    "Liên hệ Sergio Agency để nhận tư vấn và báo giá thiết kế website, landing page.",
};

const phoneDigits = siteConfig.phone.replace(/\D/g, "");

const channels = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hint: "Gửi brief hoặc câu hỏi",
  },
  {
    label: "Điện thoại",
    value: siteConfig.phone,
    href: `tel:${phoneDigits}`,
    hint: "Gọi trực tiếp trong giờ làm việc",
  },
  {
    label: "Zalo",
    value: siteConfig.phone,
    href: `https://zalo.me/${phoneDigits}`,
    hint: "Chat nhanh qua Zalo",
    external: true,
  },
  {
    label: "Địa chỉ",
    value: siteConfig.address,
    href: null,
    hint: "Làm việc online & on-site theo lịch",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_0%_-10%,rgba(17,17,17,0.06),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_40%_at_100%_20%,rgba(243,238,230,0.95),transparent_50%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
        </div>

        <div className="relative site-container">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
            <AnimateOnScroll>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/40">
                Contact
              </p>
              <h1 className="font-display mt-5 max-w-[12ch] text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em] text-ink">
                Bắt đầu
                <span className="mt-2 block text-ink/35">dự án của bạn.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/55 sm:text-lg">
                Chia sẻ ý tưởng — Sergio Agency phản hồi trong 24 giờ với hướng
                đi và báo giá sơ bộ phù hợp.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <div className="border-t border-ink/10 pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
                  Giờ làm việc
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink/70">
                  Thứ 2 – Thứ 6: 9:00 – 18:00
                  <br />
                  Thứ 7: 9:00 – 12:00
                </p>
                <p className="mt-6 text-sm text-ink/45">
                  Ngoài giờ vẫn nhận brief qua email / Zalo.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="site-container">
          <div className="grid border-y border-cream/10 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, i) => {
              const content = (
                <>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                    {channel.label}
                  </p>
                  <p className="mt-4 font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {channel.value}
                  </p>
                  <p className="mt-2 text-sm text-cream/45">{channel.hint}</p>
                  {channel.href ? (
                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream/50 transition-all duration-500 group-hover:gap-3 group-hover:text-cream">
                      Kết nối
                      <span aria-hidden>→</span>
                    </span>
                  ) : null}
                </>
              );

              const className = [
                "group relative flex flex-col px-6 py-10 sm:px-8 sm:py-12",
                i > 0 ? "border-t border-cream/10" : "",
                "sm:border-t-0",
                i % 2 === 1 ? "sm:border-l sm:border-cream/10" : "",
                i > 0 ? "lg:border-l lg:border-cream/10" : "",
              ]
                .filter(Boolean)
                .join(" ");

              if (channel.href) {
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...("external" in channel && channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`${className} transition-colors hover:bg-cream/[0.04]`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={channel.label} className={className}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-cream py-20 sm:py-28">
        <div className="site-container">
          <div className="mx-auto max-w-3xl">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="bg-[#F3EEE6] py-20 sm:py-28">
        <div className="site-container">
          <AnimateOnScroll>
            <div className="grid gap-10 border-t border-ink/10 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
                  Next step
                </p>
                <h2 className="font-display mt-4 max-w-[14ch] text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                  Sau khi gửi brief, chuyện gì xảy ra?
                </h2>
              </div>
              <ol className="space-y-6">
                {[
                  "Xác nhận đã nhận và làm rõ mục tiêu trong 24h.",
                  "Đề xuất hướng đi, phạm vi và báo giá sơ bộ.",
                  "Chốt kickoff khi hai bên sẵn sàng bắt đầu.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-display text-sm font-semibold text-ink/30">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-ink/65 sm:text-base">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
