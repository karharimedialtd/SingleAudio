"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action?: () => Promise<any> | void
  actionName?: string
  loadingText?: string
  successMessage?: string
  errorMessage?: string
  icon?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  href?: string
  onSuccess?: (result: any) => void
  onError?: (error: any) => void
}

export function ActionButton({
  action,
  actionName = "Action",
  loadingText = "Loading...",
  successMessage,
  errorMessage,
  icon,
  children,
  variant = "default",
  size = "default",
  href,
  onSuccess,
  onError,
  ...props
}: ActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    // If href is provided, navigate to that path
    if (href) {
      router.push(href)
      return
    }

    // If no action is provided, show a toast message
    if (!action) {
      toast({
        title: actionName,
        description: "This button would perform an action in a production environment",
        duration: 3000,
      })
      return
    }

    // Execute the action with loading state
    setIsLoading(true)
    try {
      const result = await action()

      toast({
        title: "Success",
        description: successMessage || `${actionName} completed successfully`,
        duration: 3000,
      })

      if (onSuccess) {
        onSuccess(result)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: errorMessage || `${actionName} failed`,
        variant: "destructive",
        duration: 3000,
      })

      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant={variant} size={size} onClick={handleClick} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  )
}
