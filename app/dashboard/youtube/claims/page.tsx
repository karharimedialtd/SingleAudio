"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Shield, Play, Eye, MoreHorizontal, AlertTriangle, DollarSign, TrendingUp } from "lucide-react"

interface Claim {
  id: string
  videoTitle: string
  claimant: string
  policy: string
  status: "active" | "pending" | "resolved" | "appealed"
  revenue: number
  views: number
  claimedDate: string
}

const mockClaims: Claim[] = [
  {
    id: "1",
    videoTitle: "Midnight Dreams - Official Music Video",
    claimant: "TuneCore",
    policy: "Standard Monetization",
    status: "active",
    revenue: 123.45,
    views: 45678,
    claimedDate: "2024-01-10",
  },
  {
    id: "2",
    videoTitle: "Electric Nights EP - Behind the Scenes",
    claimant: "CD Baby",
    policy: "Block in Some Territories",
    status: "pending",
    revenue: 0,
    views: 12345,
    claimedDate: "2024-01-15",
  },
  {
    id: "3",
    videoTitle: "Summer Vibes - Lyric Video",
    claimant: "AdRev",
    policy: "Monetize in All Territories",
    status: "resolved",
    revenue: 56.78,
    views: 23456,
    claimedDate: "2024-01-05",
  },
]

export default function ContentIDClaimsPage() {
  const { setCurrentPage } = useDashboard()
  const [claims, setClaims] = useState<Claim[]>(mockClaims)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    setCurrentPage("Content ID Claims")
  }, [setCurrentPage])

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = claim.videoTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-600/20 text-green-400 border-green-600/30",
      pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      resolved: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      appealed: "bg-purple-600/20 text-purple-400 border-purple-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const totalRevenue = claims.reduce((sum, claim) => sum + claim.revenue, 0)
  const activeClaims = claims.filter((c) => c.status === "active").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Content ID Claims</h1>
          <p className="text-gray-400">Manage and resolve Content ID claims on your YouTube videos</p>
        </div>
        <Button
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => {
            // Open new claim form or modal
            console.log("Opening new claim form...")
          }}
        >
          <Shield className="h-4 w-4 mr-2" />
          New Claim
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Claims</p>
                <p className="text-2xl font-bold text-white">{claims.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Claims</p>
                <p className="text-2xl font-bold text-white">{activeClaims}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Avg. Claim Value</p>
                <p className="text-2xl font-bold text-white">${(totalRevenue / (claims.length || 1)).toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="bg-white/10 border-white/20">
                  <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="active" className="text-gray-300 data-[state=active]:text-white">
                    Active
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="text-gray-300 data-[state=active]:text-white">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="text-gray-300 data-[state=active]:text-white">
                    Resolved
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Claims List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Content ID Claims</CardTitle>
          <CardDescription className="text-gray-400">Manage and resolve claims on your YouTube videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClaims.map((claim) => (
              <Card key={claim.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white truncate">{claim.videoTitle}</h3>
                          <p className="text-gray-400 text-sm">Claimant: {claim.claimant}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Policy: {claim.policy}</span>
                            <span>Claimed: {new Date(claim.claimedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(claim.status)}
                          <div className="text-right">
                            <p className="text-white font-semibold">${claim.revenue.toFixed(2)}</p>
                            <p className="text-gray-400 text-sm">Revenue</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Play className="h-4 w-4 mr-1" />
                            Watch
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredClaims.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No claims found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
