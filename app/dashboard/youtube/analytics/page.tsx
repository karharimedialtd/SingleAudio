"use client"

import { useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { TrendingUp, Eye, Play, Download, Calendar, Filter, DollarSign, Clock, Share2 } from "lucide-react"
import { useSearchParams } from "next/navigation"

const streamingData = [
  { month: "Jan", streams: 45000, revenue: 180 },
  { month: "Feb", streams: 52000, revenue: 208 },
  { month: "Mar", streams: 48000, revenue: 192 },
  { month: "Apr", streams: 61000, revenue: 244 },
  { month: "May", streams: 55000, revenue: 220 },
  { month: "Jun", streams: 67000, revenue: 268 },
]

const platformData = [
  { platform: "Spotify", streams: 125430, percentage: 45.2, revenue: 502.15 },
  { platform: "Apple Music", streams: 89234, percentage: 32.1, revenue: 356.94 },
  { platform: "YouTube Music", streams: 45678, percentage: 16.4, revenue: 182.71 },
  { platform: "Amazon Music", streams: 12345, percentage: 4.4, revenue: 49.38 },
  { platform: "Deezer", streams: 5432, percentage: 1.9, revenue: 21.73 },
]

export default function YouTubeAnalyticsPage() {
  const { setCurrentPage } = useDashboard()
  const searchParams = useSearchParams()
  const videoId = searchParams.get("video")

  useEffect(() => {
    setCurrentPage("YouTube Analytics")
  }, [setCurrentPage])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">YouTube Analytics</h1>
          <p className="text-gray-400">Track the performance of your YouTube videos</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-gray-300 hover:text-white"
            onClick={() => {
              // Open filter modal or dropdown
              console.log("Opening filters...")
            }}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              // Export report logic
              console.log("Exporting analytics report...")
              // Simulate download
              const link = document.createElement("a")
              link.href = "data:text/csv;charset=utf-8,Analytics Report Data..."
              link.download = "youtube-analytics-report.csv"
              link.click()
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">
                  {platformData.reduce((sum, item) => sum + item.streams, 0).toLocaleString()}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+12.5%</span>
                </div>
              </div>
              <Play className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">
                  ${platformData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+15.2%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. CPM</p>
                <p className="text-2xl font-bold text-white">$4.50</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+3.1%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Watch Time (Hours)</p>
                <p className="text-2xl font-bold text-white">1,234</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+7.8%</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="demographics" className="text-gray-300 data-[state=active]:text-white">
            Demographics
          </TabsTrigger>
          <TabsTrigger value="traffic" className="text-gray-300 data-[state=active]:text-white">
            Traffic Sources
          </TabsTrigger>
          <TabsTrigger value="engagement" className="text-gray-300 data-[state=active]:text-white">
            Engagement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Streaming Trends</CardTitle>
                <CardDescription className="text-gray-400">Views and revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={streamingData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Line type="monotone" dataKey="streams" stroke="#8B5CF6" strokeWidth={2} />
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Platform Performance</CardTitle>
                <CardDescription className="text-gray-400">Streams and revenue by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformData.map((platform, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {platform.platform.charAt(0)}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{platform.platform}</h3>
                              <p className="text-gray-400 text-sm">{platform.streams.toLocaleString()} streams</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-bold">${platform.revenue.toFixed(2)}</p>
                            <p className="text-gray-400 text-sm">{platform.percentage}%</p>
                          </div>
                        </div>
                        <Progress value={platform.percentage} className="h-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Audience Demographics</CardTitle>
              <CardDescription className="text-gray-400">Age and gender distribution of your viewers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Age Groups</h3>
                  {[
                    { age: "13-17", percentage: 12.5 },
                    { age: "18-24", percentage: 35.2 },
                    { age: "25-34", percentage: 28.7 },
                    { age: "35-44", percentage: 18.9 },
                    { age: "45-54", percentage: 4.7 },
                  ].map((group, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{group.age}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{group.percentage}%</p>
                        <Progress value={group.percentage} className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Gender</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Female</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">58.2%</p>
                      <Progress value={58.2} className="h-2 w-20" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">Male</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">41.8%</p>
                      <Progress value={41.8} className="h-2 w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Traffic Sources</CardTitle>
              <CardDescription className="text-gray-400">Where your viewers are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: "YouTube Search", percentage: 45.2 },
                  { source: "External Websites", percentage: 22.1 },
                  { source: "Suggested Videos", percentage: 15.8 },
                  { source: "Direct or Unknown", percentage: 10.5 },
                  { source: "Playlists", percentage: 6.4 },
                ].map((traffic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{traffic.source}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{traffic.percentage}%</p>
                      <Progress value={traffic.percentage} className="h-2 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Engagement Metrics</CardTitle>
              <CardDescription className="text-gray-400">Likes, comments, and shares</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Likes</p>
                        <p className="text-2xl font-bold text-white">892</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Comments</p>
                        <p className="text-2xl font-bold text-white">156</p>
                      </div>
                      <Eye className="h-8 w-8 text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-400 text-sm">Shares</p>
                        <p className="text-2xl font-bold text-white">42</p>
                      </div>
                      <Share2 className="h-8 w-8 text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
