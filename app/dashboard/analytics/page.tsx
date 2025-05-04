"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Download, RefreshCw, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { downloadCSV } from "@/lib/utils"

// Sample data for different time ranges
const viewsData = {
  "7days": [
    { date: "May 1", views: 4200, watchTime: 1200, likes: 320 },
    { date: "May 2", views: 4500, watchTime: 1300, likes: 340 },
    { date: "May 3", views: 5100, watchTime: 1450, likes: 380 },
    { date: "May 4", views: 5400, watchTime: 1500, likes: 400 },
    { date: "May 5", views: 5900, watchTime: 1650, likes: 420 },
    { date: "May 6", views: 6300, watchTime: 1750, likes: 450 },
    { date: "May 7", views: 6800, watchTime: 1900, likes: 480 },
  ],
  "30days": [
    { date: "Apr 15", views: 3200, watchTime: 900, likes: 220 },
    { date: "Apr 20", views: 3800, watchTime: 1050, likes: 260 },
    { date: "Apr 25", views: 4200, watchTime: 1200, likes: 320 },
    { date: "Apr 30", views: 4800, watchTime: 1350, likes: 360 },
    { date: "May 5", views: 5900, watchTime: 1650, likes: 420 },
    { date: "May 10", views: 7200, watchTime: 2000, likes: 510 },
    { date: "May 15", views: 8900, watchTime: 2450, likes: 640 },
  ],
  "90days": [
    { date: "Mar 1", views: 2200, watchTime: 600, likes: 120 },
    { date: "Mar 15", views: 2800, watchTime: 750, likes: 160 },
    { date: "Apr 1", views: 3500, watchTime: 950, likes: 240 },
    { date: "Apr 15", views: 4200, watchTime: 1200, likes: 320 },
    { date: "May 1", views: 5400, watchTime: 1500, likes: 400 },
    { date: "May 15", views: 8900, watchTime: 2450, likes: 640 },
    { date: "Jun 1", views: 10500, watchTime: 2900, likes: 780 },
  ],
  year: [
    { date: "Jan", views: 1500, watchTime: 400, likes: 80 },
    { date: "Feb", views: 2000, watchTime: 550, likes: 110 },
    { date: "Mar", views: 3000, watchTime: 800, likes: 180 },
    { date: "Apr", views: 4000, watchTime: 1100, likes: 280 },
    { date: "May", views: 6000, watchTime: 1700, likes: 450 },
    { date: "Jun", views: 8000, watchTime: 2200, likes: 580 },
    { date: "Jul", views: 9500, watchTime: 2600, likes: 680 },
    { date: "Aug", views: 11000, watchTime: 3000, likes: 780 },
    { date: "Sep", views: 12500, watchTime: 3400, likes: 880 },
    { date: "Oct", views: 14000, watchTime: 3800, likes: 980 },
    { date: "Nov", views: 15500, watchTime: 4200, likes: 1080 },
    { date: "Dec", views: 17000, watchTime: 4600, likes: 1180 },
  ],
}

const trafficSourceData = [
  { name: "YouTube Search", value: 35 },
  { name: "Suggested Videos", value: 25 },
  { name: "External", value: 20 },
  { name: "Browse Features", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [metric, setMetric] = useState("views")
  const [currentData, setCurrentData] = useState(viewsData["30days"])

  // Update data when time range changes
  useEffect(() => {
    setCurrentData(viewsData[timeRange as keyof typeof viewsData])
  }, [timeRange])

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Update data with "new" data
    setCurrentData([...viewsData[timeRange as keyof typeof viewsData]])

    toast({
      title: "Data refreshed",
      description: "Analytics data has been updated successfully.",
    })

    return true
  }

  const handleExport = async () => {
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create and download a dummy CSV file
    downloadCSV(currentData, `analytics_${timeRange}_${new Date().toISOString().split("T")[0]}.csv`)

    toast({
      title: "Export successful",
      description: "Analytics data has been exported to CSV.",
    })

    return true
  }

  const handleGenerateReport = async () => {
    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Report generated",
      description: "Your analytics report is ready to download.",
    })

    // In a real app, this would open a new tab with the report or download it
    return true
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Channel Analytics</h1>
          <p className="text-sm text-gray-400">Last updated: Today at {new Date().toLocaleTimeString()}</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleRefresh}
            icon={<RefreshCw className="h-4 w-4" />}
            loadingText="Refreshing..."
            successMessage="Data refreshed successfully"
          >
            Refresh Data
          </ActionButton>
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleExport}
            icon={<Download className="h-4 w-4" />}
            loadingText="Exporting..."
            successMessage="Data exported successfully"
          >
            Export Data
          </ActionButton>
          <TabSelector
            defaultValue={timeRange}
            options={[
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" },
              { value: "90days", label: "90 Days" },
              { value: "year", label: "Year" },
            ]}
            onChange={setTimeRange}
            className="w-auto"
          />
        </div>
      </div>

      {/* Main Analytics Chart */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
            <Select defaultValue={metric} onValueChange={setMetric}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-800">
                <SelectItem value="views">Views</SelectItem>
                <SelectItem value="watchTime">Watch Time</SelectItem>
                <SelectItem value="likes">Likes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              views: {
                label: "Views",
                color: "hsl(var(--chart-1))",
              },
              watchTime: {
                label: "Watch Time (hours)",
                color: "hsl(var(--chart-2))",
              },
              likes: {
                label: "Likes",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke={`var(--color-${metric})`}
                  fill={`var(--color-${metric})`}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Traffic Sources */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Video Performance */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Videos Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Video 1", views: 120000 },
                    { name: "Video 2", views: 98000 },
                    { name: "Video 3", views: 86000 },
                    { name: "Video 4", views: 72000 },
                    { name: "Video 5", views: 65000 },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Bar dataKey="views" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Engagement Rate */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "Jan 1", rate: 4.2 },
                    { date: "Jan 2", rate: 4.5 },
                    { date: "Jan 3", rate: 5.1 },
                    { date: "Jan 4", rate: 5.4 },
                    { date: "Jan 5", rate: 5.9 },
                    { date: "Jan 6", rate: 6.3 },
                    { date: "Jan 7", rate: 6.8 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="rate" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Audience Retention */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Audience Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { time: "0:00", retention: 100 },
                    { time: "1:00", retention: 92 },
                    { time: "2:00", retention: 85 },
                    { time: "3:00", retention: 78 },
                    { time: "4:00", retention: 72 },
                    { time: "5:00", retention: 65 },
                    { time: "6:00", retention: 60 },
                    { time: "7:00", retention: 55 },
                    { time: "8:00", retention: 50 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="retention" stroke="#F59E0B" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Click-Through Rate */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Click-Through Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { date: "Jan 1", ctr: 7.2 },
                    { date: "Jan 2", ctr: 7.5 },
                    { date: "Jan 3", ctr: 8.1 },
                    { date: "Jan 4", ctr: 8.4 },
                    { date: "Jan 5", ctr: 8.9 },
                    { date: "Jan 6", ctr: 9.3 },
                    { date: "Jan 7", ctr: 9.8 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="ctr" stroke="#3B82F6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <ActionButton
        variant="outline"
        className="bg-gray-800 border-gray-700 hover:bg-gray-700"
        action={handleGenerateReport}
        icon={<FileText className="h-4 w-4" />}
        loadingText="Generating..."
        successMessage="Report generated successfully"
      >
        Generate Report
      </ActionButton>
    </div>
  )
}
