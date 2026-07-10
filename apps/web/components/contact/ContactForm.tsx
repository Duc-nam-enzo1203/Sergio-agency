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
            "Không thể gửi tin nhắn. Vui lòng thử lại."
        );
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Lỗi kết nối. Vui lòng thử lại.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <AnimateOnScroll>
        <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5">
          <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-10 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/10 text-2xl text-green-600">
              ✓
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold text-ink">
              Đã gửi thành công!
            </h3>
            <p className="mt-2 text-sm text-ink/60">
              Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong vòng 24 giờ.
            </p>
            <button
              type="button"
              onClick={() => setState("idle")}
              className="mt-6 text-sm font-medium text-ink/70 underline hover:text-ink"
            >
              Gửi tin nhắn khác
            </button>
          </div>
        </div>
      </AnimateOnScroll>
    );
  }

  return (
    <AnimateOnScroll>
      <form
        onSubmit={handleSubmit}
        className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5"
        autoComplete="on"
      >
        <div className="space-y-5 rounded-[calc(1.75rem-0.375rem)] bg-cream p-6 sm:p-8">
          {/* Honeypot — hidden from users, bots often fill it */}
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

          {state === "error" && errorMsg && (
            <p className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {errorMsg}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                placeholder="email@company.com"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
                Số điện thoại
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={50}
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                placeholder="0901 234 567"
              />
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-sm font-medium text-ink">
                Công ty
              </label>
              <input
                id="company"
                name="company"
                type="text"
                maxLength={200}
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                placeholder="Tên công ty"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium text-ink">
                Dịch vụ quan tâm
              </label>
              <select
                id="service"
                name="service"
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
              >
                <option value="">Chọn dịch vụ</option>
                {services.map((s) => (
                  <option key={s.id} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="budget" className="mb-2 block text-sm font-medium text-ink">
                Ngân sách dự kiến
              </label>
              <select
                id="budget"
                name="budget"
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
              >
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
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              maxLength={5000}
              className="w-full resize-none rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
              placeholder="Mô tả dự án, mục tiêu và yêu cầu của bạn..."
            />
          </div>

          <button
            type="submit"
            disabled={state === "submitting"}
            className="w-full rounded-full bg-ink py-4 text-sm font-medium text-cream transition-all duration-500 hover:bg-ink/90 active:scale-[0.98] disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {state === "submitting" ? "Đang gửi..." : "Gửi tin nhắn"}
          </button>
        </div>
      </form>
    </AnimateOnScroll>
  );
}
