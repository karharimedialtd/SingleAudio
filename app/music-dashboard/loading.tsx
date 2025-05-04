import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function MusicDashboardLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <Skeleton className="h-8 w-64 bg-gray-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-32 bg-gray-800" />
          <Skeleton className="h-9 w-9 bg-gray-800" />
        </div>
      </div>

      {/* Quick Actions Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="bg-gray-900 border-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-24 bg-gray-800" />
                    <Skeleton className="h-6 w-32 mt-2 bg-gray-800" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Performance Overview Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-48 bg-gray-800" />
              <Skeleton className="h-8 w-24 bg-gray-800" />
            </div>
            <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
          </CardHeader>
          <CardContent className="pb-2">
            <Skeleton className="h-[300px] w-full bg-gray-800" />
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <Skeleton className="h-6 w-32 bg-gray-800" />
            <Skeleton className="h-6 w-32 bg-gray-800" />
            <Skeleton className="h-6 w-32 bg-gray-800" />
          </CardFooter>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-48 bg-gray-800" />
            <Skeleton className="h-4 w-36 mt-2 bg-gray-800" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full bg-gray-800" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Releases Skeleton */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40 bg-gray-800" />
            <Skeleton className="h-8 w-24 bg-gray-800" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-md bg-gray-800" />
                    <div>
                      <Skeleton className="h-5 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-24 mt-1 bg-gray-800" />
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-6">
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                    <Skeleton className="h-8 w-20 bg-gray-800" />
                    <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full bg-gray-800" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Releases & Tasks Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <Skeleton className="h-6 w-40 bg-gray-800" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(2)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-32 bg-gray-800" />
                        <Skeleton className="h-5 w-16 bg-gray-800" />
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <Skeleton className="h-4 w-40 bg-gray-800" />
                        <Skeleton className="h-5 w-20 bg-gray-800" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <Skeleton className="h-6 w-20 bg-gray-800" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(3)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40 bg-gray-800" />
                      <Skeleton className="h-4 w-64 mt-1 bg-gray-800" />
                    </div>
                    <Skeleton className="h-8 w-24 bg-gray-800" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
