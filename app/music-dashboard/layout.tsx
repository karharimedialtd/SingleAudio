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
  FileMusic,
  Gauge,
  Globe,
  LogOut,
  Menu,
  PanelLeft,
  PieChart,
  Search,
  Settings,
  Upload,
  Users,
  Music2,
  Zap,
  LineChart,
  Lightbulb,
  DollarSign,
  Share2,
  Disc,
  Radio,
  Headphones,
  MessageSquare,
} from "lucide-react"
import { useState, Suspense } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ActionButton } from "@/components/action-button"
import { DashboardSwitcher } from "@/components/dashboard-switcher"

export default function MusicDashboardLayout({ children }: { children: React.ReactNode }) {
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
            <Music2 className="h-5 w-5 text-purple-500" />
            <span className="text-base font-semibold">SingleAudio Music</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <PanelLeft className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto py-1">
          <Accordion type="multiple" defaultValue={["catalog", "distribution", "analytics", "monetization"]}>
            {/* Main Navigation */}
            <div className="px-2 py-1">
              <Link href="/music-dashboard" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/music-dashboard") && pathname === "/music-dashboard"
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

            {/* Catalog Section */}
            <AccordionItem value="catalog" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Catalog
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/music-dashboard/releases" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/releases")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Disc className="mr-2 h-4 w-4" />
                        Releases
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/tracks" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/tracks")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <FileMusic className="mr-2 h-4 w-4" />
                        Tracks
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/artists" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/artists")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Users className="mr-2 h-4 w-4" />
                        Artists
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Distribution Section */}
            <AccordionItem value="distribution" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Distribution
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/music-dashboard/platforms" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/platforms")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Globe className="mr-2 h-4 w-4" />
                        Platforms
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/delivery" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/delivery")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Zap className="mr-2 h-4 w-4" />
                        Delivery Status
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/social" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/social")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Share2 className="mr-2 h-4 w-4" />
                        Social Media
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Analytics Section */}
            <AccordionItem value="analytics" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Analytics
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/music-dashboard/analytics" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/analytics")
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

                  <Link href="/music-dashboard/audience" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/audience")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Headphones className="mr-2 h-4 w-4" />
                        Listeners
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/usage" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/usage")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <Radio className="mr-2 h-4 w-4" />
                        Music Usage
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Monetization Section */}
            <AccordionItem value="monetization" className="border-b-0">
              <AccordionTrigger className="py-1 px-2 text-xs font-medium uppercase text-gray-400 hover:no-underline">
                Monetization
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="grid gap-0.5 px-1">
                  <Link href="/music-dashboard/royalties" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/royalties")
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

                  <Link href="/music-dashboard/splits" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/splits")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <PieChart className="mr-2 h-4 w-4" />
                        Splits
                      </a>
                    </Button>
                  </Link>

                  <Link href="/music-dashboard/statements" passHref legacyBehavior>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start ${
                        isActive("/music-dashboard/statements")
                          ? "bg-gray-800 text-gray-100"
                          : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                      }`}
                      asChild
                    >
                      <a>
                        <LineChart className="mr-2 h-4 w-4" />
                        Statements
                      </a>
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tools */}
            <div className="px-2 py-1">
              <Link href="/music-dashboard/ai-tools" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/music-dashboard/ai-tools")
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
            </div>

            {/* Support */}
            <div className="px-2 py-1">
              <Link href="/music-dashboard/support" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/music-dashboard/support")
                      ? "bg-gray-800 text-gray-100"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-100"
                  }`}
                  asChild
                >
                  <a>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Support
                  </a>
                </Button>
              </Link>
            </div>

            {/* Settings */}
            <div className="px-2 py-1">
              <Link href="/music-dashboard/settings" passHref legacyBehavior>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`w-full justify-start ${
                    isActive("/music-dashboard/settings")
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
            href="/music-dashboard/upload"
          >
            Upload Music
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
                  <Link href="/music-dashboard/settings" className="flex w-full items-center">
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
