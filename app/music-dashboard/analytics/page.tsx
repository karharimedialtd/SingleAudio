"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { ArrowRight, BarChart3, Download, Globe, Headphones, PieChartIcon, TrendingUp } from "lucide-react"

// Sample data
const overviewData = [
  { date: "2023-01", streams: 12500, revenue: 625 },
  { date: "2023-02", streams: 15000, revenue: 750 },
  { date: "2023-03", streams: 14000, revenue: 700 },
  { date: "2023-04", streams: 16000, revenue: 800 },
  { date: "2023-05", streams: 20000, revenue: 1000 },
  { date: "2023-06", streams: 22500, revenue: 1125 },
  { date: "2023-07", streams: 26000, revenue: 1300 },
]

const platformData = [
  { name: "Spotify", value: 45, color: "#1DB954" },
  { name: "Apple Music", value: 25, color: "#FC3C44" },
  { name: "YouTube Music", value: 15, color: "#FF0000" },
  { name: "Amazon Music", value: 8, color: "#00A8E1" },
  { name: "Others", value: 7, color: "#8884d8" },
]

const regionData = [
  { name: "North America", streams: 45000, revenue: 2250 },
  { name: "Europe", streams: 32000, revenue: 1600 },
  { name: "Asia", streams: 18000, revenue: 900 },
  { name: "South America", streams: 12000, revenue: 600 },
  { name: "Oceania", streams: 8000, revenue: 400 },
  { name: "Africa", streams: 5000, revenue: 250 },
]

const trackPerformanceData = [
  { name: "Midnight Dreams", streams: 12500, revenue: 625 },
  { name: "Summer Vibes", streams: 9800, revenue: 490 },
  { name: "Acoustic Session #1", streams: 8700, revenue: 435 },
  { name: "Urban Beats", streams: 6500, revenue: 325 },
  { name: "Remix Collection", streams: 5200, revenue: 260 },
]

const audienceData = [
  { age: "18-24", male: 25, female: 20, other: 5 },
  { age: "25-34", male: 30, female: 25, other: 5 },
  { age: "35-44", male: 15, female: 20, other: 3 },
  { age: "45-54", male: 10, female: 15, other: 2 },
  { age: "55+", male: 5, female: 10, other: 1 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("6m")
  const [activeTab, setActiveTab] = useState("overview")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Analytics refreshed",
        description: "Latest analytics data has been loaded",
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your analytics data is being exported",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-sm text-gray-400">Track your music performance across all platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Streams</p>
                <h3 className="text-2xl font-bold">126,000</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+15.3% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold">$6,300.00</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.8% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. per Stream</p>
                <h3 className="text-2xl font-bold">$0.0050</h3>
                <div className="flex items-center mt-1 text-red-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                  <span>-2.1% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <PieChartIcon className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Platforms</p>
                <h3 className="text-2xl font-bold">12</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+2 from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
                  <CardDescription>Streams and revenue over time</CardDescription>
                </div>
                <Select defaultValue="streams">
                  <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="streams">Streams</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="both">Streams & Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={overviewData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="date"
                      stroke="#6b7280"
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString(undefined, { month: "short", year: "numeric" })
                      }}
                    />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value, name) => [
                        name === "streams" ? value.toLocaleString() : `$${value}`,
                        name === "streams" ? "Streams" : "Revenue",
                      ]}
                      labelFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString(undefined, { month: "long", year: "numeric" })
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="streams"
                      name="Streams"
                      stroke="#8b5cf6"
                      fill="#8b5cf680"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="#22c55e"
                      fill="#22c55e80"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Platforms</CardTitle>
                <CardDescription>Distribution of streams by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                        itemStyle={{ color: "#f9fafb" }}
                        labelStyle={{ color: "#f9fafb" }}
                        formatter={(value) => [`${value}%`, ""]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Tracks</CardTitle>
                <CardDescription>Your best performing tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trackPerformanceData}
                      layout="vertical"
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#6b7280" />
                      <YAxis dataKey="name" type="category" stroke="#6b7280" width={100} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                        itemStyle={{ color: "#f9fafb" }}
                        labelStyle={{ color: "#f9fafb" }}
                        formatter={(value) => [value.toLocaleString(), ""]}
                      />
                      <Legend />
                      <Bar dataKey="streams" name="Streams" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button variant="outline" className="w-full">
                  View All Tracks
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "platforms" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Platform Performance</CardTitle>
                  <CardDescription>Streams and revenue by platform</CardDescription>
                </div>
                <Select defaultValue="all" onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="spotify">Spotify</SelectItem>
                    <SelectItem value="apple">Apple Music</SelectItem>
                    <SelectItem value="youtube">YouTube Music</SelectItem>
                    <SelectItem value="amazon">Amazon Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={platformData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="value" name="Market Share" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "geography" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Geographic Distribution</CardTitle>
                  <CardDescription>Streams and revenue by region</CardDescription>
                </div>
                <Select defaultValue="streams">
                  <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="streams">Streams</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={regionData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [value.toLocaleString(), ""]}
                    />
                    <Legend />
                    <Bar dataKey="streams" name="Streams" fill="#8b5cf6" />
                    <Bar dataKey="revenue" name="Revenue ($)" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "tracks" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Track Performance</CardTitle>
                  <CardDescription>Streams and revenue by track</CardDescription>
                </div>
                <Select defaultValue="streams">
                  <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select metric" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="streams">Streams</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trackPerformanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis dataKey="name" type="category" stroke="#6b7280" width={120} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value, name) => [
                        name === "streams" ? value.toLocaleString() : `$${value}`,
                        name === "streams" ? "Streams" : "Revenue",
                      ]}
                    />
                    <Legend />
                    <Bar dataKey="streams" name="Streams" fill="#8b5cf6" />
                    <Bar dataKey="revenue" name="Revenue ($)" fill="#22c55e" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "audience" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Audience Demographics</CardTitle>
                  <CardDescription>Listener breakdown by age and gender</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={audienceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="age" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="male" name="Male" fill="#3b82f6" />
                    <Bar dataKey="female" name="Female" fill="#ec4899" />
                    <Bar dataKey="other" name="Other" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
