"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Music2, Video } from "lucide-react"

export function DashboardSwitcher() {
  const router = useRouter()
  const [activeDashboard, setActiveDashboard] = useState<"cms" | "music">("cms")

  const handleDashboardChange = (dashboard: "cms" | "music") => {
    setActiveDashboard(dashboard)
    if (dashboard === "cms") {
      router.push("/dashboard")
    } else {
      router.push("/music-dashboard")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700">
          {activeDashboard === "cms" ? <Video className="h-4 w-4" /> : <Music2 className="h-4 w-4" />}
          {activeDashboard === "cms" ? "CMS Dashboard" : "Music Dashboard"}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          className={activeDashboard === "cms" ? "bg-gray-800" : ""}
          onClick={() => handleDashboardChange("cms")}
        >
          <Video className="mr-2 h-4 w-4" />
          <span>CMS Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={activeDashboard === "music" ? "bg-gray-800" : ""}
          onClick={() => handleDashboardChange("music")}
        >
          <Music2 className="mr-2 h-4 w-4" />
          <span>Music Dashboard</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
