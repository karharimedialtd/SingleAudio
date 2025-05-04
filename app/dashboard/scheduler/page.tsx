"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CalendarIcon,
  Clock,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Copy,
  Bell,
  CheckCircle2,
  AlertCircle,
  Clock4,
} from "lucide-react"
import { format } from "date-fns"
import { ActionButton } from "@/components/action-button"
import { createItem } from "@/lib/button-actions"
import { toast } from "@/components/ui/use-toast"

// Sample scheduled videos data
const scheduledVideos = [
  {
    id: 1,
    title: "Summer Concert Highlights - Behind the Scenes",
    thumbnail: "/music-video-thumbnail.png",
    scheduledDate: "2023-07-15T18:00:00",
    status: "Scheduled",
    visibility: "Public",
    platform: "YouTube",
  },
  {
    id: 2,
    title: "5 Essential Guitar Techniques Every Beginner Should Know",
    thumbnail: "/tutorial-video.png",
    scheduledDate: "2023-07-22T15:30:00",
    status: "Scheduled",
    visibility: "Public",
    platform: "YouTube",
  },
  {
    id: 3,
    title: "Q&A Session: Answering Your Music Production Questions",
    thumbnail: "/video-thumbnail.png",
    scheduledDate: "2023-07-29T20:00:00",
    status: "Draft",
    visibility: "Private",
    platform: "YouTube",
  },
  {
    id: 4,
    title: "New Album Teaser - Coming Soon!",
    thumbnail: "/placeholder.svg?key=qqwer",
    scheduledDate: "2023-08-05T12:00:00",
    status: "Ready",
    visibility: "Public",
    platform: "YouTube & Instagram",
  },
]

export default function SchedulerPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  const handleScheduleNewVideo = async () => {
    try {
      await createItem("video schedule")
      toast({
        title: "Video scheduled",
        description: "Your new video has been scheduled successfully.",
      })
    } catch (error) {
      console.error("Error scheduling video:", error)
    }
  }

  const handleEditVideo = (id: number) => {
    toast({
      title: "Edit video",
      description: `Editing video #${id}`,
    })
  }

  const handleCopyVideo = (id: number) => {
    toast({
      title: "Copy video",
      description: `Copying video #${id}`,
    })
  }

  const handleDeleteVideo = (id: number) => {
    toast({
      title: "Delete video",
      description: `Deleting video #${id}`,
    })
  }

  const handleViewAllScheduledVideos = () => {
    toast({
      title: "View all scheduled videos",
      description: "Viewing all scheduled videos",
    })
  }

  const filteredVideos =
    filter === "all"
      ? scheduledVideos
      : scheduledVideos.filter((video) => video.status.toLowerCase() === filter.toLowerCase())

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Content Scheduler</h1>
          <p className="text-sm text-gray-400">Schedule and manage your video uploads</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            action={handleScheduleNewVideo}
            icon={<Plus className="h-4 w-4" />}
            actionName="Schedule New Video"
          >
            Schedule New Video
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and manage your publishing schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-gray-800"
                />
                <div className="w-full mt-4 space-y-2">
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Today</span>
                    </div>
                    <span className="text-xs text-gray-400">May 6, 2025</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm">Next Scheduled</span>
                    </div>
                    <span className="text-xs text-gray-400">July 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Optimal Time</span>
                    </div>
                    <span className="text-xs text-gray-400">Saturdays, 3PM</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <h3 className="text-sm font-medium mb-2">Publishing Tips</h3>
                <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                  <Bell className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-xs">
                      Your audience is most active on Saturdays and Sundays between 2PM and 6PM.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                  <Bell className="h-4 w-4 text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-xs">Consider scheduling 1-2 videos per week for optimal engagement.</p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Scheduled Videos */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Scheduled Videos</CardTitle>
                <div className="flex gap-2">
                  <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date)
                          setIsCalendarOpen(false)
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Select defaultValue={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[150px] bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Videos</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="ready">Ready</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="flex items-start gap-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-24 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{video.title}</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{format(new Date(video.scheduledDate), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{format(new Date(video.scheduledDate), "h:mm a")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge
                            className={
                              video.status === "Scheduled"
                                ? "bg-green-500/20 text-green-400"
                                : video.status === "Draft"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-blue-500/20 text-blue-400"
                            }
                          >
                            {video.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-xs">{video.visibility}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => handleEditVideo(video.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => handleCopyVideo(video.id)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-white"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">
                <span className="flex items-center">
                  <Clock4 className="h-4 w-4 mr-1" />
                  All times are in your local timezone
                </span>
              </div>
              <ActionButton
                variant="outline"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                action={handleViewAllScheduledVideos}
                actionName="View All Scheduled Videos"
              >
                View All Scheduled Videos
              </ActionButton>
            </CardFooter>
          </Card>

          {/* Publishing Status */}
          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Publishing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-400">Last Published: Summer Concert Highlights</h4>
                    <p className="text-sm text-gray-300 mt-1">Successfully published on July 1, 2023 at 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Clock4 className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-400">Next Up: Behind the Scenes</h4>
                    <p className="text-sm text-gray-300 mt-1">Scheduled for July 15, 2023 at 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-400">Attention Needed: Q&A Session</h4>
                    <p className="text-sm text-gray-300 mt-1">Draft needs to be finalized before July 25, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
