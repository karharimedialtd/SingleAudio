"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useDashboard } from "@/context/dashboard-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Plus,
  Upload,
  Music,
  Youtube,
  Brain,
  HelpCircle,
  Moon,
  Sun,
  Command,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function Header() {
  const { user, logout } = useAuth()
  const { notifications, currentPage } = useDashboard()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDark, setIsDark] = useState(true)
  const pathname = usePathname()

  const unreadNotifications = notifications.filter((n) => !n.read).length

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = []

    for (let i = 0; i < paths.length; i++) {
      const path = "/" + paths.slice(0, i + 1).join("/")
      const name = paths[i]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      breadcrumbs.push({
        name,
        path,
        isLast: i === paths.length - 1,
      })
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  const quickActions = [
    { name: "New Release", icon: Music, href: "/dashboard/music/release" },
    { name: "Bulk Upload", icon: Upload, href: "/dashboard/music/bulk-upload" },
    { name: "AI Tools", icon: Brain, href: "/dashboard/ai-tools" },
    { name: "YouTube Upload", icon: Youtube, href: "/dashboard/youtube/upload" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left Section - Breadcrumbs */}
        <div className="flex items-center space-x-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbs.slice(1).map((breadcrumb, index) => (
                <div key={breadcrumb.path} className="flex items-center">
                  <BreadcrumbSeparator className="text-gray-600" />
                  <BreadcrumbItem>
                    {breadcrumb.isLast ? (
                      <BreadcrumbPage className="text-white font-medium">{breadcrumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={breadcrumb.path} className="text-gray-400 hover:text-white">
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search releases, artists, or commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-20 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-purple-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <kbd className="text-xs text-gray-400 bg-white/10 px-1.5 py-0.5 rounded">
                <Command className="h-3 w-3" />
              </kbd>
              <kbd className="text-xs text-gray-400 bg-white/10 px-1.5 py-0.5 rounded">K</kbd>
            </div>
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-purple-600 border-purple-600 text-white hover:bg-purple-700 hover:border-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 w-48">
              <DropdownMenuLabel className="text-gray-300">Quick Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {quickActions.map((action) => (
                <DropdownMenuItem
                  key={action.href}
                  asChild
                  className="text-gray-300 hover:text-white hover:bg-gray-800"
                >
                  <Link href={action.href} className="flex items-center">
                    <action.icon className="h-4 w-4 mr-2" />
                    {action.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="text-gray-300 hover:text-white hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Help */}
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
            <HelpCircle className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-gray-300 hover:text-white hover:bg-white/10">
                <Bell className="h-4 w-4" />
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-600 text-white text-xs flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 w-80">
              <DropdownMenuLabel className="text-gray-300">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 p-3"
                  >
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <p className="text-xs text-gray-400">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <DropdownMenuItem className="text-gray-400 text-center py-4">No new notifications</DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="/dashboard/notifications">View all notifications</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback className="bg-purple-600 text-white">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700 w-56">
              <DropdownMenuLabel className="text-gray-300">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-white">{user?.name || "Demo User"}</p>
                  <p className="text-xs text-gray-400">{user?.email || "demo@example.com"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="/dashboard/profile">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Link href="/dashboard/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                onClick={logout}
                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
