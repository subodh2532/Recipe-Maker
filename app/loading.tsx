export default function Loading() {
  return (
    <main className="container-shell py-8 sm:py-10">
      <div className="animate-pulse space-y-6">
        <div className="h-40 rounded-[2rem] bg-secondary" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-80 rounded-[2rem] bg-secondary" />
          ))}
        </div>
      </div>
    </main>
  );
}
