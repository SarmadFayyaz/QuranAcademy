export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-8 bg-gray-200 rounded-lg w-1/3 mx-auto" />
        <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-100 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
