import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/dashboard/SettingsForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const session = await auth();
  const role = String(session?.user?.role ?? "").toUpperCase();
  if (role !== "ADMIN") {
    redirect("/dashboard");
  }

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Settings</h1>
        <p className="mt-1 text-sm text-white/50">
          Cài đặt thông tin site (chỉ ADMIN)
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
      />
    </div>
  );
}
