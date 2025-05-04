import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function MusicDashboardLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-64 bg-gray-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-gray-800" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-36 bg-gray-800" />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-4 w-32 bg-gray-800 mb-2" />
                    <Skeleton className="h-8 w-24 bg-gray-800 mb-2" />
                    <Skeleton className="h-3 w-28 bg-gray-800" />
                  </div>
                  <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Streaming Trend */}
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-36 bg-gray-800" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full bg-gray-800" />
        </CardContent>
      </Card>

      {/* Music Catalog */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-36 bg-gray-800" />
            <Skeleton className="h-10 w-48 bg-gray-800" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-10 w-64 bg-gray-800" />
            <Skeleton className="h-10 w-36 bg-gray-800" />
          </div>

          <div className="rounded-md border border-gray-800">
            <div className="p-4">
              <div className="grid grid-cols-6 gap-4 mb-4">
                {Array(6)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-6 bg-gray-800" />
                  ))}
              </div>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="grid grid-cols-6 gap-4 py-4 border-t border-gray-800">
                    {Array(6)
                      .fill(null)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-6 bg-gray-800" />
                      ))}
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
