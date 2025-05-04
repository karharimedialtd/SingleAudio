"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  Music,
  Video,
  FileText,
  Download,
  ExternalLink,
  Eye,
  MessageSquare,
  RefreshCw,
  Shield,
  Info,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample content ID claims data
const contentIdClaims = [
  {
    id: "CL-12345",
    videoTitle: "Summer Concert Highlights - Behind the Scenes",
    videoId: "v-98765",
    thumbnail: "/music-video-thumbnail.png",
    claimType: "audio",
    claimant: "Universal Music Group",
    policy: "monetize",
    status: "active",
    matchedContent: "Song: Summer Vibes - Artist: The Groove",
    dateReceived: "2023-06-20",
    territory: "Worldwide",
  },
  {
    id: "CL-23456",
    videoTitle: "Live Concert Performance - World Tour 2023",
    videoId: "v-87654",
    thumbnail: "/video-thumbnail.png",
    claimType: "visual",
    claimant: "Sony Music Entertainment",
    policy: "track",
    status: "appealed",
    matchedContent: "Visual content from 'World Tour Official Footage'",
    dateReceived: "2023-05-15",
    territory: "United States",
  },
  {
    id: "CL-34567",
    videoTitle: "How to Master Guitar Solos - Tutorial",
    videoId: "v-76543",
    thumbnail: "/tutorial-video.png",
    claimType: "audio",
    claimant: "Warner Music Group",
    policy: "block",
    status: "resolved",
    matchedContent: "Song: Guitar Classics - Artist: String Masters",
    dateReceived: "2023-04-10",
    territory: "Worldwide",
  },
  {
    id: "CL-45678",
    videoTitle: "Behind the Scenes - Making of the Album",
    videoId: "v-65432",
    thumbnail: "/placeholder.svg?key=345au",
    claimType: "audio",
    claimant: "EMI Music Publishing",
    policy: "monetize",
    status: "active",
    matchedContent: "Song: Studio Sessions - Artist: The Producers",
    dateReceived: "2023-03-05",
    territory: "Europe, North America",
  },
  {
    id: "CL-56789",
    videoTitle: "Upcoming Release - Teaser Trailer",
    videoId: "v-54321",
    thumbnail: "/placeholder.svg?key=n5qav",
    claimType: "visual",
    claimant: "Paramount Pictures",
    policy: "monetize",
    status: "disputed",
    matchedContent: "Footage from 'Upcoming Movie Trailer'",
    dateReceived: "2023-02-15",
    territory: "Worldwide",
  },
]

export default function ContentIdPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [isClaimDetailsOpen, setIsClaimDetailsOpen] = useState(false)
  const [isAppealDialogOpen, setIsAppealDialogOpen] = useState(false)
  const [appealReason, setAppealReason] = useState("licensed")
  const [appealDescription, setAppealDescription] = useState("")
  const [isSubmittingAppeal, setIsSubmittingAppeal] = useState(false)
  const [isReleaseDialogOpen, setIsReleaseDialogOpen] = useState(false)
  const [isReleasing, setIsReleasing] = useState(false)

  const filteredClaims = contentIdClaims.filter((claim) => {
    // Filter by search term
    const matchesSearch =
      claim.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && claim.status === "active"
    if (activeTab === "appealed") return matchesSearch && claim.status === "appealed"
    if (activeTab === "resolved") return matchesSearch && (claim.status === "resolved" || claim.status === "released")
    if (activeTab === "disputed") return matchesSearch && claim.status === "disputed"

    return matchesSearch
  })

  const handleViewClaimDetails = (claim: any) => {
    setSelectedClaim(claim)
    setIsClaimDetailsOpen(true)
  }

  const handleAppealClaim = (claim: any) => {
    setSelectedClaim(claim)
    setIsAppealDialogOpen(true)
  }

  const handleSubmitAppeal = async () => {
    if (!appealDescription) {
      toast({
        title: "Appeal description required",
        description: "Please provide details for your appeal",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingAppeal(true)

    // Simulate appeal submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmittingAppeal(false)
    setIsAppealDialogOpen(false)
    setAppealDescription("")

    toast({
      title: "Appeal submitted",
      description: `Your appeal for claim ${selectedClaim.id} has been submitted successfully.`,
    })

    // Update the claim status in the UI
    const updatedClaims = contentIdClaims.map((claim) =>
      claim.id === selectedClaim.id ? { ...claim, status: "appealed" } : claim,
    )
    // In a real app, you would update the state here
  }

  const handleInitiateRelease = (claim: any) => {
    setSelectedClaim(claim)
    setIsReleaseDialogOpen(true)
  }

  const handleConfirmRelease = async () => {
    setIsReleasing(true)

    // Simulate release process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsReleasing(false)
    setIsReleaseDialogOpen(false)

    toast({
      title: "Claim released",
      description: `The claim on "${selectedClaim.videoTitle}" has been released.`,
    })

    // Update the claim status in the UI
    const updatedClaims = contentIdClaims.map((c) => (c.id === selectedClaim.id ? { ...c, status: "released" } : c))
    // In a real app, you would update the state here
  }

  const handleDownloadReport = () => {
    toast({
      title: "Downloading report",
      description: "Your Content ID claims report is being downloaded.",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Active</Badge>
      case "appealed":
        return <Badge className="bg-blue-500/20 text-blue-400">Appealed</Badge>
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-400">Resolved</Badge>
      case "released":
        return <Badge className="bg-green-500/20 text-green-400">Released</Badge>
      case "disputed":
        return <Badge className="bg-red-500/20 text-red-400">Disputed</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>
    }
  }

  const getPolicyBadge = (policy: string) => {
    switch (policy) {
      case "monetize":
        return <Badge className="bg-green-500/20 text-green-400">Monetize</Badge>
      case "track":
        return <Badge className="bg-blue-500/20 text-blue-400">Track</Badge>
      case "block":
        return <Badge className="bg-red-500/20 text-red-400">Block</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{policy}</Badge>
    }
  }

  const getClaimTypeIcon = (type: string) => {
    switch (type) {
      case "audio":
        return <Music className="h-4 w-4 text-purple-400" />
      case "visual":
        return <Video className="h-4 w-4 text-blue-400" />
      default:
        return <FileText className="h-4 w-4 text-gray-400" />
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Content ID Claims</h1>
          <p className="text-sm text-gray-400">Manage copyright claims on your videos</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={handleDownloadReport}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => router.push("/dashboard/content-id/settings")}
          >
            Content ID Settings
          </Button>
        </div>
      </div>

      {/* Content ID Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Claims</p>
                <h3 className="text-3xl font-bold">24</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-400">Last 30 days</p>
                </div>
              </div>
              <div className="p-2 bg-yellow-500/20 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Active Claims</p>
                <h3 className="text-3xl font-bold">12</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-red-400">+3 new this week</p>
                </div>
              </div>
              <div className="p-2 bg-red-500/20 rounded-full">
                <Clock className="h-6 w-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Resolved Claims</p>
                <h3 className="text-3xl font-bold">8</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-green-400">+2 this week</p>
                </div>
              </div>
              <div className="p-2 bg-green-500/20 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Appealed Claims</p>
                <h3 className="text-3xl font-bold">4</h3>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-blue-400">2 pending review</p>
                </div>
              </div>
              <div className="p-2 bg-blue-500/20 rounded-full">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>Content ID Claims</CardTitle>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search claims..."
                  className="pl-8 bg-gray-800 border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-auto">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gray-700">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="data-[state=active]:bg-gray-700">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="appealed" className="data-[state=active]:bg-gray-700">
                    Appealed
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="data-[state=active]:bg-gray-700">
                    Resolved
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800/50 border-gray-800">
                  <TableHead className="w-[300px]">Video</TableHead>
                  <TableHead>Claim Type</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Policy</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Received</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((claim) => (
                    <TableRow key={claim.id} className="hover:bg-gray-800/50 border-gray-800">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <img
                            src={claim.thumbnail || "/placeholder.svg"}
                            alt={claim.videoTitle}
                            className="w-20 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="line-clamp-1">{claim.videoTitle}</p>
                            <p className="text-xs text-gray-400">ID: {claim.videoId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getClaimTypeIcon(claim.claimType)}
                          <span className="capitalize">{claim.claimType}</span>
                        </div>
                      </TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell>{getPolicyBadge(claim.policy)}</TableCell>
                      <TableCell>{getStatusBadge(claim.status)}</TableCell>
                      <TableCell>{claim.dateReceived}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => handleViewClaimDetails(claim)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View Details</span>
                          </Button>

                          {claim.status === "active" && (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                                onClick={() => handleAppealClaim(claim)}
                              >
                                <MessageSquare className="h-4 w-4" />
                                <span className="sr-only">Appeal</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                                onClick={() => handleInitiateRelease(claim)}
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="sr-only">Release</span>
                              </Button>
                            </>
                          )}

                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => window.open(`https://example.com/video/${claim.videoId}`, "_blank")}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">External Link</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-gray-400">
                      No claims found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Understanding Content ID Claims</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
              <Info className="h-5 w-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="font-medium">What is a Content ID claim?</h4>
                <p className="text-sm text-gray-300 mt-1">
                  Content ID claims occur when copyright owners identify their content being used in your videos. This
                  doesn't necessarily mean you've done anything wrong, but the copyright owner may have certain rights
                  to the content.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
              <Shield className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h4 className="font-medium">How to resolve claims</h4>
                <p className="text-sm text-gray-300 mt-1">
                  You can often resolve claims by removing the claimed content, replacing it with royalty-free
                  alternatives, or sharing revenue with the copyright holder.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
              <div>
                <h4 className="font-medium">Impact on your channel</h4>
                <p className="text-sm text-gray-300 mt-1">
                  Content ID claims don't result in copyright strikes against your channel. However, they may affect
                  your ability to monetize the claimed videos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Claim Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Audio Claims</p>
                    <h3 className="text-2xl font-bold">18</h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Visual Claims</p>
                    <h3 className="text-2xl font-bold">6</h3>
                  </div>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-400">Successful Appeals</p>
                    <h3 className="text-2xl font-bold">5</h3>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Most Common Claimants</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">Universal Music Group</p>
                      <p className="text-sm">8 claims</p>
                    </div>
                    <Progress value={33} className="h-1 bg-gray-700" indicatorClassName="bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">Sony Music Entertainment</p>
                      <p className="text-sm">6 claims</p>
                    </div>
                    <Progress value={25} className="h-1 bg-gray-700" indicatorClassName="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm">Warner Music Group</p>
                      <p className="text-sm">5 claims</p>
                    </div>
                    <Progress value={21} className="h-1 bg-gray-700" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claim Details Dialog */}
      <Dialog open={isClaimDetailsOpen} onOpenChange={setIsClaimDetailsOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details</DialogTitle>
            <DialogDescription>Detailed information about this content ID claim</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <img
                  src={selectedClaim.thumbnail || "/placeholder.svg"}
                  alt={selectedClaim.videoTitle}
                  className="w-32 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-medium">{selectedClaim.videoTitle}</h3>
                  <p className="text-sm text-gray-400">Video ID: {selectedClaim.videoId}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {getStatusBadge(selectedClaim.status)}
                    {getPolicyBadge(selectedClaim.policy)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Claim Information</p>
                  <div className="bg-gray-800 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Claim ID:</p>
                      <p className="text-sm">{selectedClaim.id}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Claim Type:</p>
                      <div className="flex items-center gap-1">
                        {getClaimTypeIcon(selectedClaim.claimType)}
                        <span className="text-sm capitalize">{selectedClaim.claimType}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Date Received:</p>
                      <p className="text-sm">{selectedClaim.dateReceived}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Territory:</p>
                      <p className="text-sm">{selectedClaim.territory}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Claimant Information</p>
                  <div className="bg-gray-800 p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Claimant:</p>
                      <p className="text-sm">{selectedClaim.claimant}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Policy:</p>
                      <p className="text-sm capitalize">{selectedClaim.policy}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-400">Status:</p>
                      <p className="text-sm capitalize">{selectedClaim.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Matched Content</p>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <p className="text-sm">{selectedClaim.matchedContent}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Policy Details</p>
                <div className="bg-gray-800 p-3 rounded-lg space-y-2">
                  {selectedClaim.policy === "monetize" && (
                    <p className="text-sm">
                      The copyright owner is monetizing your video. Ads may appear on your video, and the revenue will
                      go to the copyright owner.
                    </p>
                  )}
                  {selectedClaim.policy === "track" && (
                    <p className="text-sm">
                      The copyright owner is tracking the viewership statistics of your video but has allowed it to
                      remain published without restrictions.
                    </p>
                  )}
                  {selectedClaim.policy === "block" && (
                    <p className="text-sm">
                      The copyright owner has blocked your video, either worldwide or in specific countries. The video
                      may not be viewable to some or all viewers.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => window.open(`https://example.com/video/${selectedClaim.videoId}`, "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Video
                </Button>

                {selectedClaim.status === "active" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={() => {
                        setIsClaimDetailsOpen(false)
                        handleAppealClaim(selectedClaim)
                      }}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Appeal
                    </Button>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => {
                        setIsClaimDetailsOpen(false)
                        handleInitiateRelease(selectedClaim)
                      }}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Release Claim
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Appeal Dialog */}
      <Dialog open={isAppealDialogOpen} onOpenChange={setIsAppealDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Appeal Content ID Claim</DialogTitle>
            <DialogDescription>
              Submit an appeal for this content ID claim. Please provide accurate information.
            </DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Important Information</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Filing a dispute against a Content ID claim initiates a formal process. Only file a dispute if you
                    have the necessary rights to use the content.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appeal-reason">Reason for Appeal</Label>
                <RadioGroup defaultValue={appealReason} onValueChange={setAppealReason}>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="licensed" id="licensed" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="licensed" className="font-medium">
                        I have a license or permission to use this content
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="fair-use" id="fair-use" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="fair-use" className="font-medium">
                        My content is protected by fair use, fair dealing, or similar exception
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="public-domain" id="public-domain" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="public-domain" className="font-medium">
                        The content is in the public domain or is not eligible for copyright protection
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="mistake" id="mistake" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="mistake" className="font-medium">
                        The Content ID system has made a mistake
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appeal-description">Additional Information</Label>
                <Textarea
                  id="appeal-description"
                  placeholder="Provide details to support your appeal..."
                  className="bg-gray-800 border-gray-700 min-h-[120px]"
                  value={appealDescription}
                  onChange={(e) => setAppealDescription(e.target.value)}
                />
                <p className="text-xs text-gray-400">
                  Please provide specific details about why you believe this claim should be released. Include any
                  relevant license information, timestamps, or other evidence.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsAppealDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleSubmitAppeal}
              disabled={isSubmittingAppeal}
            >
              {isSubmittingAppeal ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Appeal"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Release Dialog */}
      <Dialog open={isReleaseDialogOpen} onOpenChange={setIsReleaseDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Release Content ID Claim</DialogTitle>
            <DialogDescription>You are about to request the release of this content ID claim.</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-4 py-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400">What happens next?</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    When you release a claim, you're acknowledging that you don't have rights to monetize or restrict
                    this content. This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Claim Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Video:</p>
                    <p className="text-sm">{selectedClaim.videoTitle}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Claim ID:</p>
                    <p className="text-sm">{selectedClaim.id}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Claimant:</p>
                    <p className="text-sm">{selectedClaim.claimant}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-400">Matched Content:</p>
                    <p className="text-sm">{selectedClaim.matchedContent}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="bg-gray-800 border-gray-700 hover:bg-gray-700"
              onClick={() => setIsReleaseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleConfirmRelease} disabled={isReleasing}>
              {isReleasing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Release"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
