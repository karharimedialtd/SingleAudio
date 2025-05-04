"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { Calendar, ChevronRight, Download, Filter, Music, Plus, Search, Share2, Trash2 } from "lucide-react"

// Sample data
const releases = [
  {
    id: 1,
    title: "Midnight Dreams",
    type: "Single",
    artist: "John Doe",
    cover: "/abstract-soundscape.png",
    releaseDate: "2023-07-15",
    status: "Live",
    streams: 12500,
    platforms: 12,
    revenue: 625.0,
  },
  {
    id: 2,
    title: "Summer Vibes EP",
    type: "EP",
    artist: "John Doe ft. Jane Smith",
    cover: "/abstract-music-cover.png",
    releaseDate: "2023-06-01",
    status: "Live",
    streams: 8700,
    platforms: 10,
    revenue: 435.0,
  },
  {
    id: 3,
    title: "Acoustic Sessions",
    type: "Album",
    artist: "John Doe",
    cover: "/placeholder.svg?key=ibv6w",
    releaseDate: "2023-05-12",
    status: "Live",
    streams: 5200,
    platforms: 8,
    revenue: 260.0,
  },
  {
    id: 4,
    title: "Urban Beats",
    type: "Single",
    artist: "John Doe",
    cover: "/placeholder.svg?key=ub7yt",
    releaseDate: "2023-08-20",
    status: "Scheduled",
    streams: 0,
    platforms: 12,
    revenue: 0,
  },
  {
    id: 5,
    title: "Remix Collection",
    type: "EP",
    artist: "John Doe & Various Artists",
    cover: "/placeholder.svg?key=rc9zx",
    releaseDate: "2023-07-30",
    status: "Processing",
    streams: 0,
    platforms: 10,
    revenue: 0,
  },
]

export default function ReleasesPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [releasesData, setReleasesData] = useState(releases)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Releases refreshed",
        description: "Latest release data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleReleaseClick = (id: number) => {
    router.push(`/music-dashboard/releases/${id}`)
  }

  const handleNewRelease = () => {
    router.push("/music-dashboard/upload")
  }

  const handleShareRelease = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Share options opened",
      description: "Choose how you want to share this release",
    })
  }

  const handleDeleteRelease = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()

    // Filter out the deleted release
    setReleasesData(releasesData.filter((release) => release.id !== id))

    toast({
      title: "Release deleted",
      description: "The release has been removed from your catalog",
    })
  }

  // Filter releases based on search query and filters
  const filteredReleases = releasesData.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || release.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesType = typeFilter === "all" || release.type.toLowerCase() === typeFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Releases</h1>
          <p className="text-sm text-gray-400">Manage your music catalog and track performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
          <Button onClick={handleNewRelease}>
            <Plus className="mr-2 h-4 w-4" />
            New Release
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search releases..."
            className="pl-8 bg-gray-950 border-gray-800"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-gray-950 border-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all" onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px] bg-gray-950 border-gray-800">
              <Music className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="single">Singles</SelectItem>
              <SelectItem value="ep">EPs</SelectItem>
              <SelectItem value="album">Albums</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Releases List */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Releases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((release) => (
                <div
                  key={release.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4 cursor-pointer hover:bg-gray-900 transition-colors"
                  onClick={() => handleReleaseClick(release.id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={release.cover || "/placeholder.svg"}
                      alt={release.title}
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{release.title}</h3>
                      <p className="text-sm text-gray-400">{release.artist}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {release.type}
                        </Badge>
                        <Badge
                          className={
                            release.status === "Live"
                              ? "bg-green-500/20 text-green-500"
                              : release.status === "Processing"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-orange-500/20 text-orange-500"
                          }
                        >
                          {release.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm font-medium">{release.streams.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Streams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{release.platforms}</p>
                      <p className="text-xs text-gray-400">Platforms</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">${release.revenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Revenue</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">
                        {new Date(release.releaseDate).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-gray-400">Release Date</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleShareRelease(release.id, e)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-600/10"
                      onClick={(e) => handleDeleteRelease(release.id, e)}
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
                <h3 className="mt-4 text-lg font-medium">No releases found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Upload your first release to get started"}
                </p>
                {!searchQuery && statusFilter === "all" && typeFilter === "all" && (
                  <Button className="mt-4" onClick={handleNewRelease}>
                    <Plus className="mr-2 h-4 w-4" />
                    Upload Music
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Releases */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Upcoming Releases</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {releasesData
            .filter((release) => release.status === "Scheduled")
            .map((release) => (
              <Card
                key={release.id}
                className="border-gray-800 bg-gray-900 cursor-pointer hover:bg-gray-800 transition-colors"
                onClick={() => handleReleaseClick(release.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{release.title}</h3>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-400">
                          {new Date(release.releaseDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {release.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )

  function handleExport() {
    toast({
      title: "Export started",
      description: "Your releases data is being exported to CSV",
    })
  }
}
