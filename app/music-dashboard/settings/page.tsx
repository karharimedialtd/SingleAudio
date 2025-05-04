"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Bell, Lock, LogOut, Save, Settings, User, Wallet } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)

  // Profile settings
  const [profileSettings, setProfileSettings] = useState({
    name: "John Doe",
    email: "john@singleaudio.com",
    bio: "Music producer and artist based in Los Angeles, CA.",
    website: "https://johndoe-music.com",
    avatar: "/abstract-profile.png",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    releaseUpdates: true,
    paymentAlerts: true,
    marketingEmails: false,
    newFeatures: true,
  })

  // Payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethod: "bank",
    bankName: "Chase Bank",
    accountNumber: "****5678",
    routingNumber: "****1234",
    paypalEmail: "john@example.com",
    currency: "usd",
    autoWithdraw: true,
    withdrawThreshold: "100",
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30",
  })

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationToggle = (setting: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: checked }))
  }

  const handlePaymentChange = (name: string, value: string) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSecurityChange = (name: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your settings have been updated successfully",
      })
    }, 1500)
  }

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You are being logged out of your account",
    })

    // Simulate logout
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4">
          <Card className="border-gray-800 bg-gray-900 sticky top-6">
            <CardContent className="p-4">
              <div className="flex flex-col items-center mb-6 pt-4">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={profileSettings.avatar || "/placeholder.svg"} alt={profileSettings.name} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{profileSettings.name}</h3>
                <p className="text-sm text-gray-400">{profileSettings.email}</p>
              </div>
              <Tabs
                defaultValue="profile"
                value={activeTab}
                onValueChange={setActiveTab}
                orientation="vertical"
                className="w-full"
              >
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger value="profile" className="justify-start px-3 data-[state=active]:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="justify-start px-3 data-[state=active]:bg-gray-800">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="payment" className="justify-start px-3 data-[state=active]:bg-gray-800">
                    <Wallet className="mr-2 h-4 w-4" />
                    Payment
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start px-3 data-[state=active]:bg-gray-800">
                    <Lock className="mr-2 h-4 w-4" />
                    Security
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="mt-6 pt-6 border-t border-gray-800">
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-3/4">
          {activeTab === "profile" && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Profile Settings</CardTitle>
                <CardDescription>Manage your personal information and public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileSettings.name}
                        onChange={handleProfileChange}
                        className="bg-gray-950 border-gray-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileSettings.email}
                        onChange={handleProfileChange}
                        className="bg-gray-950 border-gray-800"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileSettings.bio}
                      onChange={handleProfileChange}
                      className="h-24 bg-gray-950 border-gray-800"
                    />
                    <p className="text-xs text-gray-500 mt-1">Brief description for your profile.</p>
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={profileSettings.website}
                      onChange={handleProfileChange}
                      className="bg-gray-950 border-gray-800"
                    />
                  </div>

                  <div>
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <div className="flex items-center gap-4 mt-1">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profileSettings.avatar || "/placeholder.svg"} alt={profileSettings.name} />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Notification Settings</CardTitle>
                <CardDescription>Manage how you receive notifications and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-xs text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-xs text-gray-500">Receive notifications on your device</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("pushNotifications", checked)}
                    />
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium mb-3">Notification Types</h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="releaseUpdates">Release Updates</Label>
                          <p className="text-xs text-gray-500">Get notified about your release status changes</p>
                        </div>
                        <Switch
                          id="releaseUpdates"
                          checked={notificationSettings.releaseUpdates}
                          onCheckedChange={(checked) => handleNotificationToggle("releaseUpdates", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="paymentAlerts">Payment Alerts</Label>
                          <p className="text-xs text-gray-500">Get notified about royalty payments</p>
                        </div>
                        <Switch
                          id="paymentAlerts"
                          checked={notificationSettings.paymentAlerts}
                          onCheckedChange={(checked) => handleNotificationToggle("paymentAlerts", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketingEmails">Marketing Emails</Label>
                          <p className="text-xs text-gray-500">Receive promotional emails and offers</p>
                        </div>
                        <Switch
                          id="marketingEmails"
                          checked={notificationSettings.marketingEmails}
                          onCheckedChange={(checked) => handleNotificationToggle("marketingEmails", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="newFeatures">New Features</Label>
                          <p className="text-xs text-gray-500">Get notified about new platform features</p>
                        </div>
                        <Switch
                          id="newFeatures"
                          checked={notificationSettings.newFeatures}
                          onCheckedChange={(checked) => handleNotificationToggle("newFeatures", checked)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Payment Settings</CardTitle>
                <CardDescription>Manage your payment methods and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select
                      value={paymentSettings.paymentMethod}
                      onValueChange={(value) => handlePaymentChange("paymentMethod", value)}
                    >
                      <SelectTrigger id="paymentMethod" className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Account</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="check">Check by Mail</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {paymentSettings.paymentMethod === "bank" && (
                    <div className="space-y-4 border rounded-md border-gray-800 p-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="bankName">Bank Name</Label>
                          <Input
                            id="bankName"
                            value={paymentSettings.bankName}
                            onChange={(e) => handlePaymentChange("bankName", e.target.value)}
                            className="bg-gray-950 border-gray-800"
                          />
                        </div>
                        <div>
                          <Label htmlFor="accountNumber">Account Number</Label>
                          <Input
                            id="accountNumber"
                            value={paymentSettings.accountNumber}
                            onChange={(e) => handlePaymentChange("accountNumber", e.target.value)}
                            className="bg-gray-950 border-gray-800"
                            type="password"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input
                          id="routingNumber"
                          value={paymentSettings.routingNumber}
                          onChange={(e) => handlePaymentChange("routingNumber", e.target.value)}
                          className="bg-gray-950 border-gray-800"
                          type="password"
                        />
                      </div>
                    </div>
                  )}

                  {paymentSettings.paymentMethod === "paypal" && (
                    <div className="border rounded-md border-gray-800 p-4">
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        value={paymentSettings.paypalEmail}
                        onChange={(e) => handlePaymentChange("paypalEmail", e.target.value)}
                        className="bg-gray-950 border-gray-800"
                      />
                    </div>
                  )}

                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={paymentSettings.currency}
                      onValueChange={(value) => handlePaymentChange("currency", value)}
                    >
                      <SelectTrigger id="currency" className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usd">USD - US Dollar</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                        <SelectItem value="gbp">GBP - British Pound</SelectItem>
                        <SelectItem value="cad">CAD - Canadian Dollar</SelectItem>
                        <SelectItem value="aud">AUD - Australian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium mb-3">Payout Preferences</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="autoWithdraw">Automatic Withdrawals</Label>
                          <p className="text-xs text-gray-500">
                            Automatically withdraw funds when they reach the threshold
                          </p>
                        </div>
                        <Switch
                          id="autoWithdraw"
                          checked={paymentSettings.autoWithdraw}
                          onCheckedChange={(checked) => handlePaymentChange("autoWithdraw", String(checked))}
                        />
                      </div>

                      {paymentSettings.autoWithdraw && (
                        <div>
                          <Label htmlFor="withdrawThreshold">Withdrawal Threshold ($)</Label>
                          <Input
                            id="withdrawThreshold"
                            value={paymentSettings.withdrawThreshold}
                            onChange={(e) => handlePaymentChange("withdrawThreshold", e.target.value)}
                            className="bg-gray-950 border-gray-800"
                            type="number"
                            min="10"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Minimum amount required before automatic withdrawal
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
                <CardDescription>Manage your account security and privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                      <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("twoFactorAuth", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="loginAlerts">Login Alerts</Label>
                      <p className="text-xs text-gray-500">Get notified when someone logs into your account</p>
                    </div>
                    <Switch
                      id="loginAlerts"
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={(checked) => handleSecurityChange("loginAlerts", checked)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select
                      value={securitySettings.sessionTimeout}
                      onValueChange={(value) => handleSecurityChange("sessionTimeout", value)}
                    >
                      <SelectTrigger id="sessionTimeout" className="bg-gray-950 border-gray-800">
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">Automatically log out after period of inactivity</p>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium mb-3">Password</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="border-t border-gray-800 pt-4">
                    <h3 className="text-sm font-medium mb-3">Account Access</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        View Active Sessions
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Manage Connected Apps
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-gray-800 pt-4">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Settings className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
