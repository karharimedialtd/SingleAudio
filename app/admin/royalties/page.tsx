"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { Button } from "@/components/ui/button"
import { Download, FileText, Search } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Sample data for royalties
const royaltyTransactions = [
  { id: "TR-7845", platform: "YouTube", amount: 1250.75, status: "Paid", date: "2023-04-15" },
  { id: "TR-7846", platform: "Spotify", amount: 875.5, status: "Pending", date: "2023-04-16" },
  { id: "TR-7847", platform: "Apple Music", amount: 920.25, status: "Paid", date: "2023-04-14" },
  { id: "TR-7848", platform: "Amazon Music", amount: 450.0, status: "Processing", date: "2023-04-17" },
  { id: "TR-7849", platform: "YouTube", amount: 1100.0, status: "Paid", date: "2023-04-13" },
  { id: "TR-7850", platform: "Spotify", amount: 780.25, status: "Pending", date: "2023-04-18" },
  { id: "TR-7851", platform: "Apple Music", amount: 890.5, status: "Paid", date: "2023-04-12" },
  { id: "TR-7852", platform: "Amazon Music", amount: 425.75, status: "Processing", date: "2023-04-19" },
]

export default function AdminRoyalties() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleExport = () => {
    alert("Royalty report exported successfully!")
  }

  // Filter transactions based on search term and filters
  const filteredTransactions = royaltyTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.platform.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesPlatform = platformFilter === "all" || transaction.platform === platformFilter

    return matchesSearch && matchesStatus && matchesPlatform
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Royalty Management</h1>
        <div className="flex items-center gap-4">
          <DateRangeSelector />
          <RefreshButton onClick={handleRefresh} isLoading={isLoading} />
          <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Royalties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,693.00</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Royalties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,655.75</div>
            <p className="text-xs text-muted-foreground">4 transactions pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$875.75</div>
            <p className="text-xs text-muted-foreground">2 transactions processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Paid Royalties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,161.50</div>
            <p className="text-xs text-muted-foreground">4 transactions completed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="platforms">Platform Breakdown</TabsTrigger>
          <TabsTrigger value="payouts">Payout Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Royalty Transactions</CardTitle>
              <CardDescription>View and manage all royalty transactions</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Spotify">Spotify</SelectItem>
                    <SelectItem value="Apple Music">Apple Music</SelectItem>
                    <SelectItem value="Amazon Music">Amazon Music</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.platform}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            transaction.status === "Paid"
                              ? "default"
                              : transaction.status === "Pending"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText size={16} className="mr-2" />
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="platforms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Royalty Breakdown</CardTitle>
              <CardDescription>Royalty distribution by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Total Royalties</TableHead>
                    <TableHead>Transactions</TableHead>
                    <TableHead>Average Per Transaction</TableHead>
                    <TableHead>Last Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">YouTube</TableCell>
                    <TableCell>$2,350.75</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>$1,175.38</TableCell>
                    <TableCell>2023-04-15</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Spotify</TableCell>
                    <TableCell>$1,655.75</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>$827.88</TableCell>
                    <TableCell>2023-04-18</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Apple Music</TableCell>
                    <TableCell>$1,810.75</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>$905.38</TableCell>
                    <TableCell>2023-04-14</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amazon Music</TableCell>
                    <TableCell>$875.75</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>$437.88</TableCell>
                    <TableCell>2023-04-19</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payout Schedule</CardTitle>
              <CardDescription>Upcoming royalty payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Estimated Amount</TableHead>
                    <TableHead>Expected Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">YouTube</TableCell>
                    <TableCell>$1,200.00 (estimated)</TableCell>
                    <TableCell>2023-05-15</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Spotify</TableCell>
                    <TableCell>$850.00 (estimated)</TableCell>
                    <TableCell>2023-05-20</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Apple Music</TableCell>
                    <TableCell>$920.00 (estimated)</TableCell>
                    <TableCell>2023-05-14</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Amazon Music</TableCell>
                    <TableCell>$480.00 (estimated)</TableCell>
                    <TableCell>2023-05-22</TableCell>
                    <TableCell>
                      <Badge variant="outline">Scheduled</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
