"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  return (
    <AnimateOnScroll className="w-full max-w-md">
      <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-8 sm:p-10">
          {sent ? (
            <>
              <h1 className="font-display text-2xl font-semibold text-ink">
                Kiểm tra email
              </h1>
              <p className="mt-2 text-sm text-ink/60">
                Chúng tôi đã gửi link đặt lại mật khẩu đến email của bạn.
              </p>
              <Link
                href="/dang-nhap"
                className="mt-8 inline-block text-sm font-medium text-ink hover:underline"
              >
                ← Quay lại đăng nhập
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-semibold text-ink">
                Quên mật khẩu
              </h1>
              <p className="mt-2 text-sm text-ink/60">
                Nhập email để nhận link đặt lại mật khẩu.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                    placeholder="email@company.com"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-cream transition-all hover:bg-ink/90 active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? "Đang gửi..." : "Gửi link đặt lại"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-ink/60">
                <Link href="/dang-nhap" className="font-medium text-ink hover:underline">
                  ← Quay lại đăng nhập
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </AnimateOnScroll>
  );
}
