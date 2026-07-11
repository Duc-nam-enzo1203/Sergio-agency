import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { sanitizeEmail, sanitizeText } from "@/lib/sanitize";
import { registerSchema } from "@/lib/validations";

/**
 * Bootstrap-only registration: creates the first ADMIN when the DB has no users.
 * Public self-signup is disabled — staff accounts must be created by an admin.
 */
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = await rateLimit(`register:${ip}`, 3, 60 * 60_000);
    if (!limited.success) {
      return rateLimitResponse(limited.resetAt);
    }

    const userCount = await prisma.user.count();
    if (userCount > 0) {
      return NextResponse.json(
        {
          error:
            "Đăng ký công khai đã bị tắt. Liên hệ admin để được cấp tài khoản.",
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;
    const cleanEmail = sanitizeEmail(email);

    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: sanitizeText(name, 100),
        email: cleanEmail,
        passwordHash,
        role: "ADMIN",
      },
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Không thể tạo tài khoản" },
      { status: 500 },
    );
  }
}
