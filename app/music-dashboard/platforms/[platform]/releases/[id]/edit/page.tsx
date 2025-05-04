"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Trash2, Upload, Music, ImageIcon } from "lucide-react"

// Sample release data
const releaseData = {
  id: "REL-1236",
  title: "Summer Vibes",
  artist: "The Groove Collective",
  type: "EP",
  releaseDate: "2023-08-15",
  genre: "Electronic",
  subgenre: "Chill",
  language: "English",
  explicit: false,
  copyright: "© 2023 The Groove Collective",
  description: "A collection of laid-back electronic tracks perfect for summer days.",
  tracks: [
    {
      id: "TRK-001",
      title: "Sunset Dreams",
      duration: "3:45",
      isrc: "USRC12345678",
      explicit: false,
      position: 1,
    },
    {
      id: "TRK-002",
      title: "Ocean Waves",
      duration: "4:12",
      isrc: "USRC23456789",
      explicit: false,
      position: 2,
    },
    {
      id: "TRK-003",
      title: "Beach Party",
      duration: "3:58",
      isrc: "USRC34567890",
      explicit: false,
      position: 3,
    },
  ],
}

export default function EditReleasePage({ params }: { params: { platform: string; id: string } }) {
  const router = useRouter()
  const { platform, id } = params

  const [activeTab, setActiveTab] = useState("details")
  const [release, setRelease] = useState(releaseData)
  const [isSaving, setIsSaving] = useState(false)

  // Form state
  const [title, setTitle] = useState(release.title)
  const [artist, setArtist] = useState(release.artist)
  const [type, setType] = useState(release.type)
  const [releaseDate, setReleaseDate] = useState(release.releaseDate)
  const [genre, setGenre] = useState(release.genre)
  const [subgenre, setSubgenre] = useState(release.subgenre)
  const [language, setLanguage] = useState(release.language)
  const [explicit, setExplicit] = useState(release.explicit)
  const [copyright, setCopyright] = useState(release.copyright)
  const [description, setDescription] = useState(release.description)

  const platformName = platform
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)

      // Update release data
      setRelease({
        ...release,
        title,
        artist,
        type,
        releaseDate,
        genre,
        subgenre,
        language,
        explicit,
        copyright,
        description,
      })

      toast({
        title: "Changes saved",
        description: "Your release has been updated successfully",
      })
    }, 1500)
  }

  const handleBack = () => {
    router.back()
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="title">Release Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5 bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="artist">Artist Name *</Label>
                <Input
                  id="artist"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  className="mt-1.5 bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="type">Release Type *</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type" className="mt-1.5 bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select release type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="EP">EP</SelectItem>
                    <SelectItem value="Album">Album</SelectItem>
                    <SelectItem value="Compilation">Compilation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="release-date">Release Date *</Label>
                <Input
                  id="release-date"
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                  className="mt-1.5 bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="genre">Primary Genre *</Label>
                <Select value={genre} onValueChange={setGenre}>
                  <SelectTrigger id="genre" className="mt-1.5 bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronic">Electronic</SelectItem>
                    <SelectItem value="Rock">Rock</SelectItem>
                    <SelectItem value="Pop">Pop</SelectItem>
                    <SelectItem value="Hip-Hop">Hip-Hop</SelectItem>
                    <SelectItem value="R&B">R&B</SelectItem>
                    <SelectItem value="Jazz">Jazz</SelectItem>
                    <SelectItem value="Classical">Classical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subgenre">Subgenre</Label>
                <Input
                  id="subgenre"
                  value={subgenre}
                  onChange={(e) => setSubgenre(e.target.value)}
                  className="mt-1.5 bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="language">Primary Language *</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="mt-1.5 bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Instrumental">Instrumental</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-6">
                <Checkbox id="explicit" checked={explicit} onCheckedChange={(checked) => setExplicit(!!checked)} />
                <Label htmlFor="explicit">Contains explicit content</Label>
              </div>
            </div>

            <div>
              <Label htmlFor="copyright">Copyright Information *</Label>
              <Input
                id="copyright"
                value={copyright}
                onChange={(e) => setCopyright(e.target.value)}
                className="mt-1.5 bg-gray-950 border-gray-800"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1.5 bg-gray-950 border-gray-800"
                rows={4}
              />
            </div>
          </div>
        )
      case "tracks":
        return (
          <div className="space-y-6">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Tracks</h3>
              <Button>
                <Music className="mr-2 h-4 w-4" />
                Add Track
              </Button>
            </div>

            <div className="rounded-md border border-gray-800">
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                <div className="col-span-1">#</div>
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Duration</div>
                <div className="col-span-3">ISRC</div>
                <div className="col-span-1">Explicit</div>
                <div className="col-span-1"></div>
              </div>
              {release.tracks.map((track) => (
                <div
                  key={track.id}
                  className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                >
                  <div className="col-span-1">{track.position}</div>
                  <div className="col-span-4 font-medium">{track.title}</div>
                  <div className="col-span-2">{track.duration}</div>
                  <div className="col-span-3">{track.isrc}</div>
                  <div className="col-span-1">{track.explicit ? "Yes" : "No"}</div>
                  <div className="col-span-1 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "artwork":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Cover Artwork</h3>

            <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-800 bg-gray-950 p-6">
              <div className="mb-4 h-48 w-48 overflow-hidden rounded-md bg-gray-800">
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-16 w-16 text-gray-600" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-400">Upload a square image, minimum 3000x3000 pixels</p>
                <p className="text-xs text-gray-500">JPG or PNG, max 10MB</p>
              </div>
              <Button className="mt-4">
                <Upload className="mr-2 h-4 w-4" />
                Upload Artwork
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="outline" className="mb-4" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Edit Release</h1>
        <p className="text-sm text-gray-400">
          Editing {release.title} on {platformName}
        </p>
      </div>

      <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="details">Release Details</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="artwork">Artwork</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">
            {activeTab === "details" && "Release Details"}
            {activeTab === "tracks" && "Track List"}
            {activeTab === "artwork" && "Cover Artwork"}
          </CardTitle>
          <CardDescription>
            {activeTab === "details" && "Edit the basic information about your release"}
            {activeTab === "tracks" && "Manage the tracks in your release"}
            {activeTab === "artwork" && "Upload and manage your release artwork"}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderTabContent()}</CardContent>
      </Card>

      <div className="mt-6 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
