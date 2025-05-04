"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { toast } from "@/components/ui/use-toast"
import { BarChart3, Calendar, ChevronRight, Download, FileText, Filter, Search, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Sample data
const statements = [
  {
    id: 1,
    period: "July 2023",
    dateIssued: "2023-08-15",
    amount: 625.45,
    status: "Paid",
    platforms: ["Spotify", "Apple Music", "YouTube Music"],
  },
  {
    id: 2,
    period: "June 2023",
    dateIssued: "2023-07-15",
    amount: 582.3,
    status: "Paid",
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"],
  },
  {
    id: 3,
    period: "May 2023",
    dateIssued: "2023-06-15",
    amount: 498.75,
    status: "Paid",
    platforms: ["Spotify", "Apple Music", "YouTube Music"],
  },
  {
    id: 4,
    period: "April 2023",
    dateIssued: "2023-05-15",
    amount: 512.2,
    status: "Paid",
    platforms: ["Spotify", "Apple Music", "YouTube Music", "Amazon Music"],
  },
  {
    id: 5,
    period: "March 2023",
    dateIssued: "2023-04-15",
    amount: 475.9,
    status: "Paid",
    platforms: ["Spotify", "Apple Music", "YouTube Music"],
  },
  {
    id: 6,
    period: "February 2023",
    dateIssued: "2023-03-15",
    amount: 430.15,
    status: "Paid",
    platforms: ["Spotify", "Apple Music"],
  },
]

const revenueData = [
  { month: "Jan", revenue: 380.25 },
  { month: "Feb", revenue: 430.15 },
  { month: "Mar", revenue: 475.9 },
  { month: "Apr", revenue: 512.2 },
  { month: "May", revenue: 498.75 },
  { month: "Jun", revenue: 582.3 },
  { month: "Jul", revenue: 625.45 },
]

export default function StatementsPage() {
  const [dateRange, setDateRange] = useState("6m")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Statements refreshed",
        description: "Latest statement data has been loaded",
      })
    }, 1500)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleDownload = (id: number) => {
    toast({
      title: "Download started",
      description: `Statement #${id} is being downloaded`,
    })
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your statements data is being exported",
    })
  }

  // Filter statements based on search query and filters
  const filteredStatements = statements.filter((statement) => {
    const matchesSearch = statement.period.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || statement.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Calculate total revenue
  const totalRevenue = statements.reduce((sum, statement) => sum + statement.amount, 0)

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Royalty Statements</h1>
          <p className="text-sm text-gray-400">View and download your royalty statements</p>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Revenue</p>
                <h3 className="text-2xl font-bold">${totalRevenue.toFixed(2)}</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12.8% from last period</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Latest Statement</p>
                <h3 className="text-2xl font-bold">${statements[0].amount.toFixed(2)}</h3>
                <div className="flex items-center mt-1 text-green-500 text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+7.4% from previous</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-800 bg-gray-900">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Next Statement</p>
                <h3 className="text-2xl font-bold">August 15</h3>
                <div className="flex items-center mt-1 text-gray-400 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>12 days remaining</span>
                </div>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="border-gray-800 bg-gray-900 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                  itemStyle={{ color: "#f9fafb" }}
                  labelStyle={{ color: "#f9fafb" }}
                  formatter={(value) => [`$${value}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fill="#8b5cf680" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search statements..."
            className="pl-8 bg-gray-950 border-gray-800"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px] bg-gray-950 border-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statements List */}
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Statements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredStatements.length > 0 ? (
              filteredStatements.map((statement) => (
                <div
                  key={statement.id}
                  className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20">
                      <FileText className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{statement.period} Statement</h3>
                      <p className="text-sm text-gray-400">
                        Issued: {new Date(statement.dateIssued).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <div>
                      <Badge
                        className={
                          statement.status === "Paid"
                            ? "bg-green-500/20 text-green-500"
                            : statement.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-blue-500/20 text-blue-500"
                        }
                      >
                        {statement.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${statement.amount.toFixed(2)}</p>
                      <p className="text-xs text-gray-400">{statement.platforms.length} platforms</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden md:flex"
                      onClick={() => handleDownload(statement.id)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => handleDownload(statement.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                  <FileText className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No statements found</h3>
                <p className="mt-2 text-center text-gray-400">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You don't have any statements yet"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
