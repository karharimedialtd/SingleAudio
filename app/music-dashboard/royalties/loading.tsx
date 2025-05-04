import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function RoyaltiesLoading() {
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
          <Skeleton className="h-9 w-9 bg-gray-800" />
        </div>
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="border-gray-800 bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-8 w-24 mt-2 bg-gray-800" />
                    <Skeleton className="h-4 w-40 mt-1 bg-gray-800" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Revenue Charts Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <Card className="border-gray-800 bg-gray-900 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-40 bg-gray-800" />
              <Skeleton className="h-8 w-24 bg-gray-800" />
            </div>
            <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
          </CardHeader>
          <CardContent className="pb-2">
            <Skeleton className="h-[300px] w-full bg-gray-800" />
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-40 bg-gray-800" />
            <Skeleton className="h-4 w-36 mt-2 bg-gray-800" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full bg-gray-800" />
          </CardContent>
        </Card>
      </div>

      {/* Top Earning Tracks Skeleton */}
      <Card className="border-gray-800 bg-gray-900 mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-gray-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-gray-800" />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left pb-3">
                    <Skeleton className="h-4 w-16 bg-gray-800" />
                  </th>
                  <th className="text-right pb-3">
                    <Skeleton className="h-4 w-16 bg-gray-800 ml-auto" />
                  </th>
                  <th className="text-right pb-3">
                    <Skeleton className="h-4 w-16 bg-gray-800 ml-auto" />
                  </th>
                  <th className="text-right pb-3">
                    <Skeleton className="h-4 w-16 bg-gray-800 ml-auto" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-3">
                        <Skeleton className="h-5 w-32 bg-gray-800" />
                      </td>
                      <td className="text-right py-3">
                        <Skeleton className="h-5 w-20 bg-gray-800 ml-auto" />
                      </td>
                      <td className="text-right py-3">
                        <Skeleton className="h-5 w-20 bg-gray-800 ml-auto" />
                      </td>
                      <td className="text-right py-3">
                        <Skeleton className="h-5 w-16 bg-gray-800 ml-auto" />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History Skeleton */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-6 w-40 bg-gray-800" />
              <Skeleton className="h-4 w-36 mt-2 bg-gray-800" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-[180px] bg-gray-800" />
              <Skeleton className="h-8 w-32 bg-gray-800" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                    <div>
                      <Skeleton className="h-5 w-24 bg-gray-800" />
                      <Skeleton className="h-4 w-32 mt-1 bg-gray-800" />
                    </div>
                  </div>
                  <div className="text-right">
                    <Skeleton className="h-5 w-20 bg-gray-800" />
                    <Skeleton className="h-4 w-24 mt-1 bg-gray-800" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full bg-gray-800" />
                  <Skeleton className="h-8 w-8 bg-gray-800" />
                </div>
              ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
          <Skeleton className="h-9 w-40 bg-gray-800" />
        </CardFooter>
      </Card>
    </div>
  )
}
