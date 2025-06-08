"use client"

import { useEffect, useState } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  TrendingUp,
  Music,
  DollarSign,
  Users,
  PlayCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Download,
  Share,
  Calendar,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const performanceData = [
  { month: "Jan", streams: 245000, revenue: 1750, listeners: 18500 },
  { month: "Feb", streams: 289000, revenue: 2065, listeners: 21200 },
  { month: "Mar", streams: 324000, revenue: 2315, listeners: 24800 },
  { month: "Apr", streams: 298000, revenue: 2130, listeners: 22900 },
  { month: "May", streams: 356000, revenue: 2545, listeners: 27100 },
  { month: "Jun", streams: 412000, revenue: 2945, listeners: 31500 },
]

const platformDistribution = [
  { name: "Spotify", value: 42.5, color: "#1DB954" },
  { name: "Apple Music", value: 28.3, color: "#FA243C" },
  { name: "YouTube Music", value: 15.7, color: "#FF0000" },
  { name: "Amazon Music", value: 8.9, color: "#FF9900" },
  { name: "Others", value: 4.6, color: "#6B7280" },
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
  {
    id: 4,
    title: "Urban Pulse",
    artist: "City Beats",
    streams: 634000,
    revenue: 4538.6,
    change: 15.7,
    trend: "up",
  },
]

const recentActivity = [
  {
    type: "release",
    title: "New single 'Summer Nights' released",
    time: "2 hours ago",
    status: "live",
  },
  {
    type: "milestone",
    title: "Midnight Dreams reached 1M streams",
    time: "1 day ago",
    status: "achievement",
  },
  {
    type: "payout",
    title: "Monthly royalty payment processed",
    time: "3 days ago",
    status: "completed",
  },
  {
    type: "playlist",
    title: "Added to 'Indie Discoveries' playlist",
    time: "5 days ago",
    status: "featured",
  },
]

export default function DashboardPage() {
  const { setCurrentPage } = useDashboard()
  const [dateRange, setDateRange] = useState("Last 30 days")
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    setCurrentPage("Dashboard")
  }, [setCurrentPage])

  const handleExportReport = async () => {
    setIsExporting(true)
    console.log("Exporting dashboard report...")

    // Simulate export process with real data
    setTimeout(() => {
      setIsExporting(false)

      // Create comprehensive CSV report
      const reportData = [
        ["Dashboard Report", `Generated on ${new Date().toLocaleDateString()}`],
        [""],
        ["Key Metrics", ""],
        ["Total Streams", "2,847,392"],
        ["Revenue", "$20,384.50"],
        ["Monthly Listeners", "184,592"],
        ["Active Releases", "28"],
        [""],
        ["Top Tracks", ""],
        ["Track", "Artist", "Streams", "Revenue"],
        ...topTracks.map((track) => [
          track.title,
          track.artist,
          track.streams.toString(),
          `$${track.revenue.toFixed(2)}`,
        ]),
        [""],
        ["Platform Distribution", ""],
        ["Platform", "Percentage"],
        ...platformDistribution.map((platform) => [platform.name, `${platform.value}%`]),
      ]

      const csvContent = "data:text/csv;charset=utf-8," + reportData.map((row) => row.join(",")).join("\n")

      const encodedUri = encodeURI(csvContent)
      const link = document.createElement("a")
      link.setAttribute("href", encodedUri)
      link.setAttribute("download", `dashboard-report-${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      alert("📊 Dashboard report exported successfully!")
    }, 2000)
  }

  const handleDateRangeChange = (range: string) => {
    setDateRange(range)
    console.log(`Date range changed to: ${range}`)
    alert(`Dashboard updated for: ${range}`)
  }

  const handleMoreOptions = (trackId: number) => {
    console.log(`More options for track ID: ${trackId}`)
    alert(`More options for track ${trackId} - Feature coming soon!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Track your music performance and manage your releases</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={handleExportReport}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export Report"}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {dateRange}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => handleDateRangeChange("Last 7 days")}
              >
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => handleDateRangeChange("Last 30 days")}
              >
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => handleDateRangeChange("Last 3 months")}
              >
                Last 3 months
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                onClick={() => handleDateRangeChange("Last year")}
              >
                Last year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Streams</p>
                <p className="text-2xl font-semibold text-white mt-2">2,847,392</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+12.5%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <PlayCircle className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Revenue</p>
                <p className="text-2xl font-semibold text-white mt-2">$20,384.50</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+8.2%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Monthly Listeners</p>
                <p className="text-2xl font-semibold text-white mt-2">184,592</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+15.3%</span>
                  <span className="text-sm text-gray-500 ml-2">vs last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active Releases</p>
                <p className="text-2xl font-semibold text-white mt-2">28</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-500">+3</span>
                  <span className="text-sm text-gray-500 ml-2">this month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <Card className="lg:col-span-2 bg-gray-900/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Performance Analytics</CardTitle>
                <CardDescription className="text-gray-400">
                  Monthly streams, revenue, and listener growth
                </CardDescription>
              </div>
              <Tabs defaultValue="streams" className="w-auto">
                <TabsList className="bg-gray-800 border-gray-700">
                  <TabsTrigger
                    value="streams"
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                    onClick={() => console.log("Switched to streams view")}
                  >
                    Streams
                  </TabsTrigger>
                  <TabsTrigger
                    value="revenue"
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                    onClick={() => console.log("Switched to revenue view")}
                  >
                    Revenue
                  </TabsTrigger>
                  <TabsTrigger
                    value="listeners"
                    className="text-gray-400 data-[state=active]:text-white data-[state=active]:bg-gray-700"
                    onClick={() => console.log("Switched to listeners view")}
                  >
                    Listeners
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                streams: {
                  label: "Streams",
                  color: "hsl(217, 91%, 60%)",
                },
                revenue: {
                  label: "Revenue",
                  color: "hsl(142, 71%, 45%)",
                },
                listeners: {
                  label: "Listeners",
                  color: "hsl(262, 83%, 58%)",
                },
              }}
              className="h-80"
            >
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="streamGradient" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="streams"
                  stroke="hsl(217, 91%, 60%)"
                  fillOpacity={1}
                  fill="url(#streamGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="bg-gray-900/50 border-gray-700">
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
                  data={platformDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {platformDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="space-y-3">
              {platformDistribution.map((platform, index) => (
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

      {/* Top Tracks and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tracks */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Top Performing Tracks</CardTitle>
                <CardDescription className="text-gray-400">Your highest earning releases</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 border-gray-700">
                  <DropdownMenuItem
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => alert("View all tracks feature coming soon!")}
                  >
                    View All Tracks
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => alert("Export tracks data feature coming soon!")}
                  >
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    onClick={() => alert("Filter options feature coming soon!")}
                  >
                    Filter Options
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => {
                    console.log(`Clicked on track: ${track.title}`)
                    alert(`Viewing details for "${track.title}" - Feature coming soon!`)
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-700 rounded-full text-white text-sm font-medium">
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10 rounded-md">
                    <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${track.title.charAt(0)}`} />
                    <AvatarFallback className="bg-gray-700 text-white rounded-md">
                      {track.title.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
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

        {/* Recent Activity */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">Latest updates and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                  onClick={() => {
                    console.log(`Clicked on activity: ${activity.title}`)
                    alert(`Activity details: ${activity.title} - Feature coming soon!`)
                  }}
                >
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === "release" && (
                      <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                        <Music className="h-4 w-4 text-blue-500" />
                      </div>
                    )}
                    {activity.type === "milestone" && (
                      <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </div>
                    )}
                    {activity.type === "payout" && (
                      <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-yellow-500" />
                      </div>
                    )}
                    {activity.type === "playlist" && (
                      <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center">
                        <Share className="h-4 w-4 text-purple-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={`text-xs ${
                      activity.status === "live"
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : activity.status === "achievement"
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                          : activity.status === "completed"
                            ? "bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "bg-purple-500/10 text-purple-500 border-purple-500/20"
                    }`}
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
          <CardDescription className="text-gray-400">Manage your music and grow your audience</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-16 border-gray-600 hover:bg-gray-800 hover:border-gray-500 flex items-center justify-center space-x-3 transition-colors"
              onClick={() => {
                console.log("Navigating to new release")
                window.location.href = "/dashboard/music/release"
              }}
            >
              <Music className="h-5 w-5 text-blue-500" />
              <span className="text-white">New Release</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 border-gray-600 hover:bg-gray-800 hover:border-gray-500 flex items-center justify-center space-x-3 transition-colors"
              onClick={() => {
                console.log("Navigating to analytics")
                window.location.href = "/dashboard/analytics"
              }}
            >
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-white">View Analytics</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 border-gray-600 hover:bg-gray-800 hover:border-gray-500 flex items-center justify-center space-x-3 transition-colors"
              onClick={() => {
                console.log("Navigating to playlist pitching")
                window.location.href = "/dashboard/tools/pitching"
              }}
            >
              <Share className="h-5 w-5 text-purple-500" />
              <span className="text-white">Playlist Pitching</span>
            </Button>

            <Button
              variant="outline"
              className="h-16 border-gray-600 hover:bg-gray-800 hover:border-gray-500 flex items-center justify-center space-x-3 transition-colors"
              onClick={() => {
                console.log("Navigating to royalties")
                window.location.href = "/dashboard/royalties"
              }}
            >
              <DollarSign className="h-5 w-5 text-yellow-500" />
              <span className="text-white">View Royalties</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
