type SecurityEvent = {
  type:
    | "login_success"
    | "login_failure"
    | "login_rate_limited"
    | "auth_revoked"
    | "api_forbidden";
  email?: string;
  ip?: string;
  reason?: string;
  meta?: Record<string, unknown>;
};

/**
 * Structured security logging + optional Sentry capture.
 * Never logs passwords or raw tokens.
 */
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  const payload = {
    ...event,
    email: event.email?.toLowerCase(),
    at: new Date().toISOString(),
  };

  console.info("[security]", JSON.stringify(payload));

  try {
    const { prisma } = await import("@/lib/prisma");
    await prisma.authEvent.create({
      data: {
        type: event.type,
        email: event.email?.slice(0, 254) ?? null,
        ip: event.ip?.slice(0, 64) ?? null,
        reason: event.reason?.slice(0, 500) ?? null,
        meta: event.meta ? JSON.stringify(event.meta).slice(0, 2000) : null,
      },
    });
  } catch (err) {
    console.error("[security] failed to persist AuthEvent", err);
  }

  const dsn = process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();
  if (!dsn) return;

  try {
    const Sentry = await import("@sentry/nextjs");
    if (event.type === "login_failure" || event.type === "login_rate_limited") {
      Sentry.captureMessage(`security:${event.type}`, {
        level: "warning",
        tags: { security: event.type },
        extra: payload,
      });
    }
  } catch {
    // Sentry optional
  }
}

export async function captureException(
  err: unknown,
  context?: Record<string, unknown>,
): Promise<void> {
  console.error("[error]", err, context);
  const dsn = process.env.SENTRY_DSN?.trim() || process.env.NEXT_PUBLIC_SENTRY_DSN?.trim();
  if (!dsn) return;
  try {
    const Sentry = await import("@sentry/nextjs");
    Sentry.captureException(err, { extra: context });
  } catch {
    // optional
  }
}
