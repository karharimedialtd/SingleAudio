"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function AddUserPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "creator",
    sendInvite: true,
    status: "active",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    toast({
      title: "Creating User",
      description: "Processing your request...",
      duration: 2000,
    })

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "User Created",
        description: `${formData.firstName} ${formData.lastName} has been added successfully.`,
        duration: 3000,
      })
      router.push("/admin/users")
    }, 1500)
  }

  const handleCancel = () => {
    router.push("/admin/users")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New User</h1>
            <p className="text-sm text-muted-foreground">Create a new user account</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="settings">Account Settings</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="basic" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Enter the basic details for the new user</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">User Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleChange("role", value)}>
                    <SelectTrigger>
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
                <div className="flex items-center space-x-2">
                  <Switch
                    id="sendInvite"
                    checked={formData.sendInvite}
                    onCheckedChange={(checked) => handleChange("sendInvite", checked)}
                  />
                  <Label htmlFor="sendInvite">Send welcome email with login instructions</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Permissions</CardTitle>
                <CardDescription>Configure what this user can access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Content Management</Label>
                      <p className="text-sm text-muted-foreground">Upload and manage content</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Analytics Access</Label>
                      <p className="text-sm text-muted-foreground">View analytics and reports</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Monetization</Label>
                      <p className="text-sm text-muted-foreground">Manage revenue and payment settings</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">User Management</Label>
                      <p className="text-sm text-muted-foreground">Manage other users (Admin only)</p>
                    </div>
                    <Switch checked={formData.role === "admin"} disabled={formData.role !== "admin"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Platform Settings</Label>
                      <p className="text-sm text-muted-foreground">Configure platform settings (Admin only)</p>
                    </div>
                    <Switch checked={formData.role === "admin"} disabled={formData.role !== "admin"} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Configure additional account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Account Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending Verification</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input id="password" type="password" placeholder="Leave blank to auto-generate" />
                  <p className="text-xs text-muted-foreground">
                    If left blank, a secure password will be generated and sent to the user
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="forceReset" defaultChecked />
                  <Label htmlFor="forceReset">Require password change on first login</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-purple-600 hover:bg-purple-700">
              {isSubmitting ? (
                <>
                  <UserPlus className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}
