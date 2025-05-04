"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Search, Filter, Music, Play, Headphones, BarChart3, ArrowUpRight } from "lucide-react"

export default function MusicDashboardPage() {
  const [activeTab, setActiveTab] = useState("tracks")
  const [searchTerm, setSearchTerm] = useState("")

  // Sample tracks data
  const tracksData = [
    {
      id: "TRK-12345",
      title: "Summer Vibes",
      album: "Seasonal Moods",
      streams: 1250000,
      revenue: 5250.67,
      releaseDate: "2023-05-15",
      status: "Active",
      trending: true,
    },
    {
      id: "TRK-12346",
      title: "Midnight Dreams",
      album: "Night Sessions",
      streams: 980000,
      revenue: 4120.32,
      releaseDate: "2023-04-10",
      status: "Active",
      trending: false,
    },
    {
      id: "TRK-12347",
      title: "Ocean Waves",
      album: "Nature Sounds",
      streams: 750000,
      revenue: 3150.18,
      releaseDate: "2023-03-22",
      status: "Active",
      trending: false,
    },
    {
      id: "TRK-12348",
      title: "City Lights",
      album: "Urban Vibes",
      streams: 620000,
      revenue: 2604.91,
      releaseDate: "2023-02-18",
      status: "Active",
      trending: true,
    },
    {
      id: "TRK-12349",
      title: "Mountain Echo",
      album: "Nature Sounds",
      streams: 540000,
      revenue: 2268.45,
      releaseDate: "2023-01-05",
      status: "Active",
      trending: false,
    },
  ]

  // Sample albums data
  const albumsData = [
    {
      id: "ALB-12345",
      title: "Seasonal Moods",
      tracks: 12,
      totalStreams: 3250000,
      revenue: 13650.67,
      releaseDate: "2023-05-15",
      status: "Active",
    },
    {
      id: "ALB-12346",
      title: "Night Sessions",
      tracks: 10,
      totalStreams: 2180000,
      revenue: 9156.32,
      releaseDate: "2023-04-10",
      status: "Active",
    },
    {
      id: "ALB-12347",
      title: "Nature Sounds",
      tracks: 15,
      totalStreams: 1950000,
      revenue: 8190.18,
      releaseDate: "2023-03-22",
      status: "Active",
    },
    {
      id: "ALB-12348",
      title: "Urban Vibes",
      tracks: 8,
      totalStreams: 1420000,
      revenue: 5964.91,
      releaseDate: "2023-02-18",
      status: "Active",
    },
  ]

  // Sample streaming data
  const streamingData = [
    { month: "Jan", streams: 1450000 },
    { month: "Feb", streams: 1580000 },
    { month: "Mar", streams: 1720000 },
    { month: "Apr", streams: 1890000 },
    { month: "May", streams: 2050000 },
    { month: "Jun", streams: 2250000 },
    { month: "Jul", streams: 2480000 },
    { month: "Aug", streams: 2720000 },
    { month: "Sep", streams: 2980000 },
    { month: "Oct", streams: 3250000 },
    { month: "Nov", streams: 3520000 },
    { month: "Dec", streams: 3850000 },
  ]

  // Filter data based on search term
  const filteredTracks = searchTerm
    ? tracksData.filter(
        (track) =>
          track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
          track.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : tracksData

  const filteredAlbums = searchTerm
    ? albumsData.filter(
        (album) =>
          album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          album.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : albumsData

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Music Dashboard</h1>
          <p className="text-sm text-gray-400">Manage and monitor your music catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Music className="h-4 w-4 mr-2" />
            Add New Release
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Tracks</p>
                <h3 className="text-3xl font-bold">248</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+12 this month</p>
                </div>
              </div>
              <div className="p-2 bg-purple-500/20 rounded-full">
                <Music className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Albums</p>
                <h3 className="text-3xl font-bold">32</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+2 this month</p>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Headphones className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Streams</p>
                <h3 className="text-3xl font-bold">28.5M</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+8% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <Play className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <h3 className="text-3xl font-bold">$120.5K</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+12% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <BarChart3 className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Streaming Trend */}
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Streaming Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              streams: {
                label: "Streams",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={streamingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="streams"
                  stroke="var(--color-streams)"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Music Catalog */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Music Catalog</CardTitle>
            <Tabs defaultValue="tracks" onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-gray-800">
                <TabsTrigger value="tracks" className="data-[state=active]:bg-gray-700">
                  Tracks
                </TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-gray-700">
                  Albums
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
                placeholder={`Search ${activeTab}...`}
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
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="revenue">Highest Revenue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="tracks" className="mt-0">
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800/50 border-gray-800">
                    <TableHead>Title</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead>Streams</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTracks.map((track) => (
                    <TableRow key={track.id} className="hover:bg-gray-800/50 border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-800 rounded-md p-1">
                            <Play className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium">{track.title}</div>
                            <div className="text-xs text-gray-400">{track.id}</div>
                          </div>
                          {track.trending && <Badge className="ml-2 bg-red-500/20 text-red-400">Trending</Badge>}
                        </div>
                      </TableCell>
                      <TableCell>{track.album}</TableCell>
                      <TableCell>{track.streams.toLocaleString()}</TableCell>
                      <TableCell>${track.revenue.toFixed(2)}</TableCell>
                      <TableCell>{track.releaseDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400">{track.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="albums" className="mt-0">
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800/50 border-gray-800">
                    <TableHead>Title</TableHead>
                    <TableHead>Tracks</TableHead>
                    <TableHead>Total Streams</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Release Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlbums.map((album) => (
                    <TableRow key={album.id} className="hover:bg-gray-800/50 border-gray-800">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-800 rounded-md p-1">
                            <Headphones className="h-4 w-4 text-gray-400" />
                          </div>
                          <div>
                            <div className="font-medium">{album.title}</div>
                            <div className="text-xs text-gray-400">{album.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{album.tracks}</TableCell>
                      <TableCell>{album.totalStreams.toLocaleString()}</TableCell>
                      <TableCell>${album.revenue.toFixed(2)}</TableCell>
                      <TableCell>{album.releaseDate}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400">{album.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  )
}
