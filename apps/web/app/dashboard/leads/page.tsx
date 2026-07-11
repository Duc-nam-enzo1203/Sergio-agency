import { LeadsPanel } from "@/components/dashboard/LeadsPanel";
import { prisma } from "@/lib/prisma";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      message: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Leads</h1>
        <p className="mt-1 text-sm text-white/50">
          Quản lý liên hệ từ form website
        </p>
      </div>
      <LeadsPanel
        leads={leads.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
