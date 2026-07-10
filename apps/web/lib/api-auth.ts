import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session };
}

export async function requireAdmin() {
  const result = await requireAuth();
  if ("error" in result) return result;

  const role = result.session.user.role;
  if (role !== "ADMIN" && role !== "EDITOR") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return result;
}
