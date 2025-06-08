"use client"

import { useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Download, Calendar, Music, Eye, Users, ArrowUpRight } from "lucide-react"

export default function RoyaltyDashboardPage() {
  const { setCurrentPage } = useDashboard()

  useEffect(() => {
    setCurrentPage("Royalty Dashboard")
  }, [setCurrentPage])

  const royaltyData = [
    { platform: "Spotify", revenue: 1245.67, streams: 125430, percentage: 45.2 },
    { platform: "Apple Music", revenue: 892.34, streams: 89234, percentage: 32.4 },
    { platform: "YouTube Music", revenue: 456.78, streams: 156789, percentage: 16.6 },
    { platform: "Amazon Music", revenue: 234.56, streams: 23456, percentage: 8.5 },
    { platform: "Deezer", revenue: 123.45, streams: 12345, percentage: 4.5 },
  ]

  const totalRevenue = royaltyData.reduce((sum, item) => sum + item.revenue, 0)
  const totalStreams = royaltyData.reduce((sum, item) => sum + item.streams, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Royalty Dashboard</h1>
          <p className="text-gray-400">Track your earnings and royalty splits across all platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white">
            <Calendar className="h-4 w-4 mr-2" />
            This Month
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
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
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+12.5%</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">{totalStreams.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+8.3%</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Releases</p>
                <p className="text-2xl font-bold text-white">24</p>
                <div className="flex items-center space-x-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+3</span>
                </div>
              </div>
              <Music className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Collaborators</p>
                <p className="text-2xl font-bold text-white">8</p>
                <div className="flex items-center space-x-1 mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">+2</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="platforms" className="text-gray-300 data-[state=active]:text-white">
            By Platform
          </TabsTrigger>
          <TabsTrigger value="splits" className="text-gray-300 data-[state=active]:text-white">
            Royalty Splits
          </TabsTrigger>
          <TabsTrigger value="payouts" className="text-gray-300 data-[state=active]:text-white">
            Payouts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Revenue Trend</CardTitle>
                <CardDescription className="text-gray-400">Monthly revenue over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Jan", amount: 1200 },
                    { month: "Feb", amount: 1350 },
                    { month: "Mar", amount: 1100 },
                    { month: "Apr", amount: 1800 },
                    { month: "May", amount: 2100 },
                    { month: "Jun", amount: 2750 },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-gray-400 text-sm">{item.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white text-sm">${item.amount}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                            style={{ width: `${(item.amount / 3000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Top Performing Tracks</CardTitle>
                <CardDescription className="text-gray-400">Highest earning tracks this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Midnight Dreams", artist: "Luna Rodriguez", revenue: 456.78, streams: 45678 },
                    { title: "Electric Nights", artist: "Neon Pulse", revenue: 234.56, streams: 23456 },
                    { title: "Summer Vibes", artist: "Beach Collective", revenue: 189.34, streams: 18934 },
                    { title: "City Lights", artist: "Urban Sound", revenue: 156.78, streams: 15678 },
                  ].map((track, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{track.title}</p>
                        <p className="text-gray-400 text-sm">{track.artist}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${track.revenue}</p>
                        <p className="text-gray-400 text-sm">{track.streams.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Revenue by Platform</CardTitle>
              <CardDescription className="text-gray-400">
                Breakdown of earnings across streaming platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {royaltyData.map((platform, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                            {platform.platform.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{platform.platform}</h3>
                            <p className="text-gray-400 text-sm">{platform.streams.toLocaleString()} streams</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold text-lg">${platform.revenue.toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">{platform.percentage}% of total</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Progress value={platform.percentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="splits" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Active Royalty Splits</CardTitle>
              <CardDescription className="text-gray-400">Current collaborator revenue sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "John Doe", role: "Producer", percentage: 40, amount: 1100.27 },
                  { name: "Jane Smith", role: "Songwriter", percentage: 30, amount: 825.2 },
                  { name: "Mike Johnson", role: "Artist", percentage: 20, amount: 550.13 },
                  { name: "Sarah Wilson", role: "Collaborator", percentage: 10, amount: 275.07 },
                ].map((split, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {split.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{split.name}</h3>
                            <p className="text-gray-400 text-sm">{split.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">${split.amount.toFixed(2)}</p>
                          <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                            {split.percentage}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Payout History</CardTitle>
              <CardDescription className="text-gray-400">Recent and upcoming payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { date: "2024-01-15", amount: 2750.45, status: "completed", method: "Bank Transfer" },
                  { date: "2023-12-15", amount: 2100.32, status: "completed", method: "PayPal" },
                  { date: "2023-11-15", amount: 1800.67, status: "completed", method: "Bank Transfer" },
                  { date: "2024-02-15", amount: 3200.0, status: "pending", method: "Bank Transfer" },
                ].map((payout, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-semibold">${payout.amount.toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">
                            {payout.date} • {payout.method}
                          </p>
                        </div>
                        <Badge
                          className={
                            payout.status === "completed"
                              ? "bg-green-600/20 text-green-400 border-green-600/30"
                              : "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                          }
                        >
                          {payout.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
