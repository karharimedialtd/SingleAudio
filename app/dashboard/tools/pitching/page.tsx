"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Music, Send, Plus, Eye, Clock, CheckCircle, XCircle, Filter, Search } from "lucide-react"

interface Submission {
  id: string
  playlistName: string
  curator: string
  trackTitle: string
  status: "pending" | "accepted" | "rejected" | "under_review"
  submittedDate: string
  genre: string
  followers: number
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    playlistName: "Indie Electronic Vibes",
    curator: "ElectronicMood",
    trackTitle: "Midnight Dreams",
    status: "accepted",
    submittedDate: "2024-01-15",
    genre: "Electronic",
    followers: 125000,
  },
  {
    id: "2",
    playlistName: "Chill Beats Collection",
    curator: "ChillVibesOnly",
    trackTitle: "Ocean Waves",
    status: "pending",
    submittedDate: "2024-01-20",
    genre: "Ambient",
    followers: 89000,
  },
  {
    id: "3",
    playlistName: "New Music Friday",
    curator: "FreshSounds",
    trackTitle: "Electric Nights",
    status: "under_review",
    submittedDate: "2024-01-18",
    genre: "Electronic",
    followers: 250000,
  },
]

const mockPlaylists = [
  {
    id: "1",
    name: "Indie Electronic Vibes",
    curator: "ElectronicMood",
    followers: 125000,
    genre: "Electronic",
    acceptanceRate: "15%",
    description: "The best indie electronic tracks for your daily dose of creativity",
  },
  {
    id: "2",
    name: "Chill Beats Collection",
    curator: "ChillVibesOnly",
    followers: 89000,
    genre: "Ambient",
    acceptanceRate: "25%",
    description: "Relaxing beats for work, study, and meditation",
  },
  {
    id: "3",
    name: "New Music Friday",
    curator: "FreshSounds",
    followers: 250000,
    genre: "Various",
    acceptanceRate: "8%",
    description: "Discovering the hottest new tracks every week",
  },
]

export default function PlaylistPitchingPage() {
  const { setCurrentPage, addNotification } = useDashboard()
  const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions)
  const [showNewSubmissionDialog, setShowNewSubmissionDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newSubmission, setNewSubmission] = useState({
    playlistId: "",
    trackTitle: "",
    trackGenre: "",
    message: "",
    spotifyUrl: "",
  })

  useEffect(() => {
    setCurrentPage("Playlist Pitching")
  }, [setCurrentPage])

  const handleNewSubmission = async () => {
    if (!newSubmission.playlistId || !newSubmission.trackTitle || !newSubmission.spotifyUrl) {
      addNotification({
        type: "error",
        title: "Missing Information",
        message: "Please fill in all required fields",
      })
      return
    }

    setIsSubmitting(true)
    console.log("Submitting to playlist:", newSubmission)

    // Simulate submission process
    setTimeout(() => {
      const selectedPlaylist = mockPlaylists.find((p) => p.id === newSubmission.playlistId)

      const submission: Submission = {
        id: Date.now().toString(),
        playlistName: selectedPlaylist?.name || "Unknown Playlist",
        curator: selectedPlaylist?.curator || "Unknown Curator",
        trackTitle: newSubmission.trackTitle,
        status: "pending",
        submittedDate: new Date().toISOString().split("T")[0],
        genre: newSubmission.trackGenre,
        followers: selectedPlaylist?.followers || 0,
      }

      setSubmissions([submission, ...submissions])
      setIsSubmitting(false)
      setShowNewSubmissionDialog(false)
      setNewSubmission({
        playlistId: "",
        trackTitle: "",
        trackGenre: "",
        message: "",
        spotifyUrl: "",
      })

      addNotification({
        type: "success",
        title: "Submission Sent",
        message: `Your track has been submitted to "${selectedPlaylist?.name}"`,
      })
    }, 2000)
  }

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.playlistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.trackTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      accepted: "bg-green-600/20 text-green-400 border-green-600/30",
      rejected: "bg-red-600/20 text-red-400 border-red-600/30",
      under_review: "bg-blue-600/20 text-blue-400 border-blue-600/30",
    }

    const labels = {
      pending: "Pending",
      accepted: "Accepted",
      rejected: "Rejected",
      under_review: "Under Review",
    }

    return <Badge className={variants[status as keyof typeof variants]}>{labels[status as keyof typeof labels]}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-400" />
      case "under_review":
        return <Eye className="h-4 w-4 text-blue-400" />
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Playlist Pitching</h1>
          <p className="text-gray-400">Submit your tracks to curated playlists and grow your audience</p>
        </div>
        <Button onClick={() => setShowNewSubmissionDialog(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          New Submission
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Submissions</p>
                <p className="text-2xl font-bold text-white">{submissions.length}</p>
              </div>
              <Send className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Accepted</p>
                <p className="text-2xl font-bold text-white">
                  {submissions.filter((s) => s.status === "accepted").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending</p>
                <p className="text-2xl font-bold text-white">
                  {submissions.filter((s) => s.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Success Rate</p>
                <p className="text-2xl font-bold text-white">
                  {submissions.length > 0
                    ? Math.round((submissions.filter((s) => s.status === "accepted").length / submissions.length) * 100)
                    : 0}
                  %
                </p>
              </div>
              <Music className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="submissions" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="submissions" className="text-gray-300 data-[state=active]:text-white">
            My Submissions
          </TabsTrigger>
          <TabsTrigger value="discover" className="text-gray-300 data-[state=active]:text-white">
            Discover Playlists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-6">
          {/* Filters */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search submissions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white w-40">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    More Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submissions List */}
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Your Submissions</CardTitle>
              <CardDescription className="text-gray-400">
                {filteredSubmissions.length} of {submissions.length} submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <Card key={submission.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {getStatusIcon(submission.status)}
                          <div>
                            <h3 className="text-lg font-semibold text-white">{submission.trackTitle}</h3>
                            <p className="text-gray-400">to {submission.playlistName}</p>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                              <span>Curator: {submission.curator}</span>
                              <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                              <span>{submission.followers.toLocaleString()} followers</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(submission.status)}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => {
                              console.log(`Viewing submission ${submission.id}`)
                              addNotification({
                                type: "info",
                                title: "Submission Details",
                                message: `Viewing details for ${submission.trackTitle}`,
                              })
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No submissions found matching your criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Discover Playlists</CardTitle>
              <CardDescription className="text-gray-400">Find the perfect playlists for your music</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPlaylists.map((playlist) => (
                  <Card key={playlist.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{playlist.name}</h3>
                          <p className="text-gray-400 text-sm">by {playlist.curator}</p>
                        </div>

                        <p className="text-gray-300 text-sm">{playlist.description}</p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-400">{playlist.followers.toLocaleString()} followers</span>
                          <Badge variant="outline" className="border-white/20 text-gray-300">
                            {playlist.genre}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Acceptance: {playlist.acceptanceRate}</span>
                          <Button
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                            onClick={() => {
                              setNewSubmission({ ...newSubmission, playlistId: playlist.id })
                              setShowNewSubmissionDialog(true)
                            }}
                          >
                            Submit Track
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New Submission Dialog */}
      <Dialog open={showNewSubmissionDialog} onOpenChange={setShowNewSubmissionDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Submit to Playlist</DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit your track to a curated playlist for consideration
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Select Playlist *</Label>
              <Select
                value={newSubmission.playlistId}
                onValueChange={(value) => setNewSubmission({ ...newSubmission, playlistId: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Choose a playlist" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {mockPlaylists.map((playlist) => (
                    <SelectItem key={playlist.id} value={playlist.id}>
                      {playlist.name} ({playlist.followers.toLocaleString()} followers)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Track Title *</Label>
              <Input
                value={newSubmission.trackTitle}
                onChange={(e) => setNewSubmission({ ...newSubmission, trackTitle: e.target.value })}
                placeholder="Enter track title"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Genre</Label>
              <Select
                value={newSubmission.trackGenre}
                onValueChange={(value) => setNewSubmission({ ...newSubmission, trackGenre: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="ambient">Ambient</SelectItem>
                  <SelectItem value="pop">Pop</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="hip-hop">Hip Hop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Spotify URL *</Label>
              <Input
                value={newSubmission.spotifyUrl}
                onChange={(e) => setNewSubmission({ ...newSubmission, spotifyUrl: e.target.value })}
                placeholder="https://open.spotify.com/track/..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Message to Curator</Label>
              <Textarea
                value={newSubmission.message}
                onChange={(e) => setNewSubmission({ ...newSubmission, message: e.target.value })}
                placeholder="Tell the curator why your track fits their playlist..."
                rows={3}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewSubmissionDialog(false)}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleNewSubmission} disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? "Submitting..." : "Submit Track"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
