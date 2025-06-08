"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { User, Bell, Shield, CreditCard, Globe, Save, Eye, EyeOff, Plus, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const { setCurrentPage } = useDashboard()
  const [showPassword, setShowPassword] = useState(false)
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      bio: "Electronic music producer and artist",
      website: "https://johndoe.music",
      location: "Los Angeles, CA",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
      releaseUpdates: true,
      royaltyReports: true,
      playlistAcceptance: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
      analyticsSharing: true,
    },
    preferences: {
      language: "en",
      timezone: "America/Los_Angeles",
      currency: "USD",
      dateFormat: "MM/DD/YYYY",
    },
  })
  const [paymentMethods, setPaymentMethods] = useState([
    { id: "1", type: "paypal", email: "john.doe@example.com", isDefault: true },
    { id: "2", type: "bank", accountNumber: "****1234", isDefault: false },
  ])
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "paypal",
    paypalEmail: "",
    bankAccount: "",
    wiseAccount: "",
  })

  useEffect(() => {
    setCurrentPage("Settings")
  }, [setCurrentPage])

  const handleSave = async () => {
    setIsSaving(true)
    console.log("Saving settings:", settings)

    // Simulate save process
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1500)
  }

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.type === "paypal" && !newPaymentMethod.paypalEmail) {
      alert("Please enter your PayPal email address")
      return
    }
    if (newPaymentMethod.type === "bank" && !newPaymentMethod.bankAccount) {
      alert("Please enter your bank account details")
      return
    }
    if (newPaymentMethod.type === "wise" && !newPaymentMethod.wiseAccount) {
      alert("Please enter your Wise account details")
      return
    }

    const newMethod = {
      id: Date.now().toString(),
      type: newPaymentMethod.type,
      email: newPaymentMethod.paypalEmail,
      accountNumber: newPaymentMethod.bankAccount || newPaymentMethod.wiseAccount,
      isDefault: paymentMethods.length === 0,
    }

    setPaymentMethods([...paymentMethods, newMethod])
    setNewPaymentMethod({ type: "paypal", paypalEmail: "", bankAccount: "", wiseAccount: "" })
    setShowAddPaymentDialog(false)
    alert("Payment method added successfully!")
  }

  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
    alert("Default payment method updated!")
  }

  const handleRemovePaymentMethod = (id: string) => {
    if (confirm("Are you sure you want to remove this payment method?")) {
      setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
      alert("Payment method removed!")
    }
  }

  const handleNotificationToggle = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: { ...settings.notifications, [key]: value },
    })
    console.log(`Notification setting ${key} changed to:`, value)
  }

  const handlePrivacyToggle = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      privacy: { ...settings.privacy, [key]: value },
    })
    console.log(`Privacy setting ${key} changed to:`, value)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700" disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger
            value="profile"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Shield className="h-4 w-4 mr-2" />
            Privacy
          </TabsTrigger>
          <TabsTrigger
            value="withdrawal"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Withdrawal Account
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="text-gray-300 data-[state=active]:text-white data-[state=active]:bg-white/20"
          >
            <Globe className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={settings.profile.firstName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, firstName: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={settings.profile.lastName}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, lastName: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...settings.profile, email: e.target.value },
                    })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-300">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={settings.profile.phone}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...settings.profile, phone: e.target.value },
                    })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-gray-300">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={settings.profile.bio}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      profile: { ...settings.profile, bio: e.target.value },
                    })
                  }
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-300">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={settings.profile.website}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, website: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-300">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={settings.profile.location}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        profile: { ...settings.profile, location: e.target.value },
                      })
                    }
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-gray-400">
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-gray-300">
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    className="bg-white/5 border-white/10 text-white pr-10 placeholder:text-gray-500"
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm New Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  placeholder="Confirm new password"
                />
              </div>
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  console.log("Updating password...")
                  alert("Password updated successfully!")
                }}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Choose how you want to be notified about important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  key: "emailNotifications",
                  label: "Email Notifications",
                  description: "Receive notifications via email",
                },
                {
                  key: "pushNotifications",
                  label: "Push Notifications",
                  description: "Receive push notifications in your browser",
                },
                {
                  key: "marketingEmails",
                  label: "Marketing Emails",
                  description: "Receive promotional emails and updates",
                },
                {
                  key: "releaseUpdates",
                  label: "Release Updates",
                  description: "Get notified when your releases go live",
                },
                {
                  key: "royaltyReports",
                  label: "Royalty Reports",
                  description: "Receive notifications about new royalty reports",
                },
                {
                  key: "playlistAcceptance",
                  label: "Playlist Acceptance",
                  description: "Get notified when playlists accept your submissions",
                },
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{notification.label}</p>
                    <p className="text-gray-400 text-sm">{notification.description}</p>
                  </div>
                  <Switch
                    checked={settings.notifications[notification.key as keyof typeof settings.notifications]}
                    onCheckedChange={(checked) => handleNotificationToggle(notification.key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Privacy Settings</CardTitle>
              <CardDescription className="text-gray-400">
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300">Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        privacy: { ...settings.privacy, profileVisibility: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {[
                  {
                    key: "showEmail",
                    label: "Show Email Address",
                    description: "Display your email on your public profile",
                  },
                  {
                    key: "showPhone",
                    label: "Show Phone Number",
                    description: "Display your phone number on your public profile",
                  },
                  {
                    key: "analyticsSharing",
                    label: "Analytics Sharing",
                    description: "Share anonymous analytics data to improve our services",
                  },
                ].map((privacy) => (
                  <div key={privacy.key} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{privacy.label}</p>
                      <p className="text-gray-400 text-sm">{privacy.description}</p>
                    </div>
                    <Switch
                      checked={settings.privacy[privacy.key as keyof typeof settings.privacy] as boolean}
                      onCheckedChange={(checked) => handlePrivacyToggle(privacy.key, checked)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdrawal" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Withdrawal Account</CardTitle>
              <CardDescription className="text-gray-400">
                Link where you want to receive payouts from your music earnings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">Current Balance</h3>
                    <p className="text-gray-300">Available for withdrawal</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">$1,247.83</p>
                    <p className="text-gray-400 text-sm">Last payout: Dec 15, 2023</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Ready for withdrawal</Badge>
                  <span className="text-gray-400 text-sm">Minimum: $50.00</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Payment Methods</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddPaymentDialog(true)}
                    className="border-white/20 text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="text-white">
                            {method.type === "paypal"
                              ? "PayPal"
                              : method.type === "bank"
                                ? "Bank Account"
                                : "Wise Account"}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {method.email || `****${method.accountNumber?.slice(-4)}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <Badge className="bg-green-600/20 text-green-400 border-green-600/30">Default</Badge>
                        )}
                        {!method.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefaultPayment(method.id)}
                            className="text-gray-400 hover:text-white hover:bg-gray-700"
                          >
                            Set Default
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemovePaymentMethod(method.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Withdrawal History</h4>
                <div className="space-y-2">
                  {[
                    { date: "Dec 15, 2023", amount: "$1,247.83", status: "Completed", method: "PayPal" },
                    { date: "Nov 15, 2023", amount: "$892.45", status: "Completed", method: "Bank Account" },
                    { date: "Oct 15, 2023", amount: "$1,156.78", status: "Completed", method: "PayPal" },
                  ].map((withdrawal, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div>
                        <p className="text-white">{withdrawal.date}</p>
                        <p className="text-gray-400 text-sm">{withdrawal.method}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white font-medium">{withdrawal.amount}</span>
                        <Badge className="bg-green-600/20 text-green-400 border-green-600/30">
                          {withdrawal.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">General Preferences</CardTitle>
              <CardDescription className="text-gray-400">
                Customize your experience with language, timezone, and display preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, language: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Timezone</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, timezone: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, currency: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Date Format</Label>
                  <Select
                    value={settings.preferences.dateFormat}
                    onValueChange={(value) =>
                      setSettings({
                        ...settings,
                        preferences: { ...settings.preferences, dateFormat: value },
                      })
                    }
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Payment Method Dialog */}
      <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add Payment Method</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new payment method to receive your earnings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Payment Type</Label>
              <Select
                value={newPaymentMethod.type}
                onValueChange={(value) => setNewPaymentMethod({ ...newPaymentMethod, type: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="bank">Bank Account</SelectItem>
                  <SelectItem value="wise">Wise Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newPaymentMethod.type === "paypal" && (
              <div className="space-y-2">
                <Label htmlFor="paypalEmail" className="text-gray-300">
                  PayPal Email
                </Label>
                <Input
                  id="paypalEmail"
                  type="email"
                  value={newPaymentMethod.paypalEmail}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, paypalEmail: e.target.value })}
                  placeholder="your-email@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            )}

            {newPaymentMethod.type === "bank" && (
              <div className="space-y-2">
                <Label htmlFor="bankAccount" className="text-gray-300">
                  Bank Account Details
                </Label>
                <Input
                  id="bankAccount"
                  value={newPaymentMethod.bankAccount}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, bankAccount: e.target.value })}
                  placeholder="Account number and routing details"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            )}

            {newPaymentMethod.type === "wise" && (
              <div className="space-y-2">
                <Label htmlFor="wiseAccount" className="text-gray-300">
                  Wise Account Email
                </Label>
                <Input
                  id="wiseAccount"
                  type="email"
                  value={newPaymentMethod.wiseAccount}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, wiseAccount: e.target.value })}
                  placeholder="your-wise-email@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddPaymentDialog(false)}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button onClick={handleAddPaymentMethod} className="bg-purple-600 hover:bg-purple-700">
              Add Payment Method
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
