export default function Dashboard() {
  return (
    <main className="flex flex-col bg-neutral-100 flex-1 w-full px-3">
      <section className="max-w-7xl w-full mx-auto py-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="py-10 rounded-xl bg-neutral-50 border border-black/10"></div>
          <div className="py-10 rounded-xl bg-neutral-50 border border-black/10"></div>
          <div className="py-10 rounded-xl bg-neutral-50 border border-black/10"></div>
        </div>
      </section>
    </main>
  );
}
