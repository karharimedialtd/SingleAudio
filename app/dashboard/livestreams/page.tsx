"use client"

import { useState } from "react"
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Plus, MoreVertical, Edit, Trash2, Eye, Radio, Calendar, Play } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { createItem } from "@/lib/button-actions"
import { toast } from "@/components/ui/use-toast"

// Sample livestreams data
const livestreams = [
  {
    id: 1,
    title: "Live Concert - Summer Tour Kickoff",
    thumbnail: "/music-video-thumbnail.png",
    status: "Completed",
    date: "Jun 15, 2023",
    duration: "2:45:12",
    peakViewers: "12.5K",
    totalViews: "45.2K",
    chatMessages: "8.7K",
  },
  {
    id: 2,
    title: "Q&A Session with Fans",
    thumbnail: "/video-thumbnail.png",
    status: "Completed",
    date: "May 22, 2023",
    duration: "1:30:45",
    peakViewers: "8.2K",
    totalViews: "32.8K",
    chatMessages: "6.5K",
  },
  {
    id: 3,
    title: "Behind the Scenes - Studio Session",
    thumbnail: "/tutorial-video.png",
    status: "Completed",
    date: "Apr 10, 2023",
    duration: "3:15:30",
    peakViewers: "9.8K",
    totalViews: "38.5K",
    chatMessages: "7.2K",
  },
  {
    id: 4,
    title: "Album Release Party",
    thumbnail: "/placeholder.svg?key=ff16z",
    status: "Scheduled",
    date: "Jul 5, 2023",
    duration: "-",
    peakViewers: "-",
    totalViews: "-",
    chatMessages: "-",
  },
]

// Sample shorts data
const shorts = [
  {
    id: 1,
    title: "Guitar Solo Highlight",
    thumbnail: "/music-video-thumbnail.png",
    views: "1.2M",
    likes: "120K",
    comments: "8.7K",
    retention: "92%",
  },
  {
    id: 2,
    title: "Backstage Moment",
    thumbnail: "/video-thumbnail.png",
    views: "950K",
    likes: "85K",
    comments: "6.2K",
    retention: "88%",
  },
  {
    id: 3,
    title: "Quick Vocal Tip",
    thumbnail: "/tutorial-video.png",
    views: "780K",
    likes: "72K",
    comments: "5.1K",
    retention: "95%",
  },
]

// Sample viewer data for a livestream
const viewerData = [
  { time: "0:00", viewers: 1200 },
  { time: "0:15", viewers: 3500 },
  { time: "0:30", viewers: 5800 },
  { time: "0:45", viewers: 7200 },
  { time: "1:00", viewers: 8500 },
  { time: "1:15", viewers: 9800 },
  { time: "1:30", viewers: 11200 },
  { time: "1:45", viewers: 12500 },
  { time: "2:00", viewers: 11800 },
  { time: "2:15", viewers: 10500 },
  { time: "2:30", viewers: 9200 },
  { time: "2:45", viewers: 8000 },
]

export default function LivestreamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("livestreams")

  const handleScheduleLivestream = async () => {
    await createItem("livestream")
  }

  const handleViewAnalytics = (id: number) => {
    toast({
      title: "View Analytics",
      description: `Viewing analytics for livestream #${id}`,
    })
  }

  const handleEditDetails = (id: number) => {
    toast({
      title: "Edit Details",
      description: `Editing details for livestream #${id}`,
    })
  }

  const handleDeleteStream = (id: number) => {
    toast({
      title: "Delete Stream",
      description: `Deleting livestream #${id}`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Livestreams & Shorts</h1>
          <p className="text-sm text-gray-400">Manage your livestreams and shorts content</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            action={handleScheduleLivestream}
            icon={<Plus className="h-4 w-4" />}
            actionName="Schedule Livestream"
          >
            Schedule Livestream
          </ActionButton>
          <TabSelector
            options={[
              { value: "livestreams", label: "Livestreams" },
              { value: "shorts", label: "Shorts" },
            ]}
            defaultValue={activeTab}
            onChange={setActiveTab}
          />
        </div>
      </div>

      {activeTab === "livestreams" ? (
        <>
          {/* Livestream Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Total Livestreams</p>
                    <h3 className="text-3xl font-bold">24</h3>
                    <p className="text-xs text-green-400">+3 this month</p>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    <Radio className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Avg. Peak Viewers</p>
                    <h3 className="text-3xl font-bold">10.2K</h3>
                    <p className="text-xs text-green-400">+15% from last month</p>
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
                    <p className="text-sm text-gray-400">Avg. Duration</p>
                    <h3 className="text-3xl font-bold">2:30:15</h3>
                    <p className="text-xs text-green-400">+20 min from last month</p>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <Calendar className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Scheduled</p>
                    <h3 className="text-3xl font-bold">3</h3>
                    <p className="text-xs text-green-400">Next: Jul 5, 2023</p>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <Calendar className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Viewer Trend Chart */}
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Viewer Trend - Last Livestream</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={viewerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                    <Line type="monotone" dataKey="viewers" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Livestreams Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Livestreams</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search livestreams..."
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
                      <TableHead className="w-[300px]">Livestream</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Peak Viewers</TableHead>
                      <TableHead>Total Views</TableHead>
                      <TableHead>Chat Messages</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {livestreams.map((stream) => (
                      <TableRow key={stream.id} className="hover:bg-gray-800/50 border-gray-800">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <img
                              src={stream.thumbnail || "/placeholder.svg"}
                              alt={stream.title}
                              className="w-20 h-12 object-cover rounded"
                            />
                            <span className="line-clamp-2">{stream.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              stream.status === "Completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }
                          >
                            {stream.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{stream.date}</TableCell>
                        <TableCell>{stream.duration}</TableCell>
                        <TableCell>{stream.peakViewers}</TableCell>
                        <TableCell>{stream.totalViews}</TableCell>
                        <TableCell>{stream.chatMessages}</TableCell>
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
                                onClick={() => handleViewAnalytics(stream.id)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-gray-800"
                                onClick={() => handleEditDetails(stream.id)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500"
                                onClick={() => handleDeleteStream(stream.id)}
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
        </>
      ) : (
        <>
          {/* Shorts Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Total Shorts</p>
                    <h3 className="text-3xl font-bold">48</h3>
                    <p className="text-xs text-green-400">+12 this month</p>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-full">
                    <Play className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Total Views</p>
                    <h3 className="text-3xl font-bold">24.5M</h3>
                    <p className="text-xs text-green-400">+35% from last month</p>
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
                    <p className="text-sm text-gray-400">Avg. Retention</p>
                    <h3 className="text-3xl font-bold">91%</h3>
                    <p className="text-xs text-green-400">+3% from last month</p>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-full">
                    <Calendar className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">Avg. Engagement</p>
                    <h3 className="text-3xl font-bold">8.7%</h3>
                    <p className="text-xs text-green-400">+1.2% from last month</p>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-full">
                    <Calendar className="h-6 w-6 text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shorts Performance Chart */}
          <Card className="bg-gray-900 border-gray-800 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Shorts Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Short 1", views: 1200000 },
                      { name: "Short 2", views: 950000 },
                      { name: "Short 3", views: 780000 },
                      { name: "Short 4", views: 650000 },
                      { name: "Short 5", views: 520000 },
                      { name: "Short 6", views: 480000 },
                      { name: "Short 7", views: 420000 },
                      { name: "Short 8", views: 380000 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                    <Bar dataKey="views" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Shorts Table */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Shorts</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search shorts..."
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
                      <TableHead className="w-[300px]">Short</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Likes</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Retention</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shorts.map((short) => (
                      <TableRow key={short.id} className="hover:bg-gray-800/50 border-gray-800">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <img
                              src={short.thumbnail || "/placeholder.svg"}
                              alt={short.title}
                              className="w-20 h-12 object-cover rounded"
                            />
                            <span className="line-clamp-2">{short.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{short.views}</TableCell>
                        <TableCell>{short.likes}</TableCell>
                        <TableCell>{short.comments}</TableCell>
                        <TableCell>{short.retention}</TableCell>
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
                                onClick={() => handleViewAnalytics(short.id)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer hover:bg-gray-800"
                                onClick={() => handleEditDetails(short.id)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500"
                                onClick={() => handleDeleteStream(short.id)}
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
        </>
      )}
    </div>
  )
}
