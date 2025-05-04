"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Eye, Clock, ThumbsUp, MessageSquare } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Sample realtime data
const generateRealtimeData = () => {
  const now = new Date()
  const data = []
  for (let i = 47; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 30 * 60 * 1000) // 30 minutes intervals
    const hour = time.getHours().toString().padStart(2, "0")
    const minute = time.getMinutes().toString().padStart(2, "0")
    const timeLabel = `${hour}:${minute}`

    // Generate random data with some patterns
    const baseViews = 100 + Math.floor(Math.random() * 50)
    const timeOfDay = time.getHours()
    let multiplier = 1

    // More views during peak hours
    if (timeOfDay >= 19 && timeOfDay <= 23) multiplier = 2.5
    else if (timeOfDay >= 15 && timeOfDay <= 18) multiplier = 2
    else if (timeOfDay >= 10 && timeOfDay <= 14) multiplier = 1.5
    else if (timeOfDay >= 0 && timeOfDay <= 5) multiplier = 0.5

    const views = Math.floor(baseViews * multiplier)
    const likes = Math.floor(views * 0.08)
    const comments = Math.floor(views * 0.02)

    data.push({
      time: timeLabel,
      views,
      likes,
      comments,
      watchTime: Math.floor(views * 2.5),
    })
  }
  return data
}

const topVideosRealtime = [
  {
    id: 1,
    thumbnail: "/music-video-thumbnail.png",
    title: "Official Music Video - Summer Vibes",
    currentViews: 245,
    trend: "+12%",
  },
  {
    id: 2,
    thumbnail: "/video-thumbnail.png",
    title: "Live Concert Performance - World Tour 2023",
    currentViews: 187,
    trend: "+8%",
  },
  {
    id: 3,
    thumbnail: "/tutorial-video.png",
    title: "How to Master Guitar Solos - Tutorial",
    currentViews: 132,
    trend: "+5%",
  },
]

export default function RealtimePage() {
  const [realtimeData, setRealtimeData] = useState(generateRealtimeData())
  const [activeTab, setActiveTab] = useState("views")
  const [currentViews, setCurrentViews] = useState(564)
  const [currentLikes, setCurrentLikes] = useState(42)
  const [currentComments, setCurrentComments] = useState(15)
  const [currentWatchTime, setCurrentWatchTime] = useState(1420)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update current stats
      setCurrentViews((prev) => prev + Math.floor(Math.random() * 10))
      setCurrentLikes((prev) => prev + Math.floor(Math.random() * 2))
      setCurrentComments((prev) => prev + (Math.random() > 0.7 ? 1 : 0))
      setCurrentWatchTime((prev) => prev + Math.floor(Math.random() * 25))

      // Update chart data every minute
      const now = new Date()
      if (now.getSeconds() === 0) {
        setRealtimeData(generateRealtimeData())
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Function to handle refresh button click
  const handleRefreshClick = () => {
    setIsRefreshing(true)

    // Generate new data
    setTimeout(() => {
      setRealtimeData(generateRealtimeData())
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "Realtime data has been updated successfully.",
      })
    }, 1000)
  }

  // Function to handle video click
  const handleVideoClick = (videoId: number) => {
    toast({
      title: "Video selected",
      description: `You selected video #${videoId}. In a real app, this would open the video details.`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Realtime Analytics</h1>
          <p className="text-sm text-gray-400">Live data from the last 48 hours</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={handleRefreshClick}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
        </div>
      </div>

      {/* Current Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Current Views</p>
                <h3 className="text-3xl font-bold">{currentViews}</h3>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Current Watch Time</p>
                <h3 className="text-3xl font-bold">{currentWatchTime} min</h3>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                </div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Current Likes</p>
                <h3 className="text-3xl font-bold">{currentLikes}</h3>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                </div>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <ThumbsUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Current Comments</p>
                <h3 className="text-3xl font-bold">{currentComments}</h3>
                <div className="flex items-center mt-1">
                  <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                </div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <MessageSquare className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Realtime Chart */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Realtime Performance</CardTitle>
            <Tabs defaultValue="views" onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="views" className="data-[state=active]:bg-gray-700">
                  Views
                </TabsTrigger>
                <TabsTrigger value="likes" className="data-[state=active]:bg-gray-700">
                  Likes
                </TabsTrigger>
                <TabsTrigger value="comments" className="data-[state=active]:bg-gray-700">
                  Comments
                </TabsTrigger>
                <TabsTrigger value="watchTime" className="data-[state=active]:bg-gray-700">
                  Watch Time
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={realtimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke={
                    activeTab === "views"
                      ? "#3B82F6"
                      : activeTab === "likes"
                        ? "#8B5CF6"
                        : activeTab === "comments"
                          ? "#F59E0B"
                          : "#10B981"
                  }
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Videos Realtime */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Top Videos Right Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topVideosRealtime.map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800 hover:bg-gray-700 cursor-pointer"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium">{video.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-500/20 text-green-400">Live</Badge>
                      <span className="text-xs text-gray-400">Current viewers: {video.currentViews}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-500/20 text-green-400">{video.trend}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
