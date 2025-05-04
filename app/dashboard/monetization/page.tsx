"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { DollarSign, TrendingUp, ArrowUpRight, CreditCard, Youtube, Music, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample revenue data
const revenueData = [
  { month: "Jan", youtube: 4200, music: 2100, total: 6300 },
  { month: "Feb", youtube: 4500, music: 2300, total: 6800 },
  { month: "Mar", youtube: 5100, music: 2600, total: 7700 },
  { month: "Apr", youtube: 5400, music: 2800, total: 8200 },
  { month: "May", youtube: 5900, music: 3200, total: 9100 },
  { month: "Jun", youtube: 6300, music: 3500, total: 9800 },
]

// Sample platform data
const platformData = [
  { name: "YouTube", value: 64 },
  { name: "Spotify", value: 18 },
  { name: "Apple Music", value: 12 },
  { name: "Others", value: 6 },
]

export default function MonetizationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Monetization</h1>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Withdraw Funds
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Revenue</p>
                <h3 className="text-3xl font-bold">$48,320</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+18% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">YouTube Revenue</p>
                <h3 className="text-3xl font-bold">$32,150</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+22% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-red-500/20 rounded-full">
                <Youtube className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Music Revenue</p>
                <h3 className="text-3xl font-bold">$16,170</h3>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-400 mr-1" />
                  <p className="text-xs text-green-400">+12% from last month</p>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Music className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Pending Payout</p>
                <h3 className="text-3xl font-bold">$8,540</h3>
                <div className="flex items-center mt-1">
                  <Info className="h-4 w-4 text-yellow-400 mr-1" />
                  <p className="text-xs text-yellow-400">Available on Jul 15</p>
                </div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <CreditCard className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="mb-6">
        <TabsList className="bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="youtube" className="data-[state=active]:bg-gray-700">
            YouTube
          </TabsTrigger>
          <TabsTrigger value="music" className="data-[state=active]:bg-gray-700">
            Music
          </TabsTrigger>
          <TabsTrigger value="payouts" className="data-[state=active]:bg-gray-700">
            Payouts
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    youtube: {
                      label: "YouTube Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    music: {
                      label: "Music Revenue",
                      color: "hsl(var(--chart-2))",
                    },
                    total: {
                      label: "Total Revenue",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="youtube" stroke="var(--color-youtube)" strokeWidth={2} />
                      <Line type="monotone" dataKey="music" stroke="var(--color-music)" strokeWidth={2} />
                      <Line type="monotone" dataKey="total" stroke="var(--color-total)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9CA3AF" />
                      <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
                        itemStyle={{ color: "#F9FAFB" }}
                      />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Monetization Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-full">
                      <TrendingUp className="h-5 w-5 text-purple-400" />
                    </div>
                    <h3 className="font-medium">Optimize Your Content</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Create longer videos (8+ minutes) to include more mid-roll ads and increase revenue potential.
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-full">
                      <Music className="h-5 w-5 text-blue-400" />
                    </div>
                    <h3 className="font-medium">Distribute Widely</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Ensure your music is available on all major streaming platforms to maximize revenue streams.
                  </p>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-full">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="font-medium">Claim Your Content</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Use Content ID to identify and claim revenue from videos using your music across YouTube.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube" className="mt-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <Youtube className="h-10 w-10 mx-auto text-red-500 mb-2" />
              <h3 className="text-lg font-medium">YouTube Revenue Details Coming Soon</h3>
              <p className="text-gray-400">This section is currently under development.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="music" className="mt-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <Music className="h-10 w-10 mx-auto text-blue-500 mb-2" />
              <h3 className="text-lg font-medium">Music Revenue Details Coming Soon</h3>
              <p className="text-gray-400">This section is currently under development.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <div className="flex items-center justify-center h-40">
            <div className="text-center">
              <CreditCard className="h-10 w-10 mx-auto text-green-500 mb-2" />
              <h3 className="text-lg font-medium">Payout History Coming Soon</h3>
              <p className="text-gray-400">This section is currently under development.</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
