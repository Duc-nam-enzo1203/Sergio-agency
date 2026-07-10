"use client";

import Link from "next/link";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export default function RegisterPage() {
  return (
    <AnimateOnScroll className="w-full max-w-md">
      <div className="rounded-[1.75rem] bg-ink/[0.03] p-1.5 ring-1 ring-ink/5">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-cream p-8 sm:p-10">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Đăng ký
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            Đăng ký công khai đã bị tắt vì lý do bảo mật. Tài khoản quản trị
            chỉ được tạo bởi admin.
          </p>

          <div className="mt-8 rounded-xl bg-ink/5 px-4 py-4 text-sm text-ink/70">
            Nếu bạn là quản trị viên, hãy{" "}
            <Link href="/dang-nhap" className="font-medium text-ink underline">
              đăng nhập
            </Link>{" "}
            bằng tài khoản đã được cấp.
          </div>

          <p className="mt-6 text-center text-sm text-ink/60">
            <Link href="/" className="font-medium text-ink hover:underline">
              ← Về trang chủ
            </Link>
          </p>
        </div>
      </div>
    </AnimateOnScroll>
  );
}
