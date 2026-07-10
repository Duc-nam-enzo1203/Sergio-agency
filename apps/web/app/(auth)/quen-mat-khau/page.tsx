"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function ForgotPasswordPage() {
  return (
    <AnimateOnScroll className="w-full max-w-md">
      <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-8 sm:p-10">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Quên mật khẩu
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Tự đặt lại mật khẩu chưa được bật. Liên hệ quản trị viên để được
            cấp lại quyền truy cập.
          </p>
          <p className="mt-4 text-sm text-ink/50">
            Email hỗ trợ:{" "}
            <a
              href="mailto:namdoan.ka@gmail.com"
              className="font-medium text-ink hover:underline"
            >
              namdoan.ka@gmail.com
            </a>
          </p>
          <Link
            href="/dang-nhap"
            className="mt-8 inline-block text-sm font-medium text-ink hover:underline"
          >
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
