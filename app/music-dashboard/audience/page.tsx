"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { Download, Globe, Headphones, MapPin, TrendingUp, Users } from "lucide-react"

// Sample data
const demographicsData = [
  { age: "18-24", male: 28, female: 32, other: 5 },
  { age: "25-34", male: 22, female: 25, other: 3 },
  { age: "35-44", male: 15, female: 18, other: 2 },
  { age: "45-54", male: 8, female: 12, other: 1 },
  { age: "55+", male: 5, female: 8, other: 1 },
]

const locationData = [
  { name: "United States", value: 45, color: "#3b82f6" },
  { name: "United Kingdom", value: 15, color: "#22c55e" },
  { name: "Germany", value: 10, color: "#ef4444" },
  { name: "Canada", value: 8, color: "#f59e0b" },
  { name: "Australia", value: 7, color: "#8b5cf6" },
  { name: "Other", value: 15, color: "#64748b" },
]

const platformData = [
  { name: "Spotify", value: 45, color: "#1DB954" },
  { name: "Apple Music", value: 25, color: "#FC3C44" },
  { name: "YouTube Music", value: 15, color: "#FF0000" },
  { name: "Amazon Music", value: 8, color: "#00A8E1" },
  { name: "Others", value: 7, color: "#8884d8" },
]

const growthData = [
  { month: "Jan", listeners: 12500 },
  { month: "Feb", listeners: 15000 },
  { month: "Mar", listeners: 14000 },
  { month: "Apr", listeners: 16000 },
  { month: "May", listeners: 20000 },
  { month: "Jun", listeners: 22500 },
  { month: "Jul", listeners: 26000 },
]

const engagementData = [
  { name: "Playlist Adds", value: 45 },
  { name: "Saves", value: 30 },
  { name: "Shares", value: 15 },
  { name: "Comments", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function AudiencePage() {
  const [dateRange, setDateRange] = useState("30d")
  const [activeTab, setActiveTab] = useState("demographics")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Audience data refreshed",
        description: "Latest audience data has been loaded",
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your audience data is being exported",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audience Insights</h1>
          <p className="text-sm text-gray-400">Understand who's listening to your music</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
          <Button variant="outline" size="icon" onClick={handleExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Listeners</p>
                <h3 className="text-2xl font-bold">126,000</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+15.3% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Headphones className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Top Age Group</p>
                <h3 className="text-2xl font-bold">18-24</h3>
                <div className="flex items-center mt-1 text-gray-400 text-sm">
                  <span>37% of your audience</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Top Location</p>
                <h3 className="text-2xl font-bold">United States</h3>
                <div className="flex items-center mt-1 text-gray-400 text-sm">
                  <span>45% of your audience</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Top Platform</p>
                <h3 className="text-2xl font-bold">Spotify</h3>
                <div className="flex items-center mt-1 text-gray-400 text-sm">
                  <span>45% of your streams</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="demographics" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tab Content */}
      {activeTab === "demographics" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Age & Gender Distribution</CardTitle>
              <CardDescription>Breakdown of your listeners by age and gender</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={demographicsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="age" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                    <Bar dataKey="male" name="Male" fill="#3b82f6" />
                    <Bar dataKey="female" name="Female" fill="#ec4899" />
                    <Bar dataKey="other" name="Other" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Gender Distribution</CardTitle>
                <CardDescription>Overall gender breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Male", value: 45, color: "#3b82f6" },
                          { name: "Female", value: 48, color: "#ec4899" },
                          { name: "Other", value: 7, color: "#8b5cf6" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "Male", value: 45, color: "#3b82f6" },
                          { name: "Female", value: 48, color: "#ec4899" },
                          { name: "Other", value: 7, color: "#8b5cf6" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                        itemStyle={{ color: "#f9fafb" }}
                        labelStyle={{ color: "#f9fafb" }}
                        formatter={(value) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Age Distribution</CardTitle>
                <CardDescription>Overall age breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "18-24", value: 37, color: "#3b82f6" },
                          { name: "25-34", value: 28, color: "#22c55e" },
                          { name: "35-44", value: 18, color: "#f59e0b" },
                          { name: "45-54", value: 12, color: "#ef4444" },
                          { name: "55+", value: 5, color: "#8b5cf6" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: "18-24", value: 37, color: "#3b82f6" },
                          { name: "25-34", value: 28, color: "#22c55e" },
                          { name: "35-44", value: 18, color: "#f59e0b" },
                          { name: "45-54", value: 12, color: "#ef4444" },
                          { name: "55+", value: 5, color: "#8b5cf6" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                        itemStyle={{ color: "#f9fafb" }}
                        labelStyle={{ color: "#f9fafb" }}
                        formatter={(value) => [`${value}%`, ""]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "geography" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Geographic Distribution</CardTitle>
              <CardDescription>Where your listeners are located</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={locationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {locationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Cities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>New York, USA</span>
                    </div>
                    <span className="font-medium">12%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>London, UK</span>
                    </div>
                    <span className="font-medium">8%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span>Los Angeles, USA</span>
                    </div>
                    <span className="font-medium">7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Toronto, Canada</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span>Sydney, Australia</span>
                    </div>
                    <span className="font-medium">4%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Growth Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Brazil</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Mexico</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+32%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>India</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+28%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>Japan</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+22%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span>South Korea</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+18%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Untapped Markets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>France</span>
                    </div>
                    <span className="font-medium">High potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Spain</span>
                    </div>
                    <span className="font-medium">High potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Italy</span>
                    </div>
                    <span className="font-medium">Medium potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Netherlands</span>
                    </div>
                    <span className="font-medium">Medium potential</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>Sweden</span>
                    </div>
                    <span className="font-medium">Medium potential</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "platforms" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Platform Distribution</CardTitle>
              <CardDescription>Where your music is being streamed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Platform Performance</CardTitle>
                <CardDescription>Streams and revenue by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#1DB954" }}></div>
                        <span>Spotify</span>
                      </div>
                      <span className="font-medium">56,700 streams</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-800">
                      <div className="h-2 rounded-full" style={{ width: "45%", backgroundColor: "#1DB954" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FC3C44" }}></div>
                        <span>Apple Music</span>
                      </div>
                      <span className="font-medium">31,500 streams</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-800">
                      <div className="h-2 rounded-full" style={{ width: "25%", backgroundColor: "#FC3C44" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF0000" }}></div>
                        <span>YouTube Music</span>
                      </div>
                      <span className="font-medium">18,900 streams</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-800">
                      <div className="h-2 rounded-full" style={{ width: "15%", backgroundColor: "#FF0000" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#00A8E1" }}></div>
                        <span>Amazon Music</span>
                      </div>
                      <span className="font-medium">10,080 streams</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-800">
                      <div className="h-2 rounded-full" style={{ width: "8%", backgroundColor: "#00A8E1" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#8884d8" }}></div>
                        <span>Others</span>
                      </div>
                      <span className="font-medium">8,820 streams</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-800">
                      <div className="h-2 rounded-full" style={{ width: "7%", backgroundColor: "#8884d8" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Platform Growth</CardTitle>
                <CardDescription>Month-over-month growth by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#1DB954" }}></div>
                      <span>Spotify</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+18.5%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FC3C44" }}></div>
                      <span>Apple Music</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+12.3%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#FF0000" }}></div>
                      <span>YouTube Music</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+24.7%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#00A8E1" }}></div>
                      <span>Amazon Music</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+15.2%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: "#8884d8" }}></div>
                      <span>Others</span>
                    </div>
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+8.9%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "growth" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Listener Growth</CardTitle>
              <CardDescription>Monthly listener growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={growthData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [value.toLocaleString(), "Listeners"]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="listeners"
                      name="Monthly Listeners"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Growth Metrics</CardTitle>
                <CardDescription>Key growth indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Monthly Growth Rate</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">15.3%</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+2.1%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">New Listeners</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">3,500</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+12.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Retention Rate</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">78.2%</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+3.5%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Avg. Listen Time</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">3:45</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+0:12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Growth Opportunities</CardTitle>
                <CardDescription>Areas with potential for growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <h3 className="font-medium mb-1">Playlist Placements</h3>
                    <p className="text-sm text-gray-400">
                      Your music has potential for 25+ more editorial playlists based on current performance.
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <h3 className="font-medium mb-1">Geographic Expansion</h3>
                    <p className="text-sm text-gray-400">
                      Consider targeting Brazil and Mexico where similar artists are seeing rapid growth.
                    </p>
                  </div>

                  <div className="rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <h3 className="font-medium mb-1">Platform Focus</h3>
                    <p className="text-sm text-gray-400">
                      YouTube Music shows highest growth rate but lowest overall streams. Consider focusing more content
                      there.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "engagement" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Listener Engagement</CardTitle>
              <CardDescription>How listeners are interacting with your music</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                      itemStyle={{ color: "#f9fafb" }}
                      labelStyle={{ color: "#f9fafb" }}
                      formatter={(value) => [`${value}%`, ""]}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Engagement Metrics</CardTitle>
                <CardDescription>Key engagement indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Completion Rate</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">72.5%</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+4.2%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Repeat Listens</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">2.8x</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+0.3x</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-400">Playlist Adds</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">3,245</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+18.7%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-400">Social Shares</p>
                      <div className="flex items-center">
                        <p className="text-2xl font-bold">1,872</p>
                        <div className="ml-2 flex items-center text-green-500 text-sm">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span>+22.4%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Top Playlists</CardTitle>
                <CardDescription>Where your music is being featured</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-green-500/20 flex items-center justify-center">
                        <Headphones className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Today's Top Hits</h4>
                        <p className="text-xs text-gray-400">Spotify • 12.5M followers</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">4,250 plays</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-blue-500/20 flex items-center justify-center">
                        <Headphones className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Chill Vibes</h4>
                        <p className="text-xs text-gray-400">Spotify • 5.8M followers</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">3,120 plays</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-red-500/20 flex items-center justify-center">
                        <Headphones className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">New Music Daily</h4>
                        <p className="text-xs text-gray-400">Apple Music • 4.2M followers</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">2,845 plays</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md bg-yellow-500/20 flex items-center justify-center">
                        <Headphones className="h-4 w-4 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">Indie Discoveries</h4>
                        <p className="text-xs text-gray-400">Amazon Music • 1.5M followers</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">1,720 plays</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
