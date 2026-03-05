export default function TeachersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded-lg w-1/4 mx-auto" />
        <div className="h-4 bg-gray-100 rounded w-1/2 mx-auto" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-gray-100 p-6 space-y-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto" />
              <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
              <div className="h-12 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
