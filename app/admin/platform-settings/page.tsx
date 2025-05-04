"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Brush, Globe, Layout, Save, Settings, Webhook, Zap, Upload, DollarSign, Plus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export default function PlatformSettingsPage() {
  const [logoPreview, setLogoPreview] = useState("/abstract-wave-logo.png")
  const [faviconPreview, setFaviconPreview] = useState("/abstract-wave-logo.png")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("branding")

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleSave = () => {
    setIsSaving(true)
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved",
        description: "Your platform settings have been saved successfully.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleUploadLogo = () => {
    toast({
      title: "Upload Logo",
      description: "This would open a file picker to upload a new logo.",
      duration: 3000,
    })
  }

  const handleUploadFavicon = () => {
    toast({
      title: "Upload Favicon",
      description: "This would open a file picker to upload a new favicon.",
      duration: 3000,
    })
  }

  const handlePreviewTheme = () => {
    toast({
      title: "Theme Preview",
      description: "This would show a preview of the selected theme.",
    })
  }

  const handleResetFeatures = () => {
    toast({
      title: "Reset Features",
      description: "All features have been reset to their default values.",
    })
  }

  const handleApplyChanges = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Changes applied",
        description: "Feature changes have been applied successfully.",
      })
    }, 1500)
  }

  const handleAddWebhook = () => {
    toast({
      title: "Add Webhook",
      description: "This would open a form to add a new webhook.",
    })
  }

  const handleEditWebhook = (webhookName: string) => {
    toast({
      title: "Edit Webhook",
      description: `This would open a form to edit the ${webhookName} webhook.`,
    })
  }

  const handleDeleteWebhook = (webhookName: string) => {
    toast({
      title: "Delete Webhook",
      description: `Are you sure you want to delete the ${webhookName} webhook?`,
    })
  }

  const handleRegenerateSecret = () => {
    toast({
      title: "Regenerate Secret",
      description: "A new webhook secret has been generated.",
    })
  }

  if (isLoading) {
    return <div className="p-6">Loading settings...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
          <p className="text-sm text-muted-foreground">Configure global platform settings and appearance</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-purple-600 hover:bg-purple-700">
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
      </div>

      <Tabs value={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="branding" className="flex items-center gap-2">
            <Brush className="h-4 w-4" />
            Branding
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Regional
          </TabsTrigger>
          <TabsTrigger value="ui" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            UI Config
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Features
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="h-4 w-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="branding">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Platform Identity</CardTitle>
                <CardDescription>Configure your platform's name and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="SingleAudio" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform-description">Platform Description</Label>
                  <Textarea
                    id="platform-description"
                    defaultValue="The complete platform for music and video creators to distribute, monetize, and grow their audience."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input id="support-email" type="email" defaultValue="support@singleaudio.com" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visual Assets</CardTitle>
                <CardDescription>Upload and manage your platform's visual identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Platform Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md border border-gray-700 flex items-center justify-center overflow-hidden">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo Preview"
                        className="max-h-full max-w-full"
                      />
                    </div>
                    <Button variant="outline" className="flex-1" onClick={handleUploadLogo}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Logo
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended size: 512x512px, PNG or SVG format</p>
                </div>

                <div className="space-y-4">
                  <Label>Favicon</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-md border border-gray-700 flex items-center justify-center overflow-hidden">
                      <img
                        src={faviconPreview || "/placeholder.svg"}
                        alt="Favicon Preview"
                        className="max-h-full max-w-full"
                      />
                    </div>
                    <Button variant="outline" className="flex-1" onClick={handleUploadFavicon}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Favicon
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended size: 32x32px, ICO or PNG format</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Color Scheme</CardTitle>
                <CardDescription>Configure your platform's color palette</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-md bg-purple-600"></div>
                        <Input id="primary-color" defaultValue="#7C3AED" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-md bg-blue-600"></div>
                        <Input id="secondary-color" defaultValue="#2563EB" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accent-color">Accent Color</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-md bg-pink-600"></div>
                        <Input id="accent-color" defaultValue="#DB2777" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="background-color">Background Color</Label>
                      <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-md bg-gray-900"></div>
                        <Input id="background-color" defaultValue="#111827" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handlePreviewTheme}>
                  Preview Theme
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="regional">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Regional Settings</CardTitle>
                <CardDescription>Configure timezone, language, and currency settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="default-timezone">Default Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="default-timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                      <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                      <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                      <SelectItem value="cet">CET (Central European Time)</SelectItem>
                      <SelectItem value="jst">JST (Japan Standard Time)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-language">Default Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="default-language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                      <SelectItem value="zh">Chinese (Simplified)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default-currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger id="default-currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                      <SelectItem value="cad">CAD ($)</SelectItem>
                      <SelectItem value="aud">AUD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date & Number Formats</CardTitle>
                <CardDescription>Configure how dates and numbers are displayed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mdy">
                    <SelectTrigger id="date-format">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mdy">MM/DD/YYYY (US)</SelectItem>
                      <SelectItem value="dmy">DD/MM/YYYY (UK, EU)</SelectItem>
                      <SelectItem value="ymd">YYYY/MM/DD (ISO)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Example: 05/15/2023</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-format">Time Format</Label>
                  <Select defaultValue="12h">
                    <SelectTrigger id="time-format">
                      <SelectValue placeholder="Select time format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Example: 3:45 PM or 15:45</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number-format">Number Format</Label>
                  <Select defaultValue="us">
                    <SelectTrigger id="number-format">
                      <SelectValue placeholder="Select number format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">1,234.56 (US, UK)</SelectItem>
                      <SelectItem value="eu">1.234,56 (EU)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Available Regions</CardTitle>
                <CardDescription>Configure which regions the platform is available in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center space-x-2">
                    <Switch id="region-na" defaultChecked />
                    <Label htmlFor="region-na">North America</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="region-eu" defaultChecked />
                    <Label htmlFor="region-eu">Europe</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="region-asia" defaultChecked />
                    <Label htmlFor="region-asia">Asia Pacific</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="region-latam" defaultChecked />
                    <Label htmlFor="region-latam">Latin America</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="region-africa" defaultChecked />
                    <Label htmlFor="region-africa">Africa</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="region-me" defaultChecked />
                    <Label htmlFor="region-me">Middle East</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ui">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Configuration</CardTitle>
                <CardDescription>Configure the navigation elements for each user role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nav-role">Select Role</Label>
                  <Select defaultValue="creator">
                    <SelectTrigger id="nav-role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="artist">Artist</SelectItem>
                      <SelectItem value="label">Label</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Layout className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>Dashboard</span>
                    </div>
                    <Switch id="nav-dashboard" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Zap className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>Analytics</span>
                    </div>
                    <Switch id="nav-analytics" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>Monetization</span>
                    </div>
                    <Switch id="nav-monetization" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <span>Settings</span>
                    </div>
                    <Switch id="nav-settings" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Reset to Default
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
                <CardDescription>Configure the default dashboard layout for each role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="dashboard-layout">Default Layout</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger id="dashboard-layout">
                      <SelectValue placeholder="Select layout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="expanded">Expanded</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 pt-4">
                  <Label>Widget Visibility</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Overview</span>
                      <Switch id="widget-revenue" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Recent Activity</span>
                      <Switch id="widget-activity" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Performance Metrics</span>
                      <Switch id="widget-performance" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Quick Actions</span>
                      <Switch id="widget-actions" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Configure default theme settings for all users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="default-theme">Default Theme</Label>
                      <Select defaultValue="dark">
                        <SelectTrigger id="default-theme">
                          <SelectValue placeholder="Select theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System Default</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Allow User Theme Selection</span>
                      <Switch id="allow-theme-selection" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="font-size">Default Font Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger id="font-size">
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Allow User Font Size Selection</span>
                      <Switch id="allow-font-selection" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Core Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Content Distribution</p>
                        <p className="text-xs text-muted-foreground">Upload and distribute content</p>
                      </div>
                      <Switch id="feature-distribution" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Monetization</p>
                        <p className="text-xs text-muted-foreground">Revenue generation and payouts</p>
                      </div>
                      <Switch id="feature-monetization" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Analytics</p>
                        <p className="text-xs text-muted-foreground">Performance tracking and insights</p>
                      </div>
                      <Switch id="feature-analytics" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Content ID</p>
                        <p className="text-xs text-muted-foreground">Copyright protection and claims</p>
                      </div>
                      <Switch id="feature-content-id" defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Beta Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">AI Tools</p>
                        <span className="text-xs bg-purple-900 text-purple-300 px-1.5 py-0.5 rounded">BETA</span>
                      </div>
                      <Switch id="feature-ai-tools" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Smart Thumbnails</p>
                        <span className="text-xs bg-purple-900 text-purple-300 px-1.5 py-0.5 rounded">BETA</span>
                      </div>
                      <Switch id="feature-smart-thumbnails" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Audience Insights</p>
                        <span className="text-xs bg-purple-900 text-purple-300 px-1.5 py-0.5 rounded">BETA</span>
                      </div>
                      <Switch id="feature-audience-insights" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">Shorts Converter</p>
                        <span className="text-xs bg-purple-900 text-purple-300 px-1.5 py-0.5 rounded">BETA</span>
                      </div>
                      <Switch id="feature-shorts-converter" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Feature Rollout</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="rollout-percentage">Rollout Percentage</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="rollout-percentage"
                        type="number"
                        defaultValue="100"
                        min="0"
                        max="100"
                        className="w-24"
                      />
                      <span className="text-sm">%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Percentage of users who will see new features</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rollout-strategy">Rollout Strategy</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="rollout-strategy">
                        <SelectValue placeholder="Select strategy" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="random">Random Selection</SelectItem>
                        <SelectItem value="geo">By Geography</SelectItem>
                        <SelectItem value="role">By User Role</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleResetFeatures}>
                Reset All Features
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleApplyChanges}>
                Apply Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure webhooks for external integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Active Webhooks</h3>
                  <Button size="sm" className="h-8 bg-purple-600 hover:bg-purple-700" onClick={handleAddWebhook}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Webhook
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <h4 className="font-medium">Content Upload Webhook</h4>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500/20">
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">URL:</span>
                        <span className="font-mono text-xs">https://api.example.com/webhooks/content-upload</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Events:</span>
                        <span>content.created, content.updated</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last triggered:</span>
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditWebhook("Content Upload")}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteWebhook("Content Upload")}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <h4 className="font-medium">Payment Notification Webhook</h4>
                      </div>
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                        Pending
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">URL:</span>
                        <span className="font-mono text-xs">https://api.example.com/webhooks/payment-events</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Events:</span>
                        <span>payment.succeeded, payment.failed</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last triggered:</span>
                        <span>Never</span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm" onClick={() => handleEditWebhook("Payment Notification")}>
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                        onClick={() => handleDeleteWebhook("Payment Notification")}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-800">
                <h3 className="text-sm font-medium">Webhook Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="webhook-secret">Webhook Secret</Label>
                    <div className="flex gap-2">
                      <Input id="webhook-secret" type="password" value="••••••••••••••••" className="flex-1" readOnly />
                      <Button variant="outline" onClick={handleRegenerateSecret}>
                        Regenerate
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Used to verify webhook signatures</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-timeout">Request Timeout</Label>
                    <div className="flex gap-2 items-center">
                      <Input id="webhook-timeout" type="number" defaultValue="30" min="1" max="120" className="w-24" />
                      <span className="text-sm">seconds</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="webhook-retry" defaultChecked />
                  <Label htmlFor="webhook-retry">Retry failed webhook deliveries (up to 3 times)</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
                Save Webhook Configuration
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
