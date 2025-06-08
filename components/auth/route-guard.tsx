"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { LoadingSpinner } from "@/components/shared/loading-spinner"

interface RouteGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  allowedRoles?: string[]
}

export function RouteGuard({ children, requireAuth = true, allowedRoles }: RouteGuardProps) {
  const { user, loading, isAuthenticated } = useAuth()
  const router = useRouter()

  // Update the useEffect to handle client-side safely
  useEffect(() => {
    // Only run auth checks after hydration
    if (typeof window !== "undefined" && !loading) {
      if (requireAuth && !isAuthenticated) {
        router.push("/login")
        return
      }

      if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [loading, isAuthenticated, user, requireAuth, allowedRoles, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    )
  }

  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}
