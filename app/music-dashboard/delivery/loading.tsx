import { Skeleton } from "@/components/ui/skeleton"

export default function DeliveryLoading() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Skeleton className="h-8 w-48 bg-gray-800" />
        <Skeleton className="mt-2 h-4 w-72 bg-gray-800" />
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Skeleton className="h-10 w-full max-w-sm bg-gray-800" />
          <Skeleton className="h-10 w-24 bg-gray-800" />
          <Skeleton className="h-10 w-40 bg-gray-800" />
        </div>
      </div>

      <Skeleton className="mb-6 h-10 w-full max-w-md bg-gray-800" />

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <Skeleton className="mb-4 h-6 w-48 bg-gray-800" />
          <Skeleton className="mb-6 h-4 w-72 bg-gray-800" />

          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-40 bg-gray-800" />
                        <Skeleton className="h-5 w-16 bg-gray-800" />
                        <Skeleton className="h-5 w-24 bg-gray-800" />
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Skeleton className="h-4 w-24 bg-gray-800" />
                        <Skeleton className="h-4 w-32 bg-gray-800" />
                      </div>
                    </div>
                    <Skeleton className="h-8 w-24 bg-gray-800" />
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between">
                      <Skeleton className="h-4 w-32 bg-gray-800" />
                      <Skeleton className="h-4 w-12 bg-gray-800" />
                    </div>
                    <Skeleton className="h-2 w-full bg-gray-800" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-6 w-20 bg-gray-800" />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <Skeleton className="mb-4 h-6 w-48 bg-gray-800" />
          <Skeleton className="mb-6 h-4 w-72 bg-gray-800" />

          <div className="rounded-md border border-gray-800">
            <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3">
              <Skeleton className="col-span-3 h-4 bg-gray-800" />
              <Skeleton className="col-span-2 h-4 bg-gray-800" />
              <Skeleton className="col-span-3 h-4 bg-gray-800" />
              <Skeleton className="col-span-4 h-4 bg-gray-800" />
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0">
                  <Skeleton className="col-span-3 h-5 bg-gray-800" />
                  <Skeleton className="col-span-2 h-5 bg-gray-800" />
                  <Skeleton className="col-span-3 h-5 bg-gray-800" />
                  <Skeleton className="col-span-4 h-5 bg-gray-800" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
