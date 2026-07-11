import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/prisma";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sanitizeEmail } from "@/lib/sanitize";
import { logSecurityEvent } from "@/lib/security-log";

/** Valid bcrypt hash used only to keep failed-login timing consistent. */
const DUMMY_HASH =
  "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW";

function getAuthSecret(): string | undefined {
  return process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
}

function assertAuthSecret() {
  if (process.env.NEXT_PHASE === "phase-production-build") return;
  if (process.env.NODE_ENV !== "production") return;

  const secret = getAuthSecret();
  if (!secret || secret.length < 32) {
    throw new Error(
      "AUTH_SECRET must be set to a strong value (32+ chars) in production.",
    );
  }
  const normalized = secret.toLowerCase();
  const weakExact = new Set([
    "secret",
    "changeme",
    "change-me",
    "your-secret-here",
    "dev-secret",
  ]);
  if (
    weakExact.has(normalized) ||
    normalized.includes("your-secret-here") ||
    normalized.includes("change-in-production")
  ) {
    throw new Error("AUTH_SECRET looks like a placeholder. Rotate it.");
  }
}

assertAuthSecret();

function resolveIp(request: Request | undefined): string {
  if (!request) return "unknown";
  try {
    return getClientIp(request);
  } catch {
    return (
      request.headers?.get?.("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers?.get?.("x-real-ip") ||
      "unknown"
    );
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: getAuthSecret(),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
    updateAge: 60 * 30,
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.roleCheckedAt = Date.now();
        return token;
      }

      const checkedAt = Number(token.roleCheckedAt ?? 0);
      const stale = Date.now() - checkedAt > 5 * 60_000;
      if ((trigger === "update" || stale) && token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: String(token.id) },
            select: { role: true },
          });
          if (!dbUser) {
            token.role = "REVOKED";
            void logSecurityEvent({
              type: "auth_revoked",
              reason: "user_missing",
              meta: { userId: token.id },
            });
            return token;
          }
          token.role = dbUser.role;
          token.roleCheckedAt = Date.now();
        } catch {
          // keep existing token role if DB briefly unavailable
        }
      }

      return token;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = sanitizeEmail(String(credentials.email));
        const password = String(credentials.password);
        const ip = resolveIp(request);

        if (!email || password.length < 1 || password.length > 128) return null;

        const emailLimited = await rateLimit(
          `login:email:${email}`,
          8,
          15 * 60_000,
        );
        if (!emailLimited.success) {
          void logSecurityEvent({
            type: "login_rate_limited",
            email,
            ip,
            reason: "email_window",
          });
          return null;
        }

        const ipLimited = await rateLimit(`login:ip:${ip}`, 30, 15 * 60_000);
        if (!ipLimited.success) {
          void logSecurityEvent({
            type: "login_rate_limited",
            email,
            ip,
            reason: "ip_window",
          });
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          await bcrypt.compare(password, DUMMY_HASH);
          void logSecurityEvent({
            type: "login_failure",
            email,
            ip,
            reason: "unknown_user",
          });
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          void logSecurityEvent({
            type: "login_failure",
            email,
            ip,
            reason: "bad_password",
          });
          return null;
        }

        const role = user.role?.toUpperCase();
        if (role !== "ADMIN" && role !== "EDITOR") {
          void logSecurityEvent({
            type: "login_failure",
            email,
            ip,
            reason: "role_denied",
          });
          return null;
        }

        void logSecurityEvent({
          type: "login_success",
          email,
          ip,
          meta: { role: user.role },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
});
