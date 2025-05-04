"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, User, Users, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const [loginType, setLoginType] = useState("user")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent, type: string) => {
    e.preventDefault()
    if (type === "user") {
      router.push("/dashboard")
    } else {
      router.push("/admin")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-5xl overflow-hidden flex rounded-xl shadow-lg">
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600 fill-current">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
              <span className="font-semibold text-sm">SingleAI</span>
            </div>
          </div>

          <Tabs defaultValue="user" className="w-full" onValueChange={setLoginType}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                User Login
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Admin Login
              </TabsTrigger>
            </TabsList>

            <TabsContent value="user">
              <div className="text-xs uppercase font-medium text-gray-500 mb-2">ACCOUNT</div>
              <h1 className="text-2xl font-bold mb-6">Sign in to your account</h1>
              <p className="text-gray-600 text-sm mb-8">Enter your credentials to view all insights.</p>

              <form className="space-y-4" onSubmit={(e) => handleLogin(e, "user")}>
                <div>
                  <label htmlFor="email" className="text-sm text-gray-600 mb-1 block">
                    Email address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email address" className="w-full" />
                </div>

                <div>
                  <label htmlFor="password" className="text-sm text-gray-600 mb-1 block">
                    Password
                  </label>
                  <Input id="password" type="password" placeholder="Enter your password" className="w-full" />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit
                </Button>

                <Button variant="outline" className="w-full">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866.554 3.921 1.465l2.814-2.814A9.996 9.996 0 0 0 12.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
                  </svg>
                  Sign in with Google
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="admin">
              <div className="text-xs uppercase font-medium text-gray-500 mb-2">ADMIN ACCESS</div>
              <h1 className="text-2xl font-bold mb-6">Admin Authentication</h1>
              <p className="text-gray-600 text-sm mb-8">Secure access for platform administrators only.</p>

              <form className="space-y-4" onSubmit={(e) => handleLogin(e, "admin")}>
                <div>
                  <label htmlFor="admin-email" className="text-sm text-gray-600 mb-1 block">
                    Admin Email
                  </label>
                  <Input id="admin-email" type="email" placeholder="Enter admin email" className="w-full" />
                </div>

                <div>
                  <label htmlFor="admin-password" className="text-sm text-gray-600 mb-1 block">
                    Admin Password
                  </label>
                  <Input id="admin-password" type="password" placeholder="Enter admin password" className="w-full" />
                </div>

                <div>
                  <label htmlFor="auth-code" className="text-sm text-gray-600 mb-1 block">
                    2FA Authentication Code
                  </label>
                  <Input id="auth-code" type="text" placeholder="Enter 6-digit code" className="w-full" />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Shield className="mr-2 h-4 w-4" />
                  Secure Login
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Side - Dashboard Preview */}
        <div className="hidden md:block w-1/2 bg-blue-50 p-8 relative">
          <div className="absolute top-8 right-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image src="/abstract-profile.png" alt="Profile" width={32} height={32} className="object-cover" />
            </div>
            <div className="text-xs">
              <p className="font-medium">Administrator</p>
              <p className="text-gray-500">admin@singleaudio.com</p>
            </div>
          </div>

          {loginType === "user" ? (
            <div className="mt-12">
              <div className="mb-2">
                <span className="text-sm text-gray-500">Total revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">$354,320</h2>
                <span className="text-xs text-green-500 font-medium">+2.5%</span>
              </div>

              <div className="mt-4 flex">
                <div className="w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e0e0e0" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="10"
                      strokeDasharray="188.5 251.3"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#6366f1"
                      strokeWidth="10"
                      strokeDasharray="62.8 251.3"
                      strokeDashoffset="-188.5"
                    />
                  </svg>
                </div>
                <div className="ml-4 mt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Music</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <span className="text-sm">Video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-sm">Other</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-12">
              <div className="mb-2">
                <span className="text-sm text-gray-500">Admin Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Platform Control</h2>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-md">
                      <Shield className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">System Status</p>
                      <p className="text-xs text-gray-500">All systems operational</p>
                    </div>
                  </div>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-md">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Active Users</p>
                      <p className="text-xs text-gray-500">12,458 online now</p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-blue-600">+18%</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-md">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Critical Alerts</p>
                      <p className="text-xs text-gray-500">2 issues need attention</p>
                    </div>
                  </div>
                  <Button size="sm" className="h-7 bg-red-600 hover:bg-red-700">
                    View
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 right-0 w-64 h-64">
            <div className="relative w-full h-full">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-200 rounded-tl-3xl"></div>
              <div className="absolute bottom-12 right-12 w-48 h-48 bg-blue-300 rounded-tl-3xl"></div>
              <div className="absolute bottom-24 right-24 w-48 h-48 bg-blue-400 rounded-tl-3xl"></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
