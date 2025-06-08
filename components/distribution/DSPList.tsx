"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ExternalLink, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface DSP {
  id: string
  name: string
  type: "audio" | "video" | "social"
  integration: "public_api" | "partner_api" | "cms" | "embed"
  access: "available" | "via_partner" | "basic_only" | "metadata_only"
  description: string
  features: string[]
  enabled: boolean
  logo?: string
}

const dspList: DSP[] = [
  {
    id: "youtube-music",
    name: "YouTube Music",
    type: "audio",
    integration: "public_api",
    access: "available",
    description: "Global music streaming platform by Google",
    features: ["Streaming", "Analytics", "Content ID", "Monetization"],
    enabled: true,
  },
  {
    id: "youtube-content-id",
    name: "YouTube Content ID",
    type: "video",
    integration: "cms",
    access: "available",
    description: "Content identification and rights management system",
    features: ["Content Matching", "Rights Management", "Revenue Tracking"],
    enabled: true,
  },
  {
    id: "facebook-rights",
    name: "Facebook Rights Manager",
    type: "social",
    integration: "partner_api",
    access: "available",
    description: "Rights management for Facebook and Instagram",
    features: ["Rights Protection", "Content Matching", "Analytics"],
    enabled: false,
  },
  {
    id: "facebook-audio",
    name: "Facebook Audio Library",
    type: "audio",
    integration: "partner_api",
    access: "available",
    description: "Audio content library for Facebook platforms",
    features: ["Audio Library", "Content Matching"],
    enabled: false,
  },
  {
    id: "tiktok",
    name: "TikTok",
    type: "social",
    integration: "partner_api",
    access: "via_partner",
    description: "Short-form video platform via SoundOn partnership",
    features: ["Music Distribution", "Viral Promotion"],
    enabled: false,
  },
  {
    id: "audius",
    name: "Audius",
    type: "audio",
    integration: "public_api",
    access: "available",
    description: "Decentralized music streaming platform",
    features: ["Streaming", "NFTs", "Direct Artist Payments"],
    enabled: false,
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    type: "audio",
    integration: "public_api",
    access: "basic_only",
    description: "Audio distribution and discovery platform",
    features: ["Upload", "Basic Analytics"],
    enabled: false,
  },
  {
    id: "bandcamp",
    name: "Bandcamp",
    type: "audio",
    integration: "embed",
    access: "metadata_only",
    description: "Direct-to-fan music platform",
    features: ["Metadata", "Embed Player"],
    enabled: false,
  },
  {
    id: "mixcloud",
    name: "Mixcloud",
    type: "audio",
    integration: "public_api",
    access: "available",
    description: "Long-form audio content platform",
    features: ["DJ Mixes", "Podcasts", "Radio Shows"],
    enabled: false,
  },
  {
    id: "internet-archive",
    name: "Internet Archive",
    type: "audio",
    integration: "public_api",
    access: "available",
    description: "Digital preservation and access platform",
    features: ["Permanent Storage", "Open Access"],
    enabled: false,
  },
]

export function DSPList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [dsps, setDsps] = useState(dspList)

  const filteredDSPs = dsps.filter((dsp) => {
    const matchesSearch = dsp.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || dsp.type === selectedType
    return matchesSearch && matchesType
  })

  const toggleDSP = (id: string) => {
    const dsp = dsps.find((d) => d.id === id)

    if (dsp?.access === "via_partner") {
      alert(`${dsp.name} requires partner approval. Contact support to enable this DSP.`)
      return
    }

    setDsps((prev) =>
      prev.map((dsp) => {
        if (dsp.id === id) {
          const newEnabled = !dsp.enabled
          console.log(`${newEnabled ? "Enabled" : "Disabled"} ${dsp.name}`)

          // Show feedback
          setTimeout(() => {
            alert(`${dsp.name} has been ${newEnabled ? "enabled" : "disabled"} for distribution`)
          }, 100)

          return { ...dsp, enabled: newEnabled }
        }
        return dsp
      }),
    )
  }

  const getAccessBadge = (access: string) => {
    switch (access) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>
      case "via_partner":
        return <Badge className="bg-yellow-100 text-yellow-800">Via Partner</Badge>
      case "basic_only":
        return <Badge className="bg-blue-100 text-blue-800">Basic Only</Badge>
      case "metadata_only":
        return <Badge className="bg-gray-100 text-gray-800">Metadata Only</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (enabled: boolean, access: string) => {
    if (enabled) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (access === "via_partner") {
      return <Clock className="h-5 w-5 text-yellow-500" />
    }
    return <AlertCircle className="h-5 w-5 text-gray-400" />
  }

  const enabledCount = dsps.filter((dsp) => dsp.enabled).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">DSP Selection</h1>
          <p className="text-muted-foreground">Choose which Digital Service Providers to distribute your music to</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Enabled DSPs</p>
          <p className="text-2xl font-bold">
            {enabledCount}/{dsps.length}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search DSPs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* DSP Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDSPs.map((dsp) => (
          <Card key={dsp.id} className={`transition-all ${dsp.enabled ? "ring-2 ring-primary" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {dsp.name.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{dsp.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {getAccessBadge(dsp.access)}
                      <Badge variant="outline" className="text-xs">
                        {dsp.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(dsp.enabled, dsp.access)}
                  <Switch
                    checked={dsp.enabled}
                    onCheckedChange={() => toggleDSP(dsp.id)}
                    disabled={dsp.access === "via_partner"}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{dsp.description}</CardDescription>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {dsp.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-muted-foreground">
                    Integration: {dsp.integration.replace("_", " ")}
                  </span>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDSPs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No DSPs found matching your criteria</p>
        </div>
      )}

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Summary</CardTitle>
          <CardDescription>Your current DSP selection and reach</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{enabledCount}</p>
              <p className="text-sm text-muted-foreground">Enabled DSPs</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {dsps.filter((d) => d.enabled && d.type === "audio").length}
              </p>
              <p className="text-sm text-muted-foreground">Audio Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {dsps.filter((d) => d.enabled && d.type === "video").length}
              </p>
              <p className="text-sm text-muted-foreground">Video Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {dsps.filter((d) => d.enabled && d.type === "social").length}
              </p>
              <p className="text-sm text-muted-foreground">Social Platforms</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
