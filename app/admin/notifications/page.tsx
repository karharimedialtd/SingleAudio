"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, Clock, AlertCircle, Trash2, RefreshCw, Settings } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "New Content ID Claim",
    description: "A new content ID claim has been filed against your video 'Summer Vibes Mix'",
    time: "5 minutes ago",
    status: "unread",
    type: "alert",
    link: "/admin/claims",
  },
  {
    id: 2,
    title: "Royalty Payment Processed",
    description: "Your April royalty payment of $1,245.67 has been processed",
    time: "2 hours ago",
    status: "unread",
    type: "payment",
    link: "/admin/royalties",
  },
  {
    id: 3,
    title: "New Follower",
    description: "DJ MixMaster is now following your channel",
    time: "Yesterday",
    status: "read",
    type: "social",
    link: "/admin/social",
  },
  {
    id: 4,
    title: "Content Upload Complete",
    description: "Your video 'Guitar Tutorial Part 3' has been successfully processed",
    time: "2 days ago",
    status: "read",
    type: "content",
    link: "/admin/content",
  },
  {
    id: 5,
    title: "System Maintenance",
    description: "Scheduled maintenance will occur on May 15th from 2-4 AM UTC",
    time: "3 days ago",
    status: "read",
    type: "system",
    link: "/admin/system-status",
  },
]

export default function NotificationsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [notificationsList, setNotificationsList] = useState(notifications)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const unreadCount = notificationsList.filter((n) => n.status === "unread").length

  const handleRefresh = () => {
    setIsRefreshing(true)
    toast({
      title: "Refreshing",
      description: "Updating notifications...",
      duration: 2000,
    })
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Updated",
        description: "Notifications have been refreshed",
        duration: 3000,
      })
    }, 1500)
  }

  const handleMarkAllRead = () => {
    setNotificationsList(notificationsList.map((n) => ({ ...n, status: "read" })))
    toast({
      title: "Marked as Read",
      description: "All notifications have been marked as read",
      duration: 3000,
    })
  }

  const handleClearAll = () => {
    setNotificationsList([])
    toast({
      title: "Cleared",
      description: "All notifications have been cleared",
      duration: 3000,
    })
  }

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotificationsList(notificationsList.map((n) => (n.id === notification.id ? { ...n, status: "read" } : n)))
    // Navigate to the linked page
    router.push(notification.link)
  }

  const filteredNotifications = notificationsList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return notification.status === "unread"
    return notification.type === activeTab
  })

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "payment":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "social":
        return <Bell className="h-5 w-5 text-blue-500" />
      case "content":
        return <CheckCircle className="h-5 w-5 text-purple-500" />
      case "system":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Manage your platform notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={() => router.push("/admin/notifications/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-purple-600" variant="secondary">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="alert">Alerts</TabsTrigger>
            <TabsTrigger value="payment">Payments</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" size="sm" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
          Mark All as Read
        </Button>
        <Button variant="outline" size="sm" onClick={handleClearAll} disabled={notificationsList.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} {activeTab === "all" ? "total" : activeTab} notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {activeTab === "all"
                    ? "You don't have any notifications at the moment."
                    : `You don't have any ${activeTab} notifications.`}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start space-x-4 p-3 rounded-md cursor-pointer transition-colors ${
                    notification.status === "unread" ? "bg-muted/50" : ""
                  } hover:bg-muted`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <div className="flex items-center">
                        {notification.status === "unread" && (
                          <Badge className="mr-2 bg-blue-500" variant="secondary">
                            New
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">SMS Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive important alerts via SMS</p>
              </div>
              <Switch />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              toast({
                title: "Preferences Saved",
                description: "Your notification preferences have been updated",
                duration: 3000,
              })
            }}
          >
            Save Preferences
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
