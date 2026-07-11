import { put } from "@vercel/blob";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/api-auth";
import { getClientIp, rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const runtime = "nodejs";

const MAX_BYTES = 5 * 1024 * 1024;

type ImageKind = "image/jpeg" | "image/png" | "image/webp" | "image/gif";

function detectImageType(buffer: Buffer): ImageKind | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buffer[0] === 0x47 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x38
  ) {
    return "image/gif";
  }
  if (
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

function extensionFor(type: ImageKind): string {
  switch (type) {
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return "jpg";
  }
}

async function saveLocal(buffer: Buffer, filename: string): Promise<string> {
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return `/uploads/${filename}`;
}

export async function POST(request: Request) {
  const auth = await requireStaff();
  if ("error" in auth) return auth.error;

  const ip = getClientIp(request);
  const userId = auth.session.user.id ?? "unknown";
  const limited = await rateLimit(`upload:${userId}:${ip}`, 20, 60_000);
  if (!limited.success) return rateLimitResponse(limited.resetAt);

  try {
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Thiếu file ảnh" }, { status: 400 });
    }

    if (file.size <= 0 || file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Ảnh tối đa 5MB" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const detected = detectImageType(buffer);
    if (!detected) {
      return NextResponse.json(
        { error: "File không phải ảnh hợp lệ (JPG/PNG/WebP/GIF)" },
        { status: 400 },
      );
    }

    const filename = `${randomUUID()}.${extensionFor(detected)}`;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`uploads/${filename}`, buffer, {
        access: "public",
        contentType: detected,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      return NextResponse.json({ url: blob.url });
    }

    if (process.env.VERCEL) {
      return NextResponse.json(
        { error: "Upload yêu cầu BLOB_READ_WRITE_TOKEN trên Vercel" },
        { status: 503 },
      );
    }

    const url = await saveLocal(buffer, filename);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Upload thất bại" }, { status: 500 });
  }
}
