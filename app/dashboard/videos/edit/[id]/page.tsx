"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, RefreshCw, Pencil, X, Plus, UploadIcon, Wand2, Sparkles, FileText, Info } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample video data
const videoData = {
  id: 1,
  title: "Official Music Video - Summer Vibes",
  description:
    "Check out our latest music video for 'Summer Vibes'! This was filmed during our world tour and features behind-the-scenes footage from our concerts.\n\nFollow us on social media:\nInstagram: @musicband\nTwitter: @musicband\nTikTok: @musicband\n\n#SummerVibes #MusicVideo #NewRelease",
  thumbnail: "/music-video-thumbnail.png",
  tags: ["music video", "summer vibes", "concert", "behind the scenes", "new release"],
  keywords: ["music", "summer", "concert footage", "official music video", "band", "tour"],
  category: "music",
  language: "english",
  visibility: "public",
  monetization: true,
  allowComments: true,
  allowRatings: true,
  recordingDate: "2023-06-15",
  recordingLocation: "Los Angeles, CA",
  license: "standard",
  endScreen: true,
  cards: true,
  captions: false,
  views: "1.2M",
  likes: "45K",
  comments: "3.2K",
  uploadDate: "2023-06-20",
}

export default function EditVideoPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const videoId = params.id

  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const [videoTitle, setVideoTitle] = useState(videoData.title)
  const [videoDescription, setVideoDescription] = useState(videoData.description)
  const [keywords, setKeywords] = useState<string[]>(videoData.keywords)
  const [keywordInput, setKeywordInput] = useState("")
  const [videoTags, setVideoTags] = useState<string[]>(videoData.tags)
  const [tagInput, setTagInput] = useState("")
  const [category, setCategory] = useState(videoData.category)
  const [language, setLanguage] = useState(videoData.language)
  const [visibility, setVisibility] = useState(videoData.visibility)
  const [monetize, setMonetize] = useState(videoData.monetization)
  const [allowComments, setAllowComments] = useState(videoData.allowComments)
  const [allowRatings, setAllowRatings] = useState(videoData.allowRatings)
  const [recordingDate, setRecordingDate] = useState(videoData.recordingDate)
  const [recordingLocation, setRecordingLocation] = useState(videoData.recordingLocation)
  const [license, setLicense] = useState(videoData.license)
  const [endScreen, setEndScreen] = useState(videoData.endScreen)
  const [cards, setCards] = useState(videoData.cards)
  const [captions, setCaptions] = useState(videoData.captions)
  const [thumbnailUrl, setThumbnailUrl] = useState(videoData.thumbnail)
  const [isEditingThumbnail, setIsEditingThumbnail] = useState(false)
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false)
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false)
  const [aiGenerationType, setAiGenerationType] = useState<"title" | "description" | "keywords" | "thumbnail">("title")
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false)
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = useState(false)

  // Set unsaved changes flag when any field changes
  useEffect(() => {
    setIsUnsavedChanges(true)
  }, [
    videoTitle,
    videoDescription,
    keywords,
    videoTags,
    category,
    language,
    visibility,
    monetize,
    allowComments,
    allowRatings,
    recordingDate,
    recordingLocation,
    license,
    endScreen,
    cards,
    captions,
    thumbnailUrl,
  ])

  const handleSaveChanges = async () => {
    setIsSaving(true)

    // Simulate saving changes
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    setIsUnsavedChanges(false)

    toast({
      title: "Changes saved",
      description: "Your video details have been updated successfully.",
    })
  }

  const handleDiscardChanges = () => {
    setIsDiscardDialogOpen(true)
  }

  const confirmDiscardChanges = () => {
    setIsDiscardDialogOpen(false)
    router.push("/dashboard/videos")
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
          // Simulate title generation
          setTimeout(() => {
            setVideoTitle("Summer Vibes: Official Music Video (2023 World Tour)")
            toast({
              title: "Title generated",
              description: "A new title has been generated for your video.",
            })
          }, 1500)
          break

        case "description":
          toast({
            title: "Generating description",
            description: "Please wait while we generate a description for your video...",
          })
          // Simulate description generation
          setTimeout(() => {
            setVideoDescription(
              "Experience the energy of our latest hit 'Summer Vibes' in this official music video featuring exclusive footage from our 2023 World Tour. Join us as we take you behind the scenes of our biggest concerts yet!\n\nDirected by: John Smith\nProduced by: Music Productions Inc.\n\nFollow us on social media:\nInstagram: @musicband\nTwitter: @musicband\nTikTok: @musicband\n\n#SummerVibes #MusicVideo #WorldTour2023",
            )
            toast({
              title: "Description generated",
              description: "A new description has been generated for your video.",
            })
          }, 2000)
          break

        case "keywords":
          setIsGeneratingKeywords(true)
          toast({
            title: "Generating keywords",
            description: "Please wait while we generate keywords for your video...",
          })
          // Simulate keyword generation
          setTimeout(() => {
            setKeywords([
              "music",
              "summer vibes",
              "concert footage",
              "official music video",
              "band",
              "tour",
              "world tour",
              "behind the scenes",
              "new song",
              "music production",
              "live performance",
            ])
            setIsGeneratingKeywords(false)
            toast({
              title: "Keywords generated",
              description: "New keywords have been generated for your video.",
            })
          }, 2000)
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={() => {
              if (isUnsavedChanges) {
                setIsDiscardDialogOpen(true)
              } else {
                router.push("/dashboard/videos")
              }
            }}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Edit Video</h1>
            <p className="text-sm text-gray-400">
              ID: {videoId} • Uploaded on {videoData.uploadDate}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={handleDiscardChanges}
          >
            Discard
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
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

      <div className="flex border-b border-gray-800 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "basic" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("basic")}
        >
          Basic Info
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "advanced" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("advanced")}
        >
          Advanced
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "monetization" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("monetization")}
        >
          Monetization
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "analytics" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </div>

      {activeTab === "basic" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Basic Details</CardTitle>
              <CardDescription>Edit title, description, and other basic information</CardDescription>
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
                    >
                      <UploadIcon className="h-3.5 w-3.5 mr-1" />
                      Upload
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="relative bg-gray-800 rounded-lg overflow-hidden w-48 h-28">
                    <img
                      src={thumbnailUrl || "/placeholder.svg"}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
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
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Playlist</Label>
                </div>
                <Select defaultValue="music">
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

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Visibility</CardTitle>
              <CardDescription>Control who can see your video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup defaultValue={visibility} onValueChange={setVisibility}>
                <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                  <RadioGroupItem value="public" id="public" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="public" className="font-medium">
                      Public
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">Everyone can watch your video</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                  <RadioGroupItem value="unlisted" id="unlisted" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="unlisted" className="font-medium">
                      Unlisted
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">Anyone with the link can watch your video</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                  <RadioGroupItem value="private" id="private" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="private" className="font-medium">
                      Private
                    </Label>
                    <p className="text-sm text-gray-400 mt-1">Only you and people you choose can watch your video</p>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "advanced" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Configure additional video settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Comments & Interactions</Label>
                <div className="space-y-2">
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
                </div>
              </div>

              <div className="space-y-4">
                <Label>License</Label>
                <RadioGroup defaultValue={license} onValueChange={setLicense}>
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
              </div>

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
                <Label>Captions</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-captions" className="font-medium">
                        Enable captions
                      </Label>
                      <p className="text-sm text-gray-400">Add captions to your video</p>
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
                        <Select defaultValue="english">
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
                          >
                            <UploadIcon className="h-3.5 w-3.5 mr-1" />
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "monetization" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Monetization Settings</CardTitle>
              <CardDescription>Configure how you earn from this video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monetize-video" className="font-medium">
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

                  <div className="flex items-center space-x-2">
                    <Checkbox id="paid-promotion" />
                    <Label htmlFor="paid-promotion">This video contains paid promotion</Label>
                  </div>
                </>
              )}

              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400">Monetization Status</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    This video is eligible for monetization. You can enable or disable monetization at any time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Video Performance</CardTitle>
              <CardDescription>View analytics for this video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Views</p>
                    <h3 className="text-2xl font-bold">{videoData.views}</h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Likes</p>
                    <h3 className="text-2xl font-bold">{videoData.likes}</h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Comments</p>
                    <h3 className="text-2xl font-bold">{videoData.comments}</h3>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => router.push(`/dashboard/videos/analytics/${videoId}`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Detailed Analytics
                </Button>
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

      {/* Discard Changes Dialog */}
      <Dialog open={isDiscardDialogOpen} onOpenChange={setIsDiscardDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Discard Changes</DialogTitle>
            <DialogDescription>
              Are you sure you want to discard your changes? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsDiscardDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDiscardChanges}>
              Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
