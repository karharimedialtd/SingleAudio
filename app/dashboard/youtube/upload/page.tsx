"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/shared/file-uploader"
import { Progress } from "@/components/ui/progress"
import {
  Youtube,
  Upload,
  Video,
  ImageIcon,
  Calendar,
  Globe,
  Eye,
  EyeOff,
  Clock,
  CheckCircle,
  AlertCircle,
  Save,
  Send,
} from "lucide-react"

interface UploadProgress {
  video: number
  thumbnail: number
  processing: number
  status: "idle" | "uploading" | "processing" | "completed" | "error"
}

export default function YouTubeUploadPage() {
  const { setCurrentPage } = useDashboard()
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    video: 0,
    thumbnail: 0,
    processing: 0,
    status: "idle",
  })
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
    language: "en",
    privacy: "public",
    monetization: true,
    commentsEnabled: true,
    ratingsEnabled: true,
    scheduledDate: "",
    playlist: "",
  })

  useEffect(() => {
    setCurrentPage("YouTube Upload")
  }, [setCurrentPage])

  const handleUpload = async () => {
    if (!videoFile) {
      alert("Please select a video file first!")
      return
    }

    if (!videoData.title.trim()) {
      alert("Please enter a video title!")
      return
    }

    setUploadProgress({ ...uploadProgress, status: "uploading" })

    // Simulate video upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress((prev) => ({ ...prev, video: i }))
    }

    // Simulate thumbnail upload
    if (thumbnailFile) {
      for (let i = 0; i <= 100; i += 20) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setUploadProgress((prev) => ({ ...prev, thumbnail: i }))
      }
    }

    // Simulate processing
    setUploadProgress((prev) => ({ ...prev, status: "processing" }))
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 300))
      setUploadProgress((prev) => ({ ...prev, processing: i }))
    }

    setUploadProgress((prev) => ({ ...prev, status: "completed" }))

    // After completion, could redirect to video manager
    setTimeout(() => {
      if (confirm("Upload completed! Would you like to view your videos?")) {
        window.location.href = "/dashboard/youtube/videos"
      }
    }, 2000)
  }

  const getStatusIcon = () => {
    switch (uploadProgress.status) {
      case "uploading":
        return <Upload className="h-5 w-5 text-blue-400 animate-pulse" />
      case "processing":
        return <Clock className="h-5 w-5 text-yellow-400 animate-spin" />
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-400" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-400" />
      default:
        return <Video className="h-5 w-5 text-gray-400" />
    }
  }

  const getStatusText = () => {
    switch (uploadProgress.status) {
      case "uploading":
        return "Uploading video..."
      case "processing":
        return "Processing video..."
      case "completed":
        return "Upload completed successfully!"
      case "error":
        return "Upload failed. Please try again."
      default:
        return "Ready to upload"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">YouTube Upload</h1>
          <p className="text-gray-400">Upload and manage your YouTube videos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-white/20 text-gray-300 hover:text-white"
            onClick={() => {
              // Save draft logic
              console.log("Saving draft...", videoData)
              alert("Draft saved successfully!")
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!videoFile || uploadProgress.status === "uploading" || uploadProgress.status === "processing"}
            className="bg-red-600 hover:bg-red-700"
          >
            <Youtube className="h-4 w-4 mr-2" />
            Upload to YouTube
          </Button>
        </div>
      </div>

      {/* Upload Progress */}
      {uploadProgress.status !== "idle" && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              {getStatusIcon()}
              <div className="flex-1">
                <h3 className="text-white font-semibold">{getStatusText()}</h3>
                <p className="text-gray-400 text-sm">
                  {uploadProgress.status === "uploading" && `Video: ${uploadProgress.video}%`}
                  {uploadProgress.status === "processing" && `Processing: ${uploadProgress.processing}%`}
                  {uploadProgress.status === "completed" && "Your video is now live on YouTube!"}
                </p>
              </div>
            </div>

            {uploadProgress.status === "uploading" && (
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Video Upload</span>
                    <span className="text-white">{uploadProgress.video}%</span>
                  </div>
                  <Progress value={uploadProgress.video} className="h-2" />
                </div>
                {thumbnailFile && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">Thumbnail Upload</span>
                      <span className="text-white">{uploadProgress.thumbnail}%</span>
                    </div>
                    <Progress value={uploadProgress.thumbnail} className="h-2" />
                  </div>
                )}
              </div>
            )}

            {uploadProgress.status === "processing" && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Processing Video</span>
                  <span className="text-white">{uploadProgress.processing}%</span>
                </div>
                <Progress value={uploadProgress.processing} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="details" className="text-gray-300 data-[state=active]:text-white">
            <Video className="h-4 w-4 mr-2" />
            Video Details
          </TabsTrigger>
          <TabsTrigger value="upload" className="text-gray-300 data-[state=active]:text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white">
            <Globe className="h-4 w-4 mr-2" />
            Visibility & Settings
          </TabsTrigger>
          <TabsTrigger value="schedule" className="text-gray-300 data-[state=active]:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Video Information</CardTitle>
              <CardDescription className="text-gray-400">
                Add details about your video to help viewers find and understand your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  Title *
                </Label>
                <Input
                  id="title"
                  value={videoData.title}
                  onChange={(e) => setVideoData({ ...videoData, title: e.target.value })}
                  placeholder="Enter video title"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  maxLength={100}
                />
                <p className="text-xs text-gray-400">{videoData.title.length}/100 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={videoData.description}
                  onChange={(e) => setVideoData({ ...videoData, description: e.target.value })}
                  placeholder="Tell viewers about your video..."
                  rows={6}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  maxLength={5000}
                />
                <p className="text-xs text-gray-400">{videoData.description.length}/5000 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-gray-300">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    value={videoData.tags}
                    onChange={(e) => setVideoData({ ...videoData, tags: e.target.value })}
                    placeholder="music, electronic, original"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                  <p className="text-xs text-gray-400">Separate tags with commas</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Category</Label>
                  <Select
                    value={videoData.category}
                    onValueChange={(value) => setVideoData({ ...videoData, category: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="gaming">Gaming</SelectItem>
                      <SelectItem value="howto">How-to & Style</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Language</Label>
                <Select
                  value={videoData.language}
                  onValueChange={(value) => setVideoData({ ...videoData, language: value })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="it">Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Video File</CardTitle>
                <CardDescription className="text-gray-400">
                  Upload your video file (MP4, MOV, AVI supported)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader
                  type="video"
                  maxFiles={1}
                  onFilesChange={(files) => setVideoFile(files[0])}
                  className="border-white/10"
                />

                {videoFile && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Video className="h-8 w-8 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{videoFile.name}</p>
                        <p className="text-gray-400 text-sm">{(videoFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">Video Requirements:</h4>
                  <ul className="text-blue-300 text-sm space-y-1">
                    <li>• Maximum file size: 256GB</li>
                    <li>• Supported formats: MP4, MOV, AVI, WMV, FLV, WebM</li>
                    <li>• Recommended resolution: 1920x1080 (1080p)</li>
                    <li>• Frame rate: 24, 25, 30, 48, 50, or 60 fps</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Thumbnail</CardTitle>
                <CardDescription className="text-gray-400">
                  Upload a custom thumbnail (1280x720 recommended)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader
                  type="image"
                  maxFiles={1}
                  onFilesChange={(files) => setThumbnailFile(files[0])}
                  className="border-white/10"
                />

                {thumbnailFile && (
                  <div className="mt-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <ImageIcon className="h-8 w-8 text-green-400" />
                      <div>
                        <p className="text-white font-medium">{thumbnailFile.name}</p>
                        <p className="text-gray-400 text-sm">{(thumbnailFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
                  <h4 className="text-green-400 font-medium mb-2">Thumbnail Guidelines:</h4>
                  <ul className="text-green-300 text-sm space-y-1">
                    <li>• Recommended size: 1280x720 pixels</li>
                    <li>• Minimum width: 640 pixels</li>
                    <li>• Supported formats: JPG, GIF, PNG</li>
                    <li>• Maximum file size: 2MB</li>
                    <li>• Aspect ratio: 16:9</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Visibility & Privacy</CardTitle>
              <CardDescription className="text-gray-400">
                Control who can see and interact with your video
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-gray-300">Privacy Setting</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "public", label: "Public", description: "Anyone can search for and view", icon: Globe },
                    { value: "unlisted", label: "Unlisted", description: "Anyone with the link can view", icon: Eye },
                    { value: "private", label: "Private", description: "Only you can view", icon: EyeOff },
                  ].map((option) => (
                    <Card
                      key={option.value}
                      className={`cursor-pointer transition-all ${
                        videoData.privacy === option.value
                          ? "bg-purple-600/20 border-purple-500/50 ring-1 ring-purple-500/30"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                      onClick={() => setVideoData({ ...videoData, privacy: option.value })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <option.icon className="h-5 w-5 text-gray-300" />
                          <div>
                            <p className="text-white font-medium">{option.label}</p>
                            <p className="text-gray-400 text-sm">{option.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-gray-300">Interaction Settings</Label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Enable Monetization</p>
                      <p className="text-gray-400 text-sm">Allow ads to be shown on this video</p>
                    </div>
                    <Switch
                      checked={videoData.monetization}
                      onCheckedChange={(checked) => setVideoData({ ...videoData, monetization: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Allow Comments</p>
                      <p className="text-gray-400 text-sm">Viewers can leave comments on your video</p>
                    </div>
                    <Switch
                      checked={videoData.commentsEnabled}
                      onCheckedChange={(checked) => setVideoData({ ...videoData, commentsEnabled: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">Allow Ratings</p>
                      <p className="text-gray-400 text-sm">Viewers can like or dislike your video</p>
                    </div>
                    <Switch
                      checked={videoData.ratingsEnabled}
                      onCheckedChange={(checked) => setVideoData({ ...videoData, ratingsEnabled: checked })}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Publishing Schedule</CardTitle>
              <CardDescription className="text-gray-400">Choose when your video will be published</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Send className="h-5 w-5 text-blue-400" />
                      <h3 className="text-white font-semibold">Publish Now</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Your video will be published immediately after upload</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <h3 className="text-white font-semibold">Schedule for Later</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Choose a specific date and time to publish</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate" className="text-gray-300">
                    Scheduled Date & Time
                  </Label>
                  <Input
                    id="scheduledDate"
                    type="datetime-local"
                    value={videoData.scheduledDate}
                    onChange={(e) => setVideoData({ ...videoData, scheduledDate: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Add to Playlist</Label>
                  <Select
                    value={videoData.playlist}
                    onValueChange={(value) => setVideoData({ ...videoData, playlist: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select playlist (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="music-videos">Music Videos</SelectItem>
                      <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                      <SelectItem value="live-performances">Live Performances</SelectItem>
                      <SelectItem value="tutorials">Tutorials</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
                <h4 className="text-yellow-400 font-medium mb-2">Scheduling Tips:</h4>
                <ul className="text-yellow-300 text-sm space-y-1">
                  <li>• Schedule uploads during peak viewing hours for your audience</li>
                  <li>• Consider time zones of your primary audience</li>
                  <li>• Consistent upload schedules help build audience expectations</li>
                  <li>• You can change the schedule before the video goes live</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
