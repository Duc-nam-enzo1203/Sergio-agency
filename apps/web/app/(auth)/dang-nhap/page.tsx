"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email hoặc mật khẩu không đúng");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AnimateOnScroll className="w-full max-w-md">
      <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-8 sm:p-10">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Đăng nhập để truy cập dashboard quản trị.
          </p>

          {error && (
            <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

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
                placeholder="admin@sergioagency.com"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-ink">
                  Mật khẩu
                </label>
                <Link
                  href="/quen-mat-khau"
                  className="text-xs text-ink/50 hover:text-ink"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border-0 bg-ink/5 px-4 py-3 text-sm text-ink ring-1 ring-ink/10 transition-all placeholder:text-ink/40 focus:bg-cream focus:ring-2 focus:ring-ink/20 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-ink py-3.5 text-sm font-medium text-cream transition-all hover:bg-ink/90 active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink/60">
            Chưa có tài khoản?{" "}
            <Link href="/dang-ky" className="font-medium text-ink hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
