export default function DashboardLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 rounded-lg bg-white/10" />
      <div className="h-4 w-72 rounded bg-white/5" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="h-28 rounded-2xl bg-white/5" />
        <div className="h-28 rounded-2xl bg-white/5" />
        <div className="h-28 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}
