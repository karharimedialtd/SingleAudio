import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount)
}

export function formatNumber(num: number) {
  return new Intl.NumberFormat("en-US").format(num)
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date))
}

export function formatDateTime(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

// Frontend-only validation helpers
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 8
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
  return allowedTypes.includes(fileExtension)
}

export function validateFileSize(file: File, maxSize: number): boolean {
  return file.size <= maxSize
}

// Mock data generators for frontend demo
export function generateMockUser() {
  return {
    id: generateId(),
    name: "Demo User",
    email: "demo@singleaudio.com",
    role: "user" as const,
    avatar: "/placeholder.svg?height=40&width=40",
    permissions: ["music.upload", "youtube.manage", "analytics.view"],
    twoFactorEnabled: false,
    company: "Independent Artist",
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  }
}

export function generateMockRelease() {
  return {
    id: generateId(),
    title: "Sample Track",
    artist: "Demo Artist",
    type: "single" as const,
    status: "live" as const,
    releaseDate: new Date().toISOString().split("T")[0],
    streams: Math.floor(Math.random() * 100000),
    revenue: Math.random() * 1000,
    artwork: "/placeholder.svg?height=300&width=300",
    tracks: 1,
    dsps: ["Spotify", "Apple Music", "YouTube Music"],
  }
}
