"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts"
import {
  ArrowUpRight,
  Users,
  Clock,
  DollarSign,
  Eye,
  ThumbsUp,
  MessageSquare,
  Share2,
  Info,
  AlertCircle,
  Bell,
  RefreshCw,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for the dashboard
const viewsData = [
  { name: "Jan 1", views: 4200 },
  { name: "Jan 2", views: 4500 },
  { name: "Jan 3", views: 5100 },
  { name: "Jan 4", views: 5400 },
  { name: "Jan 5", views: 5900 },
  { name: "Jan 6", views: 6300 },
  { name: "Jan 7", views: 6800 },
  { name: "Jan 8", views: 7200 },
  { name: "Jan 9", views: 7800 },
  { name: "Jan 10", views: 8100 },
  { name: "Jan 11", views: 8500 },
  { name: "Jan 12", views: 8900 },
  { name: "Jan 13", views: 9200 },
  { name: "Jan 14", views: 9600 },
]

const subscribersData = [
  { name: "Jan 1", subscribers: 1200 },
  { name: "Jan 2", subscribers: 1250 },
  { name: "Jan 3", subscribers: 1280 },
  { name: "Jan 4", subscribers: 1310 },
  { name: "Jan 5", subscribers: 1350 },
  { name: "Jan 6", subscribers: 1390 },
  { name: "Jan 7", subscribers: 1420 },
  { name: "Jan 8", subscribers: 1460 },
  { name: "Jan 9", subscribers: 1500 },
  { name: "Jan 10", subscribers: 1540 },
  { name: "Jan 11", subscribers: 1580 },
  { name: "Jan 12", subscribers: 1620 },
  { name: "Jan 13", subscribers: 1660 },
  { name: "Jan 14", subscribers: 1700 },
]

const realtimeViewsData = [
  { time: "12 AM", views: 120 },
  { time: "2 AM", views: 80 },
  { time: "4 AM", views: 60 },
  { time: "6 AM", views: 100 },
  { time: "8 AM", views: 250 },
  { time: "10 AM", views: 320 },
  { time: "12 PM", views: 450 },
  { time: "2 PM", views: 380 },
  { time: "4 PM", views: 410 },
  { time: "6 PM", views: 490 },
  { time: "8 PM", views: 520 },
  { time: "10 PM", views: 480 },
  { time: "Now", views: 510 },
]

const deviceData = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 25 },
  { name: "TV", value: 7 },
  { name: "Tablet", value: 3 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]

const topVideos = [
  {
    id: 1,
    thumbnail: "/music-video-thumbnail.png",
    title: "Official Music Video - Summer Vibes",
    views: "1.2M",
    likes: "45K",
    comments: "3.2K",
    ctr: "8.4%",
    retention: "64%",
    avgDuration: "4:12",
  },
  {
    id: 2,
    thumbnail: "/video-thumbnail.png",
    title: "Live Concert Performance - World Tour 2023",
    views: "876K",
    likes: "32K",
    comments: "1.8K",
    ctr: "7.2%",
    retention: "58%",
    avgDuration: "8:45",
  },
  {
    id: 3,
    thumbnail: "/tutorial-video.png",
    title: "How to Master Guitar Solos - Tutorial",
    views: "450K",
    likes: "28K",
    comments: "1.5K",
    ctr: "9.1%",
    retention: "72%",
    avgDuration: "12:30",
  },
]

export default function Dashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30days")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleString())
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false)
  const [isInsightDialogOpen, setIsInsightDialogOpen] = useState(false)
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState<any>(null)

  const handleRefresh = async () => {
    setIsRefreshing(true)

    // Simulate refresh delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLastUpdated(new Date().toLocaleString())
    setIsRefreshing(false)

    toast({
      title: "Data refreshed",
      description: "Your analytics data has been updated",
    })
  }

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range)

    toast({
      title: "Time range updated",
      description: `Showing data for the last ${range.replace("days", " days")}`,
    })
  }

  const handleNavigate = (path: string) => {
    router.push(path)
  }

  const handleVideoDetails = (video: any) => {
    setSelectedVideo(video)
    router.push(`/dashboard/videos/analytics/${video.id}`)
  }

  const handleReviewClaim = () => {
    setIsClaimDialogOpen(false)
    router.push("/dashboard/content-id")
  }

  const handleViewInsightDetails = () => {
    setIsInsightDialogOpen(false)
    router.push("/dashboard/audience")
  }

  const handleShareAchievement = () => {
    setIsMilestoneDialogOpen(false)
    // Open share dialog
    toast({
      title: "Share Achievement",
      description: "Sharing options opened",
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Channel Overview</h1>
          <p className="text-sm text-gray-400">Last updated: {lastUpdated}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </>
            )}
          </Button>
          <Tabs defaultValue="30days" onValueChange={handleTimeRangeChange} className="w-auto">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="7days" className="data-[state=active]:bg-gray-700">
                7 Days
              </TabsTrigger>
              <TabsTrigger value="30days" className="data-[state=active]:bg-gray-700">
                30 Days
              </TabsTrigger>
              <TabsTrigger value="90days" className="data-[state=active]:bg-gray-700">
                90 Days
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <h3 className="text-3xl font-bold">48.2M</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+8% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/audience")}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Subscribers</p>
                <h3 className="text-3xl font-bold">2.4M</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+12% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Watch Time</p>
                <h3 className="text-3xl font-bold">3.8M hrs</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+5% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/monetization")}
        >
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Estimated Revenue</p>
                <h3 className="text-3xl font-bold">$32,150</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+15% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/videos")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Videos</p>
            <h3 className="text-xl font-bold">248</h3>
          </CardContent>
        </Card>
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/playlists")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Playlists</p>
            <h3 className="text-xl font-bold">32</h3>
          </CardContent>
        </Card>
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Avg. View Duration</p>
            <h3 className="text-xl font-bold">4:32</h3>
          </CardContent>
        </Card>
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Likes</p>
            <h3 className="text-xl font-bold">1.2M</h3>
          </CardContent>
        </Card>
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Comments</p>
            <h3 className="text-xl font-bold">87.4K</h3>
          </CardContent>
        </Card>
        <Card
          className="bg-gray-900 border-gray-800 cursor-pointer"
          onClick={() => handleNavigate("/dashboard/analytics")}
        >
          <CardContent className="pt-4 pb-3 text-center">
            <p className="text-xs text-gray-400">Shares</p>
            <h3 className="text-xl font-bold">124K</h3>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Views Trend */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Views Trend</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => handleNavigate("/dashboard/analytics")}
              >
                View Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={viewsData}>
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    tickFormatter={(value, index) => {
                      // Only show every nth tick based on data length
                      return index % Math.ceil(viewsData.length / 7) === 0 ? value : ""
                    }}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Realtime Views */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Realtime Views (48h)</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => handleNavigate("/dashboard/realtime")}
                >
                  View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={realtimeViewsData}>
                  <XAxis
                    dataKey="time"
                    stroke="#9CA3AF"
                    tickFormatter={(value, index) => {
                      // Only show every nth tick based on data length
                      return index % Math.ceil(realtimeViewsData.length / 6) === 0 ? value : ""
                    }}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Bar dataKey="views" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscribers Trend */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Subscribers Growth</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => handleNavigate("/dashboard/audience")}
              >
                Details
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subscribersData}>
                  <XAxis
                    dataKey="name"
                    stroke="#9CA3AF"
                    tickFormatter={(value, index) => {
                      // Only show every nth tick based on data length
                      return index % Math.ceil(subscribersData.length / 7) === 0 ? value : ""
                    }}
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="subscribers" stroke="#10B981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Device Breakdown</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => handleNavigate("/dashboard/audience")}
              >
                More
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">30-Day Performance</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={() => handleNavigate("/dashboard/comparison")}
              >
                Compare
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Views</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">4.8M</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+12%</Badge>
                  </div>
                </div>
                <Progress value={72} className="h-1 bg-gray-700" indicatorClassName="bg-blue-500" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Watch Time</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">320K hrs</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+8%</Badge>
                  </div>
                </div>
                <Progress value={65} className="h-1 bg-gray-700" indicatorClassName="bg-green-500" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Subscribers</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">+45.2K</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+15%</Badge>
                  </div>
                </div>
                <Progress value={80} className="h-1 bg-gray-700" indicatorClassName="bg-purple-500" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Engagement</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">8.4%</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+3%</Badge>
                  </div>
                </div>
                <Progress value={58} className="h-1 bg-gray-700" indicatorClassName="bg-yellow-500" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Revenue</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">$8,450</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+18%</Badge>
                  </div>
                </div>
                <Progress value={75} className="h-1 bg-gray-700" indicatorClassName="bg-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Videos */}
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Top Performing Videos</CardTitle>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => handleNavigate("/dashboard/videos")}
            >
              View All Videos
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topVideos.map((video) => (
              <div
                key={video.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleVideoDetails(video)}
              >
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-24 h-14 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{video.title}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{video.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{video.likes} likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{video.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">CTR: {video.ctr}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex flex-col items-end">
                    <Badge className="bg-purple-600 text-white mb-1">Retention: {video.retention}</Badge>
                    <span className="text-xs text-gray-400">Avg. Duration: {video.avgDuration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Notifications */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Alerts & Notifications</CardTitle>
            <Badge className="bg-red-500/20 text-red-400">3 New</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-400">Content ID Claim</h4>
                <p className="text-sm text-gray-300">
                  Your video "Summer Concert Highlights" has received a Content ID claim for music usage.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => setIsClaimDialogOpen(true)}
                  >
                    Review Claim
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => {
                      toast({
                        title: "Notification dismissed",
                        description: "Content ID claim notification dismissed",
                      })
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Info className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-400">Analytics Insight</h4>
                <p className="text-sm text-gray-300">
                  Your channel has seen a 25% increase in views from external websites. Consider optimizing your social
                  media strategy.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => setIsInsightDialogOpen(true)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => {
                      toast({
                        title: "Notification dismissed",
                        description: "Analytics insight notification dismissed",
                      })
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <Bell className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-400">Milestone Reached</h4>
                <p className="text-sm text-gray-300">
                  Congratulations! Your channel has reached 2 million subscribers. Consider creating a thank you video.
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => setIsMilestoneDialogOpen(true)}
                  >
                    Share Achievement
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => {
                      toast({
                        title: "Notification dismissed",
                        description: "Milestone notification dismissed",
                      })
                    }}
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Content ID Claim Details</DialogTitle>
            <DialogDescription>Review the details of the content ID claim on your video.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <img src="/music-video-thumbnail.png" alt="Video Thumbnail" className="w-24 h-14 object-cover rounded" />
              <div>
                <h4 className="font-medium">Summer Concert Highlights</h4>
                <p className="text-sm text-gray-400">Uploaded on June 15, 2023</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Claim Information:</h4>
              <p className="text-sm text-gray-300">
                <strong>Claimed by:</strong> Universal Music Group
              </p>
              <p className="text-sm text-gray-300">
                <strong>Content Type:</strong> Musical Composition
              </p>
              <p className="text-sm text-gray-300">
                <strong>Claim Type:</strong> Copyright
              </p>
              <p className="text-sm text-gray-300">
                <strong>Policy:</strong> Monetize
              </p>
              <p className="text-sm text-gray-300">
                <strong>Affected Territory:</strong> Worldwide
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsClaimDialogOpen(false)}
            >
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleReviewClaim}>
              Go to Content ID Manager
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isInsightDialogOpen} onOpenChange={setIsInsightDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Analytics Insight</DialogTitle>
            <DialogDescription>Detailed information about your channel's traffic sources.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <h4 className="text-sm font-medium">Traffic Source Breakdown:</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">External Websites</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">25%</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+25%</Badge>
                  </div>
                </div>
                <Progress value={25} className="h-1 bg-gray-700" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">YouTube Search</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">35%</p>
                    <Badge className="ml-2 bg-green-500/20 text-green-400 text-xs">+5%</Badge>
                  </div>
                </div>
                <Progress value={35} className="h-1 bg-gray-700" indicatorClassName="bg-purple-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Suggested Videos</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">30%</p>
                    <Badge className="ml-2 bg-red-500/20 text-red-400 text-xs">-8%</Badge>
                  </div>
                </div>
                <Progress value={30} className="h-1 bg-gray-700" indicatorClassName="bg-green-500" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm">Other</p>
                  <div className="flex items-center">
                    <p className="text-sm font-medium">10%</p>
                    <Badge className="ml-2 bg-gray-500/20 text-gray-400 text-xs">+0%</Badge>
                  </div>
                </div>
                <Progress value={10} className="h-1 bg-gray-700" indicatorClassName="bg-yellow-500" />
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Recommendation:</h4>
              <p className="text-sm text-gray-300">
                Consider optimizing your social media strategy to capitalize on the growing external traffic. Share your
                content more frequently on platforms like Twitter, Instagram, and Facebook to further increase external
                referrals.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsInsightDialogOpen(false)}
            >
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleViewInsightDetails}>
              View Full Analytics
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isMilestoneDialogOpen} onOpenChange={setIsMilestoneDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Milestone Achievement</DialogTitle>
            <DialogDescription>Congratulations on reaching 2 million subscribers!</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-center">
              <div className="bg-purple-500/20 p-6 rounded-full">
                <Users className="h-16 w-16 text-purple-400" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">2,000,000 Subscribers</h3>
              <p className="text-gray-300">
                You've reached an incredible milestone! Share this achievement with your audience and thank them for
                their support.
              </p>
            </div>
            <div className="space-y-2 mt-4">
              <h4 className="text-sm font-medium">Suggested Actions:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full mt-0.5">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  Create a thank you video for your subscribers
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full mt-0.5">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  Share this milestone on your social media platforms
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-green-500/20 p-1 rounded-full mt-0.5">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  Consider hosting a live stream to celebrate with your community
                </li>
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsMilestoneDialogOpen(false)}
            >
              Close
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleShareAchievement}>
              Share Achievement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
