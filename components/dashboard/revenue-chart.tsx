"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const revenueData = [
  { platform: "Spotify", revenue: 8945.5, streams: 1245000 },
  { platform: "Apple Music", revenue: 6234.8, streams: 987000 },
  { platform: "YouTube Music", revenue: 3456.2, streams: 756000 },
  { platform: "Amazon Music", revenue: 2134.6, streams: 634000 },
  { platform: "Deezer", revenue: 1234.9, streams: 423000 },
]

export function RevenueChart() {
  return (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Revenue by Platform</CardTitle>
        <CardDescription className="text-gray-400">Earnings breakdown across streaming services</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(142, 71%, 45%)",
            },
          }}
          className="h-64"
        >
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis
              dataKey="platform"
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
