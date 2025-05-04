"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangeSelector } from "@/components/date-range-selector"
import { RefreshButton } from "@/components/refresh-button"
import { Button } from "@/components/ui/button"
import { Download, Search, Edit, Trash2, Eye, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

// Sample data for content
const contentItems = [
  {
    id: "VID-7845",
    title: "How to Master Guitar in 30 Days",
    type: "Video",
    status: "Published",
    platform: "YouTube",
    views: 12500,
    date: "2023-04-15",
    thumbnail: "/music-video-thumbnail.png",
  },
  {
    id: "VID-7846",
    title: "Piano Basics for Beginners",
    type: "Video",
    status: "Under Review",
    platform: "YouTube",
    views: 8750,
    date: "2023-04-16",
    thumbnail: "/tutorial-video.png",
  },
  {
    id: "TRK-7847",
    title: "Summer Vibes",
    type: "Track",
    status: "Published",
    platform: "Spotify",
    views: 9200,
    date: "2023-04-14",
    thumbnail: "/acoustic-guitar-album.png",
  },
  {
    id: "VID-7848",
    title: "Music Production Masterclass",
    type: "Video",
    status: "Draft",
    platform: "YouTube",
    views: 0,
    date: "2023-04-17",
    thumbnail: "/video-thumbnail.png",
  },
  {
    id: "TRK-7849",
    title: "Midnight Jazz",
    type: "Track",
    status: "Published",
    platform: "Apple Music",
    views: 11000,
    date: "2023-04-13",
    thumbnail: "/abstract-soundscape.png",
  },
]

export default function AdminContent() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedContent, setSelectedContent] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    title: "",
    status: "",
    platform: "",
  })

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Refreshed",
        description: "Content data has been refreshed.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleExport = () => {
    toast({
      title: "Export Content",
      description: "Content report exported successfully!",
      duration: 3000,
    })
    // In a real app, this would trigger a download
  }

  const handleEdit = (content) => {
    setSelectedContent(content)
    setEditForm({
      title: content.title,
      status: content.status,
      platform: content.platform,
    })
    setIsEditDialogOpen(true)
  }

  const handleDelete = (content) => {
    setSelectedContent(content)
    setIsDeleteDialogOpen(true)
  }

  const handleView = (content) => {
    toast({
      title: "View Content",
      description: `Viewing content: ${content.title}`,
      duration: 2000,
    })
    router.push(`/admin/content/${content.id}`)
  }

  const confirmDelete = () => {
    toast({
      title: "Content Deleted",
      description: `Content "${selectedContent.title}" deleted successfully!`,
      duration: 3000,
    })
    setIsDeleteDialogOpen(false)
  }

  const saveEdit = () => {
    toast({
      title: "Content Updated",
      description: `Content "${selectedContent.title}" updated successfully!`,
      duration: 3000,
    })
    setIsEditDialogOpen(false)
  }

  // Filter content based on search term and filters
  const filteredContent = contentItems.filter((content) => {
    const matchesSearch =
      content.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.title.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || content.status === statusFilter
    const matchesType = typeFilter === "all" || content.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Content Management</h1>
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
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content?view=all")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content?status=Published")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">60% of total content</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content?status=Under Review")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">20% of total content</p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content?status=Draft")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">20% of total content</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="tracks">Tracks</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
              <CardDescription>Manage all your content across platforms</CardDescription>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search content..."
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
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Track">Track</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((content) => (
                    <TableRow
                      key={content.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleView(content)}
                    >
                      <TableCell className="font-medium">{content.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={content.thumbnail || "/placeholder.svg"}
                            alt={content.title}
                            className="h-8 w-12 object-cover rounded"
                          />
                          <span className="line-clamp-1">{content.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{content.type}</TableCell>
                      <TableCell>{content.platform}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            content.status === "Published"
                              ? "default"
                              : content.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {content.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.views.toLocaleString()}</TableCell>
                      <TableCell>{content.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(content)
                            }}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(content)
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleView(content)
                            }}
                          >
                            <Eye size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Content</CardTitle>
              <CardDescription>Manage your video content</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems
                    .filter((item) => item.type === "Video")
                    .map((content) => (
                      <TableRow
                        key={content.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleView(content)}
                      >
                        <TableCell className="font-medium">{content.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={content.thumbnail || "/placeholder.svg"}
                              alt={content.title}
                              className="h-8 w-12 object-cover rounded"
                            />
                            <span className="line-clamp-1">{content.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{content.platform}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              content.status === "Published"
                                ? "default"
                                : content.status === "Under Review"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {content.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{content.views.toLocaleString()}</TableCell>
                        <TableCell>{content.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(content)
                              }}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(content)
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleView(content)
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Track Content</CardTitle>
              <CardDescription>Manage your music tracks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Plays</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems
                    .filter((item) => item.type === "Track")
                    .map((content) => (
                      <TableRow
                        key={content.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleView(content)}
                      >
                        <TableCell className="font-medium">{content.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <img
                              src={content.thumbnail || "/placeholder.svg"}
                              alt={content.title}
                              className="h-8 w-8 object-cover rounded"
                            />
                            <span className="line-clamp-1">{content.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{content.platform}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              content.status === "Published"
                                ? "default"
                                : content.status === "Under Review"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {content.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{content.views.toLocaleString()}</TableCell>
                        <TableCell>{content.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEdit(content)
                              }}
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDelete(content)
                              }}
                            >
                              <Trash2 size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleView(content)
                              }}
                            >
                              <Eye size={16} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Content</CardTitle>
              <CardDescription>Content that requires attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No Flagged Content</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  There are currently no content items that have been flagged for review or that violate platform
                  policies.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedContent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Content Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Content</DialogTitle>
            <DialogDescription>Make changes to the content details below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select value={editForm.status} onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select
                value={editForm.platform}
                onValueChange={(value) => setEditForm({ ...editForm, platform: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="Spotify">Spotify</SelectItem>
                  <SelectItem value="Apple Music">Apple Music</SelectItem>
                  <SelectItem value="Amazon Music">Amazon Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
