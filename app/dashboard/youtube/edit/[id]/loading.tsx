export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex space-x-2">
          <div className="h-9 w-20 bg-gray-700 rounded animate-pulse" />
          <div className="h-9 w-24 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      <div className="h-12 bg-gray-700 rounded animate-pulse" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-64 bg-gray-700 rounded animate-pulse" />
          <div className="h-32 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="space-y-6">
          <div className="h-48 bg-gray-700 rounded animate-pulse" />
          <div className="h-32 bg-gray-700 rounded animate-pulse" />
          <div className="h-24 bg-gray-700 rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
