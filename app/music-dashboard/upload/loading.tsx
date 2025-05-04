import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function UploadLoading() {
  return (
    <div className="container mx-auto max-w-5xl p-6">
      {/* Header Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 bg-gray-800" />
        <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
      </div>

      {/* Progress Steps Skeleton */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-4 w-24 mt-2 bg-gray-800" />
          </div>
          <div className="flex-1 mx-4">
            <Skeleton className="h-1 w-full bg-gray-800" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-4 w-24 mt-2 bg-gray-800" />
          </div>
          <div className="flex-1 mx-4">
            <Skeleton className="h-1 w-full bg-gray-800" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
            <Skeleton className="h-4 w-24 mt-2 bg-gray-800" />
          </div>
        </div>
      </div>

      {/* Upload Form Skeleton */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-gray-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full mb-6 bg-gray-800" />

          <div className="space-y-6">
            <Skeleton className="h-64 w-full bg-gray-800" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
                      <Skeleton className="h-10 w-full bg-gray-800" />
                    </div>
                  ))}
              </div>

              <div className="space-y-4">
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-2 bg-gray-800" />
                      <Skeleton className="h-10 w-full bg-gray-800" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
          <Skeleton className="h-9 w-24 bg-gray-800" />
          <Skeleton className="h-9 w-32 bg-gray-800" />
        </CardFooter>
      </Card>
    </div>
  )
}
