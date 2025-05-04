"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, RefreshCw } from "lucide-react"
import { refreshData } from "@/lib/button-actions"

interface RefreshButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dataType: string
  onRefresh?: () => Promise<any>
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  showLabel?: boolean
}

export function RefreshButton({
  dataType,
  onRefresh,
  variant = "outline",
  size = "default",
  showLabel = true,
  className,
  ...props
}: RefreshButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      await refreshData(dataType, onRefresh)
    } catch (error) {
      console.error("Refresh error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRefresh}
      disabled={isLoading}
      className={`bg-gray-800 border-gray-700 hover:bg-gray-700 ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <RefreshCw className={`h-4 w-4 ${showLabel ? "mr-2" : ""}`} />
      )}
      {showLabel && "Refresh Data"}
    </Button>
  )
}
