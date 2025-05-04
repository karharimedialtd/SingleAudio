"use client"

import { useState } from "react"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle, Shield, ShieldAlert, Lock, Key, UserPlus, Eye, EyeOff, Download } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for security logs
const securityLogs = [
  {
    id: 1,
    event: "Login Attempt",
    status: "Success",
    user: "admin@example.com",
    ip: "192.168.1.1",
    date: "2023-04-15 14:30:22",
    location: "New York, US",
  },
  {
    id: 2,
    event: "Password Change",
    status: "Success",
    user: "admin@example.com",
    ip: "192.168.1.1",
    date: "2023-04-14 10:15:45",
    location: "New York, US",
  },
  {
    id: 3,
    event: "Login Attempt",
    status: "Failed",
    user: "admin@example.com",
    ip: "203.0.113.1",
    date: "2023-04-13 08:22:10",
    location: "Unknown",
  },
  {
    id: 4,
    event: "API Key Generated",
    status: "Success",
    user: "admin@example.com",
    ip: "192.168.1.1",
    date: "2023-04-12 16:45:33",
    location: "New York, US",
  },
  {
    id: 5,
    event: "Permission Change",
    status: "Success",
    user: "admin@example.com",
    ip: "192.168.1.1",
    date: "2023-04-11 11:30:15",
    location: "New York, US",
  },
  {
    id: 6,
    event: "Login Attempt",
    status: "Failed",
    user: "unknown@example.com",
    ip: "203.0.113.5",
    date: "2023-04-10 22:10:05",
    location: "Unknown",
  },
]

// Sample data for API keys
const apiKeys = [
  {
    id: "key_1",
    name: "Production API Key",
    key: "••••••••••••••••",
    created: "2023-03-15",
    lastUsed: "2023-04-15",
    status: "Active",
  },
  {
    id: "key_2",
    name: "Development API Key",
    key: "••••••••••••••••",
    created: "2023-03-20",
    lastUsed: "2023-04-14",
    status: "Active",
  },
  {
    id: "key_3",
    name: "Testing API Key",
    key: "••••••••••••••••",
    created: "2023-03-25",
    lastUsed: "2023-04-10",
    status: "Inactive",
  },
]

export default function AdminSecurity() {
  const [isNewKeyDialogOpen, setIsNewKeyDialogOpen] = useState(false)
  const [isViewKeyDialogOpen, setIsViewKeyDialogOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState(null)
  const [newKeyForm, setNewKeyForm] = useState({
    name: "",
    permissions: "read",
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleCreateKey = () => {
    // In a real app, you would create a new API key here
    alert(`API Key "${newKeyForm.name}" created successfully!`)
    setIsNewKeyDialogOpen(false)
  }

  const handleViewKey = (key) => {
    setSelectedKey(key)
    setIsViewKeyDialogOpen(true)
  }

  const handleRevokeKey = (keyId) => {
    // In a real app, you would revoke the API key here
    alert(`API Key revoked successfully!`)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Security Settings</h1>
      </div>

      <Alert variant="default" className="bg-yellow-50 text-yellow-800 border-yellow-200">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>Security Notice</AlertTitle>
        <AlertDescription>
          Your last security audit was completed 30 days ago. Consider running a new security scan.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General Security</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="access">Access Control</TabsTrigger>
          <TabsTrigger value="logs">Security Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
              <CardDescription>Configure authentication methods and security policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all admin users</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Password Complexity</Label>
                    <p className="text-sm text-muted-foreground">
                      Require strong passwords (min. 12 chars, special chars, numbers)
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Password Expiration</Label>
                    <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">IP Restrictions</Label>
                    <p className="text-sm text-muted-foreground">Limit admin access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2 pt-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue={30} min={5} max={120} />
                  <p className="text-xs text-muted-foreground">
                    Automatically log out inactive users after this period
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Scan</CardTitle>
              <CardDescription>Run a security scan to identify potential vulnerabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Last scan completed on April 1, 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No critical vulnerabilities found</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  <span>2 medium-risk issues identified</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Run Security Scan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API keys for platform access</CardDescription>
                </div>
                <Button onClick={() => setIsNewKeyDialogOpen(true)}>
                  <Key className="mr-2 h-4 w-4" />
                  Create New API Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>{key.key}</TableCell>
                      <TableCell>{key.created}</TableCell>
                      <TableCell>{key.lastUsed}</TableCell>
                      <TableCell>
                        <Badge variant={key.status === "Active" ? "default" : "secondary"}>{key.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewKey(key)}>
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleRevokeKey(key.id)}>
                            <Lock size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="access" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Role-Based Access Control</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </div>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New Role
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Administrator</TableCell>
                    <TableCell>Full system access</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>All</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Content Manager</TableCell>
                    <TableCell>Manage content and analytics</TableCell>
                    <TableCell>5</TableCell>
                    <TableCell>Content, Analytics</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Support</TableCell>
                    <TableCell>Handle support requests</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Support, Limited Content</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Viewer</TableCell>
                    <TableCell>View-only access</TableCell>
                    <TableCell>8</TableCell>
                    <TableCell>Read-only</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Security Audit Logs</CardTitle>
                  <CardDescription>View security-related events and activities</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date & Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.event}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "Success" ? "default" : "destructive"}>{log.status}</Badge>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell>{log.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Showing 6 of 245 events</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create New API Key Dialog */}
      <Dialog open={isNewKeyDialogOpen} onOpenChange={setIsNewKeyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New API Key</DialogTitle>
            <DialogDescription>Generate a new API key for secure platform access.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="key-name">Key Name</Label>
              <Input
                id="key-name"
                placeholder="e.g., Production API Key"
                value={newKeyForm.name}
                onChange={(e) => setNewKeyForm({ ...newKeyForm, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key-permissions">Permissions</Label>
              <Select
                value={newKeyForm.permissions}
                onValueChange={(value) => setNewKeyForm({ ...newKeyForm, permissions: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read Only</SelectItem>
                  <SelectItem value="write">Read & Write</SelectItem>
                  <SelectItem value="admin">Full Admin Access</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Select the level of access for this API key</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="key-expiration">Expiration (Optional)</Label>
              <Input id="key-expiration" type="date" placeholder="Never expires" />
              <p className="text-xs text-muted-foreground">
                Leave blank for a non-expiring key (not recommended for production)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewKeyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateKey}>Generate API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View API Key Dialog */}
      <Dialog open={isViewKeyDialogOpen} onOpenChange={setIsViewKeyDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>API Key Details</DialogTitle>
            <DialogDescription>View and manage API key information.</DialogDescription>
          </DialogHeader>
          {selectedKey && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Key Name</Label>
                <div className="p-2 border rounded-md bg-muted">{selectedKey.name}</div>
              </div>
              <div className="grid gap-2">
                <Label>API Key</Label>
                <div className="relative">
                  <Input
                    value={showPassword ? "sk_live_example_key_12345678901234" : selectedKey.key}
                    readOnly
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Created</Label>
                  <div className="p-2 border rounded-md bg-muted">{selectedKey.created}</div>
                </div>
                <div className="grid gap-2">
                  <Label>Last Used</Label>
                  <div className="p-2 border rounded-md bg-muted">{selectedKey.lastUsed}</div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewKeyDialogOpen(false)}>
              Close
            </Button>
            <Button variant="destructive" onClick={() => handleRevokeKey(selectedKey?.id)}>
              Revoke Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
