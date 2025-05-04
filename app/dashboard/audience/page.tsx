"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import { Download, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { downloadCSV } from "@/lib/utils"

// Sample data
const demographicsData = {
  age: [
    { name: "13-17", value: 5 },
    { name: "18-24", value: 35 },
    { name: "25-34", value: 40 },
    { name: "35-44", value: 15 },
    { name: "45-54", value: 3 },
    { name: "55+", value: 2 },
  ],
  gender: [
    { name: "Male", value: 65 },
    { name: "Female", value: 32 },
    { name: "Other", value: 3 },
  ],
  location: [
    { name: "United States", value: 40 },
    { name: "United Kingdom", value: 15 },
    { name: "Canada", value: 10 },
    { name: "Australia", value: 8 },
    { name: "Germany", value: 7 },
    { name: "Other", value: 20 },
  ],
}

const deviceData = [
  { name: "Mobile", value: 65 },
  { name: "Desktop", value: 25 },
  { name: "Tablet", value: 7 },
  { name: "TV", value: 3 },
]

const engagementData = [
  { date: "Jan 1", engagement: 45 },
  { date: "Jan 2", engagement: 52 },
  { date: "Jan 3", engagement: 49 },
  { date: "Jan 4", engagement: 63 },
  { date: "Jan 5", engagement: 58 },
  { date: "Jan 6", engagement: 72 },
  { date: "Jan 7", engagement: 80 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"]

export default function AudiencePage() {
  const [timeRange, setTimeRange] = useState("30days")
  const [demographicType, setDemographicType] = useState("age")

  const handleRefresh = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Data refreshed",
      description: "Audience data has been updated successfully.",
    })

    return true
  }

  const handleExport = async () => {
    // Simulate export
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create and download a dummy CSV file
    downloadCSV(
      demographicsData[demographicType as keyof typeof demographicsData],
      `audience_${demographicType}_${timeRange}.csv`,
    )

    toast({
      title: "Export successful",
      description: "Audience data has been exported to CSV.",
    })

    return true
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Audience Insights</h1>
          <p className="text-sm text-gray-400">Understand who is watching your content</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleRefresh}
            icon={<RefreshCw className="h-4 w-4" />}
            loadingText="Refreshing..."
            successMessage="Data refreshed successfully"
          >
            Refresh Data
          </ActionButton>
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleExport}
            icon={<Download className="h-4 w-4" />}
            loadingText="Exporting..."
            successMessage="Data exported successfully"
          >
            Export
          </ActionButton>
          <TabSelector
            defaultValue={timeRange}
            options={[
              { value: "7days", label: "7 Days" },
              { value: "30days", label: "30 Days" },
              { value: "90days", label: "90 Days" },
              { value: "year", label: "Year" },
            ]}
            onChange={setTimeRange}
            className="w-auto"
          />
        </div>
      </div>

      {/* Demographics */}
      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Demographics</CardTitle>
            <TabSelector
              defaultValue={demographicType}
              options={[
                { value: "age", label: "Age" },
                { value: "gender", label: "Gender" },
                { value: "location", label: "Location" },
              ]}
              onChange={setDemographicType}
              className="w-auto"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData[demographicType as keyof typeof demographicsData]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {demographicsData[demographicType as keyof typeof demographicsData].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Devices and Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Devices */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Devices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                  <Line type="monotone" dataKey="engagement" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
