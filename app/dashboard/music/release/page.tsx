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
import { DSPList } from "@/components/distribution/DSPList"
import { Upload, Music, DollarSign, Copy, Plus, Trash2, Save, Send } from "lucide-react"

interface Track {
  id: string
  title: string
  artist: string
  featuring: string
  genre: string
  subgenre: string
  mood: string
  language: string
  explicit: boolean
  isrc: string
  duration: string
  audioFile?: File
}

interface RoyaltySplit {
  id: string
  email: string
  name: string
  percentage: number
  role: string
}

export default function MusicReleasePage() {
  const { setCurrentPage } = useDashboard()
  const [releaseType, setReleaseType] = useState<"single" | "ep" | "album">("single")
  const [releaseData, setReleaseData] = useState({
    title: "",
    artist: "",
    label: "",
    genre: "",
    subgenre: "",
    releaseDate: "",
    language: "English",
    explicit: false,
    description: "",
    copyrightYear: new Date().getFullYear().toString(),
    copyrightOwner: "",
    publishingRights: "",
  })
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "1",
      title: "",
      artist: releaseData.artist,
      featuring: "",
      genre: "",
      subgenre: "",
      mood: "",
      language: "English",
      explicit: false,
      isrc: "",
      duration: "",
    },
  ])
  const [royaltySplits, setRoyaltySplits] = useState<RoyaltySplit[]>([
    {
      id: "1",
      email: "",
      name: "",
      percentage: 100,
      role: "Artist",
    },
  ])
  const [selectedDSPs, setSelectedDSPs] = useState<string[]>([])
  const [coverArt, setCoverArt] = useState<File | null>(null)

  useEffect(() => {
    setCurrentPage("Release Music")
  }, [setCurrentPage])

  const addTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      title: "",
      artist: releaseData.artist,
      featuring: "",
      genre: releaseData.genre,
      subgenre: releaseData.subgenre,
      mood: "",
      language: releaseData.language,
      explicit: releaseData.explicit,
      isrc: "",
      duration: "",
    }
    setTracks([...tracks, newTrack])
  }

  const removeTrack = (id: string) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter((track) => track.id !== id))
    }
  }

  const updateTrack = (id: string, field: keyof Track, value: any) => {
    setTracks(tracks.map((track) => (track.id === id ? { ...track, [field]: value } : track)))
  }

  const duplicateMetadata = (sourceTrackId: string) => {
    const sourceTrack = tracks.find((t) => t.id === sourceTrackId)
    if (!sourceTrack) return

    setTracks(
      tracks.map((track) =>
        track.id !== sourceTrackId
          ? {
              ...track,
              artist: sourceTrack.artist,
              genre: sourceTrack.genre,
              subgenre: sourceTrack.subgenre,
              mood: sourceTrack.mood,
              language: sourceTrack.language,
              explicit: sourceTrack.explicit,
            }
          : track,
      ),
    )
  }

  const addRoyaltySplit = () => {
    const newSplit: RoyaltySplit = {
      id: Date.now().toString(),
      email: "",
      name: "",
      percentage: 0,
      role: "Collaborator",
    }
    setRoyaltySplits([...royaltySplits, newSplit])
  }

  const updateRoyaltySplit = (id: string, field: keyof RoyaltySplit, value: any) => {
    setRoyaltySplits(royaltySplits.map((split) => (split.id === id ? { ...split, [field]: value } : split)))
  }

  const removeRoyaltySplit = (id: string) => {
    if (royaltySplits.length > 1) {
      setRoyaltySplits(royaltySplits.filter((split) => split.id !== id))
    }
  }

  const totalPercentage = royaltySplits.reduce((sum, split) => sum + split.percentage, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Release Music</h1>
          <p className="text-gray-400">Upload and distribute your music to streaming platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-white/20 text-gray-300 hover:text-white"
            onClick={async () => {
              // Save draft logic
              console.log("Saving draft...")

              // Simulate saving
              const draftData = {
                releaseData,
                tracks,
                royaltySplits,
                coverArt: coverArt?.name || null,
                timestamp: new Date().toISOString(),
              }

              localStorage.setItem("musicReleaseDraft", JSON.stringify(draftData))

              // Show success notification
              alert("Draft saved successfully! You can continue editing later.")
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={async () => {
              // Validate required fields
              if (!releaseData.title || !releaseData.artist || !releaseData.releaseDate) {
                alert("Please fill in all required fields (Title, Artist, Release Date)")
                return
              }

              if (tracks.some((track) => !track.title || !track.audioFile)) {
                alert("Please ensure all tracks have titles and audio files")
                return
              }

              if (totalPercentage !== 100) {
                alert("Royalty splits must total exactly 100%")
                return
              }

              console.log("Submitting release...")

              // Simulate submission
              const releaseSubmission = {
                releaseData,
                tracks,
                royaltySplits,
                coverArt: coverArt?.name || null,
                submittedAt: new Date().toISOString(),
                status: "pending",
              }

              // Clear draft
              localStorage.removeItem("musicReleaseDraft")

              alert("Release submitted successfully! You'll receive an email confirmation shortly.")

              // Redirect to catalog
              window.location.href = "/dashboard/music/catalog"
            }}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Release
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="basic" className="text-gray-300 data-[state=active]:text-white">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="tracks" className="text-gray-300 data-[state=active]:text-white">
            Tracks
          </TabsTrigger>
          <TabsTrigger value="splits" className="text-gray-300 data-[state=active]:text-white">
            Royalty Splits
          </TabsTrigger>
          <TabsTrigger value="dsps" className="text-gray-300 data-[state=active]:text-white">
            DSP Selection
          </TabsTrigger>
          <TabsTrigger value="artwork" className="text-gray-300 data-[state=active]:text-white">
            Artwork
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Music className="h-5 w-5 mr-2" />
                Release Information
              </CardTitle>
              <CardDescription className="text-gray-400">Basic information about your release</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Release Type</Label>
                  <Select value={releaseType} onValueChange={(value: any) => setReleaseType(value)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="ep">EP (2-6 tracks)</SelectItem>
                      <SelectItem value="album">Album (7+ tracks)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Release Title *</Label>
                  <Input
                    value={releaseData.title}
                    onChange={(e) => setReleaseData({ ...releaseData, title: e.target.value })}
                    placeholder="Enter release title"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Primary Artist *</Label>
                  <Input
                    value={releaseData.artist}
                    onChange={(e) => setReleaseData({ ...releaseData, artist: e.target.value })}
                    placeholder="Enter artist name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Record Label</Label>
                  <Input
                    value={releaseData.label}
                    onChange={(e) => setReleaseData({ ...releaseData, label: e.target.value })}
                    placeholder="Enter record label"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Release Date *</Label>
                  <Input
                    type="date"
                    value={releaseData.releaseDate}
                    onChange={(e) => setReleaseData({ ...releaseData, releaseDate: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Primary Genre *</Label>
                  <Select
                    value={releaseData.genre}
                    onValueChange={(value) => setReleaseData({ ...releaseData, genre: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hip-hop">Hip Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="r&b">R&B</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Subgenre</Label>
                  <Select
                    value={releaseData.subgenre}
                    onValueChange={(value) => setReleaseData({ ...releaseData, subgenre: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select subgenre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="indie-pop">Indie Pop</SelectItem>
                      <SelectItem value="alternative-rock">Alternative Rock</SelectItem>
                      <SelectItem value="trap">Trap</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="neo-soul">Neo Soul</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Language</Label>
                  <Select
                    value={releaseData.language}
                    onValueChange={(value) => setReleaseData({ ...releaseData, language: value })}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Release Description</Label>
                <Textarea
                  value={releaseData.description}
                  onChange={(e) => setReleaseData({ ...releaseData, description: e.target.value })}
                  placeholder="Describe your release..."
                  rows={4}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={releaseData.explicit}
                  onCheckedChange={(checked) => setReleaseData({ ...releaseData, explicit: checked })}
                />
                <Label className="text-gray-300">Explicit Content</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Music className="h-5 w-5 mr-2" />
                    Track List
                  </CardTitle>
                  <CardDescription className="text-gray-400">Add and configure your tracks</CardDescription>
                </div>
                <Button onClick={addTrack} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Track
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {tracks.map((track, index) => (
                <Card key={track.id} className="bg-white/5 border-white/10">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">Track {index + 1}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => duplicateMetadata(track.id)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy Metadata
                        </Button>
                        {tracks.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTrack(track.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Track Title *</Label>
                        <Input
                          value={track.title}
                          onChange={(e) => updateTrack(track.id, "title", e.target.value)}
                          placeholder="Enter track title"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Artist</Label>
                        <Input
                          value={track.artist}
                          onChange={(e) => updateTrack(track.id, "artist", e.target.value)}
                          placeholder="Enter artist name"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Audio File *</Label>
                      <FileUploader
                        type="audio"
                        maxFiles={1}
                        onFilesChange={(files) => updateTrack(track.id, "audioFile", files[0])}
                        className="border-white/10"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Genre</Label>
                        <Select value={track.genre} onValueChange={(value) => updateTrack(track.id, "genre", value)}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select genre" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="pop">Pop</SelectItem>
                            <SelectItem value="rock">Rock</SelectItem>
                            <SelectItem value="hip-hop">Hip Hop</SelectItem>
                            <SelectItem value="electronic">Electronic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Mood</Label>
                        <Select value={track.mood} onValueChange={(value) => updateTrack(track.id, "mood", value)}>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select mood" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="happy">Happy</SelectItem>
                            <SelectItem value="sad">Sad</SelectItem>
                            <SelectItem value="energetic">Energetic</SelectItem>
                            <SelectItem value="chill">Chill</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">ISRC</Label>
                        <Input
                          value={track.isrc}
                          onChange={(e) => updateTrack(track.id, "isrc", e.target.value)}
                          placeholder="Auto-generated"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={track.explicit}
                        onCheckedChange={(checked) => updateTrack(track.id, "explicit", checked)}
                      />
                      <Label className="text-gray-300">Explicit Content</Label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splits" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Royalty Splits
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure how royalties will be split between collaborators
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Total Percentage</p>
                    <p className={`text-lg font-bold ${totalPercentage === 100 ? "text-green-400" : "text-red-400"}`}>
                      {totalPercentage}%
                    </p>
                  </div>
                  <Button onClick={addRoyaltySplit} className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Split
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {royaltySplits.map((split, index) => (
                <Card key={split.id} className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Name</Label>
                        <Input
                          value={split.name}
                          onChange={(e) => updateRoyaltySplit(split.id, "name", e.target.value)}
                          placeholder="Collaborator name"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Email</Label>
                        <Input
                          type="email"
                          value={split.email}
                          onChange={(e) => updateRoyaltySplit(split.id, "email", e.target.value)}
                          placeholder="email@example.com"
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Role</Label>
                        <Select
                          value={split.role}
                          onValueChange={(value) => updateRoyaltySplit(split.id, "role", value)}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="Artist">Artist</SelectItem>
                            <SelectItem value="Producer">Producer</SelectItem>
                            <SelectItem value="Songwriter">Songwriter</SelectItem>
                            <SelectItem value="Collaborator">Collaborator</SelectItem>
                            <SelectItem value="Label">Label</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Percentage</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={split.percentage}
                          onChange={(e) => updateRoyaltySplit(split.id, "percentage", Number(e.target.value))}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>

                      <div>
                        {royaltySplits.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRoyaltySplit(split.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {totalPercentage !== 100 && (
                <div className="p-4 bg-yellow-600/20 border border-yellow-600/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Total percentage must equal 100%. Current total: {totalPercentage}%
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dsps">
          <DSPList />
        </TabsContent>

        <TabsContent value="artwork" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Cover Artwork
              </CardTitle>
              <CardDescription className="text-gray-400">
                Upload your release artwork (minimum 3000x3000px, square format)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploader
                type="image"
                maxFiles={1}
                onFilesChange={(files) => setCoverArt(files[0])}
                className="border-white/10"
              />

              <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                <h4 className="text-blue-400 font-medium mb-2">Artwork Requirements:</h4>
                <ul className="text-blue-300 text-sm space-y-1">
                  <li>• Minimum 3000x3000 pixels (square format)</li>
                  <li>• Maximum file size: 10MB</li>
                  <li>• Formats: JPG, PNG</li>
                  <li>• RGB color mode</li>
                  <li>• No text smaller than 12pt</li>
                  <li>• No explicit content in artwork</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
