"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AlertCircle, Plus, Settings, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"

// Sample data for integrations
const integrations = [
  {
    id: "youtube",
    name: "YouTube",
    description: "Manage YouTube content and analytics",
    status: "Connected",
    icon: "/youtube-music-logo.png",
    lastSync: "2023-04-15 14:30",
    apiKey: "••••••••••••••••",
    scopes: ["read", "write", "analytics"],
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Distribute and manage music on Spotify",
    status: "Connected",
    icon: "/spotify-logo.png",
    lastSync: "2023-04-16 09:15",
    apiKey: "••••••••••••••••",
    scopes: ["read", "write", "analytics"],
  },
  {
    id: "apple",
    name: "Apple Music",
    description: "Distribute and manage music on Apple Music",
    status: "Connected",
    icon: "/apple-music-logo.png",
    lastSync: "2023-04-14 11:45",
    apiKey: "••••••••••••••••",
    scopes: ["read", "write", "analytics"],
  },
  {
    id: "amazon",
    name: "Amazon Music",
    description: "Distribute and manage music on Amazon Music",
    status: "Not Connected",
    icon: "/amazon-music-logo.png",
    lastSync: null,
    apiKey: null,
    scopes: [],
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Manage TikTok content and analytics",
    status: "Not Connected",
    icon: "/social/tiktok.png",
    lastSync: null,
    apiKey: null,
    scopes: [],
  },
  {
    id: "soundcloud",
    name: "SoundCloud",
    description: "Distribute and manage music on SoundCloud",
    status: "Connected",
    icon: "/soundcloud-logo.png",
    lastSync: "2023-04-13 16:20",
    apiKey: "••••••••••••••••",
    scopes: ["read", "write", "analytics"],
  },
]

export default function AdminIntegrations() {
  const router = useRouter()
  const [selectedIntegration, setSelectedIntegration] = useState(null)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [isNewIntegrationDialogOpen, setIsNewIntegrationDialogOpen] = useState(false)
  const [connectForm, setConnectForm] = useState({
    apiKey: "",
    scopes: {
      read: true,
      write: true,
      analytics: true,
    },
  })
  const [isSyncing, setIsSyncing] = useState({})

  const handleAddNewIntegration = () => {
    setIsNewIntegrationDialogOpen(true)
    toast({
      title: "Add New Integration",
      description: "Opening integration setup wizard",
      duration: 2000,
    })
  }

  const handleConnect = (integration) => {
    setSelectedIntegration(integration)
    setConnectForm({
      apiKey: "",
      scopes: {
        read: true,
        write: true,
        analytics: true,
      },
    })
    setIsConnectDialogOpen(true)
    toast({
      title: "Connect Integration",
      description: `Connecting to ${integration.name}...`,
      duration: 2000,
    })
  }

  const handleSettings = (integration) => {
    setSelectedIntegration(integration)
    setConnectForm({
      apiKey: integration.apiKey || "",
      scopes: {
        read: integration.scopes.includes("read"),
        write: integration.scopes.includes("write"),
        analytics: integration.scopes.includes("analytics"),
      },
    })
    setIsSettingsDialogOpen(true)
    toast({
      title: "Integration Settings",
      description: `Editing settings for ${integration.name}`,
      duration: 2000,
    })
  }

  const saveConnection = () => {
    toast({
      title: "Integration Connected",
      description: `${selectedIntegration.name} has been successfully connected.`,
      duration: 3000,
    })
    setIsConnectDialogOpen(false)
  }

  const saveSettings = () => {
    toast({
      title: "Settings Updated",
      description: `Settings for ${selectedIntegration.name} have been updated.`,
      duration: 3000,
    })
    setIsSettingsDialogOpen(false)
  }

  const saveNewIntegration = () => {
    toast({
      title: "Integration Added",
      description: "New integration has been added successfully.",
      duration: 3000,
    })
    setIsNewIntegrationDialogOpen(false)
  }

  const handleSync = (integrationId) => {
    setIsSyncing({ ...isSyncing, [integrationId]: true })
    // Simulate sync
    toast({
      title: "Sync Started",
      description: `Syncing with ${integrations.find((i) => i.id === integrationId).name}...`,
      duration: 2000,
    })
    setTimeout(() => {
      setIsSyncing({ ...isSyncing, [integrationId]: false })
      toast({
        title: "Sync Complete",
        description: `Sync with ${integrations.find((i) => i.id === integrationId).name} completed successfully!`,
        duration: 3000,
      })
    }, 2000)
  }

  const handleSaveWebhookSettings = () => {
    toast({
      title: "Webhook Settings Saved",
      description: "Your webhook settings have been updated successfully.",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Platform Integrations</h1>
        <Button onClick={handleAddNewIntegration}>
          <Plus size={16} className="mr-2" />
          Add New Integration
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Integration Status</AlertTitle>
        <AlertDescription>
          4 out of 6 integrations are currently connected and active. Connect all integrations for full platform
          functionality.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="not-connected">Not Connected</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={integration.icon || "/placeholder.svg"}
                        alt={integration.name}
                        className="h-8 w-8 object-contain"
                      />
                      <CardTitle>{integration.name}</CardTitle>
                    </div>
                    <Badge variant={integration.status === "Connected" ? "default" : "outline"}>
                      {integration.status}
                    </Badge>
                  </div>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {integration.status === "Connected" && (
                    <div className="text-sm text-muted-foreground">Last synced: {integration.lastSync}</div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {integration.status === "Connected" ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSync(integration.id)}
                        disabled={isSyncing[integration.id]}
                      >
                        {isSyncing[integration.id] ? (
                          <>
                            <RefreshCw size={16} className="mr-2 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw size={16} className="mr-2" />
                            Sync Now
                          </>
                        )}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleSettings(integration)}>
                        <Settings size={16} className="mr-2" />
                        Settings
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" onClick={() => handleConnect(integration)}>
                      <Plus size={16} className="mr-2" />
                      Connect
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((i) => i.status === "Connected")
              .map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-8 w-8 object-contain"
                        />
                        <CardTitle>{integration.name}</CardTitle>
                      </div>
                      <Badge>Connected</Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Last synced: {integration.lastSync}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(integration.id)}
                      disabled={isSyncing[integration.id]}
                    >
                      {isSyncing[integration.id] ? (
                        <>
                          <RefreshCw size={16} className="mr-2 animate-spin" />
                          Syncing...
                        </>
                      ) : (
                        <>
                          <RefreshCw size={16} className="mr-2" />
                          Sync Now
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleSettings(integration)}>
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="not-connected" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter((i) => i.status === "Not Connected")
              .map((integration) => (
                <Card key={integration.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={integration.icon || "/placeholder.svg"}
                          alt={integration.name}
                          className="h-8 w-8 object-contain"
                        />
                        <CardTitle>{integration.name}</CardTitle>
                      </div>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Connect to enable integration features</div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" onClick={() => handleConnect(integration)}>
                      <Plus size={16} className="mr-2" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
              <CardDescription>Configure webhooks for real-time data updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Global Webhook URL</Label>
                <Input id="webhook-url" value="https://api.singleaudio.com/webhooks/incoming" readOnly />
                <p className="text-sm text-muted-foreground">
                  Use this URL to receive webhook events from all connected platforms
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Webhook Events</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Content Updates</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications when content is updated</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Royalty Payments</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for royalty payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">User Activity</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for user activity</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Platform Errors</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications for platform errors</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveWebhookSettings}>Save Webhook Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connect Integration Dialog */}
      <Dialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect {selectedIntegration?.name}</DialogTitle>
            <DialogDescription>Enter your API credentials to connect to {selectedIntegration?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                placeholder="Enter your API key"
                value={connectForm.apiKey}
                onChange={(e) => setConnectForm({ ...connectForm, apiKey: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="read"
                    checked={connectForm.scopes.read}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, read: checked },
                      })
                    }
                  />
                  <Label htmlFor="read">Read access</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="write"
                    checked={connectForm.scopes.write}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, write: checked },
                      })
                    }
                  />
                  <Label htmlFor="write">Write access</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="analytics"
                    checked={connectForm.scopes.analytics}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, analytics: checked },
                      })
                    }
                  />
                  <Label htmlFor="analytics">Analytics access</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveConnection}>Connect</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Integration Settings Dialog */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedIntegration?.name} Settings</DialogTitle>
            <DialogDescription>Manage your integration settings for {selectedIntegration?.name}.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="api-key-settings">API Key</Label>
              <Input
                id="api-key-settings"
                value={connectForm.apiKey}
                onChange={(e) => setConnectForm({ ...connectForm, apiKey: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label>Permissions</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch
                    id="read-settings"
                    checked={connectForm.scopes.read}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, read: checked },
                      })
                    }
                  />
                  <Label htmlFor="read-settings">Read access</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="write-settings"
                    checked={connectForm.scopes.write}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, write: checked },
                      })
                    }
                  />
                  <Label htmlFor="write-settings">Write access</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="analytics-settings"
                    checked={connectForm.scopes.analytics}
                    onCheckedChange={(checked) =>
                      setConnectForm({
                        ...connectForm,
                        scopes: { ...connectForm.scopes, analytics: checked },
                      })
                    }
                  />
                  <Label htmlFor="analytics-settings">Analytics access</Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webhook-url-settings">Webhook URL</Label>
              <Input id="webhook-url-settings" placeholder="Enter webhook URL (optional)" />
              <p className="text-xs text-muted-foreground">Receive real-time updates from this integration</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="mr-auto"
              onClick={() => {
                toast({
                  title: "Integration Disconnected",
                  description: `${selectedIntegration.name} has been disconnected.`,
                  duration: 3000,
                })
                setIsSettingsDialogOpen(false)
              }}
            >
              Disconnect
            </Button>
            <Button onClick={saveSettings}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Integration Dialog */}
      <Dialog open={isNewIntegrationDialogOpen} onOpenChange={setIsNewIntegrationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Integration</DialogTitle>
            <DialogDescription>Connect a new service to your SingleAudio platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="integration-type">Integration Type</Label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">Select integration type...</option>
                <option value="streaming">Music Streaming Service</option>
                <option value="video">Video Platform</option>
                <option value="social">Social Media</option>
                <option value="analytics">Analytics Provider</option>
                <option value="payment">Payment Processor</option>
                <option value="custom">Custom API</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="integration-name">Integration Name</Label>
              <Input id="integration-name" placeholder="Enter a name for this integration" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="integration-api-key">API Key</Label>
              <Input id="integration-api-key" placeholder="Enter API key" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="integration-api-secret">API Secret (if applicable)</Label>
              <Input id="integration-api-secret" placeholder="Enter API secret" type="password" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="integration-endpoint">API Endpoint</Label>
              <Input id="integration-endpoint" placeholder="https://api.example.com/v1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewIntegrationDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewIntegration}>Add Integration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
