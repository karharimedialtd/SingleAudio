"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid, List, Plus, Trash2, Download, Edit } from "lucide-react"

// Sample thumbnail data
const thumbnails = [
  {
    id: 1,
    title: "Summer Concert Highlights",
    image: "/placeholder.svg?key=f0qdq",
    created: "2023-06-15",
    used: true,
  },
  {
    id: 2,
    title: "Studio Session Behind the Scenes",
    image: "/placeholder.svg?key=eu0fq",
    created: "2023-05-22",
    used: true,
  },
  {
    id: 3,
    title: "New Single Announcement",
    image: "/placeholder.svg?key=p0sc1",
    created: "2023-04-10",
    used: true,
  },
  {
    id: 4,
    title: "Interview with Music Magazine",
    image: "/placeholder.svg?key=bkguu",
    created: "2023-03-28",
    used: false,
  },
  {
    id: 5,
    title: "Acoustic Performance",
    image: "/placeholder.svg?key=tmaro",
    created: "2023-02-14",
    used: false,
  },
  {
    id: 6,
    title: "Music Video Teaser",
    image: "/placeholder.svg?height=720&width=1280&query=music+video+teaser",
    created: "2023-01-30",
    used: false,
  },
]

export default function ThumbnailsGallery() {
  const [viewMode, setViewMode] = useState("grid")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredThumbnails =
    selectedTab === "all"
      ? thumbnails
      : selectedTab === "used"
        ? thumbnails.filter((t) => t.used)
        : thumbnails.filter((t) => !t.used)

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Thumbnail Gallery</h1>
          <p className="text-sm text-gray-400">Manage your video thumbnails</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <Download className="h-4 w-4 mr-2" />
            Import
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
          <TabsList className="bg-gray-800 w-full sm:w-auto">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              All
            </TabsTrigger>
            <TabsTrigger value="used" className="flex-1 sm:flex-none">
              Used
            </TabsTrigger>
            <TabsTrigger value="unused" className="flex-1 sm:flex-none">
              Unused
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="outline"
            size="icon"
            className={`bg-gray-800 border-gray-700 hover:bg-gray-700 ${viewMode === "grid" ? "border-purple-500" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`bg-gray-800 border-gray-700 hover:bg-gray-700 ${viewMode === "list" ? "border-purple-500" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredThumbnails.map((thumbnail) => (
            <Card key={thumbnail.id} className="bg-gray-900 border-gray-800 overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={thumbnail.image || "/placeholder.svg"}
                  alt={thumbnail.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="font-medium text-white line-clamp-1">{thumbnail.title}</h3>
                  <p className="text-xs text-gray-300">Created: {thumbnail.created}</p>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-black/50 border-gray-700 hover:bg-black/70"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 bg-black/50 border-gray-700 hover:bg-black/70"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                {thumbnail.used && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500/90 text-white text-xs px-2 py-0.5 rounded">In Use</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-0">
            <div className="divide-y divide-gray-800">
              {filteredThumbnails.map((thumbnail) => (
                <div key={thumbnail.id} className="flex items-center gap-4 p-4">
                  <div className="relative w-32 h-18 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={thumbnail.image || "/placeholder.svg"}
                      alt={thumbnail.title}
                      className="object-cover w-full h-full"
                    />
                    {thumbnail.used && (
                      <div className="absolute top-1 left-1">
                        <span className="bg-green-500/90 text-white text-xs px-1.5 py-0.5 rounded">In Use</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium">{thumbnail.title}</h3>
                    <p className="text-sm text-gray-400">Created: {thumbnail.created}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-red-400"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
