// lib/auth.ts

import { postData } from "./api"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export const loginUser = async (
  email: string,
  password: string,
  twoFactorCode?: string
): Promise<{ token?: string; error?: string }> => {
  try {
    const res = await postData(`${API_BASE_URL}/auth/login`, {
      email,
      password,
      twoFactorCode,
    })

    return { token: res.token }
  } catch (error: any) {
    return { error: error.message || "Login failed" }
  }
}

export const logoutUser = async (): Promise<void> => {
  // You can add logout cleanup logic here (e.g., removing token from localStorage)
  localStorage.removeItem("authToken")
}

export const storeToken = (token: string) => {
  localStorage.setItem("authToken", token)
}

export const getStoredToken = (): string | null => {
  return localStorage.getItem("authToken")
}
