import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadStatusSchema = z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]);

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(leads);
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const { id, status } = body as { id?: string; status?: string };

    if (!id || !status) {
      return NextResponse.json({ error: "Thiếu id hoặc status" }, { status: 400 });
    }

    const parsed = leadStatusSchema.safeParse(status);
    if (!parsed.success) {
      return NextResponse.json({ error: "Status không hợp lệ" }, { status: 400 });
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status: parsed.data },
    });

    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: "Không thể cập nhật" }, { status: 500 });
  }
}
