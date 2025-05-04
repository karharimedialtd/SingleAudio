"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { FilterButton } from "@/components/filter-button"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { Search, Music, Radio, Film, Tv, Headphones, Globe, Download, Play, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Sample data for music usage
const usageData = [
  { month: "Jan", streams: 12500, radio: 3200, sync: 850, downloads: 1200 },
  { month: "Feb", streams: 15000, radio: 3500, sync: 920, downloads: 1100 },
  { month: "Mar", streams: 18200, radio: 3800, sync: 1050, downloads: 950 },
  { month: "Apr", streams: 22000, radio: 4100, sync: 1200, downloads: 850 },
  { month: "May", streams: 25500, radio: 4500, sync: 1350, downloads: 750 },
  { month: "Jun", streams: 30000, radio: 5000, sync: 1500, downloads: 650 },
]

// Sample data for streaming platforms
const streamingData = [
  { platform: "Spotify", streams: 15200, share: 45 },
  { platform: "Apple Music", streams: 8500, share: 25 },
  { platform: "YouTube Music", streams: 5100, share: 15 },
  { platform: "Amazon Music", streams: 3400, share: 10 },
  { platform: "Others", streams: 1700, share: 5 },
]

// Sample data for sync licenses
const initialSyncLicenses = [
  {
    id: "SYN-1234",
    title: "Summer Vibes",
    mediaType: "TV Show",
    show: "Beach Life",
    episode: "Season 2, Episode 5",
    duration: "45 seconds",
    fee: "$1,200",
    date: "2023-06-15",
  },
  {
    id: "SYN-1235",
    title: "Urban Echoes",
    mediaType: "Film",
    show: "City Nights",
    episode: "Feature Film",
    duration: "1:30 minutes",
    fee: "$3,500",
    date: "2023-05-20",
  },
  {
    id: "SYN-1236",
    title: "Acoustic Sessions",
    mediaType: "Commercial",
    show: "Summer Fashion",
    episode: "TV Commercial",
    duration: "30 seconds",
    fee: "$2,000",
    date: "2023-07-10",
  },
  {
    id: "SYN-1237",
    title: "Midnight Dreams",
    mediaType: "Video Game",
    show: "Night Racer",
    episode: "Main Menu Theme",
    duration: "Loop",
    fee: "$2,800",
    date: "2023-04-05",
  },
]

// Sample data for radio plays
const initialRadioPlays = [
  {
    id: "RAD-1234",
    title: "Summer Vibes",
    station: "KCRW",
    location: "Los Angeles, CA",
    plays: 45,
    date: "2023-06-15",
  },
  {
    id: "RAD-1235",
    title: "Urban Echoes",
    station: "BBC Radio 1",
    location: "London, UK",
    plays: 32,
    date: "2023-05-20",
  },
  {
    id: "RAD-1236",
    title: "Acoustic Sessions",
    station: "Triple J",
    location: "Sydney, Australia",
    plays: 28,
    date: "2023-07-10",
  },
  {
    id: "RAD-1237",
    title: "Midnight Dreams",
    station: "SiriusXM",
    location: "Nationwide",
    plays: 56,
    date: "2023-04-05",
  },
]

export default function MusicUsagePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [syncLicenses, setSyncLicenses] = useState(initialSyncLicenses)
  const [radioPlays, setRadioPlays] = useState(initialRadioPlays)

  // Dialog states
  const [addSyncDialogOpen, setAddSyncDialogOpen] = useState(false)
  const [addRadioDialogOpen, setAddRadioDialogOpen] = useState(false)

  // New sync license form state
  const [newSyncTitle, setNewSyncTitle] = useState("")
  const [newSyncMediaType, setNewSyncMediaType] = useState("TV Show")
  const [newSyncShow, setNewSyncShow] = useState("")
  const [newSyncEpisode, setNewSyncEpisode] = useState("")
  const [newSyncDuration, setNewSyncDuration] = useState("")
  const [newSyncFee, setNewSyncFee] = useState("")

  // New radio play form state
  const [newRadioTitle, setNewRadioTitle] = useState("")
  const [newRadioStation, setNewRadioStation] = useState("")
  const [newRadioLocation, setNewRadioLocation] = useState("")
  const [newRadioPlays, setNewRadioPlays] = useState("")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Data refreshed",
        description: "Latest usage data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddSyncLicense = () => {
    setAddSyncDialogOpen(true)
  }

  const handleSubmitNewSync = () => {
    if (!newSyncTitle || !newSyncMediaType || !newSyncShow || !newSyncFee) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create new sync license
    const newSync = {
      id: `SYN-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newSyncTitle,
      mediaType: newSyncMediaType,
      show: newSyncShow,
      episode: newSyncEpisode,
      duration: newSyncDuration,
      fee: newSyncFee.startsWith("$") ? newSyncFee : `$${newSyncFee}`,
      date: new Date().toISOString().split("T")[0],
    }

    // Add to sync licenses
    setSyncLicenses([newSync, ...syncLicenses])

    // Reset form and close dialog
    setNewSyncTitle("")
    setNewSyncMediaType("TV Show")
    setNewSyncShow("")
    setNewSyncEpisode("")
    setNewSyncDuration("")
    setNewSyncFee("")
    setAddSyncDialogOpen(false)

    toast({
      title: "Sync license added",
      description: "Your new sync license has been added successfully",
    })
  }

  const handleAddRadioPlay = () => {
    setAddRadioDialogOpen(true)
  }

  const handleSubmitNewRadio = () => {
    if (!newRadioTitle || !newRadioStation || !newRadioLocation || !newRadioPlays) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create new radio play
    const newRadio = {
      id: `RAD-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newRadioTitle,
      station: newRadioStation,
      location: newRadioLocation,
      plays: Number.parseInt(newRadioPlays),
      date: new Date().toISOString().split("T")[0],
    }

    // Add to radio plays
    setRadioPlays([newRadio, ...radioPlays])

    // Reset form and close dialog
    setNewRadioTitle("")
    setNewRadioStation("")
    setNewRadioLocation("")
    setNewRadioPlays("")
    setAddRadioDialogOpen(false)

    toast({
      title: "Radio play added",
      description: "Your new radio play has been added successfully",
    })
  }

  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case "TV Show":
        return <Tv className="h-4 w-4" />
      case "Film":
        return <Film className="h-4 w-4" />
      case "Commercial":
        return <Tv className="h-4 w-4" />
      case "Video Game":
        return <Play className="h-4 w-4" />
      default:
        return <Music className="h-4 w-4" />
    }
  }

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Streams</p>
                      <h3 className="text-2xl font-bold">123,456</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                      <Headphones className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-green-500">+15.2% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Radio Plays</p>
                      <h3 className="text-2xl font-bold">2,345</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                      <Radio className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-green-500">+8.7% from last month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Sync Licenses</p>
                      <h3 className="text-2xl font-bold">18</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                      <Film className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-green-500">+2 new licenses this month</p>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Downloads</p>
                      <h3 className="text-2xl font-bold">5,678</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20">
                      <Download className="h-6 w-6 text-orange-500" />
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-red-500">-3.5% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Usage Trends</CardTitle>
                <CardDescription>Track how your music is being used over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Chart would go here - removed for simplicity */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-gray-800 bg-gray-950">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Chart showing usage trends over time</p>
                      <p className="text-xs text-gray-500">Streams, Radio Plays, Sync Licenses, and Downloads</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "streaming":
        return (
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Streaming Platforms</CardTitle>
                <CardDescription>Breakdown of streams by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* Chart would go here - removed for simplicity */}
                  <div className="flex h-full w-full items-center justify-center rounded-md border border-dashed border-gray-800 bg-gray-950">
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Bar chart showing streams by platform</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-4">Platform</div>
                    <div className="col-span-3">Streams</div>
                    <div className="col-span-3">Share</div>
                    <div className="col-span-2">Trend</div>
                  </div>
                  {streamingData.map((platform) => (
                    <div
                      key={platform.platform}
                      className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                    >
                      <div className="col-span-4 font-medium">{platform.platform}</div>
                      <div className="col-span-3">{platform.streams.toLocaleString()}</div>
                      <div className="col-span-3">{platform.share}%</div>
                      <div className="col-span-2">
                        <Badge className="bg-green-500/20 text-green-500">+12%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Tracks</CardTitle>
                <CardDescription>Your most streamed tracks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-4">Track</div>
                    <div className="col-span-2">Streams</div>
                    <div className="col-span-2">Share</div>
                    <div className="col-span-2">Trend</div>
                    <div className="col-span-2">Top Platform</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm">
                    <div className="col-span-4 font-medium">Summer Vibes</div>
                    <div className="col-span-2">45,678</div>
                    <div className="col-span-2">37%</div>
                    <div className="col-span-2">
                      <Badge className="bg-green-500/20 text-green-500">+18%</Badge>
                    </div>
                    <div className="col-span-2">Spotify</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm">
                    <div className="col-span-4 font-medium">Urban Echoes</div>
                    <div className="col-span-2">32,456</div>
                    <div className="col-span-2">26%</div>
                    <div className="col-span-2">
                      <Badge className="bg-green-500/20 text-green-500">+12%</Badge>
                    </div>
                    <div className="col-span-2">Apple Music</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm">
                    <div className="col-span-4 font-medium">Midnight Dreams</div>
                    <div className="col-span-2">25,789</div>
                    <div className="col-span-2">21%</div>
                    <div className="col-span-2">
                      <Badge className="bg-red-500/20 text-red-500">-3%</Badge>
                    </div>
                    <div className="col-span-2">YouTube Music</div>
                  </div>
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm">
                    <div className="col-span-4 font-medium">Acoustic Sessions</div>
                    <div className="col-span-2">19,543</div>
                    <div className="col-span-2">16%</div>
                    <div className="col-span-2">
                      <Badge className="bg-green-500/20 text-green-500">+5%</Badge>
                    </div>
                    <div className="col-span-2">Spotify</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "sync":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Sync Licenses</h2>
              <Button onClick={handleAddSyncLicense}>
                <Plus className="mr-2 h-4 w-4" />
                Add Sync License
              </Button>
            </div>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Sync Licenses</CardTitle>
                <CardDescription>Track your music used in media</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-3">Track</div>
                    <div className="col-span-2">Media Type</div>
                    <div className="col-span-3">Show/Project</div>
                    <div className="col-span-2">Duration</div>
                    <div className="col-span-2">License Fee</div>
                  </div>
                  {syncLicenses.map((license) => (
                    <div
                      key={license.id}
                      className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                    >
                      <div className="col-span-3 font-medium">{license.title}</div>
                      <div className="col-span-2 flex items-center gap-1">
                        {getMediaTypeIcon(license.mediaType)}
                        <span>{license.mediaType}</span>
                      </div>
                      <div className="col-span-3">
                        <div>{license.show}</div>
                        <div className="text-xs text-gray-400">{license.episode}</div>
                      </div>
                      <div className="col-span-2">{license.duration}</div>
                      <div className="col-span-2 font-medium text-green-500">{license.fee}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Sync Opportunities</CardTitle>
                <CardDescription>Potential sync licensing opportunities for your music</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-blue-500/20 text-blue-500">New Opportunity</Badge>
                      <h3 className="font-medium">TV Commercial - Sports Brand</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Looking for upbeat, energetic tracks for a new sports apparel campaign
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">Submit Tracks</Button>
                  </div>
                </div>

                <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="mb-2 bg-blue-500/20 text-blue-500">New Opportunity</Badge>
                      <h3 className="font-medium">Indie Film - Drama</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Seeking emotional, piano-driven tracks for key scenes in an upcoming indie drama
                      </p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">Submit Tracks</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "radio":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Radio Plays</h2>
              <Button onClick={handleAddRadioPlay}>
                <Plus className="mr-2 h-4 w-4" />
                Add Radio Play
              </Button>
            </div>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Radio Plays</CardTitle>
                <CardDescription>Track your music played on radio stations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-3">Track</div>
                    <div className="col-span-3">Station</div>
                    <div className="col-span-3">Location</div>
                    <div className="col-span-1">Plays</div>
                    <div className="col-span-2">Date</div>
                  </div>
                  {radioPlays.map((play) => (
                    <div
                      key={play.id}
                      className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                    >
                      <div className="col-span-3 font-medium">{play.title}</div>
                      <div className="col-span-3">{play.station}</div>
                      <div className="col-span-3">{play.location}</div>
                      <div className="col-span-1">{play.plays}</div>
                      <div className="col-span-2 text-gray-400">{play.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Radio Markets</CardTitle>
                <CardDescription>Where your music is getting the most radio play</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <h3 className="font-medium">Top Stations</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                            <Radio className="h-3 w-3 text-blue-500" />
                          </div>
                          <span>KCRW</span>
                        </div>
                        <span>45 plays</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                            <Radio className="h-3 w-3 text-blue-500" />
                          </div>
                          <span>BBC Radio 1</span>
                        </div>
                        <span>32 plays</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                            <Radio className="h-3 w-3 text-blue-500" />
                          </div>
                          <span>SiriusXM</span>
                        </div>
                        <span>56 plays</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                    <h3 className="font-medium">Top Regions</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                            <Globe className="h-3 w-3 text-green-500" />
                          </div>
                          <span>Los Angeles, CA</span>
                        </div>
                        <span>78 plays</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                            <Globe className="h-3 w-3 text-green-500" />
                          </div>
                          <span>London, UK</span>
                        </div>
                        <span>65 plays</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                            <Globe className="h-3 w-3 text-green-500" />
                          </div>
                          <span>New York, NY</span>
                        </div>
                        <span>52 plays</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Music Usage</h1>
        <p className="text-sm text-gray-400">Track how and where your music is being used</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search tracks..."
              className="pl-8 bg-gray-950 border-gray-800"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <FilterButton />
          <DateRangeSelector />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
        <div>
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-[180px] bg-gray-950 border-gray-800">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="streaming">Streaming</TabsTrigger>
          <TabsTrigger value="sync">Sync Licensing</TabsTrigger>
          <TabsTrigger value="radio">Radio Plays</TabsTrigger>
        </TabsList>
      </Tabs>

      {renderTabContent()}

      {/* Add Sync License Dialog */}
      <Dialog open={addSyncDialogOpen} onOpenChange={setAddSyncDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Add Sync License</DialogTitle>
            <DialogDescription>Enter the details of your new sync license</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sync-title">Track Title *</Label>
              <Input
                id="sync-title"
                placeholder="Enter track title"
                className="bg-gray-950 border-gray-800"
                value={newSyncTitle}
                onChange={(e) => setNewSyncTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sync-media-type">Media Type *</Label>
              <Select value={newSyncMediaType} onValueChange={setNewSyncMediaType}>
                <SelectTrigger id="sync-media-type" className="bg-gray-950 border-gray-800">
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TV Show">TV Show</SelectItem>
                  <SelectItem value="Film">Film</SelectItem>
                  <SelectItem value="Commercial">Commercial</SelectItem>
                  <SelectItem value="Video Game">Video Game</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sync-show">Show/Project Name *</Label>
              <Input
                id="sync-show"
                placeholder="Enter show or project name"
                className="bg-gray-950 border-gray-800"
                value={newSyncShow}
                onChange={(e) => setNewSyncShow(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sync-episode">Episode/Details</Label>
              <Input
                id="sync-episode"
                placeholder="Enter episode or additional details"
                className="bg-gray-950 border-gray-800"
                value={newSyncEpisode}
                onChange={(e) => setNewSyncEpisode(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sync-duration">Duration</Label>
              <Input
                id="sync-duration"
                placeholder="Enter duration (e.g., 30 seconds)"
                className="bg-gray-950 border-gray-800"
                value={newSyncDuration}
                onChange={(e) => setNewSyncDuration(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sync-fee">License Fee *</Label>
              <Input
                id="sync-fee"
                placeholder="Enter fee (e.g., $1,000)"
                className="bg-gray-950 border-gray-800"
                value={newSyncFee}
                onChange={(e) => setNewSyncFee(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSyncDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewSync}>Add License</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Radio Play Dialog */}
      <Dialog open={addRadioDialogOpen} onOpenChange={setAddRadioDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Add Radio Play</DialogTitle>
            <DialogDescription>Enter the details of your new radio play</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="radio-title">Track Title *</Label>
              <Input
                id="radio-title"
                placeholder="Enter track title"
                className="bg-gray-950 border-gray-800"
                value={newRadioTitle}
                onChange={(e) => setNewRadioTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="radio-station">Radio Station *</Label>
              <Input
                id="radio-station"
                placeholder="Enter radio station name"
                className="bg-gray-950 border-gray-800"
                value={newRadioStation}
                onChange={(e) => setNewRadioStation(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="radio-location">Location *</Label>
              <Input
                id="radio-location"
                placeholder="Enter location (e.g., Los Angeles, CA)"
                className="bg-gray-950 border-gray-800"
                value={newRadioLocation}
                onChange={(e) => setNewRadioLocation(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="radio-plays">Number of Plays *</Label>
              <Input
                id="radio-plays"
                type="number"
                placeholder="Enter number of plays"
                className="bg-gray-950 border-gray-800"
                value={newRadioPlays}
                onChange={(e) => setNewRadioPlays(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddRadioDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewRadio}>Add Radio Play</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
