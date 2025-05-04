"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ActionButton } from "@/components/action-button"
import { FilterButton } from "@/components/filter-button"
import { exportData, generateReport } from "@/lib/button-actions"

// Sample data
const royaltyData = [
  { month: "Jan", youtube: 1200, spotify: 800, apple: 600, total: 2600 },
  { month: "Feb", youtube: 1300, spotify: 850, apple: 650, total: 2800 },
  { month: "Mar", youtube: 1400, spotify: 900, apple: 700, total: 3000 },
  { month: "Apr", youtube: 1500, spotify: 950, apple: 750, total: 3200 },
  { month: "May", youtube: 1600, spotify: 1000, apple: 800, total: 3400 },
  { month: "Jun", youtube: 1700, spotify: 1050, apple: 850, total: 3600 },
]

// Sample royalty transactions
const royaltyTransactions = [
  {
    id: "TR-12345",
    platform: "YouTube",
    amount: "$1,245.67",
    date: "2023-06-15",
    status: "Paid",
    content: "Summer Vibes Music Video",
  },
  {
    id: "TR-12346",
    platform: "Spotify",
    amount: "$876.32",
    date: "2023-06-10",
    status: "Paid",
    content: "Album: Acoustic Sessions",
  },
  {
    id: "TR-12347",
    platform: "Apple Music",
    amount: "$543.21",
    date: "2023-06-05",
    status: "Paid",
    content: "Single: Midnight Dreams",
  },
  {
    id: "TR-12348",
    platform: "YouTube",
    amount: "$321.45",
    date: "2023-05-28",
    status: "Paid",
    content: "Live Performance Video",
  },
  {
    id: "TR-12349",
    platform: "TikTok",
    amount: "$198.76",
    date: "2023-05-20",
    status: "Processing",
    content: "Viral Sound Clip",
  },
]

export default function RoyaltiesPage() {
  const [period, setPeriod] = useState("6months")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("all")

  const filteredTransactions = royaltyTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPlatform = selectedPlatform === "all" || transaction.platform === selectedPlatform

    return matchesSearch && matchesPlatform
  })

  const handleExport = async () => {
    await exportData("royalty data", royaltyData, `royalties_${period}_${new Date().toISOString().split("T")[0]}.csv`)
  }

  const handleGenerateReport = async () => {
    await generateReport("royalties")
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Royalties Tracking</h1>
          <p className="text-sm text-gray-400">Monitor your earnings across all platforms</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-800">
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleGenerateReport}
            icon={<FileText className="h-4 w-4" />}
            actionName="Generate Report"
            loadingText="Generating..."
          >
            Export Report
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Earnings (YTD)</p>
              <h3 className="text-3xl font-bold">$18,450.32</h3>
              <p className="text-xs text-green-400">+12.5% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">YouTube Earnings</p>
              <h3 className="text-3xl font-bold">$8,745.67</h3>
              <p className="text-xs text-green-400">+15.2% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Spotify Earnings</p>
              <h3 className="text-3xl font-bold">$5,632.45</h3>
              <p className="text-xs text-green-400">+8.7% from last year</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Apple Music Earnings</p>
              <h3 className="text-3xl font-bold">$4,072.20</h3>
              <p className="text-xs text-green-400">+10.3% from last year</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={royaltyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: "#1F2937", borderColor: "#374151" }} />
                <Legend />
                <Line type="monotone" dataKey="youtube" name="YouTube" stroke="#FF0000" strokeWidth={2} />
                <Line type="monotone" dataKey="spotify" name="Spotify" stroke="#1DB954" strokeWidth={2} />
                <Line type="monotone" dataKey="apple" name="Apple Music" stroke="#FC3C44" strokeWidth={2} />
                <Line type="monotone" dataKey="total" name="Total" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Royalty Transactions</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search royalties..."
                  className="pl-8 bg-gray-800 border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <FilterButton
                options={[
                  { id: "all", label: "All Platforms" },
                  { id: "YouTube", label: "YouTube" },
                  { id: "Spotify", label: "Spotify" },
                  { id: "Apple Music", label: "Apple Music" },
                  { id: "TikTok", label: "TikTok" },
                ]}
                onFilter={(selected) => {
                  if (selected.length === 0 || selected.includes("all")) {
                    setSelectedPlatform("all")
                  } else {
                    setSelectedPlatform(selected[0])
                  }
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Content</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-800/50 border-gray-800">
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.platform}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          transaction.status === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
