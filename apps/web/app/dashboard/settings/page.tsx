import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const [settings, leads] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "default" } }),
    prisma.lead.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        service: true,
        budget: true,
        message: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-white/50">
          Cài đặt site và quản lý leads
        </p>
      </div>
      <SettingsForm
        initial={{
          siteName: settings?.siteName ?? "Sergio Agency",
          tagline: settings?.tagline ?? "",
          email: settings?.email ?? "",
          phone: settings?.phone ?? "",
          address: settings?.address ?? "",
        }}
        leads={leads.map((l) => ({
          ...l,
          createdAt: l.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
