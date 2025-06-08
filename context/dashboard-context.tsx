"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: Date
}

interface DashboardContextType {
  currentPage: string
  setCurrentPage: (page: string) => void
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState("Dashboard")
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 most recent

    // Auto-remove after 5 seconds for success/info notifications
    if (notification.type === "success" || notification.type === "info") {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, 5000)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <DashboardContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        notifications,
        addNotification,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}
