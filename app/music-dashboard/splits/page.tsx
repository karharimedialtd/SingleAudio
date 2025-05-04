"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { toast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronRight, Download, Edit, Plus, Save, Trash2, Users } from "lucide-react"

// Sample data
const tracks = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "John Doe",
    cover: "/abstract-soundscape.png",
    collaborators: 3,
  },
  {
    id: 2,
    title: "Summer Vibes",
    artist: "John Doe ft. Jane Smith",
    cover: "/abstract-music-cover.png",
    collaborators: 4,
  },
  {
    id: 3,
    title: "Acoustic Session #1",
    artist: "John Doe",
    cover: "/placeholder.svg?key=ibv6w",
    collaborators: 2,
  },
]

const splitData = [
  { name: "John Doe (You)", value: 50, color: "#8b5cf6" },
  { name: "Jane Smith", value: 25, color: "#3b82f6" },
  { name: "Alex Johnson", value: 15, color: "#22c55e" },
  { name: "Sarah Williams", value: 10, color: "#f59e0b" },
]

const collaborators = [
  {
    id: 1,
    name: "John Doe",
    role: "Primary Artist",
    avatar: "/abstract-profile.png",
    percentage: 50,
    email: "john@example.com",
    isYou: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Featured Artist",
    avatar: "/diverse-person-portrait.png",
    percentage: 25,
    email: "jane@example.com",
    isYou: false,
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Producer",
    avatar: "/diverse-group.png",
    percentage: 15,
    email: "alex@example.com",
    isYou: false,
  },
  {
    id: 4,
    name: "Sarah Williams",
    role: "Songwriter",
    avatar: "/placeholder.svg?key=sbhhb",
    percentage: 10,
    email: "sarah@example.com",
    isYou: false,
  },
]

export default function SplitsPage() {
  const router = useRouter()
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedCollaborators, setEditedCollaborators] = useState(collaborators)
  const [isSaving, setIsSaving] = useState(false)

  const handleTrackSelect = (trackId: number) => {
    setSelectedTrack(trackId)
    setIsEditing(false)
    setEditedCollaborators(collaborators)
  }

  const handleEditSplits = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedCollaborators(collaborators)
  }

  const handleSaveSplits = () => {
    // Validate that percentages add up to 100%
    const total = editedCollaborators.reduce((sum, collab) => sum + collab.percentage, 0)

    if (total !== 100) {
      toast({
        title: "Invalid splits",
        description: `Total percentage must equal 100%. Current total: ${total}%`,
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
      toast({
        title: "Splits saved",
        description: "Your royalty splits have been updated successfully",
      })
    }, 1500)
  }

  const handlePercentageChange = (id: number, value: string) => {
    const percentage = Number.parseInt(value, 10) || 0

    setEditedCollaborators((prev) => prev.map((collab) => (collab.id === id ? { ...collab, percentage } : collab)))
  }

  const handleAddCollaborator = () => {
    toast({
      title: "Add collaborator",
      description: "This feature will be available soon",
    })
  }

  const handleRemoveCollaborator = (id: number) => {
    if (editedCollaborators.length <= 2) {
      toast({
        title: "Cannot remove",
        description: "You need at least two collaborators for splits",
        variant: "destructive",
      })
      return
    }

    setEditedCollaborators((prev) => prev.filter((collab) => collab.id !== id))
  }

  const handleExport = () => {
    toast({
      title: "Export started",
      description: "Your splits data is being exported",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Royalty Splits</h1>
        <p className="text-sm text-gray-400">Manage how royalties are distributed among collaborators</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Your Tracks</CardTitle>
              <CardDescription>Select a track to manage splits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                    selectedTrack === track.id
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-gray-800 bg-gray-950 hover:bg-gray-900"
                  }`}
                  onClick={() => handleTrackSelect(track.id)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={track.cover || "/placeholder.svg"}
                      alt={track.title}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{track.title}</h3>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm text-gray-400">
                      <Users className="h-3.5 w-3.5" />
                      <span>{track.collaborators}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedTrack ? (
            <div className="space-y-6">
              <Card className="border-gray-800 bg-gray-900">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-medium">Royalty Distribution</CardTitle>
                    <CardDescription>
                      {isEditing ? "Edit how royalties are split" : "Current royalty split for this track"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                        <Button size="sm" onClick={handleSaveSplits} disabled={isSaving}>
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="sm" onClick={handleExport}>
                          <Download className="mr-2 h-4 w-4" />
                          Export
                        </Button>
                        <Button size="sm" onClick={handleEditSplits}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Splits
                        </Button>
                      </>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={
                              isEditing
                                ? editedCollaborators.map((c) => ({ name: c.name, value: c.percentage }))
                                : splitData
                            }
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name.split(" ")[0]} ${(percent * 100).toFixed(0)}%`}
                          >
                            {(isEditing ? editedCollaborators : splitData).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color || splitData[index % splitData.length].color}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
                            itemStyle={{ color: "#f9fafb" }}
                            labelStyle={{ color: "#f9fafb" }}
                            formatter={(value) => [`${value}%`, ""]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          {editedCollaborators.map((collab) => (
                            <div key={collab.id} className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={collab.avatar || "/placeholder.svg"} alt={collab.name} />
                                <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <p className="font-medium">
                                    {collab.name} {collab.isYou && "(You)"}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-400">{collab.role}</p>
                              </div>
                              <div className="w-20">
                                <div className="flex items-center">
                                  <Input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={collab.percentage}
                                    onChange={(e) => handlePercentageChange(collab.id, e.target.value)}
                                    className="h-8 w-14 bg-gray-950 border-gray-800"
                                  />
                                  <span className="ml-1 text-sm">%</span>
                                </div>
                              </div>
                              {!collab.isYou && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-600/10"
                                  onClick={() => handleRemoveCollaborator(collab.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button variant="outline" className="w-full mt-2" onClick={handleAddCollaborator}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Collaborator
                          </Button>
                          <div className="flex items-center justify-between pt-2 text-sm">
                            <span>Total:</span>
                            <span
                              className={`font-medium ${
                                editedCollaborators.reduce((sum, collab) => sum + collab.percentage, 0) !== 100
                                  ? "text-red-500"
                                  : "text-green-500"
                              }`}
                            >
                              {editedCollaborators.reduce((sum, collab) => sum + collab.percentage, 0)}%
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          {collaborators.map((collab) => (
                            <div key={collab.id} className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={collab.avatar || "/placeholder.svg"} alt={collab.name} />
                                <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center">
                                  <p className="font-medium">
                                    {collab.name} {collab.isYou && "(You)"}
                                  </p>
                                </div>
                                <p className="text-xs text-gray-400">{collab.role}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">{collab.percentage}%</p>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-800 bg-gray-900">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Collaborator Details</CardTitle>
                  <CardDescription>Contact information for all collaborators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {collaborators.map((collab) => (
                      <div
                        key={collab.id}
                        className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={collab.avatar || "/placeholder.svg"} alt={collab.name} />
                            <AvatarFallback>{collab.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">
                                {collab.name} {collab.isYou && "(You)"}
                              </p>
                            </div>
                            <p className="text-xs text-gray-400">{collab.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{collab.email}</p>
                          <p className="text-xs text-gray-400">{collab.percentage}% share</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-gray-800 bg-gray-900 h-full flex flex-col items-center justify-center p-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 mb-4">
                <Users className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">Select a Track</h3>
              <p className="text-center text-gray-400 mb-4">
                Choose a track from the list to view and manage royalty splits
              </p>
              <Button onClick={() => handleTrackSelect(tracks[0].id)}>View First Track</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
