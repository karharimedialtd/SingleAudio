"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Share2,
  Instagram,
  Twitter,
  Facebook,
  Calendar,
  ImageIcon,
  Video,
  Music,
  TrendingUp,
  Heart,
  MessageCircle,
  Send,
  Plus,
} from "lucide-react"

interface SocialPost {
  id: string
  platform: "instagram" | "twitter" | "facebook" | "tiktok"
  content: string
  status: "scheduled" | "published" | "draft"
  scheduledDate?: string
  publishedDate?: string
  engagement: {
    likes: number
    comments: number
    shares: number
  }
  mediaType: "text" | "image" | "video" | "audio"
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    platform: "instagram",
    content: "New track 'Midnight Dreams' is now live! 🎵✨ #NewMusic #Electronic",
    status: "published",
    publishedDate: "2024-01-15",
    engagement: { likes: 234, comments: 45, shares: 12 },
    mediaType: "image",
  },
  {
    id: "2",
    platform: "twitter",
    content: "Working on something special in the studio today 🎧 #StudioLife",
    status: "scheduled",
    scheduledDate: "2024-01-20",
    engagement: { likes: 0, comments: 0, shares: 0 },
    mediaType: "video",
  },
  {
    id: "3",
    platform: "facebook",
    content: "Thank you for all the love on the new EP! More music coming soon 💜",
    status: "draft",
    engagement: { likes: 0, comments: 0, shares: 0 },
    mediaType: "text",
  },
]

export default function SocialMediaPage() {
  const { setCurrentPage } = useDashboard()
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState("")
  const [newPost, setNewPost] = useState({
    content: "",
    platforms: {
      instagram: false,
      twitter: false,
      facebook: false,
      tiktok: false,
    },
    scheduleDate: "",
    scheduleTime: "",
  })
  const [platformConnections, setPlatformConnections] = useState({
    instagram: { connected: true, followers: "12.5K" },
    twitter: { connected: true, followers: "8.2K" },
    facebook: { connected: false, followers: "0" },
    tiktok: { connected: false, followers: "0" },
  })

  useEffect(() => {
    setCurrentPage("Social Media")
  }, [setCurrentPage])

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      alert("Please enter post content")
      return
    }

    const selectedPlatforms = Object.keys(newPost.platforms).filter(
      (p) => newPost.platforms[p as keyof typeof newPost.platforms],
    )

    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform")
      return
    }

    // Create posts for each selected platform
    selectedPlatforms.forEach((platform) => {
      const post: SocialPost = {
        id: Date.now().toString() + platform,
        platform: platform as any,
        content: newPost.content,
        status: newPost.scheduleDate ? "scheduled" : "published",
        scheduledDate: newPost.scheduleDate ? `${newPost.scheduleDate}T${newPost.scheduleTime}` : undefined,
        publishedDate: !newPost.scheduleDate ? new Date().toISOString() : undefined,
        engagement: { likes: 0, comments: 0, shares: 0 },
        mediaType: "text",
      }
      setPosts((prev) => [post, ...prev])
    })

    setNewPost({
      content: "",
      platforms: { instagram: false, twitter: false, facebook: false, tiktok: false },
      scheduleDate: "",
      scheduleTime: "",
    })
    setShowCreateDialog(false)
    alert(`Post ${newPost.scheduleDate ? "scheduled" : "published"} successfully!`)
  }

  const handleConnectPlatform = (platform: string) => {
    setSelectedPlatform(platform)
    setShowConnectDialog(true)
  }

  const handleConfirmConnection = () => {
    setPlatformConnections((prev) => ({
      ...prev,
      [selectedPlatform]: {
        connected: !prev[selectedPlatform as keyof typeof prev].connected,
        followers: prev[selectedPlatform as keyof typeof prev].connected ? "0" : "1.2K",
      },
    }))
    setShowConnectDialog(false)
    alert(
      `${selectedPlatform} ${
        platformConnections[selectedPlatform as keyof typeof platformConnections].connected
          ? "disconnected"
          : "connected"
      } successfully!`,
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      published: "bg-green-600/20 text-green-400 border-green-600/30",
      scheduled: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      draft: "bg-gray-600/20 text-gray-400 border-gray-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "facebook":
        return <Facebook className="h-4 w-4" />
      default:
        return <Share2 className="h-4 w-4" />
    }
  }

  const getMediaIcon = (mediaType: string) => {
    switch (mediaType) {
      case "image":
        return <ImageIcon className="h-4 w-4 text-blue-400" />
      case "video":
        return <Video className="h-4 w-4 text-purple-400" />
      case "audio":
        return <Music className="h-4 w-4 text-green-400" />
      default:
        return null
    }
  }

  const totalEngagement = posts.reduce(
    (sum, post) => sum + post.engagement.likes + post.engagement.comments + post.engagement.shares,
    0,
  )
  const publishedPosts = posts.filter((p) => p.status === "published").length
  const scheduledPosts = posts.filter((p) => p.status === "scheduled").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Social Media Manager</h1>
          <p className="text-gray-400">Create, schedule, and manage your social media content</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Posts</p>
                <p className="text-2xl font-bold text-white">{posts.length}</p>
              </div>
              <Share2 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Published</p>
                <p className="text-2xl font-bold text-white">{publishedPosts}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Scheduled</p>
                <p className="text-2xl font-bold text-white">{scheduledPosts}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Engagement</p>
                <p className="text-2xl font-bold text-white">{totalEngagement}</p>
              </div>
              <Heart className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="posts" className="text-gray-300 data-[state=active]:text-white">
            Posts
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-gray-300 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Posts</CardTitle>
              <CardDescription className="text-gray-400">Your latest social media activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getPlatformIcon(post.platform)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-white mb-2">{post.content}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="capitalize">{post.platform}</span>
                                {post.publishedDate && (
                                  <span>Published: {new Date(post.publishedDate).toLocaleDateString()}</span>
                                )}
                                {post.scheduledDate && (
                                  <span>Scheduled: {new Date(post.scheduledDate).toLocaleDateString()}</span>
                                )}
                                {getMediaIcon(post.mediaType)}
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">{getStatusBadge(post.status)}</div>
                          </div>

                          {post.status === "published" && (
                            <div className="flex items-center space-x-6 mt-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Heart className="h-4 w-4 text-red-400" />
                                <span className="text-white">{post.engagement.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="h-4 w-4 text-blue-400" />
                                <span className="text-white">{post.engagement.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Share2 className="h-4 w-4 text-green-400" />
                                <span className="text-white">{post.engagement.shares}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Platform Performance</CardTitle>
                <CardDescription className="text-gray-400">Engagement by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: "Instagram", posts: 12, engagement: 1456, growth: "+15%" },
                    { platform: "Twitter", posts: 8, engagement: 892, growth: "+8%" },
                    { platform: "Facebook", posts: 6, engagement: 634, growth: "+12%" },
                    { platform: "TikTok", posts: 4, engagement: 2341, growth: "+25%" },
                  ].map((platform, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{platform.platform}</p>
                        <p className="text-gray-400 text-sm">{platform.posts} posts</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{platform.engagement}</p>
                        <p className="text-green-400 text-sm">{platform.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Best Posting Times</CardTitle>
                <CardDescription className="text-gray-400">Optimal times for engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { platform: "Instagram", time: "6:00 PM", engagement: "High" },
                    { platform: "Twitter", time: "12:00 PM", engagement: "Medium" },
                    { platform: "Facebook", time: "3:00 PM", engagement: "High" },
                    { platform: "TikTok", time: "9:00 PM", engagement: "Very High" },
                  ].map((time, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{time.platform}</p>
                        <p className="text-gray-400 text-sm">{time.time}</p>
                      </div>
                      <Badge
                        className={
                          time.engagement === "Very High"
                            ? "bg-green-600/20 text-green-400"
                            : time.engagement === "High"
                              ? "bg-blue-600/20 text-blue-400"
                              : "bg-yellow-600/20 text-yellow-400"
                        }
                      >
                        {time.engagement}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Social Media Settings</CardTitle>
              <CardDescription className="text-gray-400">Configure your social media integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(platformConnections).map(([platform, connection]) => (
                  <div key={platform} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getPlatformIcon(platform)}
                      <div>
                        <p className="text-white font-medium capitalize">{platform}</p>
                        <p className="text-gray-400 text-sm">
                          {connection.connected ? `${connection.followers} followers` : "Not connected"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge
                        className={
                          connection.connected ? "bg-green-600/20 text-green-400" : "bg-gray-600/20 text-gray-400"
                        }
                      >
                        {connection.connected ? "Connected" : "Disconnected"}
                      </Badge>
                      <Button
                        variant={connection.connected ? "outline" : "default"}
                        size="sm"
                        className={
                          connection.connected
                            ? "border-white/20 text-gray-300 hover:text-white"
                            : "bg-purple-600 hover:bg-purple-700"
                        }
                        onClick={() => handleConnectPlatform(platform)}
                      >
                        {connection.connected ? "Disconnect" : "Connect"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Post Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Post</DialogTitle>
            <DialogDescription className="text-gray-400">
              Compose and schedule content for your social media platforms
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <label className="text-gray-300 text-sm font-medium">Post Content</label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's happening? Share your latest music updates..."
                rows={4}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 mt-2"
              />
              <p className="text-xs text-gray-400 mt-1">{newPost.content.length}/280 characters</p>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium">Select Platforms</label>
              <div className="mt-3 space-y-3">
                {[
                  { key: "instagram", label: "Instagram", icon: Instagram },
                  { key: "twitter", label: "Twitter", icon: Twitter },
                  { key: "facebook", label: "Facebook", icon: Facebook },
                  { key: "tiktok", label: "TikTok", icon: Video },
                ].map((platform) => (
                  <div key={platform.key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <platform.icon className="h-5 w-5 text-gray-400" />
                      <span className="text-white">{platform.label}</span>
                    </div>
                    <Switch
                      checked={newPost.platforms[platform.key as keyof typeof newPost.platforms]}
                      onCheckedChange={(checked) =>
                        setNewPost({
                          ...newPost,
                          platforms: { ...newPost.platforms, [platform.key]: checked },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-300 text-sm font-medium">Schedule Date (Optional)</label>
                <Input
                  type="date"
                  value={newPost.scheduleDate}
                  onChange={(e) => setNewPost({ ...newPost, scheduleDate: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>
              <div>
                <label className="text-gray-300 text-sm font-medium">Schedule Time</label>
                <Input
                  type="time"
                  value={newPost.scheduleTime}
                  onChange={(e) => setNewPost({ ...newPost, scheduleTime: e.target.value })}
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost} className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4 mr-2" />
              {newPost.scheduleDate ? "Schedule Post" : "Post Now"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Connect Platform Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">
              {platformConnections[selectedPlatform as keyof typeof platformConnections]?.connected
                ? "Disconnect"
                : "Connect"}{" "}
              {selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {platformConnections[selectedPlatform as keyof typeof platformConnections]?.connected
                ? `Are you sure you want to disconnect your ${selectedPlatform} account?`
                : `Connect your ${selectedPlatform} account to start posting and managing content.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmConnection}
              className={
                platformConnections[selectedPlatform as keyof typeof platformConnections]?.connected
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-purple-600 hover:bg-purple-700"
              }
            >
              {platformConnections[selectedPlatform as keyof typeof platformConnections]?.connected
                ? "Disconnect"
                : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
