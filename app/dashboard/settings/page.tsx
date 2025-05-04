"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Users,
  Globe,
  Moon,
  Sun,
  Laptop,
  LogOut,
  Save,
  Upload,
  Youtube,
  Music,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [theme, setTheme] = useState("dark")

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Account Settings</h1>
          <p className="text-sm text-gray-400">Manage your account preferences and settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex flex-col items-center mb-6 pt-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/abstract-profile.png" alt="Profile" />
                  <AvatarFallback>UA</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-sm text-gray-400">john@singleaudio.com</p>
                <Badge className="mt-2 bg-purple-600">Admin</Badge>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => router.push("/")}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="profile">
            <Card className="bg-gray-900 border-gray-800 mb-6">
              <CardContent className="p-2">
                <TabsList className="w-full bg-gray-800 overflow-x-auto flex-nowrap">
                  <TabsTrigger value="profile" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <User className="h-4 w-4 mr-2 hidden sm:inline" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="account" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <Users className="h-4 w-4 mr-2 hidden sm:inline" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <Moon className="h-4 w-4 mr-2 hidden sm:inline" />
                    Appearance
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger value="billing" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <CreditCard className="h-4 w-4 mr-2 hidden sm:inline" />
                    Billing
                  </TabsTrigger>
                  <TabsTrigger value="integrations" className="data-[state=active]:bg-gray-700 whitespace-nowrap">
                    <Globe className="h-4 w-4 mr-2 hidden sm:inline" />
                    Integrations
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <TabsContent value="profile">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information and public profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" className="bg-gray-800 border-gray-700" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" defaultValue="john@singleaudio.com" className="bg-gray-800 border-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="johndoe" className="bg-gray-800 border-gray-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        className="bg-gray-800 border-gray-700 min-h-[100px]"
                        defaultValue="Music producer and content creator specializing in guitar tutorials and music production tips."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/abstract-profile.png" alt="Profile" />
                        <AvatarFallback>UA</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                        <Upload className="h-4 w-4 mr-2" />
                        Change Avatar
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Social Media Links</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                        <Youtube className="h-5 w-5 text-red-500" />
                        <Input
                          placeholder="YouTube Channel URL"
                          className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                          defaultValue="https://youtube.com/johndoe"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                        <Instagram className="h-5 w-5 text-pink-500" />
                        <Input
                          placeholder="Instagram Profile URL"
                          className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                          defaultValue="https://instagram.com/johndoe"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                        <Twitter className="h-5 w-5 text-blue-400" />
                        <Input
                          placeholder="Twitter Profile URL"
                          className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                          defaultValue="https://twitter.com/johndoe"
                        />
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <Input
                          placeholder="Facebook Page URL"
                          className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    Cancel
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex gap-4">
                      <div
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer border ${
                          theme === "light" ? "border-purple-600" : "border-gray-700"
                        }`}
                        onClick={() => setTheme("light")}
                      >
                        <div className="h-20 w-32 rounded-md bg-white flex items-center justify-center">
                          <Sun className="h-8 w-8 text-yellow-500" />
                        </div>
                        <span className="text-sm">Light</span>
                      </div>
                      <div
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer border ${
                          theme === "dark" ? "border-purple-600" : "border-gray-700"
                        }`}
                        onClick={() => setTheme("dark")}
                      >
                        <div className="h-20 w-32 rounded-md bg-gray-800 flex items-center justify-center">
                          <Moon className="h-8 w-8 text-blue-400" />
                        </div>
                        <span className="text-sm">Dark</span>
                      </div>
                      <div
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg cursor-pointer border ${
                          theme === "system" ? "border-purple-600" : "border-gray-700"
                        }`}
                        onClick={() => setTheme("system")}
                      >
                        <div className="h-20 w-32 rounded-md bg-gradient-to-r from-gray-800 to-white flex items-center justify-center">
                          <Laptop className="h-8 w-8 text-gray-500" />
                        </div>
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-600 cursor-pointer ring-2 ring-purple-600 ring-offset-2 ring-offset-gray-900"></div>
                      <div className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-green-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-red-600 cursor-pointer"></div>
                      <div className="h-10 w-10 rounded-full bg-yellow-600 cursor-pointer"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Animations</Label>
                    <div className="flex items-center space-x-2">
                      <Switch id="animations" defaultChecked />
                      <Label htmlFor="animations">Enable animations</Label>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    Reset to Defaults
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-comments" className="flex-1">
                          Comments on your videos
                        </Label>
                        <Switch id="email-comments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-subscribers" className="flex-1">
                          New subscribers
                        </Label>
                        <Switch id="email-subscribers" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-mentions" className="flex-1">
                          Mentions and replies
                        </Label>
                        <Switch id="email-mentions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-analytics" className="flex-1">
                          Weekly analytics reports
                        </Label>
                        <Switch id="email-analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-marketing" className="flex-1">
                          Marketing and promotional emails
                        </Label>
                        <Switch id="email-marketing" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Push Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-comments" className="flex-1">
                          Comments on your videos
                        </Label>
                        <Switch id="push-comments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-subscribers" className="flex-1">
                          New subscribers
                        </Label>
                        <Switch id="push-subscribers" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-mentions" className="flex-1">
                          Mentions and replies
                        </Label>
                        <Switch id="push-mentions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-analytics" className="flex-1">
                          Analytics milestones
                        </Label>
                        <Switch id="push-analytics" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Notification Frequency</h3>
                    <Select defaultValue="realtime">
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Hourly digest</SelectItem>
                        <SelectItem value="daily">Daily digest</SelectItem>
                        <SelectItem value="weekly">Weekly digest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                    Disable All
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Connected Platforms</CardTitle>
                  <CardDescription>Manage your connected accounts and integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Youtube className="h-8 w-8 text-red-500" />
                        <div>
                          <h3 className="font-medium">YouTube</h3>
                          <p className="text-sm text-gray-400">Connected as John Doe</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Music className="h-8 w-8 text-blue-500" />
                        <div>
                          <h3 className="font-medium">Spotify</h3>
                          <p className="text-sm text-gray-400">Connected as John Doe</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Instagram className="h-8 w-8 text-pink-500" />
                        <div>
                          <h3 className="font-medium">Instagram</h3>
                          <p className="text-sm text-gray-400">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                        Connect
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Twitter className="h-8 w-8 text-blue-400" />
                        <div>
                          <h3 className="font-medium">Twitter</h3>
                          <p className="text-sm text-gray-400">Connected as @johndoe</p>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <Facebook className="h-8 w-8 text-blue-600" />
                        <div>
                          <h3 className="font-medium">Facebook</h3>
                          <p className="text-sm text-gray-400">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-400">
                    Connecting platforms allows for cross-posting and analytics integration.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Account Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <Label className="text-gray-400">Account Type</Label>
                          <p>Premium</p>
                        </div>
                        <Badge className="bg-purple-600">Pro</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div>
                          <Label className="text-gray-400">Member Since</Label>
                          <p>January 15, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="bg-gray-800 border-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="bg-gray-800 border-gray-700" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="bg-gray-800 border-gray-700" />
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700">Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Billing Settings</CardTitle>
                  <CardDescription>Manage your subscription and payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Current Plan</h3>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h4 className="font-medium">Pro Plan</h4>
                          <p className="text-sm text-gray-400">$29.99/month</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                      </div>
                      <div className="text-sm text-gray-400">
                        <p>Next billing date: August 15, 2023</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
