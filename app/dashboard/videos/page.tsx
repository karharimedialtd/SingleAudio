"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  Calendar,
  Tag,
  Globe,
  Lock,
  Settings,
  Download,
  Share2,
  MessageSquare,
  X,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActionButton } from "@/components/action-button"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Sample video data
const videos = [
  {
    id: 1,
    thumbnail: "/music-video-thumbnail.png",
    title: "Official Music Video - Summer Vibes",
    views: "1.2M",
    likes: "45K",
    comments: "3.2K",
    ctr: "8.4%",
    retention: "64%",
    avgDuration: "4:12",
    publishDate: "2023-06-15",
    status: "Public",
    monetized: true,
  },
  {
    id: 2,
    thumbnail: "/video-thumbnail.png",
    title: "Live Concert Performance - World Tour 2023",
    views: "876K",
    likes: "32K",
    comments: "1.8K",
    ctr: "7.2%",
    retention: "58%",
    avgDuration: "8:45",
    publishDate: "2023-05-22",
    status: "Public",
    monetized: true,
  },
  {
    id: 3,
    thumbnail: "/tutorial-video.png",
    title: "How to Master Guitar Solos - Tutorial",
    views: "450K",
    likes: "28K",
    comments: "1.5K",
    ctr: "9.1%",
    retention: "72%",
    avgDuration: "12:30",
    publishDate: "2023-04-10",
    status: "Public",
    monetized: true,
  },
  {
    id: 4,
    thumbnail: "/placeholder.svg?key=345au",
    title: "Behind the Scenes - Making of the Album",
    views: "320K",
    likes: "18K",
    comments: "980",
    ctr: "6.8%",
    retention: "61%",
    avgDuration: "15:20",
    publishDate: "2023-03-05",
    status: "Unlisted",
    monetized: false,
  },
  {
    id: 5,
    thumbnail: "/placeholder.svg?key=n5qav",
    title: "Upcoming Release - Teaser Trailer",
    views: "0",
    likes: "0",
    comments: "0",
    ctr: "0%",
    retention: "0%",
    avgDuration: "0:00",
    publishDate: "Scheduled for 2023-07-01",
    status: "Private",
    monetized: false,
  },
]

export default function VideosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [filters, setFilters] = useState({
    monetized: false,
    nonMonetized: false,
    highViews: false,
    lowEngagement: false,
    recentlyPublished: false,
  })
  const router = useRouter()

  // Function to handle navigation
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  // Function to handle dropdown menu actions
  const handleMenuAction = (action: string, videoId: number) => {
    switch (action) {
      case "edit":
        router.push(`/dashboard/videos/edit/${videoId}`)
        break
      case "analytics":
        router.push(`/dashboard/videos/analytics/${videoId}`)
        break
      case "tags":
        router.push(`/dashboard/videos/tags/${videoId}`)
        break
      case "public":
        toast({
          title: "Video Visibility Updated",
          description: `Video #${videoId} is now public`,
        })
        break
      case "private":
        toast({
          title: "Video Visibility Updated",
          description: `Video #${videoId} is now private`,
        })
        break
      case "schedule":
        router.push(`/dashboard/scheduler?videoId=${videoId}`)
        break
      case "monetization":
        router.push(`/dashboard/monetization?videoId=${videoId}`)
        break
      case "download":
        toast({
          title: "Downloading Video",
          description: `Downloading video #${videoId}`,
        })
        break
      case "share":
        toast({
          title: "Share Video",
          description: `Sharing video #${videoId}`,
        })
        break
      case "delete":
        toast({
          title: "Delete Video",
          description: `Are you sure you want to delete video #${videoId}?`,
          variant: "destructive",
        })
        break
      default:
        break
    }
  }

  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: "Video list has been filtered according to your criteria",
    })
    setIsFilterDialogOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      monetized: false,
      nonMonetized: false,
      highViews: false,
      lowEngagement: false,
      recentlyPublished: false,
    })
    toast({
      title: "Filters Cleared",
      description: "All filters have been cleared",
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Video Management</h1>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={() => setIsFilterDialogOpen(true)}
            icon={<Filter className="h-4 w-4 mr-2" />}
            actionName="Open Filters"
          >
            Filter
          </ActionButton>
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            href="/dashboard/upload"
            icon={<Plus className="h-4 w-4 mr-2" />}
            actionName="Upload Video"
          >
            Upload Video
          </ActionButton>
        </div>
      </div>

      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Video Library</CardTitle>
            <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
                  All Videos
                </TabsTrigger>
                <TabsTrigger value="public" className="data-[state=active]:bg-gray-700">
                  Public
                </TabsTrigger>
                <TabsTrigger value="private" className="data-[state=active]:bg-gray-700">
                  Private
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="data-[state=active]:bg-gray-700">
                  Scheduled
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search videos..."
                className="pl-8 bg-gray-800 border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="recent">
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-800">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="views">Most Viewed</SelectItem>
                  <SelectItem value="engagement">Highest Engagement</SelectItem>
                  <SelectItem value="revenue">Highest Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead className="w-[250px]">Video</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Engagement</TableHead>
                  <TableHead>Retention</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Monetization</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id} className="hover:bg-gray-800/50 border-gray-800">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <span className="line-clamp-2">{video.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">Views: {video.views}</span>
                        <span className="text-xs text-gray-400">CTR: {video.ctr}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">Likes: {video.likes}</span>
                        <span className="text-xs text-gray-400">Comments: {video.comments}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs">{video.retention}</span>
                        <span className="text-xs text-gray-400">Avg: {video.avgDuration}</span>
                      </div>
                    </TableCell>
                    <TableCell>{video.publishDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          video.status === "Public"
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                            : video.status === "Private"
                              ? "bg-red-500/20 text-red-400 hover:bg-red-500/20 hover:text-red-400"
                              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 hover:text-yellow-400"
                        }
                      >
                        {video.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          video.monetized
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/20 hover:text-green-400"
                            : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/20 hover:text-gray-400"
                        }
                      >
                        {video.monetized ? "Monetized" : "Not Monetized"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("edit", video.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Metadata
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("analytics", video.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("tags", video.id)}
                          >
                            <Tag className="h-4 w-4 mr-2" />
                            Edit Tags
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("public", video.id)}
                          >
                            <Globe className="h-4 w-4 mr-2" />
                            Make Public
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("private", video.id)}
                          >
                            <Lock className="h-4 w-4 mr-2" />
                            Make Private
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("schedule", video.id)}
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Schedule
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("monetization", video.id)}
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Monetization Settings
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("download", video.id)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleMenuAction("share", video.id)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500"
                            onClick={() => handleMenuAction("delete", video.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Video Analytics Summary */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle>Video Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Total Views</p>
                    <h3 className="text-xl font-bold">2.85M</h3>
                    <p className="text-xs text-green-400">+12% from last month</p>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-full">
                    <Eye className="h-5 w-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Avg. Watch Time</p>
                    <h3 className="text-xl font-bold">4:32</h3>
                    <p className="text-xs text-green-400">+5% from last month</p>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <Clock className="h-5 w-5 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Avg. Engagement</p>
                    <h3 className="text-xl font-bold">7.8%</h3>
                    <p className="text-xs text-green-400">+2% from last month</p>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    <MessageSquare className="h-5 w-5 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Upload Frequency</p>
                    <h3 className="text-xl font-bold">3.2/week</h3>
                    <p className="text-xs text-red-400">-1 from last month</p>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <Calendar className="h-5 w-5 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Filter Videos</DialogTitle>
            <DialogDescription>Select criteria to filter your videos</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="monetized"
                checked={filters.monetized}
                onCheckedChange={(checked) => setFilters({ ...filters, monetized: checked === true })}
              />
              <Label htmlFor="monetized">Monetized videos only</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="nonMonetized"
                checked={filters.nonMonetized}
                onCheckedChange={(checked) => setFilters({ ...filters, nonMonetized: checked === true })}
              />
              <Label htmlFor="nonMonetized">Non-monetized videos only</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="highViews"
                checked={filters.highViews}
                onCheckedChange={(checked) => setFilters({ ...filters, highViews: checked === true })}
              />
              <Label htmlFor="highViews">High view count ({">"}100K)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowEngagement"
                checked={filters.lowEngagement}
                onCheckedChange={(checked) => setFilters({ ...filters, lowEngagement: checked === true })}
              />
              <Label htmlFor="lowEngagement">Low engagement rate ({"<"}5%)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="recentlyPublished"
                checked={filters.recentlyPublished}
                onCheckedChange={(checked) => setFilters({ ...filters, recentlyPublished: checked === true })}
              />
              <Label htmlFor="recentlyPublished">Recently published (last 30 days)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={clearFilters} className="bg-gray-800 border-gray-700 hover:bg-gray-700">
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
            <Button onClick={applyFilters} className="bg-purple-600 hover:bg-purple-700">
              <Check className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
