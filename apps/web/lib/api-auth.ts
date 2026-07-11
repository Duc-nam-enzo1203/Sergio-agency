import type { Session } from "next-auth";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const STAFF_ROLES = new Set(["ADMIN", "EDITOR"]);

type AuthOk = { session: Session };
type AuthErr = { error: NextResponse };

function roleOf(session: Session) {
  return String(session.user?.role ?? "").toUpperCase();
}

/** Any authenticated staff (ADMIN or EDITOR). */
export async function requireStaff(): Promise<AuthOk | AuthErr> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const role = roleOf(session);
  if (role === "REVOKED" || !STAFF_ROLES.has(role)) {
    return {
      error: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    };
  }

  return { session };
}

/** ADMIN only — settings and privileged ops. */
export async function requireAdmin(): Promise<AuthOk | AuthErr> {
  const result = await requireStaff();
  if ("error" in result) return result;

  if (roleOf(result.session) !== "ADMIN") {
    return {
      error: NextResponse.json(
        { error: "Chỉ ADMIN mới được thực hiện thao tác này" },
        { status: 403 },
      ),
    };
  }

  return result;
}

/** @deprecated Prefer requireStaff. */
export async function requireAuth() {
  return requireStaff();
}
