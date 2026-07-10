import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import {
  sanitizeEmail,
  sanitizeOptional,
  sanitizeText,
} from "@/lib/sanitize";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limited = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!limited.success) {
      return rateLimitResponse(limited.resetAt);
    }

    const body = await request.json();

    // Honeypot: bots fill hidden "website" field
    if (typeof body.website === "string" && body.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const lead = await prisma.lead.create({
      data: {
        name: sanitizeText(data.name, 100),
        email: sanitizeEmail(data.email),
        phone: sanitizeOptional(data.phone, 50),
        company: sanitizeOptional(data.company, 200),
        service: sanitizeOptional(data.service, 100),
        budget: sanitizeOptional(data.budget, 100),
        message: sanitizeText(data.message, 5000),
      },
    });

    revalidatePath("/dashboard");

    return NextResponse.json({ success: true, id: lead.id });
  } catch {
    return NextResponse.json(
      { error: "Không thể gửi tin nhắn. Vui lòng thử lại." },
      { status: 500 }
    );
  }
}
