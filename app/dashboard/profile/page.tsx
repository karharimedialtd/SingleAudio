"use client"

import { useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  User,
  Music,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Edit,
  Share,
  Play,
  Eye,
  Heart,
  Download,
  Award,
  TrendingUp,
} from "lucide-react"

export default function ProfilePage() {
  const { setCurrentPage, addNotification } = useDashboard()

  useEffect(() => {
    setCurrentPage("Profile")
  }, [setCurrentPage])

  const profileStats = {
    totalReleases: 24,
    totalStreams: 1250000,
    monthlyListeners: 45678,
    followers: 12456,
    totalRevenue: 8947.32,
  }

  const recentReleases = [
    {
      id: "1",
      title: "Midnight Dreams",
      type: "Single",
      releaseDate: "2024-01-15",
      streams: 125430,
      revenue: 502.15,
      cover: "/placeholder.svg?height=80&width=80&text=MD",
    },
    {
      id: "2",
      title: "Electric Nights EP",
      type: "EP",
      releaseDate: "2023-12-10",
      streams: 89234,
      revenue: 356.94,
      cover: "/placeholder.svg?height=80&width=80&text=EN",
    },
    {
      id: "3",
      title: "Summer Vibes",
      type: "Single",
      releaseDate: "2023-11-22",
      streams: 67890,
      revenue: 271.56,
      cover: "/placeholder.svg?height=80&width=80&text=SV",
    },
  ]

  const achievements = [
    { title: "First Release", description: "Published your first track", date: "2023-06-15", icon: Music },
    { title: "10K Streams", description: "Reached 10,000 total streams", date: "2023-08-20", icon: Play },
    { title: "Playlist Feature", description: "Featured in a curated playlist", date: "2023-09-12", icon: Heart },
    { title: "100K Streams", description: "Reached 100,000 total streams", date: "2023-11-05", icon: TrendingUp },
  ]

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/artist/johndoe`

    try {
      // Try to use the Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: "John Doe - Music Artist",
          text: "Check out my music profile and latest releases!",
          url: profileUrl,
        })

        addNotification({
          type: "success",
          title: "Profile Shared",
          message: "Your profile has been shared successfully!",
        })
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(profileUrl)

        addNotification({
          type: "success",
          title: "Link Copied",
          message: "Profile URL copied to clipboard!",
        })
      }
    } catch (error) {
      console.error("Error sharing profile:", error)

      // Manual fallback
      const textArea = document.createElement("textarea")
      textArea.value = profileUrl
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)

      addNotification({
        type: "success",
        title: "Link Copied",
        message: "Profile URL copied to clipboard!",
      })
    }
  }

  const handleEditProfile = () => {
    console.log("Navigating to edit profile")
    window.location.href = "/dashboard/settings"
  }

  const handleViewRelease = (releaseId: string) => {
    console.log(`Viewing release: ${releaseId}`)
    window.location.href = `/dashboard/music/catalog?release=${releaseId}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Profile</h1>
          <p className="text-gray-400">Manage your artist profile and view your achievements</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-white/20 text-gray-300 hover:text-white"
            onClick={handleShareProfile}
          >
            <Share className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleEditProfile}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              JD
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-white">John Doe</h2>
                <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">Pro Artist</Badge>
              </div>

              <p className="text-gray-300 text-lg mb-4">Electronic Music Producer & Artist</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Los Angeles, CA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Joined June 2023</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>johndoe.music</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>john.doe@example.com</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{profileStats.totalReleases}</p>
                <p className="text-gray-400 text-sm">Releases</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{profileStats.followers.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">{profileStats.totalStreams.toLocaleString()}</p>
              </div>
              <Play className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Monthly Listeners</p>
                <p className="text-2xl font-bold text-white">{profileStats.monthlyListeners.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-white">${profileStats.totalRevenue.toFixed(2)}</p>
              </div>
              <Download className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Profile Views</p>
                <p className="text-2xl font-bold text-white">8,234</p>
              </div>
              <User className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="releases" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="releases" className="text-gray-300 data-[state=active]:text-white">
            Recent Releases
          </TabsTrigger>
          <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:text-white">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-gray-300 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-gray-300 data-[state=active]:text-white">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="releases" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Releases</CardTitle>
              <CardDescription className="text-gray-400">
                Your latest music releases and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReleases.map((release, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={release.cover || "/placeholder.svg"}
                          alt={release.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{release.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>{release.type}</span>
                            <span>Released {new Date(release.releaseDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-6 mt-2 text-sm">
                            <div className="flex items-center space-x-1">
                              <Play className="h-4 w-4 text-blue-400" />
                              <span className="text-white">{release.streams.toLocaleString()}</span>
                              <span className="text-gray-400">streams</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Download className="h-4 w-4 text-green-400" />
                              <span className="text-white">${release.revenue.toFixed(2)}</span>
                              <span className="text-gray-400">revenue</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => handleViewRelease(release.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Achievements</CardTitle>
              <CardDescription className="text-gray-400">
                Milestones and accomplishments in your music career
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <achievement.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{achievement.title}</h3>
                          <p className="text-gray-400 text-sm">{achievement.description}</p>
                          <p className="text-gray-500 text-xs mt-1">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Award className="h-5 w-5 text-yellow-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Growth Metrics</CardTitle>
                <CardDescription className="text-gray-400">Your progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Streams Growth</span>
                      <span className="text-white">+25.4%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Follower Growth</span>
                      <span className="text-white">+18.2%</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Revenue Growth</span>
                      <span className="text-white">+32.1%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Top Countries</CardTitle>
                <CardDescription className="text-gray-400">Where your music is most popular</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", percentage: 35.2, listeners: 16045 },
                    { country: "United Kingdom", percentage: 18.7, listeners: 8537 },
                    { country: "Germany", percentage: 12.4, listeners: 5664 },
                    { country: "Canada", percentage: 9.8, listeners: 4476 },
                    { country: "Australia", percentage: 7.3, listeners: 3334 },
                  ].map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{country.country}</p>
                        <p className="text-gray-400 text-sm">{country.listeners.toLocaleString()} listeners</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">{country.percentage}%</p>
                        <Progress value={country.percentage} className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-gray-400">Your latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "Released new single", item: "Midnight Dreams", date: "2 days ago", type: "release" },
                  { action: "Updated profile bio", item: "", date: "1 week ago", type: "profile" },
                  {
                    action: "Submitted to playlist",
                    item: "Indie Electronic Vibes",
                    date: "2 weeks ago",
                    type: "submission",
                  },
                  { action: "Generated revenue report", item: "December 2023", date: "3 weeks ago", type: "report" },
                  { action: "Connected Instagram account", item: "", date: "1 month ago", type: "social" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      {activity.type === "release" && <Music className="h-4 w-4 text-white" />}
                      {activity.type === "profile" && <User className="h-4 w-4 text-white" />}
                      {activity.type === "submission" && <Heart className="h-4 w-4 text-white" />}
                      {activity.type === "report" && <Download className="h-4 w-4 text-white" />}
                      {activity.type === "social" && <Share className="h-4 w-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">
                        {activity.action}
                        {activity.item && <span className="text-purple-400"> "{activity.item}"</span>}
                      </p>
                      <p className="text-gray-400 text-sm">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
