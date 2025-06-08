"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Check,
  Music,
  DollarSign,
  Users,
  TrendingUp,
  Mail,
  Smartphone,
  Settings,
  Archive,
  Trash2,
} from "lucide-react"

interface Notification {
  id: string
  type: "release" | "royalty" | "playlist" | "analytics" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "release",
    title: "Release Approved",
    message: "Your single 'Midnight Dreams' has been approved and is now live on all platforms!",
    timestamp: "2024-01-20T10:30:00Z",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/music/catalog",
  },
  {
    id: "2",
    type: "royalty",
    title: "New Royalty Report",
    message: "Your December 2023 royalty report is ready for download. Total earnings: $234.56",
    timestamp: "2024-01-19T14:15:00Z",
    read: false,
    priority: "medium",
    actionUrl: "/dashboard/reports",
  },
  {
    id: "3",
    type: "playlist",
    title: "Playlist Acceptance",
    message: "Your track has been accepted to 'Indie Electronic Vibes' playlist with 125K followers!",
    timestamp: "2024-01-18T09:45:00Z",
    read: true,
    priority: "high",
    actionUrl: "/dashboard/tools/pitching",
  },
  {
    id: "4",
    type: "analytics",
    title: "Milestone Reached",
    message: "Congratulations! You've reached 100K total streams across all platforms.",
    timestamp: "2024-01-17T16:20:00Z",
    read: true,
    priority: "medium",
    actionUrl: "/dashboard/analytics",
  },
  {
    id: "5",
    type: "system",
    title: "Account Security",
    message: "New login detected from Los Angeles, CA. If this wasn't you, please secure your account.",
    timestamp: "2024-01-16T11:30:00Z",
    read: false,
    priority: "high",
    actionUrl: "/dashboard/settings",
  },
]

export default function NotificationsPage() {
  const { setCurrentPage } = useDashboard()
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      releases: true,
      royalties: true,
      playlists: true,
      analytics: false,
      system: true,
    },
    push: {
      releases: true,
      royalties: false,
      playlists: true,
      analytics: false,
      system: true,
    },
  })

  useEffect(() => {
    setCurrentPage("Notifications")
  }, [setCurrentPage])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
    alert("All notifications marked as read!")
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionUrl) {
      // Mark as read when clicking action
      markAsRead(notification.id)
      // Navigate to the action URL
      window.location.href = notification.actionUrl
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "release":
        return <Music className="h-5 w-5 text-blue-400" />
      case "royalty":
        return <DollarSign className="h-5 w-5 text-green-400" />
      case "playlist":
        return <Users className="h-5 w-5 text-purple-400" />
      case "analytics":
        return <TrendingUp className="h-5 w-5 text-yellow-400" />
      case "system":
        return <Settings className="h-5 w-5 text-red-400" />
      default:
        return <Bell className="h-5 w-5 text-gray-400" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "bg-red-600/20 text-red-400 border-red-600/30",
      medium: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      low: "bg-gray-600/20 text-gray-400 border-gray-600/30",
    }

    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    )
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return date.toLocaleDateString()
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notifications</h1>
          <p className="text-gray-400">Stay updated with your music distribution activities</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-white/20 text-gray-300 hover:text-white"
          >
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => {
              // Navigate to notification settings or scroll to settings tab
              const settingsTab = document.querySelector('[value="settings"]') as HTMLElement
              if (settingsTab) {
                settingsTab.click()
              }
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Notifications</p>
                <p className="text-2xl font-bold text-white">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Unread</p>
                <p className="text-2xl font-bold text-white">{unreadCount}</p>
              </div>
              <Mail className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">High Priority</p>
                <p className="text-2xl font-bold text-white">{highPriorityCount}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">
                  {
                    notifications.filter((n) => {
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return new Date(n.timestamp) > weekAgo
                    }).length
                  }
                </p>
              </div>
              <Archive className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="all" className="text-gray-300 data-[state=active]:text-white">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread" className="text-gray-300 data-[state=active]:text-white">
            Unread ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="high" className="text-gray-300 data-[state=active]:text-white">
            High Priority ({highPriorityCount})
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-gray-300 data-[state=active]:text-white">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">All Notifications</CardTitle>
              <CardDescription className="text-gray-400">Your complete notification history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`bg-white/5 border-white/10 ${!notification.read ? "ring-1 ring-purple-500/30" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-white font-semibold">{notification.title}</h3>
                                {!notification.read && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                              </div>
                              <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                              <div className="flex items-center space-x-3 text-xs text-gray-400">
                                <span>{formatTimestamp(notification.timestamp)}</span>
                                <span className="capitalize">{notification.type}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">{getPriorityBadge(notification.priority)}</div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center space-x-2">
                              {notification.actionUrl && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-purple-400 hover:text-purple-300"
                                  onClick={() => handleNotificationAction(notification)}
                                >
                                  View Details
                                </Button>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="text-gray-400 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {notifications.length === 0 && (
                <div className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Unread Notifications</CardTitle>
              <CardDescription className="text-gray-400">Notifications that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <Card key={notification.id} className="bg-white/5 border-white/10 ring-1 ring-purple-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-white font-semibold">{notification.title}</h3>
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                  <span>{formatTimestamp(notification.timestamp)}</span>
                                  <span className="capitalize">{notification.type}</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2">
                                {notification.actionUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-purple-400 hover:text-purple-300"
                                    onClick={() => handleNotificationAction(notification)}
                                  >
                                    View Details
                                  </Button>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {notifications.filter((n) => !n.read).length === 0 && (
                <div className="text-center py-12">
                  <Check className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400">All caught up! No unread notifications.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="high" className="space-y-4">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">High Priority Notifications</CardTitle>
              <CardDescription className="text-gray-400">
                Important notifications requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications
                  .filter((n) => n.priority === "high" && !n.read)
                  .map((notification) => (
                    <Card key={notification.id} className="bg-white/5 border-white/10 ring-1 ring-red-500/30">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h3 className="text-white font-semibold">{notification.title}</h3>
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                                <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                  <span>{formatTimestamp(notification.timestamp)}</span>
                                  <span className="capitalize">{notification.type}</span>
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                {getPriorityBadge(notification.priority)}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2">
                                {notification.actionUrl && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300"
                                    onClick={() => handleNotificationAction(notification)}
                                  >
                                    Take Action
                                  </Button>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-gray-400 hover:text-white"
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>

              {notifications.filter((n) => n.priority === "high" && !n.read).length === 0 && (
                <div className="text-center py-12">
                  <Check className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <p className="text-gray-400">No high priority notifications at the moment.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Email Notifications</CardTitle>
              <CardDescription className="text-gray-400">
                Choose which notifications you want to receive via email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: "releases",
                  label: "Release Updates",
                  description: "Get notified when your releases go live or need attention",
                },
                {
                  key: "royalties",
                  label: "Royalty Reports",
                  description: "Receive notifications about new royalty reports and payments",
                },
                {
                  key: "playlists",
                  label: "Playlist Submissions",
                  description: "Updates on playlist submission status and acceptances",
                },
                {
                  key: "analytics",
                  label: "Analytics Insights",
                  description: "Weekly summaries and milestone achievements",
                },
                { key: "system", label: "System Notifications", description: "Important account and security updates" },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{setting.label}</p>
                      <p className="text-gray-400 text-sm">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.email[setting.key as keyof typeof notificationSettings.email]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        email: { ...notificationSettings.email, [setting.key]: checked },
                      })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Push Notifications</CardTitle>
              <CardDescription className="text-gray-400">Manage browser push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: "releases",
                  label: "Release Updates",
                  description: "Instant notifications for release status changes",
                },
                {
                  key: "royalties",
                  label: "Royalty Reports",
                  description: "Get notified immediately when reports are available",
                },
                {
                  key: "playlists",
                  label: "Playlist Submissions",
                  description: "Real-time updates on playlist responses",
                },
                {
                  key: "analytics",
                  label: "Analytics Insights",
                  description: "Push notifications for important milestones",
                },
                { key: "system", label: "System Notifications", description: "Critical account and security alerts" },
              ].map((setting) => (
                <div key={setting.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-white font-medium">{setting.label}</p>
                      <p className="text-gray-400 text-sm">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.push[setting.key as keyof typeof notificationSettings.push]}
                    onCheckedChange={(checked) =>
                      setNotificationSettings({
                        ...notificationSettings,
                        push: { ...notificationSettings.push, [setting.key]: checked },
                      })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
