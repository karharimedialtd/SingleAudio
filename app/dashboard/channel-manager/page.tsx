"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Youtube,
  Users,
  Eye,
  DollarSign,
  TrendingUp,
  Settings,
  LinkIcon,
  CheckCircle,
  Plus,
} from "lucide-react"

interface Channel {
  id: string
  name: string
  handle: string
  subscribers: number
  views: number
  revenue: number
  status: "connected" | "pending" | "disconnected"
  thumbnail: string
  verified: boolean
  monetized: boolean
}

const mockChannels: Channel[] = [
  {
    id: "1",
    name: "John Doe Music",
    handle: "@johndoemusic",
    subscribers: 125000,
    views: 2500000,
    revenue: 8500.5,
    status: "connected",
    thumbnail: "/placeholder.svg?height=60&width=60",
    verified: true,
    monetized: true,
  },
  {
    id: "2",
    name: "John Doe Covers",
    handle: "@johndoecovers",
    subscribers: 45000,
    views: 890000,
    revenue: 2100.25,
    status: "connected",
    thumbnail: "/placeholder.svg?height=60&width=60",
    verified: false,
    monetized: true,
  },
]

export default function ChannelManagerPage() {
  const router = useRouter()
  const { setCurrentPage } = useDashboard()
  const [channels, setChannels] = useState<Channel[]>(mockChannels)
  const [isConnecting, setIsConnecting] = useState(false)
  const [newChannelUrl, setNewChannelUrl] = useState("")
  const [tab, setTab] = useState("channels")

  useEffect(() => {
    setCurrentPage("Channel Manager")
  }, [setCurrentPage])

  const handleConnectChannel = async () => {
    if (!newChannelUrl) {
      alert("Please enter a YouTube channel URL")
      return
    }

    setIsConnecting(true)

    setTimeout(() => {
      const newChannel: Channel = {
        id: Date.now().toString(),
        name: "New Channel",
        handle: "@newchannel",
        subscribers: 0,
        views: 0,
        revenue: 0,
        status: "pending",
        thumbnail: "/placeholder.svg?height=60&width=60",
        verified: false,
        monetized: false,
      }

      setChannels([...channels, newChannel])
      setNewChannelUrl("")
      setIsConnecting(false)
      alert("✅ Channel connection request submitted! Await admin approval.")
    }, 2000)
  }

  const handleDisconnectChannel = (channelId: string) => {
    const channel = channels.find((c) => c.id === channelId)
    if (confirm(`Are you sure you want to disconnect "${channel?.name}"?`)) {
      setChannels(channels.filter((c) => c.id !== channelId))
    }
  }

  const handleToggleMonetization = (channelId: string) => {
    setChannels(
      channels.map((channel) =>
        channel.id === channelId
          ? { ...channel, monetized: !channel.monetized }
          : channel
      )
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Connected</Badge>
      case "pending":
        return <Badge className="bg-yellow-600/20 text-yellow-400 border-yellow-600/30">Pending</Badge>
      case "disconnected":
        return <Badge className="bg-red-600/20 text-red-400 border-red-600/30">Disconnected</Badge>
      default:
        return null
    }
  }

  const connectedChannels = channels.filter((c) => c.status === "connected")
  const totalSubscribers = connectedChannels.reduce((sum, c) => sum + c.subscribers, 0)
  const totalViews = connectedChannels.reduce((sum, c) => sum + c.views, 0)
  const totalRevenue = connectedChannels.reduce((sum, c) => sum + c.revenue, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Channel Manager</h1>
          <p className="text-gray-400">Manage your YouTube channels and track performance</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700" onClick={() => setTab("connect")}>
          <Plus className="h-4 w-4 mr-2" />
          Connect Channel
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Connected Channels</p>
                <p className="text-2xl font-bold text-white">{connectedChannels.length}</p>
              </div>
              <Youtube className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Subscribers</p>
                <p className="text-2xl font-bold text-white">{totalSubscribers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="channels">My Channels</TabsTrigger>
          <TabsTrigger value="connect">Connect New</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Channels tab */}
        <TabsContent value="channels">
          {connectedChannels.map((channel) => (
            <Card key={channel.id} className="bg-white/5 border-white/10 my-4">
              <CardContent className="p-6 flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={channel.thumbnail} />
                  <AvatarFallback>{channel.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-white font-semibold">{channel.name}</h3>
                  <p className="text-gray-400">{channel.handle}</p>
                  <div className="text-gray-400 text-sm flex space-x-4">
                    <span>{channel.subscribers.toLocaleString()} subs</span>
                    <span>{channel.views.toLocaleString()} views</span>
                    <span>${channel.revenue.toFixed(2)} revenue</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={channel.monetized}
                    disabled={!channel.verified}
                    onCheckedChange={() => handleToggleMonetization(channel.id)}
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/dashboard/youtube/analytics?channel=${channel.id}`)}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-400" onClick={() => handleDisconnectChannel(channel.id)}>
                    Disconnect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Connect New tab */}
        <TabsContent value="connect">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Connect New Channel</CardTitle>
              <CardDescription className="text-gray-400">Submit a new channel for admin approval</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label className="text-gray-300">Channel URL</Label>
              <Input
                placeholder="https://youtube.com/@yourchannel"
                value={newChannelUrl}
                onChange={(e) => setNewChannelUrl(e.target.value)}
              />
              <Button onClick={handleConnectChannel} disabled={isConnecting} className="bg-red-600 hover:bg-red-700">
                {isConnecting ? "Submitting..." : "Submit Channel"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings tab */}
        <TabsContent value="settings">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Channel Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-sm">Feature not yet implemented.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
