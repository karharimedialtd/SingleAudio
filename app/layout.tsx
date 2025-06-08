// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { DashboardProvider } from "@/context/dashboard-context"

const inter = Inter({ subsets: ["latin"] })

// ✅ Correct metadata block (runs only in server layout, NOT in 'use client')
export const metadata: Metadata = {
  title: "Single Audio - Music Distribution & CMS Platform",
  description: "Professional music distribution and YouTube CMS management platform",
  icons: {
    icon: "/favicon.ico", // Make sure this exists in your /public folder
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DashboardProvider>{children}</DashboardProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
