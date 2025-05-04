"use client"

import { useState } from "react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Clock, ListMusic, Play } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { createItem } from "@/lib/button-actions"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

// Sample playlists data
const playlists = [
  {
    id: 1,
    title: "Best Music Videos Collection",
    thumbnail: "/music-video-thumbnail.png",
    videoCount: 24,
    views: "1.2M",
    watchTime: "45.2K hrs",
    lastUpdated: "2 days ago",
  },
  {
    id: 2,
    title: "Live Performances 2023",
    thumbnail: "/video-thumbnail.png",
    videoCount: 18,
    views: "850K",
    watchTime: "32.8K hrs",
    lastUpdated: "1 week ago",
  },
  {
    id: 3,
    title: "Guitar Tutorial Series",
    thumbnail: "/tutorial-video.png",
    videoCount: 12,
    views: "420K",
    watchTime: "28.5K hrs",
    lastUpdated: "2 weeks ago",
  },
  {
    id: 4,
    title: "Behind the Scenes",
    thumbnail: "/placeholder.svg?key=woqqt",
    videoCount: 8,
    views: "320K",
    watchTime: "15.2K hrs",
    lastUpdated: "1 month ago",
  },
]

// Sample playlist performance data
const playlistPerformanceData = [
  { date: "Jan 1", views: 4200, watchTime: 1200 },
  { date: "Jan 2", views: 4500, watchTime: 1300 },
  { date: "Jan 3", views: 5100, watchTime: 1450 },
  { date: "Jan 4", views: 5400, watchTime: 1500 },
  { date: "Jan 5", views: 5900, watchTime: 1650 },
  { date: "Jan 6", views: 6300, watchTime: 1750 },
  { date: "Jan 7", views: 6800, watchTime: 1900 },
  { date: "Jan 8", views: 7200, watchTime: 2000 },
  { date: "Jan 9", views: 7800, watchTime: 2150 },
  { date: "Jan 10", views: 8100, watchTime: 2250 },
  { date: "Jan 11", views: 8500, watchTime: 2350 },
  { date: "Jan 12", views: 8900, watchTime: 2450 },
  { date: "Jan 13", views: 9200, watchTime: 2550 },
  { date: "Jan 14", views: 9600, watchTime: 2650 },
]

export default function PlaylistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("views")
  const [timeRange, setTimeRange] = useState("30days")

  const handleCreatePlaylist = async () => {
    try {
      await createItem("playlist")
      toast({
        title: "Playlist created",
        description: "Your new playlist has been created successfully.",
      })
    } catch (error) {
      console.error("Error creating playlist:", error)
    }
  }

  const handleViewAnalytics = (id: number) => {
    toast({
      title: "View Analytics",
      description: `Viewing analytics for playlist #${id}`,
    })
  }

  const handleEditPlaylist = (id: number) => {
    toast({
      title: "Edit Playlist",
      description: `Editing playlist #${id}`,
    })
  }

  const handleDeletePlaylist = (id: number) => {
    toast({
      title: "Delete Playlist",
      description: `Deleting playlist #${id}`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Playlist Analytics</h1>
          <p className="text-sm text-gray-400">Analyze performance of your playlists</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            action={handleCreatePlaylist}
            icon={<Plus className="h-4 w-4" />}
            actionName="Create Playlist"
          >
            Create Playlist
          </ActionButton>
          <TabSelector
            options={[
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" },
              { value: "90days", label: "90 Days" },
            ]}
            defaultValue={timeRange}
            onChange={setTimeRange}
          />
        </div>
      </div>

      {/* Playlist Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Playlists</p>
                <h3 className="text-3xl font-bold">32</h3>
                <p className="text-xs text-green-400">+3 new this month</p>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <ListMusic className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Playlist Views</p>
                <h3 className="text-3xl font-bold">3.2M</h3>
                <p className="text-xs text-green-400">+12% from last month</p>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Watch Time</p>
                <h3 className="text-3xl font-bold">125K hrs</h3>
                <p className="text-xs text-green-400">+8% from last month</p>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Avg. Videos Per Playlist</p>
                <h3 className="text-3xl font-bold">15</h3>
                <p className="text-xs text-green-400">+2 from last month</p>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <Play className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Playlist Performance Chart */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Playlist Performance</CardTitle>
            <TabSelector
              options={[
                { value: "views", label: "Views" },
                { value: "watchTime", label: "Watch Time" },
              ]}
              defaultValue={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={playlistPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                <Line
                  type="monotone"
                  dataKey={activeTab}
                  stroke={activeTab === "views" ? "#3B82F6" : "#10B981"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Playlists Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Playlists</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search playlists..."
                className="pl-8 bg-gray-800 border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead className="w-[300px]">Playlist</TableHead>
                  <TableHead>Videos</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Watch Time</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlists.map((playlist) => (
                  <TableRow key={playlist.id} className="hover:bg-gray-800/50 border-gray-800">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <img
                          src={playlist.thumbnail || "/placeholder.svg"}
                          alt={playlist.title}
                          className="w-20 h-12 object-cover rounded"
                        />
                        <span className="line-clamp-2">{playlist.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{playlist.videoCount}</TableCell>
                    <TableCell>{playlist.views}</TableCell>
                    <TableCell>{playlist.watchTime}</TableCell>
                    <TableCell>{playlist.lastUpdated}</TableCell>
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
                            onClick={() => handleEditPlaylist(playlist.id)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Playlist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-800"
                            onClick={() => handleViewAnalytics(playlist.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Analytics
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500"
                            onClick={() => handleDeletePlaylist(playlist.id)}
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
    </div>
  )
}
