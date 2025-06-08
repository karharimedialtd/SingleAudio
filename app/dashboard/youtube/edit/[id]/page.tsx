"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Save,
  Eye,
  Tag,
  Globe,
  Lock,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Trash2,
  Copy,
  ExternalLink,
  Download,
  Share2,
  BarChart3,
  MessageSquare,
  Play,
} from "lucide-react"
import Link from "next/link"

interface VideoData {
  id: string
  title: string
  description: string
  thumbnail: string
  status: "draft" | "scheduled" | "published" | "private"
  visibility: "public" | "unlisted" | "private"
  category: string
  tags: string[]
  publishedAt?: string
  scheduledAt?: string
  duration: string
  views: number
  likes: number
  comments: number
  monetization: boolean
  ageRestriction: boolean
  commentsEnabled: boolean
  ratingsEnabled: boolean
  language: string
  captions: boolean
}

export default function YouTubeEditPage() {
  const params = useParams()
  const router = useRouter()
  const videoId = params.id as string

  const [video, setVideo] = useState<VideoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [newTag, setNewTag] = useState("")

  // Mock data - in real app, fetch from API
  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockVideo: VideoData = {
        id: videoId,
        title: "How to Master Music Production in 2024",
        description:
          "In this comprehensive tutorial, we'll cover everything you need to know about modern music production techniques, from recording to mixing and mastering.",
        thumbnail: "/placeholder.svg?height=180&width=320",
        status: "published",
        visibility: "public",
        category: "Music",
        tags: ["music production", "tutorial", "mixing", "mastering", "2024"],
        publishedAt: "2024-01-15T10:00:00Z",
        duration: "15:42",
        views: 12543,
        likes: 892,
        comments: 156,
        monetization: true,
        ageRestriction: false,
        commentsEnabled: true,
        ratingsEnabled: true,
        language: "en",
        captions: true,
      }

      setVideo(mockVideo)
      setLoading(false)
    }

    fetchVideo()
  }, [videoId])

  const handleSave = async () => {
    if (!video) return

    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSaving(false)

    alert("Video updated successfully!")
  }

  const handleDelete = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaving(false)
    setShowDeleteDialog(false)

    alert("Video deleted successfully!")
    router.push("/dashboard/youtube/videos")
  }

  const handleSchedule = async () => {
    if (!scheduleDate || !scheduleTime) {
      alert("Please select both date and time")
      return
    }

    setSaving(true)
    const scheduledDateTime = `${scheduleDate}T${scheduleTime}:00Z`

    if (video) {
      setVideo({
        ...video,
        status: "scheduled",
        scheduledAt: scheduledDateTime,
      })
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSaving(false)
    setShowScheduleDialog(false)

    alert("Video scheduled successfully!")
  }

  const handleAddTag = () => {
    if (!newTag.trim() || !video) return

    const updatedTags = [...video.tags, newTag.trim()]
    setVideo({ ...video, tags: updatedTags })
    setNewTag("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (!video) return

    const updatedTags = video.tags.filter((tag) => tag !== tagToRemove)
    setVideo({ ...video, tags: updatedTags })
  }

  const handleCopyLink = () => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`
    navigator.clipboard.writeText(videoUrl)
    alert("Video link copied to clipboard!")
  }

  const handleDownloadThumbnail = () => {
    // Simulate download
    alert("Thumbnail download started!")
  }

  const handleViewAnalytics = () => {
    router.push(`/dashboard/youtube/analytics?video=${videoId}`)
  }

  const handlePreview = () => {
    window.open(`https://youtube.com/watch?v=${videoId}`, "_blank")
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-700 rounded animate-pulse" />
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-64 bg-gray-700 rounded animate-pulse" />
            <div className="h-32 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-gray-700 rounded animate-pulse" />
            <div className="h-32 bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <XCircle className="h-16 w-16 text-red-400" />
        <h2 className="text-xl font-semibold text-white">Video Not Found</h2>
        <p className="text-gray-400">The video you're looking for doesn't exist or has been deleted.</p>
        <Button asChild>
          <Link href="/dashboard/youtube/videos">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Videos
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/youtube/videos">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Videos
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Video</h1>
            <p className="text-gray-400">Manage your YouTube video settings and metadata</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-white" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      <Alert className="border-blue-500/20 bg-blue-500/10">
        <CheckCircle className="h-4 w-4 text-blue-400" />
        <AlertDescription className="text-blue-300">
          This video is currently <strong>{video.status}</strong> and {video.visibility} to viewers.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-800">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="visibility">Visibility</TabsTrigger>
              <TabsTrigger value="monetization">Monetization</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Video Details</CardTitle>
                  <CardDescription>Update your video title, description, and thumbnail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-white">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={video.title}
                      onChange={(e) => setVideo({ ...video, title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Enter video title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={video.description}
                      onChange={(e) => setVideo({ ...video, description: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                      placeholder="Enter video description"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Category</Label>
                    <Select value={video.category} onValueChange={(value) => setVideo({ ...video, category: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Music">Music</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Tags</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {video.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-purple-600 text-white">
                          {tag}
                          <button onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-red-300">
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="bg-gray-700 border-gray-600 text-white"
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <Button onClick={handleAddTag} variant="outline">
                        <Tag className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="visibility" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Visibility Settings</CardTitle>
                  <CardDescription>Control who can see your video</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Visibility</Label>
                    <Select
                      value={video.visibility}
                      onValueChange={(value: any) => setVideo({ ...video, visibility: value })}
                    >
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="public">
                          <div className="flex items-center">
                            <Globe className="h-4 w-4 mr-2" />
                            Public
                          </div>
                        </SelectItem>
                        <SelectItem value="unlisted">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            Unlisted
                          </div>
                        </SelectItem>
                        <SelectItem value="private">
                          <div className="flex items-center">
                            <Lock className="h-4 w-4 mr-2" />
                            Private
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Comments</Label>
                        <p className="text-sm text-gray-400">Allow viewers to comment on your video</p>
                      </div>
                      <Switch
                        checked={video.commentsEnabled}
                        onCheckedChange={(checked) => setVideo({ ...video, commentsEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Ratings</Label>
                        <p className="text-sm text-gray-400">Allow viewers to like/dislike your video</p>
                      </div>
                      <Switch
                        checked={video.ratingsEnabled}
                        onCheckedChange={(checked) => setVideo({ ...video, ratingsEnabled: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Age Restriction</Label>
                        <p className="text-sm text-gray-400">Restrict video to viewers 18+</p>
                      </div>
                      <Switch
                        checked={video.ageRestriction}
                        onCheckedChange={(checked) => setVideo({ ...video, ageRestriction: checked })}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="space-y-2">
                    <Label className="text-white">Schedule Publication</Label>
                    <div className="flex space-x-2">
                      <Input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      <Button onClick={() => setShowScheduleDialog(true)} variant="outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monetization" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Monetization Settings</CardTitle>
                  <CardDescription>Configure how your video generates revenue</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Enable Monetization</Label>
                      <p className="text-sm text-gray-400">Allow ads to be shown on your video</p>
                    </div>
                    <Switch
                      checked={video.monetization}
                      onCheckedChange={(checked) => setVideo({ ...video, monetization: checked })}
                    />
                  </div>

                  {video.monetization && (
                    <Alert className="border-green-500/20 bg-green-500/10">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <AlertDescription className="text-green-300">
                        Monetization is enabled. Your video is eligible for ad revenue.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Settings</CardTitle>
                  <CardDescription>Additional video configuration options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-white">Language</Label>
                    <Select value={video.language} onValueChange={(value) => setVideo({ ...video, language: value })}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="it">Italian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white">Captions</Label>
                      <p className="text-sm text-gray-400">Enable automatic captions</p>
                    </div>
                    <Switch
                      checked={video.captions}
                      onCheckedChange={(checked) => setVideo({ ...video, captions: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Video Preview */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Video Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt="Video thumbnail"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="sm" onClick={handlePreview}>
                    <Play className="h-4 w-4 mr-2" />
                    Watch
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={handleDownloadThumbnail} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Thumbnail
                </Button>
                <Button onClick={handleCopyLink} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Video Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Video Stats */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{video.views.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{video.likes.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{video.comments.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Comments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.8</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>

              <Button onClick={handleViewAnalytics} variant="outline" className="w-full">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Share Video
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Manage Comments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                View on YouTube
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Video</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={saving}>
              {saving ? "Deleting..." : "Delete Video"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Confirmation Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Schedule Video</DialogTitle>
            <DialogDescription className="text-gray-400">
              Schedule this video to be published at {scheduleDate} {scheduleTime}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} disabled={saving}>
              {saving ? "Scheduling..." : "Schedule Video"}
            </Button>
          </DialogFooter>
        </DialogFooter>
      </Dialog>
    </div>
  )
}
