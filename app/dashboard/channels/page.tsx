"use client"

import { useState } from "react"
import { Search, Plus, MoreVertical, Settings, ExternalLink, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ActionButton } from "@/components/action-button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// Sample channel data
const channels = [
  {
    id: 1,
    name: "Music Channel Official",
    avatar: "/music-channel-logo.png",
    subscribers: "1.2M",
    videos: 156,
    views: "45.2M",
    lastUpdated: "2 hours ago",
    monetized: true,
    growth: 12.5,
  },
  {
    id: 2,
    name: "Artist Vlog",
    avatar: "/placeholder.svg?key=h4r0h",
    subscribers: "450K",
    videos: 87,
    views: "12.8M",
    lastUpdated: "1 day ago",
    monetized: true,
    growth: 8.3,
  },
  {
    id: 3,
    name: "Tutorial Sessions",
    avatar: "/placeholder.svg?key=6vecp",
    subscribers: "320K",
    videos: 64,
    views: "8.5M",
    lastUpdated: "3 days ago",
    monetized: true,
    growth: 5.7,
  },
  {
    id: 4,
    name: "Behind The Scenes",
    avatar: "/placeholder.svg?key=e3hj8",
    subscribers: "180K",
    videos: 42,
    views: "4.2M",
    lastUpdated: "1 week ago",
    monetized: false,
    growth: 3.2,
  },
]

export default function ChannelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleConnectChannel = () => {
    toast({
      title: "Connect Channel",
      description: "Redirecting to channel connection page...",
    })
    // In a real app, this would navigate to a channel connection page
    setTimeout(() => {
      toast({
        title: "Channel Connected",
        description: "New channel has been successfully connected",
      })
    }, 1500)
  }

  const handleChannelAction = (action: string, channelId: number) => {
    const channel = channels.find((c) => c.id === channelId)

    switch (action) {
      case "settings":
        toast({
          title: "Channel Settings",
          description: `Opening settings for ${channel?.name}`,
        })
        router.push(`/dashboard/channels/settings/${channelId}`)
        break
      case "view":
        toast({
          title: "View on YouTube",
          description: `Opening ${channel?.name} on YouTube`,
        })
        window.open("https://youtube.com", "_blank")
        break
      case "sync":
        toast({
          title: "Syncing Data",
          description: `Syncing data for ${channel?.name}`,
        })
        setTimeout(() => {
          toast({
            title: "Sync Complete",
            description: `Data for ${channel?.name} has been updated`,
          })
        }, 1500)
        break
      case "disconnect":
        toast({
          title: "Disconnecting Channel",
          description: `Are you sure you want to disconnect ${channel?.name}?`,
        })
        // In a real app, this would show a confirmation dialog
        break
      default:
        break
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Channel Management</h1>
        <div className="flex gap-2">
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            action={handleConnectChannel}
            icon={<Plus className="h-4 w-4 mr-2" />}
          >
            Connect Channel
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Subscribers</p>
              <h3 className="text-3xl font-bold">2.15M</h3>
              <p className="text-xs text-green-400">+15.2% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Videos</p>
              <h3 className="text-3xl font-bold">349</h3>
              <p className="text-xs text-green-400">+8 new this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Views</p>
              <h3 className="text-3xl font-bold">70.7M</h3>
              <p className="text-xs text-green-400">+2.3M this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Avg. Watch Time</p>
              <h3 className="text-3xl font-bold">4:32</h3>
              <p className="text-xs text-red-400">-0:15 from last month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Connected Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-w-sm mb-6">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search channels..."
              className="pl-8 bg-gray-800 border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            {channels.map((channel) => (
              <Card key={channel.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={channel.avatar || "/placeholder.svg"} alt={channel.name} />
                        <AvatarFallback>{channel.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{channel.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-purple-600 text-white hover:bg-purple-700">
                            {channel.subscribers} subscribers
                          </Badge>
                          {channel.monetized && (
                            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">Monetized</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleChannelAction("settings", channel.id)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Channel Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleChannelAction("view", channel.id)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on YouTube
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-800"
                          onClick={() => handleChannelAction("sync", channel.id)}
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Sync Data
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500 hover:bg-gray-800 hover:text-red-500"
                          onClick={() => handleChannelAction("disconnect", channel.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Disconnect
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-400">Videos</p>
                      <p className="font-medium">{channel.videos}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Views</p>
                      <p className="font-medium">{channel.views}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Last Updated</p>
                      <p className="font-medium">{channel.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-400">Growth Rate</p>
                      <p className="text-xs text-green-400">+{channel.growth}%</p>
                    </div>
                    <Progress
                      value={channel.growth * 4}
                      className="h-1 bg-gray-700"
                      indicatorClassName="bg-purple-600"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
