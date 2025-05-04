"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { ArrowLeft, ChevronRight, Edit, ExternalLink, Filter, Music, Plus, Search } from "lucide-react"

// Sample data for releases
const releasesData = {
  spotify: [
    {
      id: "REL-1234",
      title: "Summer Vibes EP",
      type: "EP",
      releaseDate: "2023-06-15",
      tracks: 5,
      streams: 12500,
      status: "Released",
      coverArt: "/placeholder.svg?key=f6znx",
      url: "https://open.spotify.com/album/example",
    },
    {
      id: "REL-1235",
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2023-07-28",
      tracks: 1,
      streams: 8700,
      status: "Released",
      coverArt: "/placeholder.svg?key=k5fn3",
      url: "https://open.spotify.com/album/example2",
    },
    {
      id: "REL-1236",
      title: "Urban Echoes",
      type: "Album",
      releaseDate: "2023-08-05",
      tracks: 12,
      streams: 5200,
      status: "Released",
      coverArt: "/placeholder.svg?key=sn6qj",
      url: "https://open.spotify.com/album/example3",
    },
  ],
  "apple-music": [
    {
      id: "REL-1234",
      title: "Summer Vibes EP",
      type: "EP",
      releaseDate: "2023-06-15",
      tracks: 5,
      streams: 9800,
      status: "Released",
      coverArt: "/placeholder.svg?key=wd9xh",
      url: "https://music.apple.com/album/example",
    },
    {
      id: "REL-1235",
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2023-07-28",
      tracks: 1,
      streams: 6500,
      status: "Released",
      coverArt: "/placeholder.svg?key=sk1gr",
      url: "https://music.apple.com/album/example2",
    },
    {
      id: "REL-1236",
      title: "Urban Echoes",
      type: "Album",
      releaseDate: "2023-08-05",
      tracks: 12,
      streams: 4100,
      status: "Released",
      coverArt: "/placeholder.svg?key=qek5h",
      url: "https://music.apple.com/album/example3",
    },
  ],
  "youtube-music": [
    {
      id: "REL-1234",
      title: "Summer Vibes EP",
      type: "EP",
      releaseDate: "2023-06-15",
      tracks: 5,
      streams: 15200,
      status: "Released",
      coverArt: "/placeholder.svg?key=n4t17",
      url: "https://music.youtube.com/playlist?list=example",
    },
    {
      id: "REL-1235",
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2023-07-28",
      tracks: 1,
      streams: 10300,
      status: "Released",
      coverArt: "/placeholder.svg?key=bnwdi",
      url: "https://music.youtube.com/playlist?list=example2",
    },
    {
      id: "REL-1236",
      title: "Urban Echoes",
      type: "Album",
      releaseDate: "2023-08-05",
      tracks: 12,
      streams: 7800,
      status: "Released",
      coverArt: "/placeholder.svg?key=n9q5u",
      url: "https://music.youtube.com/playlist?list=example3",
    },
  ],
  "amazon-music": [
    {
      id: "REL-1234",
      title: "Summer Vibes EP",
      type: "EP",
      releaseDate: "2023-06-15",
      tracks: 5,
      streams: 7200,
      status: "Released",
      coverArt: "/placeholder.svg?key=8sirf",
      url: "https://music.amazon.com/albums/example",
    },
    {
      id: "REL-1235",
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2023-07-28",
      tracks: 1,
      streams: 4900,
      status: "Released",
      coverArt: "/placeholder.svg?key=3ysj1",
      url: "https://music.amazon.com/albums/example2",
    },
    {
      id: "REL-1236",
      title: "Urban Echoes",
      type: "Album",
      releaseDate: "2023-08-05",
      tracks: 12,
      streams: 3500,
      status: "Released",
      coverArt: "/placeholder.svg?key=uf3l4",
      url: "https://music.amazon.com/albums/example3",
    },
  ],
}

const platformNames: Record<string, string> = {
  spotify: "Spotify",
  "apple-music": "Apple Music",
  "youtube-music": "YouTube Music",
  "amazon-music": "Amazon Music",
  deezer: "Deezer",
  tidal: "Tidal",
  soundcloud: "SoundCloud",
}

const platformLogos: Record<string, string> = {
  spotify: "/spotify-logo.png",
  "apple-music": "/apple-music-logo.png",
  "youtube-music": "/youtube-music-logo.png",
  "amazon-music": "/amazon-music-logo.png",
  deezer: "/placeholder.svg?key=ec23v",
  tidal: "/abstract-wave-logo.png",
  soundcloud: "/soundcloud-logo.png",
}

export default function PlatformReleasesPage({ params }: { params: { platform: string } }) {
  const router = useRouter()
  const platform = params.platform
  const platformName = platformNames[platform] || platform
  const platformLogo = platformLogos[platform] || "/placeholder.svg"

  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [releases, setReleases] = useState(releasesData[platform as keyof typeof releasesData] || [])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Releases refreshed",
        description: `Latest ${platformName} releases have been loaded`,
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleBack = () => {
    router.push("/music-dashboard/platforms")
  }

  const handleViewRelease = (url: string) => {
    toast({
      title: "Opening external link",
      description: `Redirecting to ${platformName} release page`,
    })
    window.open(url, "_blank")
  }

  const handleEditRelease = (id: string) => {
    router.push(`/music-dashboard/platforms/${platform}/releases/${id}/edit`)
  }

  const handleAddRelease = () => {
    toast({
      title: "Add release",
      description: `Opening release creation form for ${platformName}`,
    })
    // In a real app, this would navigate to a release creation page
  }

  // Filter and sort releases
  const filteredReleases = releases
    .filter((release) => {
      return release.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      if (sortBy === "streams") return b.streams - a.streams
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-3">
          <img src={platformLogo || "/placeholder.svg"} alt={platformName} className="h-8 w-8 object-contain" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{platformName} Releases</h1>
            <p className="text-sm text-gray-400">Manage your releases on {platformName}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search releases..."
              className="pl-8 bg-gray-950 border-gray-800"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Release Date</SelectItem>
              <SelectItem value="streams">Most Streams</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
        <Button onClick={handleAddRelease}>
          <Plus className="mr-2 h-4 w-4" />
          Add Release
        </Button>
      </div>

      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your {platformName} Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((release) => (
                <div key={release.id} className="rounded-lg border border-gray-800 bg-gray-950 overflow-hidden">
                  <div className="aspect-square w-full">
                    <img
                      src={release.coverArt || "/placeholder.svg"}
                      alt={release.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{release.title}</h3>
                      <Badge variant="outline">{release.type}</Badge>
                    </div>
                    <div className="mt-1 text-sm text-gray-400">
                      <p>Released: {release.releaseDate}</p>
                      <p>Tracks: {release.tracks}</p>
                      <p>Streams: {release.streams.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleEditRelease(release.id)}
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                        onClick={() => handleViewRelease(release.url)}
                      >
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View on {platformName}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <Music className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No releases found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : `You don't have any releases on ${platformName} yet`}
                </p>
                {!searchQuery && (
                  <Button className="mt-4" onClick={handleAddRelease}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Release
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">{platformName} Statistics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Releases</p>
                  <h3 className="text-2xl font-bold">{releases.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Music className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Streams</p>
                  <h3 className="text-2xl font-bold">
                    {releases.reduce((sum, release) => sum + release.streams, 0).toLocaleString()}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <ChevronRight className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Tracks</p>
                  <h3 className="text-2xl font-bold">{releases.reduce((sum, release) => sum + release.tracks, 0)}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Music className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
