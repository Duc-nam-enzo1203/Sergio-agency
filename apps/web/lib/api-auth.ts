import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const STAFF_ROLES = new Set(["ADMIN", "EDITOR"]);

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const role = String(session.user.role ?? "").toUpperCase();
  if (role === "REVOKED" || !STAFF_ROLES.has(role)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session };
}

export async function requireAdmin() {
  return requireAuth();
}
