import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ContentIDLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Skeleton className="h-8 w-64 bg-gray-800" />
          <Skeleton className="h-4 w-48 mt-2 bg-gray-800" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-32 bg-gray-800" />
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-6 w-40 bg-gray-800" />
            <Skeleton className="h-10 w-64 bg-gray-800" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-10 w-64 bg-gray-800" />
            <Skeleton className="h-10 w-48 bg-gray-800" />
          </div>

          <div className="rounded-md border border-gray-800">
            <div className="p-4">
              <div className="grid grid-cols-7 gap-4 mb-4">
                {Array(7)
                  .fill(null)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-6 bg-gray-800" />
                  ))}
              </div>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4 py-4 border-t border-gray-800">
                    {Array(7)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
                  <Skeleton className="h-5 w-5 bg-gray-700" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-36 bg-gray-700 mb-2" />
                    <Skeleton className="h-4 w-full bg-gray-700" />
                    <Skeleton className="h-4 w-3/4 bg-gray-700 mt-1" />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <Skeleton className="h-6 w-36 bg-gray-800" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <div key={i} className="bg-gray-800 p-4 rounded-lg">
                      <div className="text-center">
                        <Skeleton className="h-4 w-24 mx-auto bg-gray-700 mb-2" />
                        <Skeleton className="h-8 w-8 mx-auto bg-gray-700" />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <Skeleton className="h-5 w-40 bg-gray-700 mb-4" />
                <div className="space-y-3">
                  {Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <Skeleton className="h-4 w-32 bg-gray-700" />
                        <Skeleton className="h-4 w-16 bg-gray-700" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
