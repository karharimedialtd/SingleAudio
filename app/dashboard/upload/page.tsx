"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  UploadIcon,
  FileVideo,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Globe,
  Lock,
  DollarSign,
  Info,
  Wand2,
  Sparkles,
  FileText,
  Pencil,
  RefreshCw,
  Link,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ActionButton } from "@/components/action-button"
import { uploadVideo, generateContent } from "@/lib/button-actions"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function UploadPage() {
  const router = useRouter()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [keywords, setKeywords] = useState<string[]>([])
  const [keywordInput, setKeywordInput] = useState("")
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false)
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false)
  const [aiGenerationType, setAiGenerationType] = useState<"title" | "description" | "keywords" | "thumbnail">("title")
  const [visibility, setVisibility] = useState("public")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [category, setCategory] = useState("music")
  const [language, setLanguage] = useState("english")
  const [ageRestriction, setAgeRestriction] = useState("noRestriction")
  const [licenseType, setLicenseType] = useState("standard")
  const [allowComments, setAllowComments] = useState(true)
  const [allowRatings, setAllowRatings] = useState(true)
  const [showStatistics, setShowStatistics] = useState(true)
  const [monetize, setMonetize] = useState(true)
  const [contentType, setContentType] = useState("original")
  const [paidPromotion, setPaidPromotion] = useState(false)
  const [recordingDate, setRecordingDate] = useState("")
  const [recordingLocation, setRecordingLocation] = useState("")
  const [videoTags, setVideoTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [isEditingMetadata, setIsEditingMetadata] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState("/placeholder.svg?key=uqukr")
  const [customThumbnailFile, setCustomThumbnailFile] = useState<File | null>(null)
  const [isUploadingThumbnail, setIsUploadingThumbnail] = useState(false)
  const [thumbnailUploadProgress, setThumbnailUploadProgress] = useState(0)
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false)
  const [endScreen, setEndScreen] = useState(true)
  const [cards, setCards] = useState(true)
  const [captions, setCaptions] = useState(false)
  const [captionFile, setCaptionFile] = useState<File | null>(null)
  const [captionLanguage, setCaptionLanguage] = useState("english")
  const [isUploadingCaption, setIsUploadingCaption] = useState(false)
  const [captionUploadProgress, setCaptionUploadProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const captionInputRef = useRef<HTMLInputElement>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setIsUploading(true)
      setUploadProgress(0)

      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              return 100
            }
            return prev + 5
          })
        }, 300)

        // Use the uploadVideo function from button-actions.ts
        await uploadVideo(file)

        clearInterval(interval)
        setUploadProgress(100)
        setIsUploading(false)
        setUploadComplete(true)

        toast({
          title: "Upload complete",
          description: `${file.name} has been uploaded successfully.`,
        })
      } catch (error) {
        console.error("Upload error:", error)
        setIsUploading(false)
        toast({
          title: "Upload failed",
          description: "There was an error uploading your video.",
          variant: "destructive",
        })
      }
    }
  }

  const handleCancelUpload = () => {
    setIsUploading(false)
    setUploadProgress(0)
    setSelectedFile(null)
    toast({
      title: "Upload cancelled",
      description: "Your upload has been cancelled.",
    })
  }

  const handleUploadAnother = () => {
    setUploadComplete(false)
    setUploadProgress(0)
    setSelectedFile(null)
  }

  const handleGenerateContent = (type: "title" | "description" | "keywords" | "thumbnail") => {
    setAiGenerationType(type)
    setIsAiDialogOpen(true)
  }

  const executeAiGeneration = async () => {
    setIsAiDialogOpen(false)

    try {
      switch (aiGenerationType) {
        case "title":
          toast({
            title: "Generating title",
            description: "Please wait while we generate a title for your video...",
          })
          const titleResult = await generateContent("title", { topic: "music video" })
          if (titleResult && titleResult.content) {
            setVideoTitle(titleResult.content)
            toast({
              title: "Title generated",
              description: "A new title has been generated for your video.",
            })
          }
          break

        case "description":
          toast({
            title: "Generating description",
            description: "Please wait while we generate a description for your video...",
          })
          const descResult = await generateContent("description", { topic: "music video" })
          if (descResult && descResult.content) {
            setVideoDescription(descResult.content)
            toast({
              title: "Description generated",
              description: "A new description has been generated for your video.",
            })
          }
          break

        case "keywords":
          setIsGeneratingKeywords(true)
          toast({
            title: "Generating keywords",
            description: "Please wait while we generate keywords for your video...",
          })
          const keywordResult = await generateContent("keywords", {
            title: videoTitle,
            description: videoDescription,
          })
          if (keywordResult && keywordResult.content) {
            // Assuming the content is a comma-separated list of keywords
            const newKeywords = keywordResult.content.split(",").map((k) => k.trim())
            setKeywords(newKeywords)
            toast({
              title: "Keywords generated",
              description: `${newKeywords.length} keywords have been generated for your video.`,
            })
          }
          setIsGeneratingKeywords(false)
          break

        case "thumbnail":
          toast({
            title: "Generating thumbnail",
            description: "Please wait while we generate a thumbnail for your video...",
          })
          // Simulate thumbnail generation
          setTimeout(() => {
            setThumbnailUrl("/placeholder.svg?key=thumbnail-ai")
            toast({
              title: "Thumbnail generated",
              description: "A new thumbnail has been generated for your video.",
            })
          }, 2000)
          break
      }
    } catch (error) {
      console.error(`Error generating ${aiGenerationType}:`, error)
      toast({
        title: `${aiGenerationType} generation failed`,
        description: `There was an error generating the ${aiGenerationType}.`,
        variant: "destructive",
      })
    }
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput("")
    }
  }

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !videoTags.includes(tagInput.trim())) {
      setVideoTags([...videoTags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setVideoTags(videoTags.filter((t) => t !== tag))
  }

  const handleThumbnailUpload = () => {
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.click()
    }
  }

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCustomThumbnailFile(file)
      setIsUploadingThumbnail(true)
      setThumbnailUploadProgress(0)

      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setThumbnailUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              return 100
            }
            return prev + 10
          })
        }, 200)

        // Simulate thumbnail upload
        await new Promise((resolve) => setTimeout(resolve, 2000))

        clearInterval(interval)
        setThumbnailUploadProgress(100)
        setIsUploadingThumbnail(false)

        // Create a temporary URL for the thumbnail
        const thumbnailURL = URL.createObjectURL(file)
        setThumbnailUrl(thumbnailURL)

        toast({
          title: "Thumbnail uploaded",
          description: "Your custom thumbnail has been uploaded successfully.",
        })
      } catch (error) {
        console.error("Thumbnail upload error:", error)
        setIsUploadingThumbnail(false)
        toast({
          title: "Thumbnail upload failed",
          description: "There was an error uploading your thumbnail.",
          variant: "destructive",
        })
      }
    }
  }

  const handleCaptionUpload = () => {
    if (captionInputRef.current) {
      captionInputRef.current.click()
    }
  }

  const handleCaptionChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCaptionFile(file)
      setIsUploadingCaption(true)
      setCaptionUploadProgress(0)

      try {
        // Simulate upload progress
        const interval = setInterval(() => {
          setCaptionUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              return 100
            }
            return prev + 10
          })
        }, 200)

        // Simulate caption upload
        await new Promise((resolve) => setTimeout(resolve, 1500))

        clearInterval(interval)
        setCaptionUploadProgress(100)
        setIsUploadingCaption(false)
        setCaptions(true)

        toast({
          title: "Caption file uploaded",
          description: `${file.name} has been uploaded successfully.`,
        })
      } catch (error) {
        console.error("Caption upload error:", error)
        setIsUploadingCaption(false)
        toast({
          title: "Caption upload failed",
          description: "There was an error uploading your caption file.",
          variant: "destructive",
        })
      }
    }
  }

  const handlePublish = () => {
    toast({
      title: "Publishing video",
      description: "Your video is being published...",
    })

    // Simulate publishing
    setTimeout(() => {
      toast({
        title: "Video published",
        description: "Your video has been published successfully.",
      })
      router.push("/dashboard/videos")
    }, 1500)
  }

  const handleSaveAsDraft = () => {
    toast({
      title: "Saving as draft",
      description: "Your video is being saved as a draft...",
    })

    // Simulate saving
    setTimeout(() => {
      toast({
        title: "Draft saved",
        description: "Your video has been saved as a draft.",
      })
      router.push("/dashboard/videos")
    }, 1000)
  }

  const handleSchedulePublish = () => {
    if (!scheduleDate || !scheduleTime) {
      toast({
        title: "Schedule incomplete",
        description: "Please select both a date and time for scheduling.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Scheduling video",
      description: "Your video is being scheduled for publication...",
    })

    // Simulate scheduling
    setTimeout(() => {
      toast({
        title: "Video scheduled",
        description: `Your video has been scheduled for ${scheduleDate} at ${scheduleTime}.`,
      })
      router.push("/dashboard/scheduler")
    }, 1000)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Upload New Video</h1>
          <p className="text-sm text-gray-400">Upload and configure your video content</p>
        </div>
        <div className="flex gap-2">
          {activeTab !== "upload" && (
            <>
              <Button
                variant="outline"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                onClick={handleSaveAsDraft}
              >
                Save as Draft
              </Button>
              {isScheduled ? (
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSchedulePublish}>
                  Schedule
                </Button>
              ) : (
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handlePublish}>
                  Publish
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-800 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "upload" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => handleTabChange("upload")}
        >
          Upload
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "details" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => handleTabChange("details")}
        >
          Details
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "visibility" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => handleTabChange("visibility")}
        >
          Visibility
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "monetization" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => handleTabChange("monetization")}
        >
          Monetization
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "advanced" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => handleTabChange("advanced")}
        >
          Advanced
        </button>
      </div>

      {activeTab === "upload" && (
        <div>
          {/* Upload tab content */}
          <div className="mb-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>Select a video file to upload to your channel</CardDescription>
              </CardHeader>
              <CardContent>
                {!isUploading && !uploadComplete ? (
                  <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                    <FileVideo className="h-16 w-16 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Drag and drop your video file</h3>
                    <p className="text-gray-400 mb-4">Or click to browse your files (MP4, MOV, AVI, up to 10GB)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="video/*"
                      onChange={handleFileChange}
                    />
                    <ActionButton
                      className="bg-purple-600 hover:bg-purple-700"
                      action={handleFileUpload}
                      icon={<UploadIcon className="h-4 w-4" />}
                      actionName="Select File"
                    >
                      Select File
                    </ActionButton>
                  </div>
                ) : isUploading ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <FileVideo className="h-12 w-12 text-purple-500" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{selectedFile?.name || "my-music-video.mp4"}</span>
                          <span className="text-sm text-gray-400">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-400">
                            {selectedFile?.size ? (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB" : "1.2 GB"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {Math.floor(1.2 * (uploadProgress / 100) * 10) / 10} GB / 1.2 GB
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <ActionButton
                        variant="outline"
                        className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                        action={handleCancelUpload}
                        actionName="Cancel Upload"
                      >
                        Cancel Upload
                      </ActionButton>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gray-800 rounded-lg overflow-hidden w-40 h-24 flex-shrink-0">
                        <img
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt="Video Thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                          <h3 className="font-medium">Upload Complete!</h3>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                          {selectedFile?.name || "my-music-video.mp4"} (
                          {selectedFile?.size ? (selectedFile.size / (1024 * 1024)).toFixed(1) + " MB" : "1.2 GB"}) has
                          been successfully uploaded.
                        </p>
                        <div className="flex gap-2">
                          <ActionButton
                            variant="outline"
                            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                            action={handleUploadAnother}
                            actionName="Upload Another"
                          >
                            Upload Another
                          </ActionButton>
                          <ActionButton
                            className="bg-purple-600 hover:bg-purple-700"
                            action={() => setActiveTab("details")}
                            actionName="Continue to Details"
                          >
                            Continue to Details
                          </ActionButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="w-full space-y-2">
                  <h3 className="text-sm font-medium mb-2">Upload Tips</h3>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-xs">
                        For best results, use high-resolution videos (1080p or higher) with good lighting and audio
                        quality.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-xs">Videos longer than 15 minutes require account verification.</p>
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "details" && (
        <div className="space-y-6">
          {/* Basic Details */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>Add title, description, and other basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="title">Title (required)</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => handleGenerateContent("title")}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-1" />
                    Generate
                  </Button>
                </div>
                <Input
                  id="title"
                  placeholder="Add a title that describes your video"
                  className="bg-gray-800 border-gray-700"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">Your title can be up to 100 characters long</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={() => handleGenerateContent("description")}
                  >
                    <Wand2 className="h-3.5 w-3.5 mr-1" />
                    Generate
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Tell viewers about your video"
                  className="bg-gray-800 border-gray-700 min-h-[150px]"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                />
                <p className="text-xs text-gray-400 mt-1">
                  Add links, timestamps, and information about your video to help viewers find it
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={() => handleGenerateContent("thumbnail")}
                    >
                      <Sparkles className="h-3.5 w-3.5 mr-1" />
                      Generate AI Thumbnail
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={handleThumbnailUpload}
                    >
                      <UploadIcon className="h-3.5 w-3.5 mr-1" />
                      Upload
                    </Button>
                    <input
                      type="file"
                      ref={thumbnailInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative bg-gray-800 rounded-lg overflow-hidden w-48 h-28">
                    <img
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    {isUploadingThumbnail && (
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                        <Progress value={thumbnailUploadProgress} className="h-2 w-3/4 mb-2" />
                        <p className="text-xs text-white">{thumbnailUploadProgress}%</p>
                      </div>
                    )}
                    {!isUploadingThumbnail && (
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 bg-black/50 border-gray-600 hover:bg-black/70"
                          onClick={() => setIsEditingThumbnail(!isEditingThumbnail)}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-300 mb-2">
                      Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws
                      viewers' attention.
                    </p>
                    <ul className="text-xs text-gray-400 space-y-1 list-disc pl-4">
                      <li>Use a resolution of 1280x720 (16:9 ratio)</li>
                      <li>File size under 2MB</li>
                      <li>Use JPG, PNG, or GIF formats</li>
                      <li>Stay under the 2MB limit</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Playlist</Label>
                </div>
                <Select defaultValue="none">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Add to playlist" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="music">Music Videos</SelectItem>
                    <SelectItem value="live">Live Performances</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                    <SelectItem value="behind">Behind the Scenes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Keywords and Tags */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Keywords & Tags</CardTitle>
                  <CardDescription>Add keywords to improve discoverability</CardDescription>
                </div>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => handleGenerateContent("keywords")}
                  disabled={isGeneratingKeywords}
                >
                  {isGeneratingKeywords ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Keywords
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="keywords" className="mb-2 block">
                  Keywords (Metadata)
                </Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywords.map((keyword, index) => (
                    <Badge key={index} className="bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 px-2 py-1">
                      {keyword}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleRemoveKeyword(keyword)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="keywords"
                    placeholder="Add keywords (press Enter to add)"
                    className="bg-gray-800 border-gray-700"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddKeyword()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={handleAddKeyword}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Keywords help viewers find your video through search (not visible to viewers)
                </p>
              </div>

              <div>
                <Label htmlFor="tags" className="mb-2 block">
                  Tags (Visible)
                </Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {videoTags.map((tag, index) => (
                    <Badge key={index} className="bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 px-2 py-1">
                      #{tag}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="tags"
                    placeholder="Add tags (press Enter to add)"
                    className="bg-gray-800 border-gray-700"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={handleAddTag}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Tags appear below your video and help viewers find related content
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Category and Language */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Category & Language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category" className="mb-2 block">
                  Category
                </Label>
                <Select defaultValue={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="howto">How-to & Style</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="vlog">Vlog</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="comedy">Comedy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language" className="mb-2 block">
                  Video Language
                </Label>
                <Select defaultValue={language} onValueChange={setLanguage}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                    <SelectItem value="korean">Korean</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                    <SelectItem value="arabic">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="recording-date" className="mb-2 block">
                  Recording Date (Optional)
                </Label>
                <Input
                  id="recording-date"
                  type="date"
                  className="bg-gray-800 border-gray-700"
                  value={recordingDate}
                  onChange={(e) => setRecordingDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="recording-location" className="mb-2 block">
                  Recording Location (Optional)
                </Label>
                <Input
                  id="recording-location"
                  placeholder="e.g., Los Angeles, CA"
                  className="bg-gray-800 border-gray-700"
                  value={recordingLocation}
                  onChange={(e) => setRecordingLocation(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "visibility" && (
        <div className="space-y-6">
          {/* Visibility Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
              <CardDescription>Control who can see your video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Privacy</Label>
                <RadioGroup defaultValue={visibility} onValueChange={setVisibility}>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="public" id="public" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="public" className="font-medium flex items-center">
                        <Globe className="h-4 w-4 mr-2" />
                        Public
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">Everyone can watch your video</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="unlisted" id="unlisted" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="unlisted" className="font-medium flex items-center">
                        <Link className="h-4 w-4 mr-2" />
                        Unlisted
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">Anyone with the link can watch your video</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="private" id="private" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="private" className="font-medium flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        Private
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">Only you and people you choose can watch your video</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="schedule">Schedule</Label>
                  <div className="flex items-center">
                    <Checkbox
                      id="schedule-toggle"
                      checked={isScheduled}
                      onCheckedChange={(checked) => setIsScheduled(checked === true)}
                    />
                    <Label htmlFor="schedule-toggle" className="ml-2 text-sm">
                      Schedule for later
                    </Label>
                  </div>
                </div>

                {isScheduled && (
                  <div className="p-4 rounded-lg bg-gray-800 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="schedule-date" className="mb-2 block text-sm">
                          Date
                        </Label>
                        <Input
                          id="schedule-date"
                          type="date"
                          className="bg-gray-700 border-gray-600"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="schedule-time" className="mb-2 block text-sm">
                          Time
                        </Label>
                        <Input
                          id="schedule-time"
                          type="time"
                          className="bg-gray-700 border-gray-600"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex items-start gap-2 bg-gray-700/50 p-2 rounded">
                      <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                      <p className="text-xs text-gray-300">
                        Your video will be automatically published on the selected date and time in your local timezone.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Audience</Label>
                <RadioGroup defaultValue={ageRestriction} onValueChange={setAgeRestriction}>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="noRestriction" id="no-restriction" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="no-restriction" className="font-medium">
                        This video is not made for kids
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        This setting means your video is appropriate for viewers 13 and older
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="madeForKids" id="made-for-kids" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="made-for-kids" className="font-medium">
                        This video is made for kids
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        This setting means your video will be shown to viewers of all ages
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="ageRestricted" id="age-restricted" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="age-restricted" className="font-medium">
                        Age-restrict this video (18+ only)
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        This setting means your video will only be shown to viewers 18 and older
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Comments & Interactions */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Comments & Interactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-comments" className="font-medium">
                        Allow comments
                      </Label>
                      <p className="text-sm text-gray-400">Let viewers comment on your video</p>
                    </div>
                    <Checkbox
                      id="allow-comments"
                      checked={allowComments}
                      onCheckedChange={(checked) => setAllowComments(checked === true)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-ratings" className="font-medium">
                        Show likes and dislikes
                      </Label>
                      <p className="text-sm text-gray-400">Let viewers rate your video</p>
                    </div>
                    <Checkbox
                      id="allow-ratings"
                      checked={allowRatings}
                      onCheckedChange={(checked) => setAllowRatings(checked === true)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-statistics" className="font-medium">
                        Show view count
                      </Label>
                      <p className="text-sm text-gray-400">Display how many times your video has been viewed</p>
                    </div>
                    <Checkbox
                      id="show-statistics"
                      checked={showStatistics}
                      onCheckedChange={(checked) => setShowStatistics(checked === true)}
                    />
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "monetization" && (
        <div className="space-y-6">
          {/* Monetization Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Monetization</CardTitle>
              <CardDescription>Configure how you earn from this video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monetize-video" className="font-medium flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-green-400" />
                    Monetize this video
                  </Label>
                  <p className="text-sm text-gray-400">Enable ads and other revenue streams for this video</p>
                </div>
                <Checkbox
                  id="monetize-video"
                  checked={monetize}
                  onCheckedChange={(checked) => setMonetize(checked === true)}
                />
              </div>

              {monetize && (
                <>
                  <div className="space-y-4">
                    <Label>Ad Types</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="display-ads" defaultChecked />
                        <Label htmlFor="display-ads">Display ads</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="overlay-ads" defaultChecked />
                        <Label htmlFor="overlay-ads">Overlay ads</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="skippable-ads" defaultChecked />
                        <Label htmlFor="skippable-ads">Skippable video ads</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="non-skippable-ads" defaultChecked />
                        <Label htmlFor="non-skippable-ads">Non-skippable video ads</Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Ad Placement</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pre-roll" defaultChecked />
                        <Label htmlFor="pre-roll">Pre-roll</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mid-roll" defaultChecked />
                        <Label htmlFor="mid-roll">Mid-roll (for videos over 8 minutes)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="post-roll" defaultChecked />
                        <Label htmlFor="post-roll">Post-roll</Label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-4">
                <Label>Content Type</Label>
                <RadioGroup defaultValue={contentType} onValueChange={setContentType}>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="original" id="original" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="original" className="font-medium">
                        Original content
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">This video contains only content I created</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="licensed" id="licensed" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="licensed" className="font-medium">
                        Licensed content
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">This video contains content I have permission to use</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="remix" id="remix" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="remix" className="font-medium">
                        Remix/Derivative content
                      </Label>
                      <p className="text-sm text-gray-400 mt-1">
                        This video contains content from other creators that I've modified
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="paid-promotion" className="font-medium">
                    Paid promotion
                  </Label>
                  <p className="text-sm text-gray-400">This video contains paid promotion or sponsorship</p>
                </div>
                <Checkbox
                  id="paid-promotion"
                  checked={paidPromotion}
                  onCheckedChange={(checked) => setPaidPromotion(checked === true)}
                />
              </div>

              {paidPromotion && (
                <div className="p-4 rounded-lg bg-gray-800 space-y-2">
                  <p className="text-sm">
                    A "Includes paid promotion" message will be displayed in the first few seconds of your video.
                  </p>
                  <div className="flex items-start gap-2 bg-gray-700/50 p-2 rounded">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      You must comply with advertising regulations and disclose paid promotions in your videos.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* License Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue={licenseType} onValueChange={setLicenseType}>
                <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                  <RadioGroupItem value="standard" id="standard-license" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="standard-license" className="font-medium">
                      Standard YouTube License
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      You own the rights to this content, but grant limited usage rights to YouTube
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                  <RadioGroupItem value="creative-commons" id="creative-commons" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="creative-commons" className="font-medium">
                      Creative Commons - Attribution
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">
                      Others can reuse this content when they give you credit
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="space-y-6">
          {/* Advanced Settings */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure additional video settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Distribution</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="allow-embedding" defaultChecked />
                    <Label htmlFor="allow-embedding">Allow embedding on external websites</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="publish-to-feed" defaultChecked />
                    <Label htmlFor="publish-to-feed">Publish to subscriptions feed and notifications</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Captions</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-captions" className="font-medium">
                        Enable automatic captions
                      </Label>
                      <p className="text-sm text-gray-400">Allow YouTube to generate captions for your video</p>
                    </div>
                    <Checkbox
                      id="enable-captions"
                      checked={captions}
                      onCheckedChange={(checked) => setCaptions(checked === true)}
                    />
                  </div>

                  {captions && (
                    <div className="p-4 rounded-lg bg-gray-800 space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="caption-language" className="text-sm">
                          Caption Language
                        </Label>
                        <Select defaultValue={captionLanguage} onValueChange={setCaptionLanguage}>
                          <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="korean">Korean</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label htmlFor="caption-file" className="text-sm">
                            Upload caption file (SRT, VTT)
                          </Label>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 bg-gray-700 border-gray-600 hover:bg-gray-600"
                            onClick={handleCaptionUpload}
                          >
                            <UploadIcon className="h-3.5 w-3.5 mr-1" />
                            Upload
                          </Button>
                          <input
                            type="file"
                            ref={captionInputRef}
                            className="hidden"
                            accept=".srt,.vtt"
                            onChange={handleCaptionChange}
                          />
                        </div>

                        {captionFile && (
                          <div className="flex items-center gap-2 p-2 rounded bg-gray-700">
                            <FileText className="h-4 w-4 text-blue-400" />
                            <span className="text-sm truncate flex-1">{captionFile.name}</span>
                            {isUploadingCaption ? (
                              <Progress value={captionUploadProgress} className="h-1 w-20" />
                            ) : (
                              <X
                                className="h-4 w-4 cursor-pointer hover:text-red-400"
                                onClick={() => setCaptionFile(null)}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>End Screen & Cards</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-endscreen" className="font-medium">
                        Enable end screen
                      </Label>
                      <p className="text-sm text-gray-400">Add elements in the last 5-20 seconds of your video</p>
                    </div>
                    <Checkbox
                      id="enable-endscreen"
                      checked={endScreen}
                      onCheckedChange={(checked) => setEndScreen(checked === true)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-cards" className="font-medium">
                        Enable cards
                      </Label>
                      <p className="text-sm text-gray-400">Add interactive content to your video</p>
                    </div>
                    <Checkbox
                      id="enable-cards"
                      checked={cards}
                      onCheckedChange={(checked) => setCards(checked === true)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Recording Details</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="video-location" className="text-sm">
                      Recording Location
                    </Label>
                    <Input
                      id="video-location"
                      placeholder="e.g., Los Angeles, CA"
                      className="bg-gray-800 border-gray-700 mt-1"
                      value={recordingLocation}
                      onChange={(e) => setRecordingLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="recording-date" className="text-sm">
                      Recording Date
                    </Label>
                    <Input
                      id="recording-date"
                      type="date"
                      className="bg-gray-800 border-gray-700 mt-1"
                      value={recordingDate}
                      onChange={(e) => setRecordingDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Generation Dialog */}
      <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>AI Content Generation</DialogTitle>
            <DialogDescription>Generate {aiGenerationType} for your video using AI</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center">
              <div className="bg-purple-500/20 p-6 rounded-full">
                <Sparkles className="h-10 w-10 text-purple-400" />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-medium">What would you like to generate?</h4>

              {aiGenerationType === "title" && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Our AI will generate an engaging title for your video based on its content.
                  </p>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Great titles are concise, descriptive, and include relevant keywords. They should be between 5-10
                      words.
                    </p>
                  </div>
                </div>
              )}

              {aiGenerationType === "description" && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Our AI will generate a detailed description for your video that helps with discoverability.
                  </p>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Effective descriptions include a summary of your content, relevant keywords, timestamps for key
                      moments, and links to related content.
                    </p>
                  </div>
                </div>
              )}

              {aiGenerationType === "keywords" && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Our AI will generate relevant keywords to improve your video's discoverability in search results.
                  </p>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Keywords should be relevant to your content and include both specific and broad terms that viewers
                      might search for.
                    </p>
                  </div>
                </div>
              )}

              {aiGenerationType === "thumbnail" && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-300">
                    Our AI will generate a thumbnail image for your video based on its title and content.
                  </p>
                  <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                    <p className="text-xs text-gray-300">
                      Effective thumbnails are visually striking, clearly represent your content, and include minimal
                      text.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsAiDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={executeAiGeneration}>
              Generate {aiGenerationType.charAt(0).toUpperCase() + aiGenerationType.slice(1)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
