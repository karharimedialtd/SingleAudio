"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  Download,
  Play,
  Calendar,
  Music,
  TrendingUp,
  Eye,
  DollarSign,
  MoreHorizontal,
  Edit,
  BarChart3,
} from "lucide-react"

interface Release {
  id: string
  title: string
  artist: string
  type: "single" | "ep" | "album"
  status: "draft" | "pending" | "processing" | "live" | "rejected"
  releaseDate: string
  streams: number
  revenue: number
  artwork: string
  tracks: number
  dsps: string[]
}

const mockReleases: Release[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    artist: "Luna Rodriguez",
    type: "single",
    status: "live",
    releaseDate: "2024-01-15",
    streams: 125430,
    revenue: 892.45,
    artwork: "/placeholder.svg?height=60&width=60",
    tracks: 1,
    dsps: ["Spotify", "Apple Music", "YouTube Music"],
  },
  {
    id: "2",
    title: "Electric Nights EP",
    artist: "Neon Pulse",
    type: "ep",
    status: "processing",
    releaseDate: "2024-02-01",
    streams: 0,
    revenue: 0,
    artwork: "/placeholder.svg?height=60&width=60",
    tracks: 4,
    dsps: ["Spotify", "Apple Music", "Deezer"],
  },
  {
    id: "3",
    title: "Reflections",
    artist: "Maya Chen",
    type: "album",
    status: "live",
    releaseDate: "2023-12-10",
    streams: 89234,
    revenue: 1245.67,
    artwork: "/placeholder.svg?height=60&width=60",
    tracks: 12,
    dsps: ["Spotify", "Apple Music", "YouTube Music", "Tidal"],
  },
  {
    id: "4",
    title: "Summer Vibes",
    artist: "Beach House Collective",
    type: "single",
    status: "draft",
    releaseDate: "2024-03-15",
    streams: 0,
    revenue: 0,
    artwork: "/placeholder.svg?height=60&width=60",
    tracks: 1,
    dsps: [],
  },
]

export default function MusicCatalogPage() {
  const { setCurrentPage } = useDashboard()
  const [releases, setReleases] = useState<Release[]>(mockReleases)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  useEffect(() => {
    setCurrentPage("Music Catalog")
  }, [setCurrentPage])

  const filteredReleases = releases.filter((release) => {
    const matchesSearch =
      release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || release.status === statusFilter
    const matchesType = typeFilter === "all" || release.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      processing: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      live: "bg-green-600/20 text-green-400 border-green-600/30",
      rejected: "bg-red-600/20 text-red-400 border-red-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const handlePlayRelease = (releaseId: string) => {
    const release = releases.find((r) => r.id === releaseId)
    console.log(`Playing release: ${release?.title}`)
    alert(`🎵 Now playing: "${release?.title}" by ${release?.artist}`)
  }

  const handleDownloadRelease = (releaseId: string) => {
    const release = releases.find((r) => r.id === releaseId)
    console.log(`Downloading release: ${release?.title}`)

    // Simulate download
    const csvContent = `data:text/csv;charset=utf-8,Title,Artist,Streams,Revenue\n${release?.title},${release?.artist},${release?.streams},${release?.revenue}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${release?.title}-data.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    alert(`📥 Downloaded data for "${release?.title}"`)
  }

  const handleEditRelease = (releaseId: string) => {
    console.log(`Editing release: ${releaseId}`)
    window.location.href = `/dashboard/music/release?edit=${releaseId}`
  }

  const handleViewAnalytics = (releaseId: string) => {
    const release = releases.find((r) => r.id === releaseId)
    console.log(`Viewing analytics for: ${release?.title}`)
    window.location.href = `/dashboard/analytics?release=${releaseId}`
  }

  const totalStreams = releases.reduce((sum, release) => sum + release.streams, 0)
  const totalRevenue = releases.reduce((sum, release) => sum + release.revenue, 0)
  const liveReleases = releases.filter((r) => r.status === "live").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Music Catalog</h1>
          <p className="text-gray-400">Manage your music releases and track performance</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => (window.location.href = "/dashboard/music/release")}
        >
          <Music className="h-4 w-4 mr-2" />
          New Release
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Releases</p>
                <p className="text-2xl font-bold text-white">{releases.length}</p>
              </div>
              <Music className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Live Releases</p>
                <p className="text-2xl font-bold text-white">{liveReleases}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">{totalStreams.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search releases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="live" className="text-gray-300 data-[state=active]:text-white">
                    Live
                  </TabsTrigger>
                  <TabsTrigger value="processing" className="text-gray-300 data-[state=active]:text-white">
                    Processing
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="text-gray-300 data-[state=active]:text-white">
                    Draft
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Tabs value={typeFilter} onValueChange={setTypeFilter}>
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                    All Types
                  </TabsTrigger>
                  <TabsTrigger value="single" className="text-gray-300 data-[state=active]:text-white">
                    Singles
                  </TabsTrigger>
                  <TabsTrigger value="ep" className="text-gray-300 data-[state=active]:text-white">
                    EPs
                  </TabsTrigger>
                  <TabsTrigger value="album" className="text-gray-300 data-[state=active]:text-white">
                    Albums
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Releases List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Your Releases</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredReleases.length} of {releases.length} releases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReleases.map((release) => (
              <Card key={release.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 rounded-lg">
                      <AvatarImage src={release.artwork || "/placeholder.svg"} alt={release.title} />
                      <AvatarFallback className="bg-purple-600 text-white rounded-lg">
                        {release.title.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold text-white truncate">{release.title}</h3>
                        {getStatusBadge(release.status)}
                        <Badge variant="outline" className="border-white/20 text-gray-300">
                          {release.type.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-gray-400 mb-2">{release.artist}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(release.releaseDate).toLocaleDateString()}
                        </span>
                        <span>
                          {release.tracks} track{release.tracks !== 1 ? "s" : ""}
                        </span>
                        <span>{release.dsps.length} DSPs</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-6 mb-2">
                        <div>
                          <p className="text-sm text-gray-400">Streams</p>
                          <p className="text-lg font-semibold text-white">{release.streams.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Revenue</p>
                          <p className="text-lg font-semibold text-white">${release.revenue.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handlePlayRelease(release.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleDownloadRelease(release.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleEditRelease(release.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                            <DropdownMenuItem
                              className="text-gray-300 hover:text-white hover:bg-gray-800"
                              onClick={() => handleViewAnalytics(release.id)}
                            >
                              <BarChart3 className="h-4 w-4 mr-2" />
                              View Analytics
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-gray-300 hover:text-white hover:bg-gray-800"
                              onClick={() => handleEditRelease(release.id)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Release
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReleases.length === 0 && (
            <div className="text-center py-12">
              <Music className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No releases found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
