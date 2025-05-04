import { Skeleton } from "@/components/ui/skeleton"

export default function MusicUsageLoading() {
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
        <Skeleton className="h-10 w-40 bg-gray-800" />
      </div>

      <Skeleton className="mb-6 h-10 w-full max-w-md bg-gray-800" />

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-32 w-full bg-gray-800" />
            ))}
        </div>

        <Skeleton className="h-[400px] w-full bg-gray-800" />

        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <Skeleton className="mb-4 h-6 w-48 bg-gray-800" />
          <Skeleton className="mb-6 h-4 w-72 bg-gray-800" />

          <div className="rounded-md border border-gray-800">
            <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3">
              <Skeleton className="col-span-4 h-4 bg-gray-800" />
              <Skeleton className="col-span-2 h-4 bg-gray-800" />
              <Skeleton className="col-span-2 h-4 bg-gray-800" />
              <Skeleton className="col-span-2 h-4 bg-gray-800" />
              <Skeleton className="col-span-2 h-4 bg-gray-800" />
            </div>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0">
                  <Skeleton className="col-span-4 h-5 bg-gray-800" />
                  <Skeleton className="col-span-2 h-5 bg-gray-800" />
                  <Skeleton className="col-span-2 h-5 bg-gray-800" />
                  <Skeleton className="col-span-2 h-5 bg-gray-800" />
                  <Skeleton className="col-span-2 h-5 bg-gray-800" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
