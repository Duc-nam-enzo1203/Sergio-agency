import { auth } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userLabel =
    session?.user?.name ?? session?.user?.email ?? "Tài khoản";

  return <DashboardShell userLabel={userLabel}>{children}</DashboardShell>;
}
