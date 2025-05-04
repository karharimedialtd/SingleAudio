"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { CheckCircle, Download, Eye, Search, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

// Sample data for claims
const claims = [
  {
    id: "CLM-7845",
    contentTitle: "Summer Vibes - Original Mix",
    contentId: "TRK-7847",
    claimant: "MusicCorp Records",
    type: "Copyright",
    status: "Pending Review",
    dateSubmitted: "2023-04-15",
    matchPercentage: 85,
    contentType: "Audio",
    platform: "YouTube",
  },
  {
    id: "CLM-7846",
    contentTitle: "Guitar Tutorial - Advanced Techniques",
    contentId: "VID-7845",
    claimant: "GuitarMasters Inc.",
    type: "Copyright",
    status: "Rejected",
    dateSubmitted: "2023-04-14",
    matchPercentage: 45,
    contentType: "Video",
    platform: "YouTube",
  },
  {
    id: "CLM-7847",
    contentTitle: "Piano Basics for Beginners",
    contentId: "VID-7846",
    claimant: "Music Education Ltd.",
    type: "Trademark",
    status: "Approved",
    dateSubmitted: "2023-04-13",
    matchPercentage: 92,
    contentType: "Video",
    platform: "YouTube",
  },
  {
    id: "CLM-7848",
    contentTitle: "Midnight Jazz",
    contentId: "TRK-7849",
    claimant: "Jazz Records Co.",
    type: "Copyright",
    status: "Pending Review",
    dateSubmitted: "2023-04-12",
    matchPercentage: 78,
    contentType: "Audio",
    platform: "Spotify",
  },
  {
    id: "CLM-7849",
    contentTitle: "Music Production Masterclass",
    contentId: "VID-7848",
    claimant: "Production Academy",
    type: "Copyright",
    status: "Escalated",
    dateSubmitted: "2023-04-11",
    matchPercentage: 88,
    contentType: "Video",
    platform: "YouTube",
  },
]

// Sample data for strikes
const strikes = [
  {
    id: "STR-1234",
    contentTitle: "Unauthorized Music Remix",
    contentId: "TRK-5678",
    issuedTo: "creator@example.com",
    reason: "Copyright Infringement",
    status: "Active",
    dateIssued: "2023-04-10",
    expiryDate: "2023-07-10",
    platform: "YouTube",
  },
  {
    id: "STR-1235",
    contentTitle: "Copied Tutorial Content",
    contentId: "VID-5679",
    issuedTo: "tutor@example.com",
    reason: "Copyright Infringement",
    status: "Appealed",
    dateIssued: "2023-04-08",
    expiryDate: "2023-07-08",
    platform: "YouTube",
  },
  {
    id: "STR-1236",
    contentTitle: "Misleading Thumbnail",
    contentId: "VID-5680",
    issuedTo: "content@example.com",
    reason: "Policy Violation",
    status: "Resolved",
    dateIssued: "2023-04-05",
    expiryDate: "2023-07-05",
    platform: "YouTube",
  },
]

export default function AdminClaims() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedClaim, setSelectedClaim] = useState(null)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
  }

  const handleExport = () => {
    alert("Claims report exported successfully!")
  }

  const handleViewClaim = (claim) => {
    setSelectedClaim(claim)
    setIsViewDialogOpen(true)
  }

  // Filter claims based on search term and filters
  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.contentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesType = typeFilter === "all" || claim.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Claims & Strikes</h1>
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
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">40% of total claims</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Strikes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">33% of total strikes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="claims">
        <TabsList>
          <TabsTrigger value="claims">Content Claims</TabsTrigger>
          <TabsTrigger value="strikes">Copyright Strikes</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Claims</CardTitle>
              <CardDescription>Manage copyright and trademark claims against content</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search claims..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Pending Review">Pending Review</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                      <SelectItem value="Escalated">Escalated</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Copyright">Copyright</SelectItem>
                      <SelectItem value="Trademark">Trademark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Match %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={claim.contentTitle}>
                          {claim.contentTitle}
                        </div>
                        <div className="text-xs text-muted-foreground">{claim.contentId}</div>
                      </TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={claim.matchPercentage} className="h-2 w-16" />
                          <span className="text-sm">{claim.matchPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            claim.status === "Approved"
                              ? "default"
                              : claim.status === "Rejected"
                                ? "destructive"
                                : claim.status === "Escalated"
                                  ? "outline"
                                  : "secondary"
                          }
                        >
                          {claim.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{claim.dateSubmitted}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleViewClaim(claim)}>
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strikes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Copyright Strikes</CardTitle>
              <CardDescription>Manage copyright strikes issued to users</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Strike ID</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Issued To</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date Issued</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {strikes.map((strike) => (
                    <TableRow key={strike.id}>
                      <TableCell className="font-medium">{strike.id}</TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={strike.contentTitle}>
                          {strike.contentTitle}
                        </div>
                        <div className="text-xs text-muted-foreground">{strike.contentId}</div>
                      </TableCell>
                      <TableCell>{strike.issuedTo}</TableCell>
                      <TableCell>{strike.reason}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            strike.status === "Active"
                              ? "destructive"
                              : strike.status === "Appealed"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {strike.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{strike.dateIssued}</TableCell>
                      <TableCell>{strike.expiryDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} className="mr-2" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claim Disputes</CardTitle>
              <CardDescription>Manage disputes against content claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Active Disputes</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  There are currently no active disputes against content claims. Disputes will appear here when users
                  challenge a claim.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Claim Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
            <DialogDescription>Detailed information about the selected claim.</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Claim ID</Label>
                  <div className="font-medium">{selectedClaim.id}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Status</Label>
                  <div>
                    <Badge
                      variant={
                        selectedClaim.status === "Approved"
                          ? "default"
                          : selectedClaim.status === "Rejected"
                            ? "destructive"
                            : selectedClaim.status === "Escalated"
                              ? "outline"
                              : "secondary"
                      }
                    >
                      {selectedClaim.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Content Title</Label>
                <div className="font-medium">{selectedClaim.contentTitle}</div>
                <div className="text-sm text-muted-foreground">ID: {selectedClaim.contentId}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Claimant</Label>
                  <div className="font-medium">{selectedClaim.claimant}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Claim Type</Label>
                  <div className="font-medium">{selectedClaim.type}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Content Type</Label>
                  <div className="font-medium">{selectedClaim.contentType}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Platform</Label>
                  <div className="font-medium">{selectedClaim.platform}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Date Submitted</Label>
                  <div className="font-medium">{selectedClaim.dateSubmitted}</div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Match Percentage</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={selectedClaim.matchPercentage} className="h-2 w-24" />
                    <span className="font-medium">{selectedClaim.matchPercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <Label className="text-sm text-muted-foreground">Claim Evidence</Label>
                <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                  <p>
                    The claimant has provided evidence that they own the rights to this content. The automated content
                    matching system has identified a {selectedClaim.matchPercentage}% match with their registered
                    content.
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <XCircle size={16} className="mr-2" />
                Reject
              </Button>
              <Button variant="outline" size="sm">
                <CheckCircle size={16} className="mr-2" />
                Approve
              </Button>
            </div>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
