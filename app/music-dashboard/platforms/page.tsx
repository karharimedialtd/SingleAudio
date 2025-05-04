"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink, Globe, Info, Music, Plus, RefreshCw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Platform data
const platforms = [
  {
    id: "spotify",
    name: "Spotify",
    logo: "/spotify-logo.png",
    connected: true,
    status: "verified",
    profileUrl: "https://open.spotify.com/artist/example",
    listeners: 12500,
    region: "global",
  },
  {
    id: "apple-music",
    name: "Apple Music",
    logo: "/apple-music-logo.png",
    connected: true,
    status: "verified",
    profileUrl: "https://music.apple.com/artist/example",
    listeners: 8700,
    region: "global",
  },
  {
    id: "youtube-music",
    name: "YouTube Music",
    logo: "/youtube-music-logo.png",
    connected: true,
    status: "verified",
    profileUrl: "https://music.youtube.com/channel/example",
    listeners: 15200,
    region: "global",
  },
  {
    id: "amazon-music",
    name: "Amazon Music",
    logo: "/amazon-music-logo.png",
    connected: true,
    status: "pending",
    profileUrl: "https://music.amazon.com/artists/example",
    listeners: 5300,
    region: "global",
  },
  {
    id: "deezer",
    name: "Deezer",
    logo: "/placeholder.svg?key=6d5hi",
    connected: true,
    status: "verified",
    profileUrl: "https://www.deezer.com/artist/example",
    listeners: 3200,
    region: "global",
  },
  {
    id: "tidal",
    name: "Tidal",
    logo: "/abstract-wave-logo.png",
    connected: false,
    status: "not-connected",
    profileUrl: "",
    listeners: 0,
    region: "global",
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    logo: "/soundcloud-logo.png",
    connected: true,
    status: "verified",
    profileUrl: "https://soundcloud.com/example",
    listeners: 4800,
    region: "global",
  },
  {
    id: "pandora",
    name: "Pandora",
    logo: "/placeholder.svg?key=2ih5z",
    connected: false,
    status: "not-connected",
    profileUrl: "",
    listeners: 0,
    region: "north-america",
  },
  {
    id: "tiktok",
    name: "TikTok",
    logo: "/social/tiktok.png",
    connected: true,
    status: "verified",
    profileUrl: "https://www.tiktok.com/music/example",
    listeners: 22000,
    region: "global",
  },
  {
    id: "anghami",
    name: "Anghami",
    logo: "/placeholder.svg?key=zjfom",
    connected: false,
    status: "not-connected",
    profileUrl: "",
    listeners: 0,
    region: "middle-east",
  },
  {
    id: "boomplay",
    name: "Boomplay",
    logo: "/placeholder.svg?key=squuo",
    connected: false,
    status: "not-connected",
    profileUrl: "",
    listeners: 0,
    region: "africa",
  },
  {
    id: "audiomack",
    name: "Audiomack",
    logo: "/placeholder.svg?height=40&width=40&query=audiomack%20logo",
    connected: true,
    status: "pending",
    profileUrl: "https://audiomack.com/example",
    listeners: 3100,
    region: "global",
  },
]

export default function PlatformsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [platformsData, setPlatformsData] = useState(platforms)
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      toast({
        title: "Platforms refreshed",
        description: "Latest platform data has been loaded",
      })
    }, 2000)
  }

  const handleConnect = (platformId: string) => {
    setConnectingPlatform(platformId)
    setDialogOpen(true)
  }

  const completeConnection = () => {
    if (!connectingPlatform) return

    setPlatformsData(
      platformsData.map((platform) =>
        platform.id === connectingPlatform
          ? { ...platform, connected: true, status: "pending", listeners: 0 }
          : platform,
      ),
    )

    setDialogOpen(false)
    setConnectingPlatform(null)

    toast({
      title: "Platform connected",
      description: "Your account is now pending verification",
    })
  }

  const handleManageReleases = (platformId: string) => {
    setSelectedPlatform(platformId)
    router.push(`/music-dashboard/platforms/${platformId}/releases`)
  }

  const filteredPlatforms =
    activeTab === "all"
      ? platformsData
      : platformsData.filter((platform) => platform.region === activeTab || platform.region === "global")

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Distribution Platforms</h1>
          <p className="text-sm text-gray-400">Manage your music across streaming platforms</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Status
              </>
            )}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Connect Platform
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle>Connect New Platform</DialogTitle>
                <DialogDescription>
                  Select a platform to connect your artist profile and distribute your music.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-2">
                  {platformsData
                    .filter((p) => !p.connected)
                    .map((platform) => (
                      <Button
                        key={platform.id}
                        variant="outline"
                        className={`flex items-center gap-2 h-auto py-2 ${
                          selectedPlatform === platform.id ? "border-purple-500" : "border-gray-800"
                        }`}
                        onClick={() => setSelectedPlatform(platform.id)}
                      >
                        <img
                          src={platform.logo || "/placeholder.svg"}
                          alt={platform.name}
                          className="h-6 w-6 rounded-sm"
                        />
                        <span>{platform.name}</span>
                      </Button>
                    ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedPlatform(null)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedPlatform) {
                      handleConnect(selectedPlatform)
                    }
                  }}
                  disabled={!selectedPlatform}
                >
                  Continue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Alert className="mb-6 bg-blue-900/20 text-blue-400 border-blue-900">
        <Info className="h-4 w-4" />
        <AlertTitle>Platform Verification</AlertTitle>
        <AlertDescription>
          Verification can take up to 4 weeks. Once verified, you'll be able to update your artist profile and access
          analytics.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Platforms</TabsTrigger>
          <TabsTrigger value="global">Global</TabsTrigger>
          <TabsTrigger value="north-america">North America</TabsTrigger>
          <TabsTrigger value="europe">Europe</TabsTrigger>
          <TabsTrigger value="asia">Asia</TabsTrigger>
          <TabsTrigger value="africa">Africa</TabsTrigger>
          <TabsTrigger value="middle-east">Middle East</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlatforms.map((platform) => (
          <Card key={platform.id} className="border-gray-800 bg-gray-900">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={platform.logo || "/placeholder.svg"}
                    alt={`${platform.name} logo`}
                    className="h-10 w-10 rounded-md"
                  />
                  <div>
                    <CardTitle className="text-base font-medium">{platform.name}</CardTitle>
                    <CardDescription>
                      {platform.connected ? (
                        platform.status === "verified" ? (
                          <span className="text-green-500 flex items-center gap-1">
                            <Check className="h-3 w-3" /> Verified
                          </span>
                        ) : (
                          <span className="text-yellow-500">Pending Verification</span>
                        )
                      ) : (
                        <span className="text-gray-500">Not Connected</span>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {platform.region === "global" ? "Global" : platform.region.replace("-", " ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              {platform.connected ? (
                <div className="space-y-3">
                  {platform.listeners > 0 && (
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Monthly Listeners</span>
                        <span className="font-medium">{platform.listeners.toLocaleString()}</span>
                      </div>
                      <Progress value={Math.min(platform.listeners / 250, 100)} className="h-1" />
                    </div>
                  )}

                  {platform.profileUrl && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Artist Profile</span>
                      <a
                        href={platform.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        onClick={(e) => {
                          e.preventDefault()
                          toast({
                            title: "External link",
                            description: `Opening ${platform.name} artist profile`,
                          })
                        }}
                      >
                        View <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center py-4">
                  <Button variant="outline" size="sm" onClick={() => handleConnect(platform.id)}>
                    <Globe className="mr-2 h-4 w-4" />
                    Connect Account
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => handleManageReleases(platform.id)}
                disabled={!platform.connected}
              >
                <Music className="mr-2 h-4 w-4" />
                Manage Releases
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Platform Connection Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>
              Connect {connectingPlatform && platformsData.find((p) => p.id === connectingPlatform)?.name}
            </DialogTitle>
            <DialogDescription>Enter your artist profile details to connect your account.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="artist-id">Artist ID/Username</Label>
              <Input
                id="artist-id"
                placeholder="Enter your artist ID or username"
                className="bg-gray-950 border-gray-800"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-url">Profile URL (Optional)</Label>
              <Input
                id="profile-url"
                placeholder="https://example.com/artist/yourname"
                className="bg-gray-950 border-gray-800"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={completeConnection}>Connect Platform</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
