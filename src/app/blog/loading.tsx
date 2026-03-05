export default function BlogLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-10 bg-gray-200 rounded-lg w-1/3 mx-auto" />
        <div className="grid sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-48 bg-gray-100" />
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
