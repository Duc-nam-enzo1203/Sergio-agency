"use client";

import { useState, type FormEvent } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { services } from "@/lib/data";

type FormState = "idle" | "submitting" | "success" | "error";

const budgetOptions = [
  "Dưới 10 triệu",
  "10 – 30 triệu",
  "30 – 50 triệu",
  "Trên 50 triệu",
  "Chưa xác định",
];

const fieldClass =
  "w-full border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-sm text-ink transition-colors placeholder:text-ink/35 focus:border-ink focus:outline-none focus:ring-0";

const labelClass =
  "mb-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMsg(
          (data as { error?: string }).error ??
            "Không thể gửi tin nhắn. Vui lòng thử lại.",
        );
        setState("error");
        return;
      }

      setState("success");
      e.currentTarget.reset();
    } catch {
      setErrorMsg("Lỗi kết nối. Vui lòng thử lại.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <AnimateOnScroll>
        <div className="border-t border-ink/10 py-12 sm:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
            Sent
          </p>
          <h3 className="font-display mt-4 text-3xl font-semibold tracking-tight text-ink">
            Đã nhận được tin nhắn.
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-ink/55">
            Cảm ơn bạn đã liên hệ Sergio Agency. Chúng tôi sẽ phản hồi trong vòng
            24 giờ làm việc.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-all hover:gap-3"
          >
            Gửi tin nhắn khác
            <span aria-hidden>→</span>
          </button>
        </div>
      </AnimateOnScroll>
    );
  }

  return (
    <AnimateOnScroll>
      <form
        onSubmit={handleSubmit}
        className="relative border-t border-ink/10 pt-10 sm:pt-12"
        autoComplete="on"
      >
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
        >
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              Brief
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Kể chúng tôi nghe về dự án.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink/45 sm:text-right">
            Các trường có dấu * là bắt buộc.
          </p>
        </div>

        {state === "error" && errorMsg ? (
          <p className="mb-8 border-l-2 border-red-500/60 bg-red-500/[0.06] px-4 py-3 text-sm text-red-700">
            {errorMsg}
          </p>
        ) : null}

        <div className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Họ và tên *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                className={fieldClass}
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                className={fieldClass}
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelClass}>
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={50}
                className={fieldClass}
                placeholder="0901 234 567"
              />
            </div>
            <div>
              <label htmlFor="company" className={labelClass}>
                Công ty
              </label>
              <input
                id="company"
                name="company"
                type="text"
                maxLength={200}
                className={fieldClass}
                placeholder="Tên công ty"
              />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className={labelClass}>
                Dịch vụ quan tâm
              </label>
              <select id="service" name="service" className={fieldClass}>
                <option value="">Chọn dịch vụ</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className={labelClass}>
                Ngân sách dự kiến
              </label>
              <select id="budget" name="budget" className={fieldClass}>
                <option value="">Chọn ngân sách</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>
              Nội dung *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              className={`${fieldClass} resize-none`}
              placeholder="Mô tả dự án, mục tiêu và yêu cầu của bạn..."
            />
          </div>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              disabled={state === "submitting"}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-cream transition-all duration-500 hover:bg-ink/90 active:scale-[0.98] disabled:opacity-60"
            >
              {state === "submitting" ? "Đang gửi..." : "Gửi tin nhắn"}
              {state !== "submitting" ? <span aria-hidden>→</span> : null}
            </button>
            <p className="text-sm text-ink/40">
              Hoặc gọi trực tiếp — phản hồi trong 24h
            </p>
          </div>
        </div>
      </form>
    </AnimateOnScroll>
  );
}
