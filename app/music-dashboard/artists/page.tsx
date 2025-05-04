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
import { ChevronRight, Download, Edit, ExternalLink, Filter, Music, Plus, Search, User, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Sample data
const initialArtists = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/abstract-profile.png",
    role: "Primary",
    tracks: 12,
    releases: 5,
    streams: 34500,
    revenue: 1725.0,
    socialLinks: {
      spotify: "https://open.spotify.com/artist/example",
      instagram: "https://instagram.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "/diverse-person-portrait.png",
    role: "Featured",
    tracks: 3,
    releases: 2,
    streams: 12800,
    revenue: 640.0,
    socialLinks: {
      spotify: "https://open.spotify.com/artist/example2",
      instagram: "https://instagram.com/janesmith",
    },
  },
  {
    id: 3,
    name: "Alex Johnson",
    avatar: "/diverse-group.png",
    role: "Producer",
    tracks: 8,
    releases: 4,
    streams: 9200,
    revenue: 460.0,
    socialLinks: {
      spotify: "https://open.spotify.com/artist/example3",
    },
  },
  {
    id: 4,
    name: "Sarah Williams",
    avatar: "/placeholder.svg?key=sbhhb",
    role: "Featured",
    tracks: 2,
    releases: 2,
    streams: 5600,
    revenue: 280.0,
    socialLinks: {
      instagram: "https://instagram.com/sarahwilliams",
    },
  },
  {
    id: 5,
    name: "Mike Taylor",
    avatar: "/placeholder.svg?key=cel22",
    role: "Producer",
    tracks: 6,
    releases: 3,
    streams: 7800,
    revenue: 390.0,
    socialLinks: {
      spotify: "https://open.spotify.com/artist/example5",
      twitter: "https://twitter.com/miketaylor",
    },
  },
]

export default function ArtistsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [sortBy, setSortBy] = useState("streams")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [artistsData, setArtistsData] = useState(initialArtists)
  const [addArtistDialogOpen, setAddArtistDialogOpen] = useState(false)

  // New artist form state
  const [newArtistName, setNewArtistName] = useState("")
  const [newArtistRole, setNewArtistRole] = useState("Featured")
  const [newArtistSpotify, setNewArtistSpotify] = useState("")
  const [newArtistInstagram, setNewArtistInstagram] = useState("")
  const [newArtistTwitter, setNewArtistTwitter] = useState("")
  const [newArtistBio, setNewArtistBio] = useState("")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Artists refreshed",
        description: "Latest artist data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleArtistClick = (id: number) => {
    router.push(`/music-dashboard/artists/${id}`)
  }

  const handleAddArtist = () => {
    setAddArtistDialogOpen(true)
  }

  const handleSubmitNewArtist = () => {
    if (!newArtistName) {
      toast({
        title: "Missing information",
        description: "Please enter at least the artist name",
        variant: "destructive",
      })
      return
    }

    // Create social links object
    const socialLinks: Record<string, string> = {}
    if (newArtistSpotify) socialLinks.spotify = newArtistSpotify
    if (newArtistInstagram) socialLinks.instagram = newArtistInstagram
    if (newArtistTwitter) socialLinks.twitter = newArtistTwitter

    // Create new artist
    const newArtist = {
      id: artistsData.length + 1,
      name: newArtistName,
      avatar: "/diverse-group.png",
      role: newArtistRole,
      tracks: 0,
      releases: 0,
      streams: 0,
      revenue: 0,
      socialLinks,
    }

    // Add to artists data
    setArtistsData([...artistsData, newArtist])

    // Reset form and close dialog
    setNewArtistName("")
    setNewArtistRole("Featured")
    setNewArtistSpotify("")
    setNewArtistInstagram("")
    setNewArtistTwitter("")
    setNewArtistBio("")
    setAddArtistDialogOpen(false)

    toast({
      title: "Artist added",
      description: `${newArtistName} has been added to your artists`,
    })
  }

  const handleEditArtist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/music-dashboard/artists/${id}/edit`)
  }

  const handleViewSocial = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    toast({
      title: "Opening external link",
      description: "Redirecting to social profile",
    })
    window.open(url, "_blank")
  }

  // Filter and sort artists
  const filteredArtists = artistsData
    .filter((artist) => {
      const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRole = roleFilter === "all" || artist.role.toLowerCase() === roleFilter.toLowerCase()

      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      if (sortBy === "streams") return b.streams - a.streams
      if (sortBy === "revenue") return b.revenue - a.revenue
      if (sortBy === "tracks") return b.tracks - a.tracks
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Artists</h1>
          <p className="text-sm text-gray-400">Manage artists and collaborators</p>
        </div>
        <div className="flex items-center gap-2">
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
          <Button onClick={handleAddArtist}>
            <Plus className="mr-2 h-4 w-4" />
            Add Artist
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search artists..."
            className="pl-8 bg-gray-950 border-gray-800"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px] bg-gray-950 border-gray-800">
              <User className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="producer">Producer</SelectItem>
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
              <SelectItem value="tracks">Most Tracks</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Artists List */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Artists</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4 cursor-pointer hover:bg-gray-900 transition-colors"
                  onClick={() => handleArtistClick(artist.id)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={artist.avatar || "/placeholder.svg"}
                      alt={artist.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{artist.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <Badge
                          className={
                            artist.role === "Primary"
                              ? "bg-purple-500/20 text-purple-500"
                              : artist.role === "Featured"
                                ? "bg-blue-500/20 text-blue-500"
                                : "bg-green-500/20 text-green-500"
                          }
                        >
                          {artist.role}
                        </Badge>
                        <div className="flex gap-1">
                          {artist.socialLinks.spotify && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                              onClick={(e) => handleViewSocial(artist.socialLinks.spotify, e)}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm font-medium">{artist.tracks}</p>
                      <p className="text-xs text-gray-400">Tracks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{artist.releases}</p>
                      <p className="text-xs text-gray-400">Releases</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">{artist.streams.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Streams</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">${artist.revenue.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">Revenue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => handleEditArtist(artist.id, e)}
                    >
                      <Edit className="h-4 w-4" />
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
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No artists found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery || roleFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Add your first artist to get started"}
                </p>
                {!searchQuery && roleFilter === "all" && (
                  <Button className="mt-4" onClick={handleAddArtist}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Artist
                  </Button>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Artist Stats */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Artist Statistics</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Total Artists</p>
                  <h3 className="text-2xl font-bold">{artistsData.length}</h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Primary Artists</p>
                  <h3 className="text-2xl font-bold">
                    {artistsData.filter((artist) => artist.role === "Primary").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-900">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-400">Featured Artists</p>
                  <h3 className="text-2xl font-bold">
                    {artistsData.filter((artist) => artist.role === "Featured").length}
                  </h3>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Music className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Artist Dialog */}
      <Dialog open={addArtistDialogOpen} onOpenChange={setAddArtistDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Add New Artist</DialogTitle>
            <DialogDescription>Enter the artist details to add them to your roster</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="artist-name">Artist Name *</Label>
              <Input
                id="artist-name"
                placeholder="Enter artist name"
                className="bg-gray-950 border-gray-800"
                value={newArtistName}
                onChange={(e) => setNewArtistName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="artist-role">Role</Label>
              <Select value={newArtistRole} onValueChange={setNewArtistRole}>
                <SelectTrigger id="artist-role" className="bg-gray-950 border-gray-800">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Primary">Primary</SelectItem>
                  <SelectItem value="Featured">Featured</SelectItem>
                  <SelectItem value="Producer">Producer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="artist-bio">Bio</Label>
              <Textarea
                id="artist-bio"
                placeholder="Enter artist bio"
                className="bg-gray-950 border-gray-800"
                value={newArtistBio}
                onChange={(e) => setNewArtistBio(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Social Media</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm text-gray-400">Spotify</span>
                  <Input
                    placeholder="Spotify profile URL"
                    className="bg-gray-950 border-gray-800"
                    value={newArtistSpotify}
                    onChange={(e) => setNewArtistSpotify(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm text-gray-400">Instagram</span>
                  <Input
                    placeholder="Instagram profile URL"
                    className="bg-gray-950 border-gray-800"
                    value={newArtistInstagram}
                    onChange={(e) => setNewArtistInstagram(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 text-sm text-gray-400">Twitter</span>
                  <Input
                    placeholder="Twitter profile URL"
                    className="bg-gray-950 border-gray-800"
                    value={newArtistTwitter}
                    onChange={(e) => setNewArtistTwitter(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddArtistDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewArtist}>Add Artist</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )

  function handleExport() {
    toast({
      title: "Export started",
      description: "Your artists data is being exported to CSV",
    })
  }
}
