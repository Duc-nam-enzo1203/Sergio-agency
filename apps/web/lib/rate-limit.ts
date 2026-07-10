type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const store = new Map<string, RateLimitEntry>();
const MAX_KEYS = 10_000;

export type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

/**
 * In-memory rate limiter (per-process).
 * On multi-instance hosts (Vercel), prefer Redis/Upstash for global limits.
 * Login is also keyed by email so IP spoofing alone cannot bypass email caps.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  if (store.size > MAX_KEYS) {
    for (const [k, v] of store) {
      if (now > v.resetAt) store.delete(k);
    }
    if (store.size > MAX_KEYS) {
      const first = store.keys().next().value;
      if (first) store.delete(first);
    }
  }

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(key, entry);
  return {
    success: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Prefer platform-provided client IP. Do not trust a lone client-forged
 * X-Forwarded-For chain when a platform header exists.
 */
export function getClientIp(request: Request): string {
  const vercel = request.headers.get("x-vercel-forwarded-for");
  if (vercel) {
    return vercel.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded.split(",").map((p) => p.trim()).filter(Boolean);
    return parts[parts.length - 1] || "unknown";
  }

  return "unknown";
}

export function rateLimitResponse(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
  return Response.json(
    { error: "Quá nhiều yêu cầu. Vui lòng thử lại sau." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "X-RateLimit-Remaining": "0",
      },
    },
  );
}
