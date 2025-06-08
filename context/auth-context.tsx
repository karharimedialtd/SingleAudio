"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "artist" | "label"
  avatar?: string
  permissions: string[]
  twoFactorEnabled: boolean
  company?: string
  phone?: string
  createdAt: string
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string, twoFactorCode?: string) => Promise<boolean>
  logout: () => void
  requestAccess: (data: any) => Promise<boolean>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for existing session
    checkAuthStatus()
  }, [])

  // Update the checkAuthStatus function to handle client-side safely
  const checkAuthStatus = async () => {
    try {
      // Only run localStorage operations on the client
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Mock user data for frontend demo
          const mockUser: User = {
            id: "1",
            email: "user@example.com",
            name: "John Doe",
            role: "user",
            permissions: ["music.upload", "youtube.manage", "analytics.view"],
            twoFactorEnabled: false,
            company: "Independent Artist",
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          }
          setUser(mockUser)
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
      }
    } finally {
      setLoading(false)
    }
  }

  // Update the login function to handle client-side safely
  const login = async (email: string, password: string, twoFactorCode?: string): Promise<boolean> => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "1",
        email,
        name: "John Doe",
        role: "user",
        permissions: ["music.upload", "youtube.manage", "analytics.view"],
        twoFactorEnabled: false,
        company: "Independent Artist",
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", "mock_jwt_token")
      }
      setUser(mockUser)

      // Role-based redirect
      switch (mockUser.role) {
        case "admin":
          router.push("/admin/dashboard")
          break
        default:
          router.push("/dashboard")
      }

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update the logout function to handle client-side safely
  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
    setUser(null)
    router.push("/login")
  }

  const requestAccess = async (data: any): Promise<boolean> => {
    try {
      // Simulate API call to submit access request
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return true
    } catch (error) {
      console.error("Access request failed:", error)
      return false
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    requestAccess,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
