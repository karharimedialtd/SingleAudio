"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart3,
  Calendar,
  ChevronRight,
  Disc,
  DollarSign,
  Download,
  FileMusic,
  Globe,
  Share2,
  Sparkles,
  TrendingUp,
  Upload,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { toast } from "@/components/ui/use-toast"

// Sample data
const overviewData = [
  { name: "Jan", streams: 2500, revenue: 125 },
  { name: "Feb", streams: 3000, revenue: 150 },
  { name: "Mar", streams: 2800, revenue: 140 },
  { name: "Apr", streams: 3200, revenue: 160 },
  { name: "May", streams: 4000, revenue: 200 },
  { name: "Jun", streams: 4500, revenue: 225 },
  { name: "Jul", streams: 5200, revenue: 260 },
]

const platformData = [
  { name: "Spotify", value: 45 },
  { name: "Apple Music", value: 25 },
  { name: "YouTube Music", value: 15 },
  { name: "Amazon Music", value: 10 },
  { name: "Others", value: 5 },
]

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"]

const recentReleases = [
  {
    id: 1,
    title: "Midnight Dreams",
    type: "Single",
    artist: "John Doe",
    cover: "/abstract-soundscape.png",
    streams: 12500,
    platforms: 12,
    status: "Live",
  },
  {
    id: 2,
    title: "Summer Vibes EP",
    type: "EP",
    artist: "John Doe ft. Jane Smith",
    cover: "/abstract-music-cover.png",
    streams: 8700,
    platforms: 10,
    status: "Processing",
  },
  {
    id: 3,
    title: "Acoustic Sessions",
    type: "Album",
    artist: "John Doe",
    cover: "/placeholder.svg?key=ibv6w",
    streams: 5200,
    platforms: 8,
    status: "Scheduled",
  },
]

export default function MusicDashboard() {
  const [dateRange, setDateRange] = useState("30d")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Dashboard refreshed",
        description: "Latest data has been loaded",
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your data is being exported to CSV",
    })
  }

  const navigateToRelease = (id: number) => {
    router.push(`/music-dashboard/releases/${id}`)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "upload":
        router.push("/music-dashboard/upload")
        break
      case "platforms":
        router.push("/music-dashboard/platforms")
        break
      case "analytics":
        router.push("/music-dashboard/analytics")
        break
      case "royalties":
        router.push("/music-dashboard/royalties")
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Music Dashboard</h1>
          <p className="text-sm text-gray-400">Manage your music distribution and track performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Upload New</p>
                <h3 className="text-xl font-bold text-white">Release</h3>
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => handleQuickAction("upload")}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-200">Connect</p>
                <h3 className="text-xl font-bold text-white">Platforms</h3>
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => handleQuickAction("platforms")}
              >
                <Globe className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-200">View</p>
                <h3 className="text-xl font-bold text-white">Analytics</h3>
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => handleQuickAction("analytics")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-900 to-orange-800 border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-200">Manage</p>
                <h3 className="text-xl font-bold text-white">Royalties</h3>
              </div>
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30"
                onClick={() => handleQuickAction("royalties")}
              >
                <DollarSign className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Streaming Performance</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={handleExport}>
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
            <CardDescription>Total streams and revenue over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={overviewData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                    itemStyle={{ color: "#f9fafb" }}
                    labelStyle={{ color: "#f9fafb" }}
                  />
                  <Area type="monotone" dataKey="streams" stroke="#8b5cf6" fill="#8b5cf680" />
                  <Area type="monotone" dataKey="revenue" stroke="#22c55e" fill="#22c55e80" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Streams</p>
              <p className="text-2xl font-bold">21,200</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold">$1,260.00</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Growth</p>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <p className="text-2xl font-bold text-green-500">+15.3%</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Platform Distribution</CardTitle>
            <CardDescription>Streams by platform</CardDescription>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                    itemStyle={{ color: "#f9fafb" }}
                    labelStyle={{ color: "#f9fafb" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Releases */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Releases</CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 text-xs"
              onClick={() => router.push("/music-dashboard/releases")}
            >
              <ChevronRight className="h-3.5 w-3.5" />
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReleases.map((release) => (
              <div
                key={release.id}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3 cursor-pointer hover:bg-gray-900 transition-colors"
                onClick={() => navigateToRelease(release.id)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={release.cover || "/placeholder.svg"}
                    alt={release.title}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{release.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        {release.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{release.artist}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm font-medium">{release.streams.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Streams</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{release.platforms}</p>
                    <p className="text-xs text-gray-400">Platforms</p>
                  </div>
                  <Badge
                    className={
                      release.status === "Live"
                        ? "bg-green-500/20 text-green-500"
                        : release.status === "Processing"
                          ? "bg-blue-500/20 text-blue-500"
                          : "bg-orange-500/20 text-orange-500"
                    }
                  >
                    {release.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Releases & Tasks */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Upcoming Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-500">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Summer Beats EP</h4>
                    <Badge variant="outline" className="text-xs">
                      Aug 15
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-400">4 tracks • Pre-save campaign active</p>
                    <Badge className="bg-orange-500/20 text-orange-500">Scheduled</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
                  <Disc className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Acoustic Sessions (Deluxe)</h4>
                    <Badge variant="outline" className="text-xs">
                      Sep 22
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm text-gray-400">12 tracks • Artwork pending</p>
                    <Badge className="bg-yellow-500/20 text-yellow-500">Draft</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-red-500">
                  <FileMusic className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Complete metadata for "Night Drive"</h4>
                  <p className="text-sm text-gray-400">Missing ISRC and composer credits</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Task completed",
                      description: "Metadata has been updated successfully",
                    })
                  }}
                >
                  Complete
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                  <Share2 className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Connect social media accounts</h4>
                  <p className="text-sm text-gray-400">3 of 7 platforms connected</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/music-dashboard/social")}>
                  Connect
                </Button>
              </div>
              <div className="flex items-center gap-4 rounded-lg border border-gray-800 bg-gray-950 p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-500">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">Try AI-powered release optimization</h4>
                  <p className="text-sm text-gray-400">Get recommendations for your next release</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => router.push("/music-dashboard/ai-tools")}>
                  Try Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
