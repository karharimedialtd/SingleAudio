"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useDashboard } from "@/context/dashboard-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Palette,
  Music,
  Upload,
  LayoutDashboard,
  ListMusic,
  Youtube,
  Brain,
  BarChart3,
  DollarSign,
  Users,
  Globe,
  Video,
  Shield,
  TrendingUp,
  FileText,
  Bell,
  User,
  Headphones,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
}

const mainItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Music Release",
    href: "/dashboard/music/release",
    icon: Music,
  },
  {
    title: "Music Catalog",
    href: "/dashboard/music/catalog",
    icon: ListMusic,
  },
  {
    title: "DSP Selection",
    href: "/dashboard/music/dsps",
    icon: Globe,
  },
]

const analyticsItems: NavItem[] = [
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: "2",
  },
  {
    title: "Royalty Dashboard",
    href: "/dashboard/royalties",
    icon: DollarSign,
  },
  {
    title: "Revenue Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
]

const youtubeItems: NavItem[] = [
  {
    title: "Channel Manager",
    href: "/dashboard/channel-manager",
    icon: Youtube,
  },
  {
    title: "Video Manager",
    href: "/dashboard/youtube/videos",
    icon: Video,
  },
  {
    title: "YouTube Upload",
    href: "/dashboard/youtube/upload",
    icon: Upload,
  },
  {
    title: "Content ID Claims",
    href: "/dashboard/youtube/claims",
    icon: Shield,
  },
  {
    title: "YouTube Analytics",
    href: "/dashboard/youtube/analytics",
    icon: TrendingUp,
  },
]

const toolsItems: NavItem[] = [
  {
    title: "Bulk Upload",
    href: "/dashboard/music/bulk-upload",
    icon: Upload,
  },
  {
    title: "AI Tools",
    href: "/dashboard/ai-tools",
    icon: Brain,
  },
  {
    title: "Playlist Pitching",
    href: "/dashboard/tools/pitching",
    icon: Headphones,
  },
  {
    title: "Social Media",
    href: "/dashboard/tools/social",
    icon: Share2,
  },
]

const accountItems: NavItem[] = [
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Team",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Appearance",
    href: "/dashboard/appearance",
    icon: Palette,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()
  const { sidebarOpen } = useDashboard()
  const [isPublic, setIsPublic] = useState(true)

  const NavItemComponent = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href

    return (
      <Link href={item.href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-left font-normal h-10 px-3 text-gray-300 hover:text-white hover:bg-white/10",
            isActive && "bg-white/10 text-white",
          )}
        >
          <item.icon className="mr-3 h-4 w-4" />
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto bg-purple-600 text-white text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <div className="flex h-full w-64 flex-col bg-black/40 backdrop-blur-xl border-r border-white/10">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <img
            src="/placeholder-logo.png"
            alt="Single Audio Logo"
            className="w-10 h-10 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-xl font-bold text-white">Single Audio</h1>
            <p className="text-xs text-gray-400">Music Distribution</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto">
        <div className="space-y-1 p-2">
          {/* Main Section */}
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-gray-400">MUSIC</h2>
          </div>
          {mainItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}

          {/* Analytics Section */}
          <div className="px-3 py-2 mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-gray-400">ANALYTICS</h2>
          </div>
          {analyticsItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}

          {/* YouTube Section */}
          <div className="px-3 py-2 mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-gray-400">YOUTUBE CMS</h2>
          </div>
          {youtubeItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}

          {/* Tools Section */}
          <div className="px-3 py-2 mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-gray-400">TOOLS</h2>
          </div>
          {toolsItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}

          {/* Account Section */}
          <div className="px-3 py-2 mt-6">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight uppercase text-gray-400">ACCOUNT</h2>
          </div>
          {accountItems.map((item) => (
            <NavItemComponent key={item.href} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isPublic ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsPublic(true)}
              className={cn(
                "text-xs",
                isPublic
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "text-gray-400 hover:text-white hover:bg-white/10",
              )}
            >
              Public
            </Button>
            <Button
              variant={!isPublic ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsPublic(false)}
              className={cn(
                "text-xs",
                !isPublic
                  ? "bg-white/10 text-white hover:bg-white/20"
                  : "text-gray-400 hover:text-white hover:bg-white/10",
              )}
            >
              Private
            </Button>
          </div>
          <span className="text-xs text-gray-400">You</span>
        </div>
      </div>
    </div>
  )
}
