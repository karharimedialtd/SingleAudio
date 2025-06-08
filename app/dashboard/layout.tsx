"use client"

import type React from "react"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { RouteGuard } from "@/components/auth/route-guard"
import { useEffect, useState } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add client-side hydration safety
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return null
  }

  return (
    <RouteGuard requireAuth={true}>
      <div className="dark">
        <DashboardShell>{children}</DashboardShell>
      </div>
    </RouteGuard>
  )
}
