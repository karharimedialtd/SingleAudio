import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PlatformsLoading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <Skeleton className="h-8 w-64 bg-gray-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 bg-gray-800" />
          <Skeleton className="h-9 w-40 bg-gray-800" />
        </div>
      </div>

      {/* Alert Skeleton */}
      <Skeleton className="h-20 w-full mb-6 bg-gray-800" />

      {/* Tabs Skeleton */}
      <Skeleton className="h-10 w-full mb-6 bg-gray-800" />

      {/* Platforms Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="border-gray-800 bg-gray-900">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-md bg-gray-800" />
                    <div>
                      <Skeleton className="h-5 w-24 bg-gray-800" />
                      <Skeleton className="h-4 w-20 mt-1 bg-gray-800" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-16 bg-gray-800" />
                    </div>
                    <Skeleton className="h-1 w-full bg-gray-800" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Skeleton className="h-8 w-full bg-gray-800" />
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  )
}
