"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { FileMusic, ImageIcon, Info, Music2, Upload, CheckCircle2, Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Platform options
const platformOptions = [
  { name: "Spotify", logo: "/spotify-logo.png" },
  { name: "Apple Music", logo: "/apple-music-logo.png" },
  { name: "YouTube Music", logo: "/youtube-music-logo.png" },
  { name: "Amazon Music", logo: "/amazon-music-logo.png" },
  { name: "Deezer", logo: "/placeholder.svg?key=90vdu" },
  { name: "Tidal", logo: "/placeholder.svg?key=tidal" },
  { name: "SoundCloud", logo: "/soundcloud-logo.png" },
  { name: "TikTok", logo: "/social/tiktok.png" },
  { name: "Instagram/Facebook", logo: "/placeholder.svg?key=meta" },
  { name: "Pandora", logo: "/placeholder.svg?key=pandora" },
  { name: "Audiomack", logo: "/placeholder.svg?key=audiomack" },
  { name: "Boomplay", logo: "/placeholder.svg?key=boomplay" },
]

// Genre options
const genreOptions = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "R&B",
  "Electronic",
  "Dance",
  "Country",
  "Jazz",
  "Classical",
  "Folk",
  "Reggae",
  "Blues",
  "Metal",
  "Punk",
  "Alternative",
  "Indie",
  "Soul",
  "Funk",
  "Disco",
  "Ambient",
]

export default function MusicUploadPage() {
  const router = useRouter()
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [releaseType, setReleaseType] = useState("single")
  const [assetType, setAssetType] = useState("sound-recording")
  const [coverArtUploaded, setCoverArtUploaded] = useState(false)
  const [trackFiles, setTrackFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverArtInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    trackTitle: "",
    versionTitle: "",
    primaryArtist: "",
    featuredArtist: "",
    genre: "pop",
    subgenre: "",
    mood: "",
    isrc: "",
    composer: "",
    lyricist: "",
    producer: "",
    publisher: "",
    releaseDate: "",
    explicit: false,
    instrumental: false,
    lyrics: "",
    upc: "",
    label: "",
    copyright: "",
    language: "English",
  })

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "Spotify",
    "Apple Music",
    "YouTube Music",
    "Amazon Music",
    "Deezer",
    "Tidal",
    "SoundCloud",
  ])

  const [monetizationOptions, setMonetizationOptions] = useState({
    streaming: true,
    youtube: true,
    social: true,
  })

  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)
      const files = Array.from(e.target.files)
      setTrackFiles(files)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 5
        setUploadProgress(progress)

        if (progress >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setTimeout(() => {
            toast({
              title: "Files uploaded successfully",
              description: `${files.length} audio file(s) have been uploaded`,
            })
          }, 500)
        }
      }, 200)
    }
  }

  const handleCoverArtUpload = () => {
    if (coverArtInputRef.current) {
      coverArtInputRef.current.click()
    }
  }

  const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "Cover art upload started",
        description: "Please wait while we process your image",
      })

      setTimeout(() => {
        setCoverArtUploaded(true)
        toast({
          title: "Cover art uploaded",
          description: "Your cover art has been uploaded successfully",
        })
      }, 1500)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [id]: checked }))
  }

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) => (prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]))
  }

  const handleMonetizationToggle = (option: string, checked: boolean) => {
    setMonetizationOptions((prev) => ({ ...prev, [option]: checked }))
  }

  const handleGenerateISRC = () => {
    const newISRC = `USRC${Math.floor(10000000 + Math.random() * 90000000)}`
    setFormData((prev) => ({ ...prev, isrc: newISRC }))
    toast({
      title: "ISRC Generated",
      description: "A unique ISRC code has been generated for your track",
    })
  }

  const handleGenerateUPC = () => {
    const newUPC = `${Math.floor(100000000000 + Math.random() * 900000000000)}`
    setFormData((prev) => ({ ...prev, upc: newUPC }))
    toast({
      title: "UPC Generated",
      description: "A unique UPC code has been generated for your release",
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!termsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to continue",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Release submitted",
      description: "Your music is being prepared for distribution",
    })

    // Simulate processing time
    setTimeout(() => {
      router.push("/music-dashboard")
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Upload Music</h1>
        <p className="text-sm text-gray-400">Upload and distribute your music to all major platforms</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                uploadStep >= 1 ? "bg-purple-600" : "bg-gray-800"
              }`}
            >
              <FileMusic className="h-4 w-4" />
            </div>
            <p className="mt-1 text-xs font-medium">Upload</p>
          </div>
          <div className="flex-1 mx-2">
            <div className={`h-1 ${uploadStep >= 2 ? "bg-purple-600" : "bg-gray-800"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                uploadStep >= 2 ? "bg-purple-600" : "bg-gray-800"
              }`}
            >
              <Music2 className="h-4 w-4" />
            </div>
            <p className="mt-1 text-xs font-medium">Metadata</p>
          </div>
          <div className="flex-1 mx-2">
            <div className={`h-1 ${uploadStep >= 3 ? "bg-purple-600" : "bg-gray-800"}`}></div>
          </div>
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                uploadStep >= 3 ? "bg-purple-600" : "bg-gray-800"
              }`}
            >
              <Globe className="h-4 w-4" />
            </div>
            <p className="mt-1 text-xs font-medium">Distribution</p>
          </div>
        </div>
      </div>

      {/* Step 1: Upload Files */}
      {uploadStep === 1 && (
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Upload Audio Files</CardTitle>
            <CardDescription>Upload your audio files in high-quality formats (WAV, FLAC, MP3)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="single" onValueChange={(value) => setReleaseType(value)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="single">Single</TabsTrigger>
                <TabsTrigger value="ep">EP</TabsTrigger>
                <TabsTrigger value="album">Album</TabsTrigger>
              </TabsList>
              <TabsContent value="single" className="pt-4">
                <div className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="asset-type">Asset Type</Label>
                      <Select defaultValue="sound-recording" onValueChange={setAssetType}>
                        <SelectTrigger id="asset-type" className="bg-gray-950 border-gray-800">
                          <SelectValue placeholder="Select asset type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sound-recording">Sound Recording (SR)</SelectItem>
                          <SelectItem value="composition">Composition (MW)</SelectItem>
                          <SelectItem value="music-video">Music Video (MV)</SelectItem>
                          <SelectItem value="art-track">Art Track (AT)</SelectItem>
                          <SelectItem value="lyric-video">Lyric Video (LV)</SelectItem>
                          <SelectItem value="live-performance">Live Performance (LP)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="audio/*"
                        multiple={releaseType !== "single"}
                      />
                      {isUploading ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center gap-2">
                            <FileMusic className="h-6 w-6 text-purple-500" />
                            <div className="text-left">
                              <p className="font-medium">Uploading {trackFiles.length} file(s)</p>
                              <p className="text-xs text-gray-400">{uploadProgress}% complete</p>
                            </div>
                          </div>
                          <Progress value={uploadProgress} className="h-2 w-full" />
                        </div>
                      ) : trackFiles.length > 0 ? (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                              <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Files uploaded successfully</p>
                            <p className="text-xs text-gray-400">{trackFiles.length} audio file(s)</p>
                          </div>
                          <div>
                            <Button size="sm" onClick={handleFileUpload}>
                              Replace Files
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                              <Upload className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <p className="font-medium">Drag and drop your audio files here</p>
                            <p className="text-xs text-gray-400">or click to browse your files</p>
                          </div>
                          <div>
                            <Button size="sm" onClick={handleFileUpload}>
                              Select Files
                            </Button>
                          </div>
                          <div className="text-xs text-gray-500">Supported formats: WAV, FLAC, AIFF, MP3 (320kbps)</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cover-art">Cover Art</Label>
                      <input
                        type="file"
                        ref={coverArtInputRef}
                        onChange={handleCoverArtChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="mt-1 flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-md border border-gray-800 bg-gray-950">
                          {coverArtUploaded ? (
                            <img
                              src="/abstract-soundscape.png"
                              alt="Cover Art"
                              className="h-full w-full object-cover rounded-md"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-gray-500" />
                          )}
                        </div>
                        <Button variant="outline" size="sm" onClick={handleCoverArtUpload}>
                          Upload Cover Art
                        </Button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Minimum 3000x3000 pixels, square JPG or PNG</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ep" className="pt-4">
                <Alert className="mb-4 bg-blue-900/20 text-blue-400 border-blue-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>EP Upload</AlertTitle>
                  <AlertDescription>
                    An EP typically contains 4-6 tracks. You'll be able to add multiple tracks in the next step.
                  </AlertDescription>
                </Alert>

                {/* Similar content as single, but with multiple track support */}
                <div className="space-y-4">
                  {/* Asset type selector */}
                  <div>
                    <Label htmlFor="asset-type-ep">Asset Type</Label>
                    <Select defaultValue="sound-recording">
                      <SelectTrigger id="asset-type-ep" className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sound-recording">Sound Recording (SR)</SelectItem>
                        <SelectItem value="composition">Composition (MW)</SelectItem>
                        <SelectItem value="music-video">Music Video (MV)</SelectItem>
                        <SelectItem value="art-track">Art Track (AT)</SelectItem>
                        <SelectItem value="lyric-video">Lyric Video (LV)</SelectItem>
                        <SelectItem value="live-performance">Live Performance (LP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cover art upload */}
                  <div>
                    <Label htmlFor="cover-art-ep">Cover Art</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md border border-gray-800 bg-gray-950">
                        {coverArtUploaded ? (
                          <img
                            src="/abstract-soundscape.png"
                            alt="Cover Art"
                            className="h-full w-full object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={handleCoverArtUpload}>
                        Upload Cover Art
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Minimum 3000x3000 pixels, square JPG or PNG</p>
                  </div>

                  {/* File upload area */}
                  <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="audio/*"
                      multiple
                    />
                    {isUploading ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <FileMusic className="h-6 w-6 text-purple-500" />
                          <div className="text-left">
                            <p className="font-medium">Uploading {trackFiles.length} file(s)</p>
                            <p className="text-xs text-gray-400">{uploadProgress}% complete</p>
                          </div>
                        </div>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : trackFiles.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Files uploaded successfully</p>
                          <p className="text-xs text-gray-400">{trackFiles.length} audio file(s)</p>
                        </div>
                        <div>
                          <Button size="sm" onClick={handleFileUpload}>
                            Replace Files
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                            <Upload className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Drag and drop your audio files here</p>
                          <p className="text-xs text-gray-400">or click to browse your files</p>
                        </div>
                        <div>
                          <Button size="sm" onClick={handleFileUpload}>
                            Select Files
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">Supported formats: WAV, FLAC, AIFF, MP3 (320kbps)</div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="album" className="pt-4">
                <Alert className="mb-4 bg-blue-900/20 text-blue-400 border-blue-900">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Album Upload</AlertTitle>
                  <AlertDescription>
                    An album typically contains 7+ tracks. You'll be able to add multiple tracks in the next step.
                  </AlertDescription>
                </Alert>

                {/* Similar content as EP */}
                <div className="space-y-4">
                  {/* Asset type selector */}
                  <div>
                    <Label htmlFor="asset-type-album">Asset Type</Label>
                    <Select defaultValue="sound-recording">
                      <SelectTrigger id="asset-type-album" className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select asset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sound-recording">Sound Recording (SR)</SelectItem>
                        <SelectItem value="composition">Composition (MW)</SelectItem>
                        <SelectItem value="music-video">Music Video (MV)</SelectItem>
                        <SelectItem value="art-track">Art Track (AT)</SelectItem>
                        <SelectItem value="lyric-video">Lyric Video (LV)</SelectItem>
                        <SelectItem value="live-performance">Live Performance (LP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cover art upload */}
                  <div>
                    <Label htmlFor="cover-art-album">Cover Art</Label>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md border border-gray-800 bg-gray-950">
                        {coverArtUploaded ? (
                          <img
                            src="/abstract-soundscape.png"
                            alt="Cover Art"
                            className="h-full w-full object-cover rounded-md"
                          />
                        ) : (
                          <ImageIcon className="h-6 w-6 text-gray-500" />
                        )}
                      </div>
                      <Button variant="outline" size="sm" onClick={handleCoverArtUpload}>
                        Upload Cover Art
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">Minimum 3000x3000 pixels, square JPG or PNG</p>
                  </div>

                  {/* File upload area */}
                  <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="audio/*"
                      multiple
                    />
                    {isUploading ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2">
                          <FileMusic className="h-6 w-6 text-purple-500" />
                          <div className="text-left">
                            <p className="font-medium">Uploading {trackFiles.length} file(s)</p>
                            <p className="text-xs text-gray-400">{uploadProgress}% complete</p>
                          </div>
                        </div>
                        <Progress value={uploadProgress} className="h-2 w-full" />
                      </div>
                    ) : trackFiles.length > 0 ? (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Files uploaded successfully</p>
                          <p className="text-xs text-gray-400">{trackFiles.length} audio file(s)</p>
                        </div>
                        <div>
                          <Button size="sm" onClick={handleFileUpload}>
                            Replace Files
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
                            <Upload className="h-6 w-6 text-gray-400" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Drag and drop your audio files here</p>
                          <p className="text-xs text-gray-400">or click to browse your files</p>
                        </div>
                        <div>
                          <Button size="sm" onClick={handleFileUpload}>
                            Select Files
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">Supported formats: WAV, FLAC, AIFF, MP3 (320kbps)</div>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <Button variant="ghost" onClick={() => router.push("/music-dashboard")}>
              Cancel
            </Button>
            <Button
              onClick={() => setUploadStep(2)}
              disabled={isUploading || (!trackFiles.length && !coverArtUploaded)}
            >
              Next: Add Metadata
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Metadata */}
      {uploadStep === 2 && (
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Track Metadata</CardTitle>
            <CardDescription>Add detailed information about your track</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="trackTitle">Track Title *</Label>
                  <Input
                    id="trackTitle"
                    placeholder="Enter track title"
                    className="bg-gray-950 border-gray-800"
                    value={formData.trackTitle}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="versionTitle">Version Title (Optional)</Label>
                  <Input
                    id="versionTitle"
                    placeholder="e.g. Radio Edit, Acoustic Version"
                    className="bg-gray-950 border-gray-800"
                    value={formData.versionTitle}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="primaryArtist">Primary Artist *</Label>
                  <Input
                    id="primaryArtist"
                    placeholder="Enter artist name"
                    className="bg-gray-950 border-gray-800"
                    value={formData.primaryArtist}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="featuredArtist">Featured Artist(s) (Optional)</Label>
                  <Input
                    id="featuredArtist"
                    placeholder="e.g. feat. Artist Name"
                    className="bg-gray-950 border-gray-800"
                    value={formData.featuredArtist}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="genre">Genre *</Label>
                  <Select defaultValue="pop" onValueChange={(value) => handleSelectChange("genre", value)}>
                    <SelectTrigger id="genre" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genreOptions.map((genre) => (
                        <SelectItem key={genre} value={genre.toLowerCase()}>
                          {genre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subgenre">Subgenre (Optional)</Label>
                  <Input
                    id="subgenre"
                    placeholder="e.g. Synthpop, Trap"
                    className="bg-gray-950 border-gray-800"
                    value={formData.subgenre}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="mood">Mood (Optional)</Label>
                  <Input
                    id="mood"
                    placeholder="e.g. Energetic, Melancholic"
                    className="bg-gray-950 border-gray-800"
                    value={formData.mood}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="isrc">ISRC Code</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="isrc"
                      placeholder="e.g. USRC12345678"
                      className="bg-gray-950 border-gray-800"
                      value={formData.isrc}
                      onChange={handleInputChange}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleGenerateISRC}>
                            Generate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a unique ISRC code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    International Standard Recording Code - unique identifier for your track
                  </p>
                </div>

                <div>
                  <Label htmlFor="upc">UPC/EAN</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="upc"
                      placeholder="Enter UPC/EAN code"
                      className="bg-gray-950 border-gray-800"
                      value={formData.upc}
                      onChange={handleInputChange}
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="outline" size="sm" onClick={handleGenerateUPC}>
                            Generate
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a unique UPC code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Universal Product Code - unique identifier for your release
                  </p>
                </div>

                <div>
                  <Label htmlFor="composer">Composer(s)</Label>
                  <Input
                    id="composer"
                    placeholder="Enter composer names"
                    className="bg-gray-950 border-gray-800"
                    value={formData.composer}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="lyricist">Lyricist(s) (Optional)</Label>
                  <Input
                    id="lyricist"
                    placeholder="Enter lyricist names"
                    className="bg-gray-950 border-gray-800"
                    value={formData.lyricist}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="producer">Producer(s) (Optional)</Label>
                  <Input
                    id="producer"
                    placeholder="Enter producer names"
                    className="bg-gray-950 border-gray-800"
                    value={formData.producer}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="publisher">Publisher (Optional)</Label>
                  <Input
                    id="publisher"
                    placeholder="Enter publisher name"
                    className="bg-gray-950 border-gray-800"
                    value={formData.publisher}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="releaseDate">Release Date *</Label>
                  <Input
                    id="releaseDate"
                    type="date"
                    className="bg-gray-950 border-gray-800"
                    value={formData.releaseDate}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="English" onValueChange={(value) => handleSelectChange("language", value)}>
                    <SelectTrigger id="language" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Japanese">Japanese</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                      <SelectItem value="Mandarin">Mandarin</SelectItem>
                      <SelectItem value="Portuguese">Portuguese</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Instrumental">Instrumental</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="explicit">Explicit Content</Label>
                    <p className="text-xs text-gray-500">Contains explicit lyrics or content</p>
                  </div>
                  <Switch
                    id="explicit"
                    checked={formData.explicit}
                    onCheckedChange={(checked) => handleSwitchChange("explicit", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="instrumental">Instrumental</Label>
                    <p className="text-xs text-gray-500">Track contains no vocals</p>
                  </div>
                  <Switch
                    id="instrumental"
                    checked={formData.instrumental}
                    onCheckedChange={(checked) => handleSwitchChange("instrumental", checked)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="lyrics">Lyrics (Optional)</Label>
                <Textarea
                  id="lyrics"
                  placeholder="Enter track lyrics"
                  className="h-32 bg-gray-950 border-gray-800"
                  value={formData.lyrics}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <Button variant="ghost" onClick={() => setUploadStep(1)}>
              Back
            </Button>
            <Button onClick={() => setUploadStep(3)}>Next: Distribution</Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Distribution & Review */}
      {uploadStep === 3 && (
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle>Distribution & Review</CardTitle>
            <CardDescription>Select platforms and review your submission</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Select Distribution Platforms</h3>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {platformOptions.map((platform) => {
                    const platformId = platform.name.toLowerCase().replace(/\s+/g, "-")
                    return (
                      <div key={platform.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={`platform-${platformId}`}
                          checked={selectedPlatforms.includes(platform.name)}
                          onCheckedChange={() => handlePlatformToggle(platform.name)}
                        />
                        <Label
                          htmlFor={`platform-${platformId}`}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <div className="h-4 w-4 flex-shrink-0">
                            <img
                              src={platform.logo || "/placeholder.svg"}
                              alt={platform.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <span>{platform.name}</span>
                        </Label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h3 className="text-lg font-medium mb-3">Monetization Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="streaming">Streaming Monetization</Label>
                      <p className="text-xs text-gray-500">Earn revenue from streams on all platforms</p>
                    </div>
                    <Switch
                      id="streaming"
                      checked={monetizationOptions.streaming}
                      onCheckedChange={(checked) => handleMonetizationToggle("streaming", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="youtube">YouTube Content ID</Label>
                      <p className="text-xs text-gray-500">Monetize when your music is used in YouTube videos</p>
                    </div>
                    <Switch
                      id="youtube"
                      checked={monetizationOptions.youtube}
                      onCheckedChange={(checked) => handleMonetizationToggle("youtube", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="social">Social Media Monetization</Label>
                      <p className="text-xs text-gray-500">Earn when your music is used in TikTok, Instagram, etc.</p>
                    </div>
                    <Switch
                      id="social"
                      checked={monetizationOptions.social}
                      onCheckedChange={(checked) => handleMonetizationToggle("social", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h3 className="text-lg font-medium mb-3">Review Submission</h3>
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-md bg-gray-800 flex-shrink-0">
                      {coverArtUploaded && (
                        <img
                          src="/abstract-soundscape.png"
                          alt="Cover Art"
                          className="h-full w-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">{formData.trackTitle || "Night Drive"}</h4>
                      <p className="text-sm text-gray-400">{formData.primaryArtist || "John Doe"}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {releaseType === "single" ? "Single" : releaseType === "ep" ? "EP" : "Album"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {formData.genre === "pop" ? "Pop" : formData.genre}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">ISRC: {formData.isrc || "USRC12345678"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-md border border-blue-500/20 bg-blue-500/10 p-3">
                <div className="flex items-start gap-2">
                  <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-500">Distribution Information</h4>
                    <p className="text-xs text-gray-400">
                      Your music will be delivered to the selected platforms within 1-7 business days. You'll receive
                      notifications as your music goes live on each platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I confirm that I own or have licensed all rights to this content and agree to the terms of service
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
            <Button variant="ghost" onClick={() => setUploadStep(2)}>
              Back
            </Button>
            <Button onClick={handleSubmit}>Submit Release</Button>
          </CardFooter>
        </Card>
      )}

      {/* Submission Success */}
      {uploadStep === 4 && (
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <CardTitle>Submission Successful</CardTitle>
            <CardDescription>Your music has been submitted for distribution</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <p>
                Your release has been submitted and is now being processed. You'll receive notifications as your music
                goes live on each platform.
              </p>
              <div className="rounded-md border border-gray-800 bg-gray-950 p-4">
                <p className="font-medium">Estimated Processing Time</p>
                <p className="text-sm text-gray-400">1-7 business days</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
            <Button onClick={() => router.push("/music-dashboard")}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      )}

      {/* FAQ Accordion */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-gray-800">
            <AccordionTrigger className="hover:no-underline">What file formats are accepted?</AccordionTrigger>
            <AccordionContent>
              <p>
                We accept high-quality audio files in WAV (preferred), FLAC, AIFF, and MP3 (320kbps) formats. For
                optimal sound quality, we recommend uploading uncompressed audio files (WAV or FLAC).
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-gray-800">
            <AccordionTrigger className="hover:no-underline">
              How long does it take for my music to appear on streaming platforms?
            </AccordionTrigger>
            <AccordionContent>
              <p>
                After submission, your music typically takes 1-7 business days to be processed and distributed.
                Different platforms have different processing times:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Spotify: 1-3 business days</li>
                <li>Apple Music: 2-5 business days</li>
                <li>Amazon Music: 3-5 business days</li>
                <li>YouTube Music: 3-7 business days</li>
                <li>Other platforms: 3-10 business days</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-gray-800">
            <AccordionTrigger className="hover:no-underline">What are ISRC and UPC codes?</AccordionTrigger>
            <AccordionContent>
              <p>
                ISRC (International Standard Recording Code) is a unique identifier for each track. UPC (Universal
                Product Code) is a unique identifier for your release as a whole. Both are important for tracking
                streams, sales, and ensuring you get paid correctly. Our system can generate these codes for you if you
                don't already have them.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-gray-800">
            <AccordionTrigger className="hover:no-underline">What are the cover art requirements?</AccordionTrigger>
            <AccordionContent>
              <p>Cover art should be:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Square format (1:1 ratio)</li>
                <li>Minimum 3000x3000 pixels</li>
                <li>JPG or PNG format</li>
                <li>Less than 20MB in size</li>
                <li>No explicit content, logos, or text that violates platform guidelines</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border-gray-800">
            <AccordionTrigger className="hover:no-underline">How do I get paid for my streams?</AccordionTrigger>
            <AccordionContent>
              <p>
                Royalties from streams are collected and distributed to you through our platform. You can view your
                earnings in the Royalties section of your dashboard. Payments are processed monthly once you reach the
                minimum payout threshold of $20. You can set up your payment method in the Settings section.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
