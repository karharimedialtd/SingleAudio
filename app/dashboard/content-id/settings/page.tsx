"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Shield, Music, Video, Settings, Bell, Save, RefreshCw, Info, Check } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ContentIdSettingsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [settings, setSettings] = useState({
    enableContentId: true,
    autoClaimMatches: true,
    notifyOnNewClaims: true,
    defaultPolicy: "monetize",
    audioMatching: true,
    videoMatching: true,
    territoryRestriction: "worldwide",
    customTerritories: [],
    claimThreshold: "medium",
    autoAppealOptions: [],
    emailNotifications: true,
    pushNotifications: true,
    reportFrequency: "weekly",
  })

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate saving settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)

    toast({
      title: "Settings saved",
      description: "Your Content ID settings have been updated successfully.",
    })
  }

  const handleToggleSetting = (setting: string, value: boolean) => {
    setSettings({
      ...settings,
      [setting]: value,
    })
  }

  const handleChangeSetting = (setting: string, value: any) => {
    setSettings({
      ...settings,
      [setting]: value,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            onClick={() => router.push("/dashboard/content-id")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Content ID Settings</h1>
            <p className="text-sm text-gray-400">Configure your Content ID preferences and policies</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveSettings} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>

      <div className="flex border-b border-gray-800 mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "general" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "matching" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("matching")}
        >
          Matching
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "policies" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("policies")}
        >
          Policies
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === "notifications" ? "text-purple-500 border-b-2 border-purple-500" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("notifications")}
        >
          Notifications
        </button>
      </div>

      {activeTab === "general" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic Content ID settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-content-id" className="font-medium">
                    Enable Content ID
                  </Label>
                  <p className="text-sm text-gray-400">Allow the system to scan for and identify your content</p>
                </div>
                <Switch
                  id="enable-content-id"
                  checked={settings.enableContentId}
                  onCheckedChange={(checked) => handleToggleSetting("enableContentId", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-claim" className="font-medium">
                    Auto-claim matches
                  </Label>
                  <p className="text-sm text-gray-400">Automatically claim content when matches are found</p>
                </div>
                <Switch
                  id="auto-claim"
                  checked={settings.autoClaimMatches}
                  onCheckedChange={(checked) => handleToggleSetting("autoClaimMatches", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-policy" className="font-medium">
                  Default Policy
                </Label>
                <Select
                  defaultValue={settings.defaultPolicy}
                  onValueChange={(value) => handleChangeSetting("defaultPolicy", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select default policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="monetize">Monetize</SelectItem>
                    <SelectItem value="track">Track</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400">This policy will be applied to all new content matches</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="territory-restriction" className="font-medium">
                  Territory Restriction
                </Label>
                <Select
                  defaultValue={settings.territoryRestriction}
                  onValueChange={(value) => handleChangeSetting("territoryRestriction", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select territory restriction" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="worldwide">Worldwide</SelectItem>
                    <SelectItem value="custom">Custom Territories</SelectItem>
                  </SelectContent>
                </Select>
                {settings.territoryRestriction === "custom" && (
                  <div className="pt-2">
                    <Input
                      placeholder="Enter territories separated by commas (e.g., US, UK, CA)"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
                <Shield className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Content ID Status: Active</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Your account is eligible for Content ID. You can claim and manage content that matches your original
                    works.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Total Assets</p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">Active Claims</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "matching" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Content Matching Settings</CardTitle>
              <CardDescription>Configure how your content is matched and identified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audio-matching" className="font-medium">
                    Audio Matching
                  </Label>
                  <p className="text-sm text-gray-400">Enable matching for audio content</p>
                </div>
                <Switch
                  id="audio-matching"
                  checked={settings.audioMatching}
                  onCheckedChange={(checked) => handleToggleSetting("audioMatching", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="video-matching" className="font-medium">
                    Video Matching
                  </Label>
                  <p className="text-sm text-gray-400">Enable matching for visual content</p>
                </div>
                <Switch
                  id="video-matching"
                  checked={settings.videoMatching}
                  onCheckedChange={(checked) => handleToggleSetting("videoMatching", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="claim-threshold" className="font-medium">
                  Claim Threshold
                </Label>
                <RadioGroup
                  defaultValue={settings.claimThreshold}
                  onValueChange={(value) => handleChangeSetting("claimThreshold", value)}
                >
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="low" id="threshold-low" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="threshold-low" className="font-medium">
                        Low
                      </Label>
                      <p className="text-sm text-gray-400">
                        Match content with lower confidence (may result in more false positives)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="medium" id="threshold-medium" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="threshold-medium" className="font-medium">
                        Medium (Recommended)
                      </Label>
                      <p className="text-sm text-gray-400">Balanced approach to content matching</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 rounded-lg bg-gray-800">
                    <RadioGroupItem value="high" id="threshold-high" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="threshold-high" className="font-medium">
                        High
                      </Label>
                      <p className="text-sm text-gray-400">
                        Only match content with high confidence (fewer false positives)
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-400">About Content Matching</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Content ID uses advanced algorithms to identify matches to your content. Adjusting these settings
                    can help balance between catching all potential matches and avoiding false claims.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Reference Files</CardTitle>
              <CardDescription>Manage the files used to identify your content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Audio Reference Files</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => router.push("/dashboard/content-id/reference-files")}
                >
                  <Music className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm">42 audio reference files uploaded</p>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Video Reference Files</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => router.push("/dashboard/content-id/reference-files")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Manage
                </Button>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm">18 video reference files uploaded</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "policies" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Policy Settings</CardTitle>
              <CardDescription>Configure how claims are handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="font-medium">Auto-Appeal Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-appeal-fair-use"
                      checked={settings.autoAppealOptions.includes("fair-use")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleChangeSetting("autoAppealOptions", [...settings.autoAppealOptions, "fair-use"])
                        } else {
                          handleChangeSetting(
                            "autoAppealOptions",
                            settings.autoAppealOptions.filter((o) => o !== "fair-use"),
                          )
                        }
                      }}
                    />
                    <Label htmlFor="auto-appeal-fair-use">
                      Automatically appeal claims that likely fall under fair use
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-appeal-short"
                      checked={settings.autoAppealOptions.includes("short-clips")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleChangeSetting("autoAppealOptions", [...settings.autoAppealOptions, "short-clips"])
                        } else {
                          handleChangeSetting(
                            "autoAppealOptions",
                            settings.autoAppealOptions.filter((o) => o !== "short-clips"),
                          )
                        }
                      }}
                    />
                    <Label htmlFor="auto-appeal-short">
                      Automatically appeal claims for very short clips (under 5 seconds)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="auto-appeal-licensed"
                      checked={settings.autoAppealOptions.includes("licensed")}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          handleChangeSetting("autoAppealOptions", [...settings.autoAppealOptions, "licensed"])
                        } else {
                          handleChangeSetting(
                            "autoAppealOptions",
                            settings.autoAppealOptions.filter((o) => o !== "licensed"),
                          )
                        }
                      }}
                    />
                    <Label htmlFor="auto-appeal-licensed">
                      Automatically appeal claims for content you've licensed
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-policy-audio" className="font-medium">
                  Default Audio Policy
                </Label>
                <Select defaultValue="monetize">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select default audio policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="monetize">Monetize</SelectItem>
                    <SelectItem value="track">Track</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default-policy-video" className="font-medium">
                  Default Video Policy
                </Label>
                <Select defaultValue="monetize">
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select default video policy" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="monetize">Monetize</SelectItem>
                    <SelectItem value="track">Track</SelectItem>
                    <SelectItem value="block">Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
                <Settings className="h-5 w-5 text-purple-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Policy Templates</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Create and manage policy templates for different types of content.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-gray-700 border-gray-600 hover:bg-gray-600"
                    onClick={() => router.push("/dashboard/content-id/policy-templates")}
                  >
                    Manage Policy Templates
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Whitelist Settings</CardTitle>
              <CardDescription>Manage channels and users exempt from Content ID claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Whitelisted Channels</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={() => router.push("/dashboard/content-id/whitelist")}
                >
                  Manage Whitelist
                </Button>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm">5 channels currently whitelisted</p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <Check className="h-5 w-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-400">Whitelist Benefits</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Whitelisted channels can use your content without receiving Content ID claims. This is useful for
                    collaborators, partners, and official channels.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive Content ID notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notify-new-claims" className="font-medium">
                    New Claims
                  </Label>
                  <p className="text-sm text-gray-400">Receive notifications when new claims are detected</p>
                </div>
                <Switch
                  id="notify-new-claims"
                  checked={settings.notifyOnNewClaims}
                  onCheckedChange={(checked) => handleToggleSetting("notifyOnNewClaims", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-400">Receive Content ID notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleToggleSetting("emailNotifications", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications" className="font-medium">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-gray-400">Receive Content ID notifications on your devices</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => handleToggleSetting("pushNotifications", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="report-frequency" className="font-medium">
                  Report Frequency
                </Label>
                <Select
                  defaultValue={settings.reportFrequency}
                  onValueChange={(value) => handleChangeSetting("reportFrequency", value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select report frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400">How often you receive Content ID summary reports</p>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-800">
                <Bell className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium">Important Notifications</h4>
                  <p className="text-sm text-gray-300 mt-1">
                    Some critical notifications, such as policy violations and account status changes, will always be
                    sent regardless of your notification settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which events trigger notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="font-medium">Notify me about:</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-new-claims" defaultChecked />
                    <Label htmlFor="notify-new-claims">New Content ID claims</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-appeals" defaultChecked />
                    <Label htmlFor="notify-appeals">Appeal status changes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-releases" defaultChecked />
                    <Label htmlFor="notify-releases">Claim releases</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-policy-changes" defaultChecked />
                    <Label htmlFor="notify-policy-changes">Policy changes by claimants</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notify-disputes" defaultChecked />
                    <Label htmlFor="notify-disputes">Disputes on your claims</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={handleSaveSettings}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Notification Preferences"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
