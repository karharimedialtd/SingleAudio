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

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true)
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
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSaving(false)
    alert("Video updated successfully!")
  }

  const handleDelete = async () => {
    setSaving(true)
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
    alert("Thumbnail download started!")
  }

  const handleViewAnalytics = () => {
    router.push(`/dashboard/youtube/analytics?video=${videoId}`)
  }

  const handlePreview = () => {
    window.open(`https://youtube.com/watch?v=${videoId}`, "_blank")
  }

  if (loading) {
    return <div>Loading...</div>
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
      {/* ...full JSX for layout, sidebar, dialogs, etc... */}
      {/* Your JSX content from Tabs, Card, Dialog, etc. stays the same here */}

      {/* Delete Dialog */}
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

      {/* Schedule Dialog */}
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
        </DialogContent>
      </Dialog>
    </div>
  )
}
