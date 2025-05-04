"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { DateRangeSelector } from "@/components/date-range-selector"
import { FilterButton } from "@/components/filter-button"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import {
  Search,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Plus,
  Upload,
  FileMusic,
  ImageIcon,
  Calendar,
  Share2,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Music2,
  Info,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Filter options for the FilterButton component
const statusFilterOptions = [
  { id: "all", label: "All Statuses" },
  { id: "delivered", label: "Delivered" },
  { id: "processing", label: "Processing" },
  { id: "scheduled", label: "Scheduled" },
  { id: "draft", label: "Draft" },
  { id: "rejected", label: "Rejected" },
]

const platformFilterOptions = [
  { id: "all", label: "All Platforms" },
  { id: "spotify", label: "Spotify" },
  { id: "apple", label: "Apple Music" },
  { id: "youtube", label: "YouTube Music" },
  { id: "amazon", label: "Amazon Music" },
  { id: "tidal", label: "Tidal" },
  { id: "deezer", label: "Deezer" },
  { id: "soundcloud", label: "SoundCloud" },
]

// Sample data for deliveries
const initialDeliveries = [
  {
    id: "DEL-1234",
    title: "Summer Vibes EP",
    type: "EP",
    artist: "John Doe",
    submitted: "2023-07-15",
    releaseDate: "2023-08-01",
    status: "Delivered",
    platforms: ["Spotify", "Apple Music", "Amazon Music", "YouTube Music", "Deezer"],
    completedPlatforms: ["Spotify", "Apple Music", "Amazon Music", "YouTube Music", "Deezer"],
    progress: 100,
    tracks: [
      { title: "Summer Nights", duration: "3:45", isrc: "USRC12345678" },
      { title: "Ocean Breeze", duration: "4:12", isrc: "USRC12345679" },
      { title: "Sunset Dreams", duration: "3:28", isrc: "USRC12345680" },
      { title: "Beach Party", duration: "3:56", isrc: "USRC12345681" },
    ],
    artwork: "/abstract-soundscape.png",
    socialShares: ["Instagram", "Facebook", "Twitter"],
    genre: "Pop",
    explicit: false,
  },
  {
    id: "DEL-1235",
    title: "Midnight Dreams",
    type: "Single",
    artist: "John Doe",
    submitted: "2023-07-28",
    releaseDate: "2023-08-15",
    status: "In Progress",
    platforms: ["Spotify", "Apple Music", "Amazon Music", "YouTube Music", "Deezer", "TikTok"],
    completedPlatforms: ["Spotify", "Apple Music", "Amazon Music"],
    progress: 50,
    tracks: [{ title: "Midnight Dreams", duration: "3:35", isrc: "USRC12345682" }],
    artwork: "/placeholder.svg?key=etii1",
    socialShares: ["Instagram"],
    genre: "Electronic",
    explicit: false,
  },
  {
    id: "DEL-1236",
    title: "Urban Echoes",
    type: "Album",
    artist: "John Doe",
    submitted: "2023-08-05",
    releaseDate: "2023-09-01",
    status: "Processing",
    platforms: ["Spotify", "Apple Music", "Amazon Music", "YouTube Music", "Deezer", "TikTok", "SoundCloud"],
    completedPlatforms: ["Spotify"],
    progress: 15,
    tracks: [
      { title: "City Lights", duration: "3:45", isrc: "USRC12345683" },
      { title: "Downtown", duration: "4:12", isrc: "USRC12345684" },
      { title: "Neon Signs", duration: "3:28", isrc: "USRC12345685" },
      { title: "Traffic Jam", duration: "3:56", isrc: "USRC12345686" },
      { title: "Skyscrapers", duration: "4:22", isrc: "USRC12345687" },
      { title: "Subway", duration: "3:15", isrc: "USRC12345688" },
      { title: "Urban Jungle", duration: "4:05", isrc: "USRC12345689" },
    ],
    artwork: "/placeholder.svg?key=rk142",
    socialShares: [],
    genre: "Hip-Hop",
    explicit: true,
  },
  {
    id: "DEL-1237",
    title: "Acoustic Sessions",
    type: "EP",
    artist: "John Doe",
    submitted: "2023-08-10",
    releaseDate: "2023-09-15",
    status: "Pending Review",
    platforms: ["Spotify", "Apple Music", "Amazon Music", "YouTube Music"],
    completedPlatforms: [],
    progress: 0,
    tracks: [
      { title: "Unplugged Melody", duration: "3:45", isrc: "USRC12345690" },
      { title: "Wooden Strings", duration: "4:12", isrc: "USRC12345691" },
      { title: "Raw Emotions", duration: "3:28", isrc: "USRC12345692" },
    ],
    artwork: "/acoustic-guitar-album.png",
    socialShares: [],
    genre: "Acoustic",
    explicit: false,
  },
  {
    id: "DEL-1238",
    title: "Remix Collection",
    type: "Album",
    artist: "John Doe",
    submitted: "2023-07-20",
    releaseDate: "2023-08-20",
    status: "Rejected",
    platforms: ["Spotify", "Apple Music", "Amazon Music"],
    completedPlatforms: [],
    progress: 0,
    tracks: [
      { title: "Summer Nights (Remix)", duration: "4:15", isrc: "USRC12345693" },
      { title: "Ocean Breeze (Remix)", duration: "4:42", isrc: "USRC12345694" },
      { title: "Sunset Dreams (Remix)", duration: "3:58", isrc: "USRC12345695" },
    ],
    artwork: "/placeholder.svg?key=gfq77",
    socialShares: [],
    genre: "Electronic",
    explicit: false,
    rejectionReason: "Artwork does not meet platform requirements. Please update and resubmit.",
  },
]

// Sample data for platform status
const platformStatus = [
  {
    name: "Spotify",
    status: "Operational",
    avgDeliveryTime: "24-48 hours",
    lastUpdated: "2023-08-12",
    logo: "/spotify-logo.png",
  },
  {
    name: "Apple Music",
    status: "Operational",
    avgDeliveryTime: "24-72 hours",
    lastUpdated: "2023-08-12",
    logo: "/apple-music-logo.png",
  },
  {
    name: "Amazon Music",
    status: "Operational",
    avgDeliveryTime: "48-72 hours",
    lastUpdated: "2023-08-12",
    logo: "/amazon-music-logo.png",
  },
  {
    name: "YouTube Music",
    status: "Delayed",
    avgDeliveryTime: "72-96 hours",
    lastUpdated: "2023-08-12",
    message: "Experiencing longer than usual processing times",
    logo: "/youtube-music-logo.png",
  },
  {
    name: "Deezer",
    status: "Operational",
    avgDeliveryTime: "48-72 hours",
    lastUpdated: "2023-08-12",
    logo: "/placeholder.svg?key=90vdu",
  },
  {
    name: "TikTok",
    status: "Operational",
    avgDeliveryTime: "48-96 hours",
    lastUpdated: "2023-08-12",
    logo: "/social/tiktok.png",
  },
  {
    name: "SoundCloud",
    status: "Operational",
    avgDeliveryTime: "24-48 hours",
    lastUpdated: "2023-08-12",
    logo: "/soundcloud-logo.png",
  },
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

export default function DeliveryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [expandedDelivery, setExpandedDelivery] = useState<string | null>(null)
  const [addDeliveryDialogOpen, setAddDeliveryDialogOpen] = useState(false)
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [selectedDeliveryForShare, setSelectedDeliveryForShare] = useState<string | null>(null)
  const [uploadStep, setUploadStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [coverArtUploaded, setCoverArtUploaded] = useState(false)
  const [trackFiles, setTrackFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const coverArtInputRef = useRef<HTMLInputElement>(null)

  // New delivery form state
  const [newDelivery, setNewDelivery] = useState({
    title: "",
    type: "Single",
    artist: "",
    releaseDate: "",
    platforms: ["Spotify", "Apple Music"],
    tracks: [{ title: "", duration: "", isrc: "" }],
    artwork: "",
    genre: "Pop",
    explicit: false,
    description: "",
    upc: "",
    label: "",
    copyright: "",
    preOrderDate: "",
    originalReleaseDate: "",
    language: "English",
  })

  // Social media share state
  const [socialShareOptions, setSocialShareOptions] = useState({
    instagram: true,
    facebook: true,
    twitter: true,
    tiktok: false,
    email: false,
  })
  const [shareMessage, setShareMessage] = useState("")
  const [scheduleShare, setScheduleShare] = useState(false)
  const [shareDate, setShareDate] = useState("")
  const [shareTime, setShareTime] = useState("")

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Deliveries refreshed",
        description: "Latest delivery data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleAddDelivery = () => {
    setAddDeliveryDialogOpen(true)
    setUploadStep(1)
    setUploadProgress(0)
    setIsUploading(false)
    setCoverArtUploaded(false)
    setTrackFiles([])
    setNewDelivery({
      title: "",
      type: "Single",
      artist: "",
      releaseDate: "",
      platforms: ["Spotify", "Apple Music"],
      tracks: [{ title: "", duration: "", isrc: "" }],
      artwork: "",
      genre: "Pop",
      explicit: false,
      description: "",
      upc: "",
      label: "",
      copyright: "",
      preOrderDate: "",
      originalReleaseDate: "",
      language: "English",
    })
  }

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

            // Update tracks based on file names
            const newTracks = files.map((file) => {
              const fileName = file.name.replace(/\.[^/.]+$/, "") // Remove extension
              return {
                title: fileName,
                duration: "",
                isrc: `USRC${Math.floor(10000000 + Math.random() * 90000000)}`,
              }
            })

            setNewDelivery((prev) => ({
              ...prev,
              tracks: newTracks,
            }))
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
        setNewDelivery((prev) => ({
          ...prev,
          artwork: "/placeholder.svg?key=bl53c",
        }))
        toast({
          title: "Cover art uploaded",
          description: "Your cover art has been uploaded successfully",
        })
      }, 1500)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setNewDelivery((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setNewDelivery((prev) => ({ ...prev, [id]: value }))
  }

  const handleSwitchChange = (id: string, checked: boolean) => {
    setNewDelivery((prev) => ({ ...prev, [id]: checked }))
  }

  const handleTrackChange = (index: number, field: string, value: string) => {
    setNewDelivery((prev) => {
      const updatedTracks = [...prev.tracks]
      updatedTracks[index] = { ...updatedTracks[index], [field]: value }
      return { ...prev, tracks: updatedTracks }
    })
  }

  const handleAddTrack = () => {
    setNewDelivery((prev) => ({
      ...prev,
      tracks: [
        ...prev.tracks,
        {
          title: "",
          duration: "",
          isrc: `USRC${Math.floor(10000000 + Math.random() * 90000000)}`,
        },
      ],
    }))
  }

  const handleRemoveTrack = (index: number) => {
    if (newDelivery.tracks.length <= 1) {
      toast({
        title: "Cannot remove track",
        description: "You must have at least one track",
        variant: "destructive",
      })
      return
    }

    setNewDelivery((prev) => {
      const updatedTracks = [...prev.tracks]
      updatedTracks.splice(index, 1)
      return { ...prev, tracks: updatedTracks }
    })
  }

  const handlePlatformToggle = (platform: string) => {
    setNewDelivery((prev) => {
      if (prev.platforms.includes(platform)) {
        return { ...prev, platforms: prev.platforms.filter((p) => p !== platform) }
      } else {
        return { ...prev, platforms: [...prev.platforms, platform] }
      }
    })
  }

  const handleGenerateISRC = (index: number) => {
    const newISRC = `USRC${Math.floor(10000000 + Math.random() * 90000000)}`
    handleTrackChange(index, "isrc", newISRC)
    toast({
      title: "ISRC Generated",
      description: "A unique ISRC code has been generated for your track",
    })
  }

  const handleGenerateUPC = () => {
    const newUPC = `${Math.floor(100000000000 + Math.random() * 900000000000)}`
    setNewDelivery((prev) => ({ ...prev, upc: newUPC }))
    toast({
      title: "UPC Generated",
      description: "A unique UPC code has been generated for your release",
    })
  }

  const handleSubmitNewDelivery = () => {
    // Validate required fields
    if (!newDelivery.title || !newDelivery.artist || !newDelivery.releaseDate || newDelivery.platforms.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and select at least one platform",
        variant: "destructive",
      })
      return
    }

    // Validate tracks
    const invalidTracks = newDelivery.tracks.some((track) => !track.title)
    if (invalidTracks) {
      toast({
        title: "Invalid tracks",
        description: "Please provide a title for all tracks",
        variant: "destructive",
      })
      return
    }

    // Create new delivery
    const newDeliveryItem = {
      id: `DEL-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newDelivery.title,
      type: newDelivery.type,
      artist: newDelivery.artist,
      submitted: new Date().toISOString().split("T")[0],
      releaseDate: newDelivery.releaseDate,
      status: "Pending Review",
      platforms: [...newDelivery.platforms],
      completedPlatforms: [],
      progress: 0,
      tracks: [...newDelivery.tracks],
      artwork: newDelivery.artwork || "/abstract-soundscape.png",
      socialShares: [],
      genre: newDelivery.genre,
      explicit: newDelivery.explicit,
    }

    // Add to deliveries
    setDeliveries([newDeliveryItem, ...deliveries])

    // Close dialog
    setAddDeliveryDialogOpen(false)

    toast({
      title: "Delivery created",
      description: "Your music has been submitted for delivery",
    })
  }

  const handleViewDetails = (id: string) => {
    if (expandedDelivery === id) {
      setExpandedDelivery(null)
    } else {
      setExpandedDelivery(id)
    }
  }

  const handleResubmit = (id: string) => {
    const updatedDeliveries = deliveries.map((delivery) => {
      if (delivery.id === id) {
        return {
          ...delivery,
          status: "Pending Review",
          rejectionReason: undefined,
        }
      }
      return delivery
    })

    setDeliveries(updatedDeliveries)

    toast({
      title: "Delivery resubmitted",
      description: "Your delivery has been resubmitted for review",
    })
  }

  const handleShareDelivery = (id: string) => {
    setSelectedDeliveryForShare(id)
    setShareDialogOpen(true)
    setShareMessage(
      `Check out my new release "${deliveries.find((d) => d.id === id)?.title}" - Available now on all major streaming platforms!`,
    )
    setScheduleShare(false)
    setShareDate("")
    setShareTime("")
  }

  const handleSocialOptionChange = (platform: string, checked: boolean) => {
    setSocialShareOptions((prev) => ({ ...prev, [platform]: checked }))
  }

  const handleSubmitShare = () => {
    if (!shareMessage) {
      toast({
        title: "Missing message",
        description: "Please enter a message to share",
        variant: "destructive",
      })
      return
    }

    const selectedPlatforms = Object.entries(socialShareOptions)
      .filter(([_, selected]) => selected)
      .map(([platform]) => platform)

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to share to",
        variant: "destructive",
      })
      return
    }

    if (scheduleShare && (!shareDate || !shareTime)) {
      toast({
        title: "Missing schedule information",
        description: "Please select both date and time for your scheduled share",
        variant: "destructive",
      })
      return
    }

    // Update delivery with social shares
    if (selectedDeliveryForShare) {
      const updatedDeliveries = deliveries.map((delivery) => {
        if (delivery.id === selectedDeliveryForShare) {
          return {
            ...delivery,
            socialShares: [
              ...new Set([
                ...delivery.socialShares,
                ...selectedPlatforms.map((p) => p.charAt(0).toUpperCase() + p.slice(1)),
              ]),
            ],
          }
        }
        return delivery
      })

      setDeliveries(updatedDeliveries)
    }

    // Close dialog
    setShareDialogOpen(false)

    toast({
      title: scheduleShare ? "Share scheduled" : "Shared successfully",
      description: scheduleShare
        ? `Your post has been scheduled for ${shareDate} at ${shareTime}`
        : "Your music has been shared to the selected platforms",
    })
  }

  // Filter deliveries based on active tab and search query
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && delivery.status === "In Progress") ||
      (activeTab === "delivered" && delivery.status === "Delivered") ||
      (activeTab === "processing" && delivery.status === "Processing") ||
      (activeTab === "pending" && delivery.status === "Pending Review") ||
      (activeTab === "rejected" && delivery.status === "Rejected")

    const matchesSearch =
      delivery.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.artist.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500/20 text-green-500"
      case "In Progress":
        return "bg-blue-500/20 text-blue-500"
      case "Processing":
        return "bg-purple-500/20 text-purple-500"
      case "Pending Review":
        return "bg-yellow-500/20 text-yellow-500"
      case "Rejected":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPlatformStatusColor = (status: string) => {
    switch (status) {
      case "Operational":
        return "bg-green-500/20 text-green-500"
      case "Delayed":
        return "bg-yellow-500/20 text-yellow-500"
      case "Outage":
        return "bg-red-500/20 text-red-500"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "In Progress":
        return <RefreshCw className="h-4 w-4 text-blue-500" />
      case "Processing":
        return <RefreshCw className="h-4 w-4 text-purple-500" />
      case "Pending Review":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Delivery Status</h1>
        <p className="text-sm text-gray-400">Track the status of your music deliveries to platforms</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search deliveries..."
              className="pl-8 bg-gray-950 border-gray-800"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <FilterButton options={statusFilterOptions} onFilter={() => {}} buttonText="Status" />
          <FilterButton options={platformFilterOptions} onFilter={() => {}} buttonText="Platform" />
          <DateRangeSelector />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
        <Button onClick={handleAddDelivery}>
          <Plus className="mr-2 h-4 w-4" />
          New Delivery
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="pending">Pending Review</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Delivery Status</CardTitle>
            <CardDescription>Track your music deliveries to platforms</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredDeliveries.length > 0 ? (
              <div className="space-y-4">
                {filteredDeliveries.map((delivery) => (
                  <div key={delivery.id} className="rounded-lg border border-gray-800 bg-gray-950 overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={delivery.artwork || "/placeholder.svg"}
                              alt={`${delivery.title} artwork`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{delivery.title}</h3>
                              <Badge variant="outline">{delivery.type}</Badge>
                              <Badge className={getStatusColor(delivery.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(delivery.status)}
                                  {delivery.status}
                                </span>
                              </Badge>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-400">
                              <span>Artist: {delivery.artist}</span>
                              <span>•</span>
                              <span>ID: {delivery.id}</span>
                              <span>•</span>
                              <span>Release Date: {delivery.releaseDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {delivery.status === "Rejected" && (
                            <Button variant="outline" size="sm" onClick={() => handleResubmit(delivery.id)}>
                              Resubmit
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleShareDelivery(delivery.id)}>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(delivery.id)}>
                            {expandedDelivery === delivery.id ? (
                              <ChevronUp className="mr-2 h-4 w-4" />
                            ) : (
                              <ChevronDown className="mr-2 h-4 w-4" />
                            )}
                            Details
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            {delivery.completedPlatforms.length} of {delivery.platforms.length} platforms
                          </span>
                          <span className="text-sm font-medium">{delivery.progress}%</span>
                        </div>
                        <Progress value={delivery.progress} className="h-2" />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {delivery.platforms.map((platform) => (
                          <Badge
                            key={platform}
                            variant="outline"
                            className={
                              delivery.completedPlatforms.includes(platform)
                                ? "border-green-500/30 bg-green-500/10 text-green-500"
                                : "border-gray-700 bg-gray-800/50"
                            }
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>

                      {delivery.socialShares.length > 0 && (
                        <div className="mt-4">
                          <span className="text-xs text-gray-400">Shared on:</span>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {delivery.socialShares.map((platform) => (
                              <Badge
                                key={platform}
                                variant="outline"
                                className="border-purple-500/30 bg-purple-500/10 text-purple-500"
                              >
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {delivery.rejectionReason && (
                        <div className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 p-3">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 text-red-500" />
                            <div>
                              <h4 className="font-medium text-red-500">Rejection Reason</h4>
                              <p className="text-sm text-gray-400">{delivery.rejectionReason}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {expandedDelivery === delivery.id && (
                      <div className="border-t border-gray-800 p-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="tracks" className="border-gray-800">
                            <AccordionTrigger className="hover:no-underline">
                              <span className="text-sm font-medium">Tracks ({delivery.tracks.length})</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="rounded-md border border-gray-800">
                                <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-900 p-3 text-xs font-medium text-gray-400">
                                  <div className="col-span-5">Title</div>
                                  <div className="col-span-2">Duration</div>
                                  <div className="col-span-5">ISRC</div>
                                </div>
                                {delivery.tracks.map((track, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                                  >
                                    <div className="col-span-5">{track.title}</div>
                                    <div className="col-span-2">{track.duration}</div>
                                    <div className="col-span-5 font-mono text-xs">{track.isrc}</div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="platforms" className="border-gray-800">
                            <AccordionTrigger className="hover:no-underline">
                              <span className="text-sm font-medium">Platform Status</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="rounded-md border border-gray-800">
                                <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-900 p-3 text-xs font-medium text-gray-400">
                                  <div className="col-span-4">Platform</div>
                                  <div className="col-span-3">Status</div>
                                  <div className="col-span-5">Link</div>
                                </div>
                                {delivery.platforms.map((platform) => (
                                  <div
                                    key={platform}
                                    className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                                  >
                                    <div className="col-span-4">{platform}</div>
                                    <div className="col-span-3">
                                      {delivery.completedPlatforms.includes(platform) ? (
                                        <Badge className="bg-green-500/20 text-green-500">Live</Badge>
                                      ) : (
                                        <Badge className="bg-yellow-500/20 text-yellow-500">Pending</Badge>
                                      )}
                                    </div>
                                    <div className="col-span-5">
                                      {delivery.completedPlatforms.includes(platform) ? (
                                        <Button variant="link" size="sm" className="h-auto p-0 text-purple-500">
                                          <ExternalLink className="mr-1 h-3 w-3" />
                                          View on {platform}
                                        </Button>
                                      ) : (
                                        <span className="text-gray-500">Not available yet</span>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="details" className="border-gray-800">
                            <AccordionTrigger className="hover:no-underline">
                              <span className="text-sm font-medium">Additional Details</span>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                  <p className="text-xs font-medium text-gray-400">Genre</p>
                                  <p>{delivery.genre}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-400">Explicit Content</p>
                                  <p>{delivery.explicit ? "Yes" : "No"}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-400">Submitted Date</p>
                                  <p>{delivery.submitted}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-gray-400">Release Date</p>
                                  <p>{delivery.releaseDate}</p>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <AlertCircle className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No deliveries found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "You don't have any deliveries in this category"}
                </p>
                {!searchQuery && activeTab === "all" && (
                  <Button className="mt-4" onClick={handleAddDelivery}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Delivery
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Platform Status</CardTitle>
            <CardDescription>Current status of distribution platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-gray-800">
              <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                <div className="col-span-3">Platform</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Avg. Delivery Time</div>
                <div className="col-span-4">Notes</div>
              </div>
              {platformStatus.map((platform) => (
                <div
                  key={platform.name}
                  className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                >
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="h-6 w-6 flex-shrink-0">
                      <img
                        src={platform.logo || "/placeholder.svg"}
                        alt={platform.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span className="font-medium">{platform.name}</span>
                  </div>
                  <div className="col-span-2">
                    <Badge className={getPlatformStatusColor(platform.status)}>{platform.status}</Badge>
                  </div>
                  <div className="col-span-3 text-gray-400">{platform.avgDeliveryTime}</div>
                  <div className="col-span-4 text-gray-400">{platform.message || "No issues reported"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Delivery Dialog */}
      <Dialog open={addDeliveryDialogOpen} onOpenChange={setAddDeliveryDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Delivery</DialogTitle>
            <DialogDescription>Upload and distribute your music to streaming platforms</DialogDescription>
          </DialogHeader>

          {/* Progress Steps */}
          <div className="mb-2">
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

          <div className="py-2">
            <Tabs defaultValue="upload" value={`step-${uploadStep}`}>
              <TabsContent value="step-1" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <Label htmlFor="release-type">Release Type</Label>
                      <Select defaultValue="Single" onValueChange={(value) => handleSelectChange("type", value)}>
                        <SelectTrigger id="release-type" className="bg-gray-950 border-gray-800">
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

                    <div className="border-2 border-dashed border-gray-800 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="audio/*"
                        multiple={newDelivery.type !== "Single"}
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
                          <div className="text-xs text-gray-500">Supported formats: WAV, FLAC, MP3</div>
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
                      <p className="mt-1 text-xs text-gray-500">3000x3000px, JPG/PNG</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-2" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div>
                      <Label htmlFor="title">Release Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter release title"
                        className="bg-gray-950 border-gray-800"
                        value={newDelivery.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="artist">Artist Name *</Label>
                      <Input
                        id="artist"
                        placeholder="Enter artist name"
                        className="bg-gray-950 border-gray-800"
                        value={newDelivery.artist}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="genre">Primary Genre *</Label>
                      <Select defaultValue="Pop" onValueChange={(value) => handleSelectChange("genre", value)}>
                        <SelectTrigger id="genre" className="bg-gray-950 border-gray-800">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          {genreOptions.map((genre) => (
                            <SelectItem key={genre} value={genre}>
                              {genre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="releaseDate">Release Date *</Label>
                      <Input
                        id="releaseDate"
                        type="date"
                        className="bg-gray-950 border-gray-800"
                        value={newDelivery.releaseDate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <Label htmlFor="upc">UPC/EAN</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="upc"
                          placeholder="Enter UPC/EAN code"
                          className="bg-gray-950 border-gray-800"
                          value={newDelivery.upc}
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
                      <Label htmlFor="label">Label (Optional)</Label>
                      <Input
                        id="label"
                        placeholder="Enter label name"
                        className="bg-gray-950 border-gray-800"
                        value={newDelivery.label}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="explicit">Explicit Content</Label>
                        <p className="text-xs text-gray-500">Contains explicit lyrics or content</p>
                      </div>
                      <Switch
                        id="explicit"
                        checked={newDelivery.explicit}
                        onCheckedChange={(checked) => handleSwitchChange("explicit", checked)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter a description for your release"
                      className="h-20 bg-gray-950 border-gray-800"
                      value={newDelivery.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <Label>Tracks</Label>
                      <Button variant="outline" size="sm" onClick={handleAddTrack}>
                        <Plus className="mr-1 h-3 w-3" />
                        Add Track
                      </Button>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {newDelivery.tracks.map((track, index) => (
                        <div key={index} className="rounded-md border border-gray-800 p-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-xs font-medium">Track {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                              onClick={() => handleRemoveTrack(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                              <span className="sr-only">Remove track</span>
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <div>
                              <Label htmlFor={`track-title-${index}`} className="text-xs">
                                Title *
                              </Label>
                              <Input
                                id={`track-title-${index}`}
                                placeholder="Enter track title"
                                className="bg-gray-950 border-gray-800 h-8 text-sm"
                                value={track.title}
                                onChange={(e) => handleTrackChange(index, "title", e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor={`track-duration-${index}`} className="text-xs">
                                  Duration
                                </Label>
                                <Input
                                  id={`track-duration-${index}`}
                                  placeholder="e.g. 3:45"
                                  className="bg-gray-950 border-gray-800 h-8 text-sm"
                                  value={track.duration}
                                  onChange={(e) => handleTrackChange(index, "duration", e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`track-isrc-${index}`} className="text-xs">
                                  ISRC
                                </Label>
                                <div className="flex items-center gap-1">
                                  <Input
                                    id={`track-isrc-${index}`}
                                    placeholder="ISRC code"
                                    className="bg-gray-950 border-gray-800 h-8 text-sm font-mono"
                                    value={track.isrc}
                                    onChange={(e) => handleTrackChange(index, "isrc", e.target.value)}
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8"
                                    onClick={() => handleGenerateISRC(index)}
                                  >
                                    Gen
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="step-3" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <Label className="mb-1 block">Select Distribution Platforms *</Label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                      {platformStatus.map((platform) => (
                        <div key={platform.name} className="flex items-center space-x-2">
                          <Checkbox
                            id={`platform-${platform.name}`}
                            checked={newDelivery.platforms.includes(platform.name)}
                            onCheckedChange={() => handlePlatformToggle(platform.name)}
                          />
                          <Label
                            htmlFor={`platform-${platform.name}`}
                            className="flex items-center gap-1 cursor-pointer text-sm"
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
                      ))}
                    </div>
                  </div>

                  <div className="rounded-md border border-blue-500/20 bg-blue-500/10 p-3">
                    <div className="flex items-start gap-2">
                      <Info className="mt-0.5 h-4 w-4 text-blue-500" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-500">Distribution Information</h4>
                        <p className="text-xs text-gray-400">
                          Your music will be delivered to the selected platforms within 1-7 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-gray-800 p-3">
                    <h4 className="text-sm font-medium mb-2">Release Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-gray-400">Title</p>
                        <p>{newDelivery.title || "Untitled Release"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Artist</p>
                        <p>{newDelivery.artist || "Unknown Artist"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Type</p>
                        <p>{newDelivery.type}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Release Date</p>
                        <p>{newDelivery.releaseDate || "Not set"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I confirm that I own or have licensed all rights to this content and agree to the terms of service
                    </Label>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="flex justify-between border-t border-gray-800 pt-4">
            {uploadStep > 1 ? (
              <Button variant="outline" onClick={() => setUploadStep(uploadStep - 1)}>
                Back
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setAddDeliveryDialogOpen(false)}>
                Cancel
              </Button>
            )}
            {uploadStep < 3 ? (
              <Button
                onClick={() => setUploadStep(uploadStep + 1)}
                disabled={uploadStep === 1 && trackFiles.length === 0}
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmitNewDelivery}>Submit Release</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Share Your Music</DialogTitle>
            <DialogDescription>Share your release on social media platforms</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="share-message">Message</Label>
              <Textarea
                id="share-message"
                placeholder="Write a message to share with your release"
                className="min-h-32 bg-gray-950 border-gray-800"
                value={shareMessage}
                onChange={(e) => setShareMessage(e.target.value)}
              />
              <p className="text-xs text-gray-400">{shareMessage.length}/280 characters</p>
            </div>

            <div className="grid gap-2">
              <Label className="mb-2">Select Platforms</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="share-instagram"
                    checked={socialShareOptions.instagram}
                    onCheckedChange={(checked) => handleSocialOptionChange("instagram", !!checked)}
                  />
                  <Label htmlFor="share-instagram" className="flex items-center gap-2 cursor-pointer">
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="share-facebook"
                    checked={socialShareOptions.facebook}
                    onCheckedChange={(checked) => handleSocialOptionChange("facebook", !!checked)}
                  />
                  <Label htmlFor="share-facebook" className="flex items-center gap-2 cursor-pointer">
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="share-twitter"
                    checked={socialShareOptions.twitter}
                    onCheckedChange={(checked) => handleSocialOptionChange("twitter", !!checked)}
                  />
                  <Label htmlFor="share-twitter" className="flex items-center gap-2 cursor-pointer">
                    <Twitter className="h-4 w-4" />
                    <span>Twitter</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="share-tiktok"
                    checked={socialShareOptions.tiktok}
                    onCheckedChange={(checked) => handleSocialOptionChange("tiktok", !!checked)}
                  />
                  <Label htmlFor="share-tiktok" className="flex items-center gap-2 cursor-pointer">
                    <span className="h-4 w-4 flex items-center justify-center">
                      <img src="/social/tiktok.png" alt="TikTok" className="h-4 w-4" />
                    </span>
                    <span>TikTok</span>
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="schedule-share" checked={scheduleShare} onCheckedChange={setScheduleShare} />
              <Label htmlFor="schedule-share">Schedule for later</Label>
            </div>

            {scheduleShare && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="share-date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="share-date"
                      type="date"
                      className="pl-8 bg-gray-950 border-gray-800"
                      value={shareDate}
                      onChange={(e) => setShareDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="share-time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="share-time"
                      type="time"
                      className="pl-8 bg-gray-950 border-gray-800"
                      value={shareTime}
                      onChange={(e) => setShareTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitShare}>{scheduleShare ? "Schedule Share" : "Share Now"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
