export default function ProductCardSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden flex flex-col h-full animate-pulse">
      {/* Image Container Skeleton */}
      <div className="relative bg-muted aspect-square overflow-hidden">
        {/* Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <div className="bg-muted-foreground/20 rounded-md h-6 w-16" />
        </div>

        {/* Wishlist Button Skeleton */}
        <div className="absolute top-3 left-3 bg-muted-foreground/20 rounded-md h-9 w-9" />
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 px-6 flex flex-col gap-3 py-3">
        {/* Rating Skeleton */}
        <div className="flex items-center gap-1 my-3">
          <div className="h-3 w-12 bg-muted rounded" />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3.5 w-3.5 bg-muted rounded-sm" />
            ))}
          </div>
        </div>

        <hr />

        {/* Title Skeleton */}
        <div className="space-y-2 my-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>

        <hr />

        {/* Pricing Skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-20 bg-muted rounded" />
          <div className="h-5 w-16 bg-muted rounded" />
          <div className="h-4 w-14 bg-muted rounded" />
        </div>

        {/* Add to Cart Button Skeleton */}
        <div className="mt-auto h-12 bg-muted rounded-full" />
      </div>
    </div>
  )
}
