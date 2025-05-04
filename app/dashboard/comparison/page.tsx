"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Download, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { handleRefresh, handleExport } from "@/lib/button-actions"

// Sample data
const viewsData = {
  "7days": [
    { date: "May 1", current: 4200, previous: 3800 },
    { date: "May 2", current: 4500, previous: 4100 },
    { date: "May 3", current: 5100, previous: 4600 },
    { date: "May 4", current: 5400, previous: 4900 },
    { date: "May 5", current: 5900, previous: 5300 },
    { date: "May 6", current: 6300, previous: 5700 },
    { date: "May 7", current: 6800, previous: 6100 },
  ],
  "30days": [
    { date: "Apr 1", current: 3200, previous: 2800 },
    { date: "Apr 8", current: 3800, previous: 3400 },
    { date: "Apr 15", current: 4200, previous: 3800 },
    { date: "Apr 22", current: 4800, previous: 4300 },
    { date: "Apr 29", current: 5900, previous: 5300 },
    { date: "May 6", current: 7200, previous: 6500 },
    { date: "May 13", current: 8900, previous: 8000 },
  ],
  "90days": [
    { date: "Jan", current: 2200, previous: 1900 },
    { date: "Feb", current: 2800, previous: 2400 },
    { date: "Mar", current: 3500, previous: 3100 },
    { date: "Apr", current: 4200, previous: 3800 },
    { date: "May", current: 5400, previous: 4900 },
    { date: "Jun", current: 8900, previous: 8000 },
  ],
}

export default function ComparisonPage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [compareWith, setCompareWith] = useState("previous")
  const [metric, setMetric] = useState("views")
  const [currentData, setCurrentData] = useState(viewsData["30days"])

  const handleRefreshData = async () => {
    await handleRefresh("comparison", async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCurrentData([...viewsData[timeRange as keyof typeof viewsData]])
      return { success: true }
    })
  }

  const handleExportData = async () => {
    await handleExport(
      "comparison data",
      currentData,
      `comparison_${timeRange}_${new Date().toISOString().split("T")[0]}.csv`,
      "csv",
    )
  }

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    setCurrentData(viewsData[value as keyof typeof viewsData])
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Comparative Analytics</h1>
          <p className="text-sm text-gray-400">Compare performance across different time periods</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleRefreshData}
            icon={<RefreshCw className="h-4 w-4" />}
            actionName="Refresh Data"
            loadingText="Refreshing..."
          >
            Refresh Data
          </ActionButton>
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleExportData}
            icon={<Download className="h-4 w-4" />}
            actionName="Export Data"
            loadingText="Exporting..."
          >
            Export
          </ActionButton>
          <TabSelector
            options={[
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" },
              { value: "90days", label: "90 Days" },
            ]}
            defaultValue={timeRange}
            onChange={handleTimeRangeChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gray-900 border-gray-800 md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Performance Comparison</CardTitle>
              <div className="flex gap-2">
                <div>
                  <Select defaultValue={compareWith} onValueChange={setCompareWith}>
                    <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Compare With" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="previous">Previous {timeRange}</SelectItem>
                      <SelectItem value="lastYear">Same Period Last Year</SelectItem>
                      <SelectItem value="bestPerforming">Best Performing Period</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select defaultValue={metric} onValueChange={setMetric}>
                    <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Metric" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="views">Views</SelectItem>
                      <SelectItem value="watchTime">Watch Time</SelectItem>
                      <SelectItem value="subscribers">Subscribers</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    name="Current Period"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    name="Previous Period"
                    stroke="#6B7280"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Growth Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Views</span>
                  <span className="text-sm font-medium text-green-400">+15.2%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600" style={{ width: "15.2%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Watch Time</span>
                  <span className="text-sm font-medium text-green-400">+12.8%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: "12.8%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Subscribers</span>
                  <span className="text-sm font-medium text-green-400">+8.5%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-600" style={{ width: "8.5%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Revenue</span>
                  <span className="text-sm font-medium text-green-400">+18.3%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-600" style={{ width: "18.3%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Performance by Content Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "Music Videos", current: 45, previous: 38 },
                    { name: "Tutorials", current: 32, previous: 28 },
                    { name: "Vlogs", current: 18, previous: 15 },
                    { name: "Live Streams", current: 25, previous: 19 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Legend />
                  <Bar dataKey="current" name="Current Period" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" name="Previous Period" fill="#6B7280" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Performance by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: "YouTube", current: 65, previous: 58 },
                    { name: "Spotify", current: 42, previous: 35 },
                    { name: "Apple Music", current: 28, previous: 22 },
                    { name: "TikTok", current: 15, previous: 8 },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Legend />
                  <Bar dataKey="current" name="Current Period" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="previous" name="Previous Period" fill="#6B7280" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
