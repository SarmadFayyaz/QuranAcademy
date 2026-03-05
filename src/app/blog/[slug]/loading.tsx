export default function BlogPostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-100 rounded w-24" />
        <div className="h-10 bg-gray-200 rounded-lg w-3/4" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}
