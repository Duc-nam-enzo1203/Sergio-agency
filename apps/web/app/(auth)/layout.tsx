import { SiteLogo } from "@/components/ui/SiteLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header className="px-4 py-6 sm:px-6">
        <SiteLogo size="sm" />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        {children}
      </main>
    </div>
  );
}
