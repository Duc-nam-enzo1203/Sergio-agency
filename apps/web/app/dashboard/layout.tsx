import { auth } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex min-h-[100dvh] bg-[#111]">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div />
          <p className="text-sm text-white/50">
            {session?.user?.name ?? session?.user?.email}
          </p>
        </header>
        <main className="flex-1 overflow-auto p-6 text-white">{children}</main>
      </div>
    </div>
  );
}
