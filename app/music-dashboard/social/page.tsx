"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import {
  Calendar,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Plus,
  TwitterIcon,
  Upload,
  Youtube,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample data for connected accounts
const initialAccounts = [
  {
    id: 1,
    platform: "Instagram",
    username: "@artistname",
    followers: "12.5K",
    connected: true,
    icon: <Instagram className="h-4 w-4" />,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    profileUrl: "https://instagram.com/artistname",
  },
  {
    id: 2,
    platform: "TikTok",
    username: "@artistname",
    followers: "8.2K",
    connected: true,
    icon: <TwitterIcon className="h-4 w-4" />,
    color: "bg-black",
    profileUrl: "https://tiktok.com/@artistname",
  },
  {
    id: 3,
    platform: "Twitter",
    username: "@artistname",
    followers: "5.7K",
    connected: true,
    icon: <TwitterIcon className="h-4 w-4" />,
    color: "bg-blue-500",
    profileUrl: "https://twitter.com/artistname",
  },
  {
    id: 4,
    platform: "Facebook",
    username: "Artist Name",
    followers: "15.3K",
    connected: true,
    icon: <Facebook className="h-4 w-4" />,
    color: "bg-blue-600",
    profileUrl: "https://facebook.com/artistname",
  },
  {
    id: 5,
    platform: "YouTube",
    username: "Artist Name",
    followers: "20.1K",
    connected: true,
    icon: <Youtube className="h-4 w-4" />,
    color: "bg-red-600",
    profileUrl: "https://youtube.com/c/artistname",
  },
]

// Available platforms to connect
const availablePlatforms = [
  { id: "instagram", name: "Instagram", icon: <Instagram className="h-4 w-4" /> },
  { id: "tiktok", name: "TikTok", icon: <TwitterIcon className="h-4 w-4" /> },
  { id: "twitter", name: "Twitter", icon: <TwitterIcon className="h-4 w-4" /> },
  { id: "facebook", name: "Facebook", icon: <Facebook className="h-4 w-4" /> },
  { id: "youtube", name: "YouTube", icon: <Youtube className="h-4 w-4" /> },
  { id: "soundcloud", name: "SoundCloud", icon: <Globe className="h-4 w-4" /> },
  { id: "spotify", name: "Spotify", icon: <Globe className="h-4 w-4" /> },
]

// Sample data for scheduled posts
const initialScheduledPosts = [
  {
    id: 1,
    content:
      "Excited to announce my new single 'Summer Nights' dropping this Friday! Pre-save link in bio. #NewMusic #SummerNights",
    platforms: ["Instagram", "Twitter", "Facebook"],
    scheduledFor: "2023-08-15T18:00:00",
    image: "/placeholder.svg?key=2qxmd",
    status: "Scheduled",
  },
  {
    id: 2,
    content:
      "Behind the scenes from our latest music video shoot. Can't wait for you all to see the final result! #BTS #MusicVideo",
    platforms: ["Instagram", "TikTok"],
    scheduledFor: "2023-08-18T12:00:00",
    image: "/placeholder.svg?key=q2843",
    status: "Scheduled",
  },
  {
    id: 3,
    content:
      "My new album is now available on all streaming platforms! Listen now and let me know your favorite track. #NewAlbum #StreamNow",
    platforms: ["Instagram", "Twitter", "Facebook", "TikTok"],
    scheduledFor: "2023-08-10T09:00:00",
    image: "/abstract-album-cover.png",
    status: "Posted",
  },
]

// Sample data for post analytics
const postAnalytics = [
  {
    id: 1,
    platform: "Instagram",
    content: "Check out my new single 'Midnight Dreams' - Out Now!",
    date: "2023-08-01",
    likes: 1250,
    comments: 87,
    shares: 45,
    engagement: "4.2%",
  },
  {
    id: 2,
    platform: "TikTok",
    content: "#duet with @popularartist using my new track 'Urban Echoes'",
    date: "2023-08-05",
    likes: 3500,
    comments: 210,
    shares: 420,
    engagement: "8.7%",
  },
  {
    id: 3,
    platform: "Twitter",
    content: "Just dropped a surprise acoustic version of 'Summer Vibes' - Link in bio!",
    date: "2023-07-28",
    likes: 780,
    comments: 42,
    shares: 95,
    engagement: "3.5%",
  },
]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("accounts")
  const [newPostContent, setNewPostContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["Instagram", "Twitter"])
  const [schedulePost, setSchedulePost] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [connectedAccounts, setConnectedAccounts] = useState(initialAccounts)
  const [scheduledPosts, setScheduledPosts] = useState(initialScheduledPosts)
  const [connectDialogOpen, setConnectDialogOpen] = useState(false)
  const [selectedPlatformToConnect, setSelectedPlatformToConnect] = useState<string | null>(null)
  const [newAccountUsername, setNewAccountUsername] = useState("")
  const [newAccountProfileUrl, setNewAccountProfileUrl] = useState("")

  const handlePlatformToggle = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform])
    }
  }

  const handlePostNow = () => {
    if (!newPostContent) {
      toast({
        title: "Empty post",
        description: "Please enter some content for your post",
        variant: "destructive",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Post published",
      description: `Your post has been published to ${selectedPlatforms.join(", ")}`,
    })

    // Add to analytics
    const newAnalytic = {
      id: postAnalytics.length + 1,
      platform: selectedPlatforms[0],
      content: newPostContent,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      comments: 0,
      shares: 0,
      engagement: "0%",
    }

    // Reset form
    setNewPostContent("")
  }

  const handleSchedulePost = () => {
    if (!newPostContent) {
      toast({
        title: "Empty post",
        description: "Please enter some content for your post",
        variant: "destructive",
      })
      return
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to",
        variant: "destructive",
      })
      return
    }

    if (!scheduledDate || !scheduledTime) {
      toast({
        title: "Missing schedule information",
        description: "Please select both date and time for your scheduled post",
        variant: "destructive",
      })
      return
    }

    // Create new scheduled post
    const newScheduledPost = {
      id: scheduledPosts.length + 1,
      content: newPostContent,
      platforms: [...selectedPlatforms],
      scheduledFor: `${scheduledDate}T${scheduledTime}:00`,
      image: "",
      status: "Scheduled",
    }

    setScheduledPosts([newScheduledPost, ...scheduledPosts])

    toast({
      title: "Post scheduled",
      description: `Your post has been scheduled for ${scheduledDate} at ${scheduledTime}`,
    })

    // Reset form
    setNewPostContent("")
    setScheduledDate("")
    setScheduledTime("")
  }

  const handleConnectAccount = () => {
    if (!selectedPlatformToConnect || !newAccountUsername) {
      toast({
        title: "Missing information",
        description: "Please select a platform and enter a username",
        variant: "destructive",
      })
      return
    }

    const platformInfo = availablePlatforms.find((p) => p.id === selectedPlatformToConnect)

    if (!platformInfo) return

    // Create new connected account
    const newAccount = {
      id: connectedAccounts.length + 1,
      platform: platformInfo.name,
      username: newAccountUsername,
      followers: "0",
      connected: true,
      icon: platformInfo.icon,
      color: "bg-gray-800",
      profileUrl: newAccountProfileUrl || `https://${selectedPlatformToConnect}.com/${newAccountUsername}`,
    }

    setConnectedAccounts([...connectedAccounts, newAccount])
    setConnectDialogOpen(false)

    // Reset form
    setSelectedPlatformToConnect(null)
    setNewAccountUsername("")
    setNewAccountProfileUrl("")

    toast({
      title: "Account connected",
      description: `Your ${platformInfo.name} account has been connected successfully`,
    })
  }

  const handleDisconnectAccount = (accountId: number) => {
    setConnectedAccounts(connectedAccounts.filter((account) => account.id !== accountId))

    toast({
      title: "Account disconnected",
      description: "Your account has been disconnected",
    })
  }

  const handleViewProfile = (profileUrl: string) => {
    // In a real app, this would open the URL in a new tab
    toast({
      title: "Opening profile",
      description: "Redirecting to social media profile",
    })
    window.open(profileUrl, "_blank")
  }

  const handleDeleteScheduledPost = (postId: number) => {
    setScheduledPosts(scheduledPosts.filter((post) => post.id !== postId))

    toast({
      title: "Post deleted",
      description: "Your scheduled post has been deleted",
    })
  }

  const handleEditScheduledPost = (postId: number) => {
    const post = scheduledPosts.find((p) => p.id === postId)
    if (!post) return

    // In a real app, this would open an edit dialog
    toast({
      title: "Edit post",
      description: "Opening post editor",
    })
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      case "TikTok":
        return <TwitterIcon className="h-4 w-4" />
      case "Twitter":
        return <TwitterIcon className="h-4 w-4" />
      case "Facebook":
        return <Facebook className="h-4 w-4" />
      case "YouTube":
        return <Youtube className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  const formatScheduledDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Render different content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "accounts":
        return (
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Connected Social Media Accounts</CardTitle>
                <CardDescription>Manage your connected social media accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {connectedAccounts.map((account) => (
                    <div key={account.id} className="rounded-lg border border-gray-800 bg-gray-950 overflow-hidden">
                      <div className={`h-2 ${account.color}`}></div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {account.icon}
                            <h3 className="font-medium">{account.platform}</h3>
                          </div>
                          <Badge variant="outline" className="bg-gray-800">
                            {account.followers} followers
                          </Badge>
                        </div>
                        <p className="mt-2 text-sm text-gray-400">{account.username}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleDisconnectAccount(account.id)}
                          >
                            Disconnect
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleViewProfile(account.profileUrl)}
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
                    <DialogTrigger asChild>
                      <div className="rounded-lg border border-dashed border-gray-800 bg-gray-950 p-4 cursor-pointer hover:bg-gray-900 transition-colors">
                        <div className="flex h-full flex-col items-center justify-center gap-2 py-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                            <Plus className="h-5 w-5 text-gray-400" />
                          </div>
                          <h3 className="font-medium">Connect New Account</h3>
                          <p className="text-center text-sm text-gray-400">
                            Add another social media account to manage
                          </p>
                          <Button variant="outline" className="mt-2">
                            Connect Account
                          </Button>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800">
                      <DialogHeader>
                        <DialogTitle>Connect Social Media Account</DialogTitle>
                        <DialogDescription>
                          Select a platform and enter your account details to connect
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="platform">Platform</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {availablePlatforms.map((platform) => (
                              <Button
                                key={platform.id}
                                type="button"
                                variant={selectedPlatformToConnect === platform.id ? "default" : "outline"}
                                className={`flex items-center gap-2 ${
                                  selectedPlatformToConnect === platform.id ? "bg-purple-600" : ""
                                }`}
                                onClick={() => setSelectedPlatformToConnect(platform.id)}
                              >
                                {platform.icon}
                                <span>{platform.name}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            placeholder="@yourusername"
                            className="bg-gray-950 border-gray-800"
                            value={newAccountUsername}
                            onChange={(e) => setNewAccountUsername(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="profile-url">Profile URL (Optional)</Label>
                          <Input
                            id="profile-url"
                            placeholder="https://platform.com/yourusername"
                            className="bg-gray-950 border-gray-800"
                            value={newAccountProfileUrl}
                            onChange={(e) => setNewAccountProfileUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleConnectAccount}>Connect Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "create":
        return (
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Create New Post</CardTitle>
                <CardDescription>Create and publish content to your social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="post-content">Post Content</Label>
                  <Textarea
                    id="post-content"
                    placeholder="What's on your mind?"
                    className="min-h-32 bg-gray-950 border-gray-800"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-400">{newPostContent.length}/280 characters</p>
                </div>

                <div>
                  <Label className="mb-2 block">Add Media</Label>
                  <div className="rounded-lg border border-dashed border-gray-800 bg-gray-950 p-4">
                    <div className="flex flex-col items-center justify-center gap-2 py-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-center text-sm text-gray-400">Drag and drop files here, or click to browse</p>
                      <Button variant="outline" className="mt-2">
                        Upload Media
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-2 block">Select Platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {connectedAccounts.map((account) => (
                      <Button
                        key={account.id}
                        variant={selectedPlatforms.includes(account.platform) ? "default" : "outline"}
                        className={
                          selectedPlatforms.includes(account.platform) ? "bg-purple-600 hover:bg-purple-700" : ""
                        }
                        onClick={() => handlePlatformToggle(account.platform)}
                      >
                        {account.icon}
                        <span className="ml-2">{account.platform}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="schedule-post" checked={schedulePost} onCheckedChange={setSchedulePost} />
                  <Label htmlFor="schedule-post">Schedule for later</Label>
                </div>

                {schedulePost && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="scheduled-date">Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="scheduled-date"
                          type="date"
                          className="pl-8 bg-gray-950 border-gray-800"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="scheduled-time">Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="scheduled-time"
                          type="time"
                          className="pl-8 bg-gray-950 border-gray-800"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                {schedulePost ? (
                  <Button onClick={handleSchedulePost} className="w-full bg-purple-600 hover:bg-purple-700">
                    Schedule Post
                  </Button>
                ) : (
                  <Button onClick={handlePostNow} className="w-full bg-purple-600 hover:bg-purple-700">
                    Post Now
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )
      case "scheduled":
        return (
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Scheduled Posts</CardTitle>
                <CardDescription>Manage your upcoming social media posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledPosts.map((post) => (
                    <div key={post.id} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                      <div className="flex flex-col gap-4 md:flex-row">
                        {post.image && (
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post media"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                className={
                                  post.status === "Posted"
                                    ? "bg-green-500/20 text-green-500"
                                    : "bg-blue-500/20 text-blue-500"
                                }
                              >
                                {post.status}
                              </Badge>
                              <span className="text-sm text-gray-400">
                                {post.status === "Posted" ? "Posted on" : "Scheduled for"}{" "}
                                {formatScheduledDate(post.scheduledFor)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => handleEditScheduledPost(post.id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-red-500"
                                onClick={() => handleDeleteScheduledPost(post.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{post.content}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {post.platforms.map((platform) => (
                              <Badge key={platform} variant="outline" className="flex items-center gap-1">
                                {getPlatformIcon(platform)}
                                {platform}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("create")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Post
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
      case "analytics":
        return (
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Post Analytics</CardTitle>
                <CardDescription>Track the performance of your social media posts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-2">Platform</div>
                    <div className="col-span-4">Content</div>
                    <div className="col-span-1">Likes</div>
                    <div className="col-span-1">Comments</div>
                    <div className="col-span-1">Shares</div>
                    <div className="col-span-1">Engagement</div>
                    <div className="col-span-2">Date</div>
                  </div>
                  {postAnalytics.map((post) => (
                    <div
                      key={post.id}
                      className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                    >
                      <div className="col-span-2 flex items-center gap-1">
                        {getPlatformIcon(post.platform)}
                        <span>{post.platform}</span>
                      </div>
                      <div className="col-span-4 truncate">{post.content}</div>
                      <div className="col-span-1">{post.likes}</div>
                      <div className="col-span-1">{post.comments}</div>
                      <div className="col-span-1">{post.shares}</div>
                      <div className="col-span-1">{post.engagement}</div>
                      <div className="col-span-2 text-gray-400">{post.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Social Media</h1>
        <p className="text-sm text-gray-400">Manage your social media accounts and posts</p>
      </div>

      <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="accounts">Connected Accounts</TabsTrigger>
          <TabsTrigger value="create">Create Post</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled Posts</TabsTrigger>
          <TabsTrigger value="analytics">Post Analytics</TabsTrigger>
        </TabsList>
      </Tabs>

      {renderTabContent()}
    </div>
  )
}
