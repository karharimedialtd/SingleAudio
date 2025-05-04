import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
      </div>

      <Skeleton className="h-20 w-full" />

      <Skeleton className="h-10 w-[400px] mb-4" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-[200px] mb-2" />
          <Skeleton className="h-4 w-[300px]" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[150px]" />
                  <Skeleton className="h-4 w-[250px]" />
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          <div className="pt-2 space-y-2">
            <Skeleton className="h-5 w-[150px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
