// lib/auth.ts

import { postData } from "./api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-vkbo.onrender.com/api" // ✅ Live API URL

// 🔐 Login user (calls /auth/login)
export const loginUser = async (
  email: string,
  password: string,
  twoFactorCode?: string
): Promise<{ token?: string; error?: string }> => {
  try {
    const res = await postData("/auth/login", {
      email,
      password,
      twoFactorCode,
    })

    if (!res.success || !res.data?.token) {
      return { error: "Invalid login credentials" }
    }

    return { token: res.data.token }
  } catch (error: any) {
    return { error: error.message || "Login failed" }
  }
}

// 🔓 Logout user (clears local token)
export const logoutUser = async (): Promise<void> => {
  localStorage.removeItem("auth_token") // ✅ Match `auth-context.tsx` token key
}

// 💾 Store token locally
export const storeToken = (token: string) => {
  localStorage.setItem("auth_token", token) // ✅ Match `auth-context.tsx` key
}

// 🔐 Get stored token
export const getStoredToken = (): string | null => {
  return localStorage.getItem("auth_token")
}
