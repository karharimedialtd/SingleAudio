"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowDownToLine,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Music,
  PieChartIcon,
  TrendingUp,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Sample data
const monthlyRevenue = [
  { month: "Jan", spotify: 120, apple: 80, youtube: 60, other: 40 },
  { month: "Feb", spotify: 150, apple: 90, youtube: 70, other: 50 },
  { month: "Mar", spotify: 180, apple: 100, youtube: 90, other: 60 },
  { month: "Apr", spotify: 220, apple: 130, youtube: 100, other: 70 },
  { month: "May", spotify: 250, apple: 150, youtube: 120, other: 80 },
  { month: "Jun", spotify: 280, apple: 170, youtube: 140, other: 90 },
]

const platformData = [
  { name: "Spotify", value: 45, color: "#1DB954" },
  { name: "Apple Music", value: 25, color: "#FC3C44" },
  { name: "YouTube Music", value: 15, color: "#FF0000" },
  { name: "TikTok", value: 8, color: "#000000" },
  { name: "Others", value: 7, color: "#8884d8" },
]

const recentPayments = [
  {
    id: 1,
    date: "2023-07-15",
    amount: 342.56,
    source: "Spotify",
    status: "Paid",
    period: "May 2023",
  },
  {
    id: 2,
    date: "2023-07-10",
    amount: 215.32,
    source: "Apple Music",
    status: "Paid",
    period: "May 2023",
  },
  {
    id: 3,
    date: "2023-07-05",
    amount: 127.89,
    source: "YouTube Music",
    status: "Paid",
    period: "May 2023",
  },
  {
    id: 4,
    date: "2023-06-15",
    amount: 298.45,
    source: "Spotify",
    status: "Paid",
    period: "April 2023",
  },
  {
    id: 5,
    date: "2023-06-10",
    amount: 187.67,
    source: "Apple Music",
    status: "Paid",
    period: "April 2023",
  },
]

const topEarningTracks = [
  {
    id: 1,
    title: "Night Drive",
    streams: 125000,
    revenue: 625.0,
    growth: 15.3,
  },
  {
    id: 2,
    title: "Summer Vibes",
    streams: 98000,
    revenue: 490.0,
    growth: 8.7,
  },
  {
    id: 3,
    title: "Midnight Dreams",
    streams: 87000,
    revenue: 435.0,
    growth: 12.4,
  },
  {
    id: 4,
    title: "Acoustic Sessions",
    streams: 65000,
    revenue: 325.0,
    growth: -2.1,
  },
  {
    id: 5,
    title: "Urban Beats",
    streams: 52000,
    revenue: 260.0,
    growth: 5.8,
  },
]

export default function RoyaltiesPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState("6m")
  const [paymentPeriod, setPaymentPeriod] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [filteredPayments, setFilteredPayments] = useState(recentPayments)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Royalty data refreshed",
        description: "Latest earnings data has been loaded",
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your royalty data is being exported to CSV",
    })
  }

  const handlePeriodChange = (value: string) => {
    setPaymentPeriod(value)

    if (value === "all") {
      setFilteredPayments(recentPayments)
    } else {
      setFilteredPayments(
        recentPayments.filter((payment) => payment.period.toLowerCase().includes(value.split("-")[1])),
      )
    }
  }

  const handleViewAllPayments = () => {
    router.push("/music-dashboard/royalties/payments")
  }

  const handleDownloadStatement = (paymentId: number) => {
    toast({
      title: "Statement downloaded",
      description: `Payment statement #${paymentId} has been downloaded`,
    })
  }

  const handleViewTrackDetails = (trackId: number) => {
    router.push(`/music-dashboard/royalties/tracks/${trackId}`)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Royalties & Earnings</h1>
          <p className="text-sm text-gray-400">Track your music revenue across all platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
          <RefreshButton onClick={handleRefresh} isLoading={isRefreshing} />
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Earnings</p>
                <h3 className="text-2xl font-bold">$2,485.32</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.5% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Pending Payments</p>
                <h3 className="text-2xl font-bold">$876.45</h3>
                <p className="text-sm text-gray-500 mt-1">Expected in 15 days</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Streams</p>
                <h3 className="text-2xl font-bold">427,000</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+8.3% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Music className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Avg. per Stream</p>
                <h3 className="text-2xl font-bold">$0.0058</h3>
                <p className="text-sm text-gray-500 mt-1">Across all platforms</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <PieChartIcon className="h-6 w-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <Card className="border-gray-800 bg-gray-900 lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Revenue by Platform</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs" onClick={handleExport}>
                <Download className="h-3.5 w-3.5" />
                Export
              </Button>
            </div>
            <CardDescription>Monthly earnings across streaming platforms</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenue}
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
                    formatter={(value) => [`$${value}`, ""]}
                  />
                  <Legend />
                  <Bar dataKey="spotify" name="Spotify" fill="#1DB954" />
                  <Bar dataKey="apple" name="Apple Music" fill="#FC3C44" />
                  <Bar dataKey="youtube" name="YouTube Music" fill="#FF0000" />
                  <Bar dataKey="other" name="Other Platforms" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Revenue Distribution</CardTitle>
            <CardDescription>Earnings by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
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
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Earning Tracks */}
      <Card className="border-gray-800 bg-gray-900 mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Top Earning Tracks</CardTitle>
          <CardDescription>Your best performing tracks by revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left font-medium text-gray-400 pb-3">Track</th>
                  <th className="text-right font-medium text-gray-400 pb-3">Streams</th>
                  <th className="text-right font-medium text-gray-400 pb-3">Revenue</th>
                  <th className="text-right font-medium text-gray-400 pb-3">Growth</th>
                  <th className="text-right font-medium text-gray-400 pb-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topEarningTracks.map((track) => (
                  <tr key={track.id} className="border-b border-gray-800">
                    <td className="py-3">
                      <div className="font-medium">{track.title}</div>
                    </td>
                    <td className="text-right py-3">{track.streams.toLocaleString()}</td>
                    <td className="text-right py-3">${track.revenue.toFixed(2)}</td>
                    <td className="text-right py-3">
                      <span className={track.growth >= 0 ? "text-green-500" : "text-red-500"}>
                        {track.growth >= 0 ? "+" : ""}
                        {track.growth}%
                      </span>
                    </td>
                    <td className="text-right py-3">
                      <Button variant="ghost" size="sm" onClick={() => handleViewTrackDetails(track.id)}>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-medium">Payment History</CardTitle>
              <CardDescription>Recent royalty payments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="all" onValueChange={handlePeriodChange}>
                <SelectTrigger className="h-8 w-[180px] bg-gray-950 border-gray-800">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="2023-05">May 2023</SelectItem>
                  <SelectItem value="2023-04">April 2023</SelectItem>
                  <SelectItem value="2023-03">March 2023</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => router.push("/music-dashboard/royalties/statements")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Statements
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium">{payment.source}</div>
                    <div className="text-sm text-gray-400">Period: {payment.period}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${payment.amount.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">{new Date(payment.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <Badge className="bg-green-500/20 text-green-500">{payment.status}</Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDownloadStatement(payment.id)}>
                  <ArrowDownToLine className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-800 pt-4">
          <Button variant="outline" onClick={handleViewAllPayments}>
            View All Payments
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
