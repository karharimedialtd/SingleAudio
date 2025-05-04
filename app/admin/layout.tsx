"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  AlertCircle,
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  Settings,
  Users,
  Zap,
  DollarSign,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  variant: "default" | "ghost"
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      href: "/admin",
      variant: pathname === "/admin" ? "default" : "ghost",
    },
    {
      title: "Users",
      icon: <Users className="mr-2 h-4 w-4" />,
      href: "/admin/users",
      variant: pathname === "/admin/users" ? "default" : "ghost",
    },
    {
      title: "Claims & Strikes",
      icon: <AlertCircle className="mr-2 h-4 w-4" />,
      href: "/admin/claims",
      variant: pathname === "/admin/claims" ? "default" : "ghost",
    },
    {
      title: "AI Panel",
      icon: <Lightbulb className="mr-2 h-4 w-4" />,
      href: "/admin/ai-panel",
      variant: pathname === "/admin/ai-panel" ? "default" : "ghost",
    },
    {
      title: "Platform Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
      href: "/admin/platform-settings",
      variant: pathname === "/admin/platform-settings" ? "default" : "ghost",
    },
    {
      title: "Analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
      href: "/admin/analytics",
      variant: pathname === "/admin/analytics" ? "default" : "ghost",
    },
    {
      title: "Royalties",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
      href: "/admin/royalties",
      variant: pathname === "/admin/royalties" ? "default" : "ghost",
    },
    {
      title: "Content Management",
      icon: <FileText className="mr-2 h-4 w-4" />,
      href: "/admin/content",
      variant: pathname === "/admin/content" ? "default" : "ghost",
    },
    {
      title: "API & Integrations",
      icon: <Zap className="mr-2 h-4 w-4" />,
      href: "/admin/integrations",
      variant: pathname === "/admin/integrations" ? "default" : "ghost",
    },
    {
      title: "Security",
      icon: <Shield className="mr-2 h-4 w-4" />,
      href: "/admin/security",
      variant: pathname === "/admin/security" ? "default" : "ghost",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center gap-2 pb-4 pt-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/abstract-wave-logo.png" alt="SingleAudio" />
                    <AvatarFallback>SA</AvatarFallback>
                  </Avatar>
                  <span className="text-lg font-semibold">SingleAudio Admin</span>
                </div>
                <ScrollArea className="h-[calc(100vh-8rem)]">
                  <div className="flex flex-col gap-2 py-2">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                          route.variant === "default"
                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                            : "hover:bg-muted",
                        )}
                      >
                        {route.icon}
                        {route.title}
                      </Link>
                    ))}
                  </div>
                </ScrollArea>
              </SheetContent>
            </Sheet>
            <Link href="/admin" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-wave-logo.png" alt="SingleAudio" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <span className="text-lg font-semibold hidden md:inline-block">SingleAudio Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Home className="mr-2 h-4 w-4" />
                Back to App
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="icon" className="rounded-full">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Log out</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-2 p-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    route.variant === "default"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:bg-muted",
                  )}
                >
                  {route.icon}
                  {route.title}
                </Link>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
