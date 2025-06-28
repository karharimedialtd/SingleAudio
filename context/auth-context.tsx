"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { post } from "@/lib/api"
import type { APIResponse, User } from "@/types"

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
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token")
        if (!token) return

        const res: APIResponse<{ user: User }> = await post("/auth/verify-token", { token })
        if (res.success && res.data?.user) {
          setUser(res.data.user)
        } else {
          localStorage.removeItem("auth_token")
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("auth_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string, twoFactorCode?: string): Promise<boolean> => {
    try {
      setLoading(true)

      const res: APIResponse<{ user: User; token: string }> = await post("/auth/login", {
        email,
        password,
        twoFactorCode,
      })

      if (!res.success || !res.data) return false

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", res.data.token)
      }

      setUser(res.data.user)

      switch (res.data.user.role) {
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

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
    setUser(null)
    router.push("/login")
  }

  const requestAccess = async (data: any): Promise<boolean> => {
    try {
      const res: APIResponse = await post("/auth/request-access", data)
      return res.success
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
