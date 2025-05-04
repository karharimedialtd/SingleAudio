import { Skeleton } from "@/components/ui/skeleton"

export default function SupportLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 bg-gray-800" />
        <Skeleton className="mt-2 h-4 w-72 bg-gray-800" />
      </div>

      <Skeleton className="mb-6 h-10 w-full max-w-md bg-gray-800" />

      <div className="space-y-6">
        <Skeleton className="h-12 w-full bg-gray-800" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 w-full bg-gray-800" />
            ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-10 w-48 bg-gray-800" />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full bg-gray-800" />
            ))}
        </div>
      </div>
    </div>
  )
}
