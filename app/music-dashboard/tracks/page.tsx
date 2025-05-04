"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { BarChart3, ChevronRight, Download, Filter, Music, Play, Search, Share2, Trash2 } from "lucide-react"

// Sample data
const tracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "John Doe",
    album: "Midnight Dreams - Single",
    cover: "/abstract-soundscape.png",
    duration: "3:45",
    streams: 12500,
    revenue: 625.0,
    releaseDate: "2023-07-15",
    isrc: "USRC12345678",
  },
  {
    id: 2,
    title: "Summer Vibes",
    artist: "John Doe ft. Jane Smith",
    album: "Summer Vibes EP",
    cover: "/abstract-music-cover.png",
    duration: "4:12",
    streams: 8700,
    revenue: 435.0,
    releaseDate: "2023-06-01",
    isrc: "USRC23456789",
  },
  {
    id: 3,
    title: "Acoustic Session #1",
    artist: "John Doe",
    album: "Acoustic Sessions",
    cover: "/placeholder.svg?key=ibv6w",
    duration: "5:30",
    streams: 5200,
    revenue: 260.0,
    releaseDate: "2023-05-12",
    isrc: "USRC34567890",
  },
  {
    id: 4,
    title: "Acoustic Session #2",
    artist: "John Doe",
    album: "Acoustic Sessions",
    cover: "/placeholder.svg?key=ibv6w",
    duration: "4:55",
    streams: 4800,
    revenue: 240.0,
    releaseDate: "2023-05-12",
    isrc: "USRC45678901",
  },
  {
    id: 5,
    title: "Urban Beats",
    artist: "John Doe",
    album: "Urban Beats - Single",
    cover: "/placeholder.svg?key=ub7yt",
    duration: "3:22",
    streams: 3200,
    revenue: 160.0,
    releaseDate: "2023-04-20",
    isrc: "USRC56789012",
  },
]

export default function TracksPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [albumFilter, setAlbumFilter] = useState("all")
  const [sortBy, setSortBy] = useState("streams")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [tracksData, setTracksData] = useState(tracks)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Tracks refreshed",
        description: "Latest track data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleTrackClick = (id: number) => {
    router.push(`/music-dashboard/tracks/${id}`)
  }

  const handlePlayTrack = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()

    if (currentlyPlaying === id) {
      setCurrentlyPlaying(null)
      toast({
        title: "Playback stopped",
        description: "Track playback has been stopped",
      })
    } else {
      setCurrentlyPlaying(id)
      toast({
        title: "Now playing",
        description: `Playing "${tracksData.find((track) => track.id === id)?.title}"`,
      })
    }
  }

  const handleShareTrack = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Share options opened",
      description: "Choose how you want to share this track",
    })
  }

  const handleDeleteTrack = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()

    // Filter out the deleted track
    setTracksData(tracksData.filter((track) => track.id !== id))

    toast({
      title: "Track deleted",
      description: "The track has been removed from your catalog",
    })
  }

  // Get unique albums for filter
  const albums = Array.from(new Set(tracksData.map((track) => track.album)))

  // Filter and sort tracks
  const filteredTracks = tracksData
    .filter((track) => {
      const matchesSearch =
        track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesAlbum = albumFilter === "all" || track.album === albumFilter

      return matchesSearch && matchesAlbum
    })
    .sort((a, b) => {
      if (sortBy === "streams") return b.streams - a.streams
      if (sortBy === "revenue") return b.revenue - a.revenue
      if (sortBy === "date") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      if (sortBy === "title") return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tracks</h1>
          <p className="text-sm text-gray-400">Manage your individual tracks and monitor performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search tracks..."
            className="pl-8 bg-gray-950 border-gray-800"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setAlbumFilter}>
            <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
              <Music className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Album/Release" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Albums</SelectItem>
              {albums.map((album) => (
                <SelectItem key={album} value={album}>
                  {album}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select defaultValue="streams" onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="streams">Most Streams</SelectItem>
              <SelectItem value="revenue">Highest Revenue</SelectItem>
              <SelectItem value="date">Release Date</SelectItem>
              <SelectItem value="title">Title (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tracks List */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track) => (
                <div
                  key={track.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4 cursor-pointer hover:bg-gray-900 transition-colors"
                  onClick={() => handleTrackClick(track.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={track.cover || "/placeholder.svg"}
                        alt={track.title}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute inset-0 flex items-center justify-center h-full w-full rounded-md bg-black/50 ${
                          currentlyPlaying === track.id ? "text-purple-500" : "text-white"
                        }`}
                        onClick={(e) => handlePlayTrack(track.id, e)}
                      >
                        <Play className="h-8 w-8" fill={currentlyPlaying === track.id ? "currentColor" : "none"} />
                      </Button>
                    </div>
                    <div>
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                      <p className="text-xs text-gray-500">{track.album}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm font-medium">{track.duration}</p>
                      <p className="text-xs text-gray-400">Duration</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{track.streams.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Streams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">${track.revenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{track.isrc}</p>
                      <p className="text-xs text-gray-400">ISRC</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleShareTrack(track.id, e)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-600/10"
                      onClick={(e) => handleDeleteTrack(track.id, e)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <Music className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No tracks found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery || albumFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Upload your first track to get started"}
                </p>
                {!searchQuery && albumFilter === "all" && (
                  <Button className="mt-4" onClick={() => router.push("/music-dashboard/upload")}>
                    <Music className="mr-2 h-4 w-4" />
                    Upload Music
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Performance Overview</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Tracks</p>
                  <h3 className="text-2xl font-bold">{tracksData.length}</h3>
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
                    {tracksData.reduce((sum, track) => sum + track.streams, 0).toLocaleString()}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                  <h3 className="text-2xl font-bold">
                    ${tracksData.reduce((sum, track) => sum + track.revenue, 0).toFixed(2)}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  function handleExport() {
    toast({
      title: "Export started",
      description: "Your tracks data is being exported to CSV",
    })
  }
}
