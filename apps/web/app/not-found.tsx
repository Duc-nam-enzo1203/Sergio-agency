import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-8xl font-semibold text-ink/10">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
        Trang không tồn tại
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink/60">
        Có vẻ như trang bạn tìm kiếm đã bị di chuyển hoặc không còn tồn tại.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-ink px-8 py-3 text-sm font-medium text-cream transition-all hover:bg-ink/90"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
