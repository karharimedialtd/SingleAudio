"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"
import { Download, Calendar, Filter, Play, DollarSign, Users, Music, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const streamingData = [
  { month: "Jan", streams: 245000, revenue: 1750, listeners: 18500 },
  { month: "Feb", streams: 289000, revenue: 2065, listeners: 21200 },
  { month: "Mar", streams: 324000, revenue: 2315, listeners: 24800 },
  { month: "Apr", streams: 298000, revenue: 2130, listeners: 22900 },
  { month: "May", streams: 356000, revenue: 2545, listeners: 27100 },
  { month: "Jun", streams: 412000, revenue: 2945, listeners: 31500 },
]

const platformData = [
  { name: "Spotify", value: 42.5, color: "#1DB954", streams: 125430, revenue: 892.45 },
  { name: "Apple Music", value: 28.3, color: "#FA243C", streams: 89234, revenue: 634.78 },
  { name: "YouTube Music", value: 15.7, color: "#FF0000", streams: 45678, revenue: 324.56 },
  { name: "Amazon Music", value: 8.9, color: "#FF9900", streams: 23456, revenue: 167.89 },
  { name: "Others", value: 4.6, color: "#6B7280", streams: 12345, revenue: 89.34 },
]

const revenueData = [
  { platform: "Spotify", revenue: 8945.5, streams: 1245000 },
  { platform: "Apple Music", revenue: 6234.8, streams: 987000 },
  { platform: "YouTube Music", revenue: 3456.2, streams: 756000 },
  { platform: "Amazon Music", revenue: 2134.6, streams: 634000 },
  { platform: "Deezer", revenue: 1234.9, streams: 423000 },
]

const topTracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Rodriguez",
    streams: 1245000,
    revenue: 8915.5,
    change: 12.5,
    trend: "up",
  },
  {
    id: 2,
    title: "Electric Nights",
    artist: "Neon Collective",
    streams: 987000,
    revenue: 7065.9,
    change: 8.3,
    trend: "up",
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Coastal Sounds",
    streams: 756000,
    revenue: 5412.0,
    change: -2.1,
    trend: "down",
  },
]

export default function AnalyticsPage() {
  const { setCurrentPage, addNotification } = useDashboard()
  const [dateRange, setDateRange] = useState("last30days")
  const [selectedMetric, setSelectedMetric] = useState("streams")
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    setCurrentPage("Analytics")
  }, [setCurrentPage])

  const handleDateRangeChange = (range: string) => {
    setDateRange(range)
    console.log(`Analytics date range changed to: ${range}`)
    addNotification({
      type: "info",
      title: "Date Range Updated",
      message: `Analytics updated for ${range.replace(/([A-Z])/g, " $1").toLowerCase()}`,
    })
  }

  const handleExportReport = async () => {
    setIsExporting(true)
    console.log("Exporting analytics report...")

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false)

      // Create and download a mock CSV file
      const csvContent = `Analytics Report - ${dateRange}
Generated: ${new Date().toISOString()}

Platform,Streams,Revenue,Growth
Spotify,1245000,$8915.50,+12.5%
Apple Music,987000,$7065.90,+8.3%
YouTube Music,756000,$5412.00,-2.1%
Amazon Music,634000,$4538.60,+15.7%
Deezer,423000,$2891.30,+5.2%

Total Streams: 4045000
Total Revenue: $28823.30
Overall Growth: +8.7%`

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `analytics-report-${dateRange}-${Date.now()}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      addNotification({
        type: "success",
        title: "Export Complete",
        message: "Analytics report has been downloaded successfully",
      })
    }, 2000)
  }

  const handleFilterClick = () => {
    console.log("Opening advanced filters")
    addNotification({
      type: "info",
      title: "Advanced Filters",
      message: "Advanced filtering options are being prepared",
    })
  }

  const handleTrackClick = (trackId: number) => {
    console.log(`Viewing details for track ID: ${trackId}`)
    addNotification({
      type: "info",
      title: "Track Details",
      message: `Opening detailed analytics for track ${trackId}`,
    })
  }

  const totalStreams = platformData.reduce((sum, platform) => sum + platform.streams, 0)
  const totalRevenue = platformData.reduce((sum, platform) => sum + platform.revenue, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your music performance across all platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={dateRange} onValueChange={handleDateRangeChange}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="last30days">Last 30 Days</SelectItem>
              <SelectItem value="last3months">Last 3 Months</SelectItem>
              <SelectItem value="last6months">Last 6 Months</SelectItem>
              <SelectItem value="lastyear">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleFilterClick}
            className="border-white/20 text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>

          <Button onClick={handleExportReport} disabled={isExporting} className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Streams</p>
                <p className="text-2xl font-semibold text-white mt-2">{totalStreams.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <Play className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Revenue</p>
                <p className="text-2xl font-semibold text-white mt-2">${totalRevenue.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.2%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Monthly Listeners</p>
                <p className="text-2xl font-semibold text-white mt-2">184,592</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.3%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Releases</p>
                <p className="text-2xl font-semibold text-white mt-2">28</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+3</span>
                  <span className="text-sm text-gray-500 ml-2">this period</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="platforms" className="text-gray-300 data-[state=active]:text-white">
            Platforms
          </TabsTrigger>
          <TabsTrigger value="tracks" className="text-gray-300 data-[state=active]:text-white">
            Top Tracks
          </TabsTrigger>
          <TabsTrigger value="revenue" className="text-gray-300 data-[state=active]:text-white">
            Revenue
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Performance Trends</CardTitle>
                    <CardDescription className="text-gray-400">
                      Monthly streams, revenue, and listener growth
                    </CardDescription>
                  </div>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="streams">Streams</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="listeners">Listeners</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    streams: { label: "Streams", color: "hsl(217, 91%, 60%)" },
                    revenue: { label: "Revenue", color: "hsl(142, 71%, 45%)" },
                    listeners: { label: "Listeners", color: "hsl(262, 83%, 58%)" },
                  }}
                  className="h-80"
                >
                  <AreaChart data={streamingData}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#9CA3AF"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="hsl(217, 91%, 60%)"
                      fillOpacity={1}
                      fill="url(#gradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Platform Distribution</CardTitle>
                <CardDescription className="text-gray-400">Stream share by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    spotify: { label: "Spotify", color: "#1DB954" },
                    apple: { label: "Apple Music", color: "#FA243C" },
                    youtube: { label: "YouTube Music", color: "#FF0000" },
                    amazon: { label: "Amazon Music", color: "#FF9900" },
                    others: { label: "Others", color: "#6B7280" },
                  }}
                  className="h-48 mb-6"
                >
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="space-y-3">
                  {platformData.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                        <span className="text-sm text-gray-300">{platform.name}</span>
                      </div>
                      <span className="text-sm font-medium text-white">{platform.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Platform Performance</CardTitle>
              <CardDescription className="text-gray-400">
                Detailed breakdown of performance across streaming platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformData.map((platform, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: platform.color }}
                          >
                            {platform.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{platform.name}</h3>
                            <p className="text-gray-400 text-sm">{platform.streams.toLocaleString()} streams</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">${platform.revenue.toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">{platform.value}% of total</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={platform.value} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Top Performing Tracks</CardTitle>
              <CardDescription className="text-gray-400">Your highest earning releases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTracks.map((track, index) => (
                  <div
                    key={track.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleTrackClick(track.id)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{track.title}</p>
                      <p className="text-gray-400 text-sm">{track.artist}</p>
                      <p className="text-gray-500 text-xs">{track.streams.toLocaleString()} streams</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">${track.revenue.toFixed(2)}</p>
                      <div className="flex items-center justify-end">
                        {track.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={`text-xs ${track.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {track.change > 0 ? "+" : ""}
                          {track.change}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Revenue by Platform</CardTitle>
              <CardDescription className="text-gray-400">Earnings breakdown across streaming services</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: { label: "Revenue", color: "hsl(142, 71%, 45%)" },
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
