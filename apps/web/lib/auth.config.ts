import type { NextAuthConfig } from "next-auth";

const STAFF_ROLES = new Set(["ADMIN", "EDITOR"]);

/**
 * Edge-safe auth config (used by middleware).
 * Do not import Prisma or Node-only modules here.
 */
export const authConfig = {
  pages: {
    signIn: "/dang-nhap",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (!isDashboard) return true;

      const role = String(auth?.user?.role ?? "").toUpperCase();
      return !!auth?.user && STAFF_ROLES.has(role);
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.roleCheckedAt = Date.now();
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
