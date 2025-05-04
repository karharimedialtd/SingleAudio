"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileVideo,
  Music2,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ChevronRight,
  Bell,
  Zap,
  Globe,
} from "lucide-react"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { toast } from "@/components/ui/use-toast"

// Sample data for charts
const activityData = [
  { date: "May 1", users: 2400, videos: 1800, music: 1200, revenue: 9800 },
  { date: "May 2", users: 1398, videos: 1600, music: 1100, revenue: 8200 },
  { date: "May 3", users: 9800, videos: 2200, music: 1700, revenue: 12000 },
  { date: "May 4", users: 3908, videos: 2000, music: 1500, revenue: 10000 },
  { date: "May 5", users: 4800, videos: 2400, music: 1800, revenue: 14000 },
  { date: "May 6", users: 3800, videos: 2100, music: 1600, revenue: 11000 },
  { date: "May 7", users: 4300, videos: 2300, music: 1900, revenue: 13500 },
]

// Sample data for system status
const systemStatus = [
  { name: "API Gateway", status: "operational", uptime: "99.99%" },
  { name: "Content Delivery", status: "operational", uptime: "99.95%" },
  { name: "Authentication", status: "operational", uptime: "100%" },
  { name: "Database Cluster", status: "operational", uptime: "99.98%" },
  { name: "Storage", status: "operational", uptime: "99.99%" },
  { name: "Analytics Engine", status: "degraded", uptime: "98.75%" },
]

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    action: "User Suspension",
    description: "Creator account suspended due to policy violation",
    time: "5 minutes ago",
    status: "critical",
    link: "/admin/users",
  },
  {
    id: 2,
    action: "Content ID Claim",
    description: "New content ID claim resolved automatically",
    time: "15 minutes ago",
    status: "success",
    link: "/admin/claims",
  },
  {
    id: 3,
    action: "Payout Processed",
    description: "Monthly royalty payout completed for 230 artists",
    time: "1 hour ago",
    status: "success",
    link: "/admin/royalties",
  },
  {
    id: 4,
    action: "API Rate Limit",
    description: "Rate limit exceeded for partner integration",
    time: "2 hours ago",
    status: "warning",
    link: "/admin/integrations",
  },
  {
    id: 5,
    action: "New Release",
    description: "Album 'Midnight Dreams' published to all platforms",
    time: "3 hours ago",
    status: "success",
    link: "/admin/content",
  },
]

// Sample data for background jobs
const backgroundJobs = [
  { id: 1, name: "Video Transcoding", status: "running", progress: 68, count: 142 },
  { id: 2, name: "Audio Fingerprinting", status: "running", progress: 89, count: 76 },
  { id: 3, name: "Content ID Matching", status: "running", progress: 45, count: 213 },
  { id: 4, name: "DDEX Feed Processing", status: "completed", progress: 100, count: 58 },
  { id: 5, name: "Analytics Aggregation", status: "queued", progress: 0, count: 1 },
]

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [jobProgress, setJobProgress] = useState(backgroundJobs)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Simulate job progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setJobProgress((prev) =>
        prev.map((job) => {
          if (job.status === "running" && job.progress < 100) {
            return { ...job, progress: Math.min(job.progress + 1, 100) }
          }
          return job
        }),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 5 unread notifications",
      duration: 3000,
    })
    // Navigate to a notifications page or open a notifications panel
    router.push("/admin/notifications")
  }

  const handleSystemStatusClick = () => {
    setActiveTab("system")
    toast({
      title: "System Status",
      description: "Viewing system status",
      duration: 2000,
    })
  }

  const handleViewAllActivities = () => {
    // Navigate to the activities page
    router.push("/admin/activities")
  }

  const handleViewStatusPage = () => {
    // Navigate to the status page
    router.push("/admin/system-status")
  }

  const handleViewAllAlerts = () => {
    // Navigate to the alerts page
    router.push("/admin/alerts")
  }

  const handleViewAdminLogs = () => {
    // Navigate to the admin logs page
    router.push("/admin/logs")
  }

  const handleActivityClick = (activity) => {
    // Navigate to the specific activity page
    router.push(activity.link)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Comprehensive overview of platform performance and system status
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8" onClick={handleNotificationClick}>
            <Bell className="mr-2 h-4 w-4" />
            Notifications
            <Badge className="ml-2 bg-purple-600" variant="secondary">
              5
            </Badge>
          </Button>
          <Button size="sm" className="h-8 bg-purple-600 hover:bg-purple-700" onClick={handleSystemStatusClick}>
            <Zap className="mr-2 h-4 w-4" />
            System Status
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/users")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142,897</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +2.5%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Content</CardTitle>
            <FileVideo className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87,432</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +4.3%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/content?type=music")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Music Releases</CardTitle>
            <Music2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,853</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +12.2%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => router.push("/admin/royalties")}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.45M</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                -0.8%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Platform Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
                <CardDescription>Daily platform metrics for the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    users: {
                      label: "Users",
                      color: "hsl(var(--chart-1))",
                    },
                    videos: {
                      label: "Videos",
                      color: "hsl(var(--chart-2))",
                    },
                    music: {
                      label: "Music",
                      color: "hsl(var(--chart-3))",
                    },
                    revenue: {
                      label: "Revenue ($)",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="users" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="videos" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="music" strokeWidth={2} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="revenue" strokeWidth={2} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <div className="grid gap-4 lg:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Background Jobs</CardTitle>
                  <CardDescription>Current processing status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {jobProgress.map((job) => (
                      <div key={job.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium">{job.name}</div>
                          <div className="text-xs text-muted-foreground">{job.count} items</div>
                        </div>
                        <Progress value={job.progress} className="h-1" />
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">{job.progress}% complete</div>
                          <div className="text-xs">
                            {job.status === "running" && <span className="text-blue-500">Running</span>}
                            {job.status === "completed" && <span className="text-green-500">Completed</span>}
                            {job.status === "queued" && <span className="text-yellow-500">Queued</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Global Distribution</CardTitle>
                  <CardDescription>Active users by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <span className="text-sm">North America</span>
                      </div>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-sm">Europe</span>
                      </div>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-sm">Asia Pacific</span>
                      </div>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                        <span className="text-sm">Latin America</span>
                      </div>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-sm">Other Regions</span>
                      </div>
                      <span className="text-sm font-medium">4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest actions across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="mt-0.5">
                      {activity.status === "critical" && <AlertCircle className="h-5 w-5 text-red-500" />}
                      {activity.status === "warning" && <Clock className="h-5 w-5 text-yellow-500" />}
                      {activity.status === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={handleViewAllActivities}>
                View All Activities
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current operational status of all services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemStatus.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {service.status === "operational" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : service.status === "degraded" ? (
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{service.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.status === "operational"
                            ? "Fully operational"
                            : service.status === "degraded"
                              ? "Performance degraded"
                              : "Service disruption"}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">{service.uptime} uptime</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={handleViewStatusPage}>
                <Globe className="mr-2 h-4 w-4" />
                View Status Page
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used admin tools</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Link href="/admin/users" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">User Management</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="/admin/claims" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Content Claims</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="/admin/royalties" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Royalty Management</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
            <Link href="/admin/ai-panel" className="flex items-center justify-between p-2 hover:bg-muted rounded-md">
              <div className="flex items-center">
                <Zap className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">AI Panel</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="flex items-start space-x-4 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => router.push("/admin/integrations")}
              >
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">API Rate Limit Exceeded</p>
                  <p className="text-xs text-muted-foreground">Partner integration exceeding quota by 250%</p>
                  <div className="flex items-center pt-1">
                    <Badge variant="outline" className="text-xs mr-2">
                      High Priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">10 minutes ago</span>
                  </div>
                </div>
              </div>
              <div
                className="flex items-start space-x-4 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => router.push("/admin/royalties")}
              >
                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Failed Royalty Payments</p>
                  <p className="text-xs text-muted-foreground">12 payments failed due to invalid banking details</p>
                  <div className="flex items-center pt-1">
                    <Badge variant="outline" className="text-xs mr-2">
                      High Priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">35 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={handleViewAllAlerts}>
              View All Alerts
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Activity</CardTitle>
            <CardDescription>Recent actions by admin users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => router.push("/admin/users")}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">User Suspension</p>
                  <span className="text-xs text-muted-foreground">15m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Admin: Sarah Johnson</p>
                <p className="text-xs">Suspended user ID #45928 for policy violation</p>
              </div>
              <div
                className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => router.push("/admin/content")}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Content Takedown</p>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Admin: Michael Chen</p>
                <p className="text-xs">Removed content ID #VID-8842 for copyright infringement</p>
              </div>
              <div
                className="space-y-1 cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                onClick={() => router.push("/admin/users")}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Role Assignment</p>
                  <span className="text-xs text-muted-foreground">3h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">Admin: Alex Rodriguez</p>
                <p className="text-xs">Granted support agent role to user ID #78341</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" onClick={handleViewAdminLogs}>
              View Admin Logs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
