export default function Loading() {
  return (
    <div className="min-h-screen bg-zen-bg pt-32">
      {/* Hero Skeleton */}
      <div className="container mx-auto px-6 mb-16 animate-pulse">
        <div className="h-96 bg-stone-200 rounded-2xl mb-12"></div>
      </div>

      {/* Posts Grid Skeleton */}
      <div className="container mx-auto px-6 py-16">
        <div className="h-12 w-64 bg-stone-200 rounded-lg mx-auto mb-12 animate-pulse"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="aspect-[16/10] bg-stone-200"></div>
              <div className="p-8 space-y-4">
                <div className="h-4 w-32 bg-stone-200 rounded"></div>
                <div className="h-8 bg-stone-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-stone-200 rounded"></div>
                  <div className="h-3 bg-stone-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
