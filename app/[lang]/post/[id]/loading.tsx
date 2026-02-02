export default function Loading() {
  return (
    <div className="min-h-screen bg-zen-bg pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-4xl animate-pulse">
        {/* Back button skeleton */}
        <div className="h-4 w-32 bg-stone-200 rounded mb-10"></div>

        {/* Title skeleton */}
        <div className="space-y-4 mb-8">
          <div className="h-12 bg-stone-200 rounded w-3/4 mx-auto"></div>
          <div className="h-12 bg-stone-200 rounded w-2/3 mx-auto"></div>
        </div>

        {/* Meta info skeleton */}
        <div className="flex justify-center gap-8 mb-12">
          <div className="h-4 w-24 bg-stone-200 rounded"></div>
          <div className="h-4 w-24 bg-stone-200 rounded"></div>
          <div className="h-4 w-24 bg-stone-200 rounded"></div>
        </div>

        {/* Featured image skeleton */}
        <div className="aspect-video bg-stone-200 rounded-2xl mb-16"></div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`h-4 bg-stone-200 rounded ${
                i % 4 === 3 ? 'w-4/5' : 'w-full'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
