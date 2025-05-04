"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  BarChart3,
  Bell,
  ChevronDown,
  Compass,
  FileVideo,
  Gauge,
  List,
  LogOut,
  Menu,
  PanelLeft,
  PieChart,
  Search,
  Settings,
  Upload,
  Users,
  Youtube,
  Zap,
  CheckSquare,
  Calendar,
  ImageIcon,
  LineChart,
  Lightbulb,
  AlertCircle,
  DollarSign,
} from "lucide-react"
import { useState, Suspense } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ActionButton } from "@/components/action-button"
import { DashboardSwitcher } from "@/components/dashboard-switcher"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-gray-900 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 overflow-hidden`}
      >
        <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4">
          <div className="flex items-center gap-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <span className="text-base font-semibold">SingleAudio</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-1">
          <Accordion type="multiple" defaultValue={["analytics", "content", "tools"]}>
            {/* Main Navigation */}
            <div className="px-2 py-1">
              <Link href="/dashboard" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/dashboard") && pathname === "/dashboard"
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  }`}
                  asChild
                >
                  <a>
                    <Gauge className="mr-2 h-4 w-4" />
                    Dashboard
                  </a>
                </Button>
              </Link>
            </div>

            {/* Analytics Section */}
            <AccordionItem value="analytics" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Analytics
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/dashboard/analytics" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/analytics")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Overview
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/audience" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/audience")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Users className="mr-2 h-4 w-4" />
                        Audience
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/traffic" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/traffic")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <PieChart className="mr-2 h-4 w-4" />
                        Traffic
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/comparison" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/comparison")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <LineChart className="mr-2 h-4 w-4" />
                        Comparison
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/royalties" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/royalties")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <DollarSign className="mr-2 h-4 w-4" />
                        Royalties
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Content Section */}
            <AccordionItem value="content" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Content
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/dashboard/videos" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/videos")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <FileVideo className="mr-2 h-4 w-4" />
                        Videos
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/playlists" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/playlists")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <List className="mr-2 h-4 w-4" />
                        Playlists
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/livestreams" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/livestreams")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Zap className="mr-2 h-4 w-4" />
                        Livestreams
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/content-id" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/content-id")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Content ID
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tools Section */}
            <AccordionItem value="tools" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Tools
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/dashboard/ai-tools" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/ai-tools")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Lightbulb className="mr-2 h-4 w-4" />
                        AI Tools
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/thumbnails" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/thumbnails")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Thumbnails
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/seo" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/seo")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Compass className="mr-2 h-4 w-4" />
                        SEO
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/scheduler" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/scheduler")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Calendar className="mr-2 h-4 w-4" />
                        Scheduler
                      </a>
                    </Button>
                  </Link>

                  <Link href="/dashboard/checklist" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/dashboard/checklist")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Checklist
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Settings */}
            <div className="px-2 py-1">
              <Link href="/dashboard/settings" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/dashboard/settings")
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  }`}
                  asChild
                >
                  <a>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </a>
                </Button>
              </Link>
            </div>
          </Accordion>
        </div>

        <div className="border-t border-gray-800 p-3">
          <ActionButton
            className="w-full bg-purple-600 hover:bg-purple-700 h-9 py-1"
            icon={<Upload className="h-4 w-4" />}
            href="/dashboard/upload"
          >
            Upload
          </ActionButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-gray-800 bg-gray-900 px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open sidebar</span>
            </Button>
            <div className="relative md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="h-8 w-full bg-gray-800 pl-8 text-sm placeholder:text-gray-500 focus-visible:ring-purple-600"
              />
            </div>
            <div className="ml-2">
              <DashboardSwitcher />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-8 items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/abstract-profile.png" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="hidden text-left md:block">
                    <div className="text-xs font-medium">John Doe</div>
                    <div className="text-xs text-gray-500">john@singleaudio.com</div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex w-full items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
