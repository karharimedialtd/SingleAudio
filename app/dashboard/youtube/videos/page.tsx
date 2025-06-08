"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Upload,
  Play,
  Eye,
  ThumbsUp,
  MessageSquare,
  MoreHorizontal,
  Calendar,
  DollarSign,
  TrendingUp,
  Edit,
  BarChart3,
  ExternalLink,
} from "lucide-react"

interface Video {
  id: string
  title: string
  thumbnail: string
  status: "public" | "unlisted" | "private" | "scheduled"
  views: number
  likes: number
  comments: number
  duration: string
  uploadDate: string
  revenue: number
  channel: string
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Midnight Dreams - Official Music Video",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "public",
    views: 125430,
    likes: 8234,
    comments: 456,
    duration: "3:45",
    uploadDate: "2024-01-15",
    revenue: 234.56,
    channel: "Luna Rodriguez Music",
  },
  {
    id: "2",
    title: "Electric Nights EP - Behind the Scenes",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "unlisted",
    views: 45678,
    likes: 2345,
    comments: 123,
    duration: "8:12",
    uploadDate: "2024-01-10",
    revenue: 89.34,
    channel: "Neon Pulse Official",
  },
  {
    id: "3",
    title: "Summer Vibes - Lyric Video",
    thumbnail: "/placeholder.svg?height=120&width=200",
    status: "scheduled",
    views: 0,
    likes: 0,
    comments: 0,
    duration: "4:23",
    uploadDate: "2024-02-01",
    revenue: 0,
    channel: "Beach House Collective",
  },
]

export default function YouTubeVideosPage() {
  const { setCurrentPage } = useDashboard()
  const [videos, setVideos] = useState<Video[]>(mockVideos)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    setCurrentPage("Video Manager")
  }, [setCurrentPage])

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || video.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      public: "bg-green-600/20 text-green-400 border-green-600/30",
      unlisted: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      private: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      scheduled: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handleWatchVideo = (videoId: string) => {
    window.open(`https://youtube.com/watch?v=${videoId}`, "_blank")
  }

  const handleEditVideo = (videoId: string) => {
    window.location.href = `/dashboard/youtube/edit/${videoId}`
  }

  const handleViewAnalytics = (videoId: string) => {
    window.location.href = `/dashboard/youtube/analytics?video=${videoId}`
  }

  const totalViews = videos.reduce((sum, video) => sum + video.views, 0)
  const totalRevenue = videos.reduce((sum, video) => sum + video.revenue, 0)
  const publicVideos = videos.filter((v) => v.status === "public").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Video Manager</h1>
          <p className="text-gray-400">Manage your YouTube videos and track performance</p>
        </div>
        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={() => (window.location.href = "/dashboard/youtube/upload")}
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload Video
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Videos</p>
                <p className="text-2xl font-bold text-white">{videos.length}</p>
              </div>
              <Play className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Public Videos</p>
                <p className="text-2xl font-bold text-white">{publicVideos}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="public" className="text-gray-300 data-[state=active]:text-white">
                    Public
                  </TabsTrigger>
                  <TabsTrigger value="unlisted" className="text-gray-300 data-[state=active]:text-white">
                    Unlisted
                  </TabsTrigger>
                  <TabsTrigger value="private" className="text-gray-300 data-[state=active]:text-white">
                    Private
                  </TabsTrigger>
                  <TabsTrigger value="scheduled" className="text-gray-300 data-[state=active]:text-white">
                    Scheduled
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Videos List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Your Videos</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredVideos.length} of {videos.length} videos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-32 h-20 object-cover rounded-lg bg-white/5"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{video.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{video.channel}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(video.uploadDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {video.views.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {video.likes.toLocaleString()}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              {video.comments.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getStatusBadge(video.status)}
                          <div className="text-right">
                            <p className="text-white font-semibold">${video.revenue.toFixed(2)}</p>
                            <p className="text-gray-400 text-sm">Revenue</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleWatchVideo(video.id)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Watch
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleEditVideo(video.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => handleViewAnalytics(video.id)}
                          >
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Analytics
                          </Button>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                            <DropdownMenuItem
                              className="text-gray-300 hover:text-white hover:bg-gray-800"
                              onClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on YouTube
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-gray-300 hover:text-white hover:bg-gray-800"
                              onClick={() => {
                                const videoUrl = `https://youtube.com/watch?v=${video.id}`
                                navigator.clipboard.writeText(videoUrl)
                                alert("Video link copied to clipboard!")
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Copy Link
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No videos found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
