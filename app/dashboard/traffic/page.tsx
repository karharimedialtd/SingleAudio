"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, TrendingUp, TrendingDown } from "lucide-react"
import { ActionButton } from "@/components/action-button"
import { handleRefresh, handleExport } from "@/lib/button-actions"

// Sample data
const trafficSourceData = [
  { name: "YouTube Search", value: 35, change: "+12%" },
  { name: "Suggested Videos", value: 25, change: "+8%" },
  { name: "External", value: 20, change: "+15%" },
  { name: "Browse Features", value: 15, change: "-3%" },
  { name: "Channel Pages", value: 8, change: "+5%" },
  { name: "Playlists", value: 5, change: "+2%" },
  { name: "Notifications", value: 2, change: "+10%" },
]

const externalSourcesData = [
  { name: "Facebook", value: 35, change: "+8%" },
  { name: "Twitter", value: 25, change: "+12%" },
  { name: "Instagram", value: 15, change: "+20%" },
  { name: "Reddit", value: 10, change: "+5%" },
  { name: "TikTok", value: 8, change: "+30%" },
  { name: "Blogs", value: 5, change: "-2%" },
  { name: "Other", value: 2, change: "+1%" },
]

const trafficTrendData = [
  { date: "Jan 1", search: 420, suggested: 350, external: 280 },
  { date: "Jan 2", search: 450, suggested: 320, external: 290 },
  { date: "Jan 3", search: 510, suggested: 380, external: 310 },
  { date: "Jan 4", search: 540, suggested: 390, external: 320 },
  { date: "Jan 5", search: 590, suggested: 420, external: 350 },
  { date: "Jan 6", search: 630, suggested: 450, external: 380 },
  { date: "Jan 7", search: 680, suggested: 480, external: 410 },
  { date: "Jan 8", search: 720, suggested: 510, external: 430 },
  { date: "Jan 9", search: 780, suggested: 550, external: 460 },
  { date: "Jan 10", search: 810, suggested: 580, external: 490 },
  { date: "Jan 11", search: 850, suggested: 610, external: 520 },
  { date: "Jan 12", search: 890, suggested: 640, external: 550 },
  { date: "Jan 13", search: 920, suggested: 670, external: 580 },
  { date: "Jan 14", search: 960, suggested: 700, external: 610 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F", "#FFBB28"]

export default function TrafficPage() {
  const [timeRange, setTimeRange] = useState("30days")

  const handleRefreshData = async () => {
    await handleRefresh("traffic sources")
  }

  const handleExportData = async () => {
    await handleExport("traffic sources", trafficSourceData, "traffic-sources.csv")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Traffic Sources</h1>
          <p className="text-sm text-gray-400">Understand where your viewers are coming from</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleRefreshData}
            icon={<RefreshCw className="h-4 w-4 mr-2" />}
            actionName="Refresh Data"
          >
            Refresh Data
          </ActionButton>
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleExportData}
            icon={<Download className="h-4 w-4 mr-2" />}
            actionName="Export Data"
          >
            Export
          </ActionButton>
          <Tabs defaultValue="30days" onValueChange={setTimeRange} className="w-auto">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="7days" className="data-[state=active]:bg-gray-700">
                7 Days
              </TabsTrigger>
              <TabsTrigger value="30days" className="data-[state=active]:bg-gray-700">
                30 Days
              </TabsTrigger>
              <TabsTrigger value="90days" className="data-[state=active]:bg-gray-700">
                90 Days
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Traffic Sources Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Sources Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Legend />
                  <Line type="monotone" dataKey="search" name="YouTube Search" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="suggested" name="Suggested Videos" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="external" name="External" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources Table */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Traffic Sources Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead>Source</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>% of Total</TableHead>
                  <TableHead>Avg. View Duration</TableHead>
                  <TableHead>Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trafficSourceData.map((source) => (
                  <TableRow key={source.name} className="hover:bg-gray-800/50 border-gray-800">
                    <TableCell className="font-medium">{source.name}</TableCell>
                    <TableCell>{Math.floor(source.value * 1000)}</TableCell>
                    <TableCell>{source.value}%</TableCell>
                    <TableCell>
                      {Math.floor(2 + Math.random() * 3)}:$
                      {Math.floor(Math.random() * 60)
                        .toString()
                        .padStart(2, "0")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {source.change.startsWith("+") ? (
                          <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                        )}
                        <Badge
                          className={
                            source.change.startsWith("+")
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }
                        >
                          {source.change}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* External Traffic Sources */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">External Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={externalSourcesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="rounded-md border border-gray-800">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800/50 border-gray-800">
                    <TableHead>External Source</TableHead>
                    <TableHead>% of External</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {externalSourcesData.map((source) => (
                    <TableRow key={source.name} className="hover:bg-gray-800/50 border-gray-800">
                      <TableCell className="font-medium">{source.name}</TableCell>
                      <TableCell>{source.value}%</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {source.change.startsWith("+") ? (
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                          )}
                          <Badge
                            className={
                              source.change.startsWith("+")
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }
                          >
                            {source.change}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
