"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Download,
  MoreHorizontal,
  Plus,
  Search,
  Shield,
  User,
  Music,
  Youtube,
  Lock,
  Mail,
  RefreshCw,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample user data
const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john@example.com",
    role: "Creator",
    status: "Active",
    lastLogin: "2 hours ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "5 minutes ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-003",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Artist",
    status: "Active",
    lastLogin: "1 day ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-004",
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "Label",
    status: "Active",
    lastLogin: "3 days ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-005",
    name: "Alex Rodriguez",
    email: "alex@example.com",
    role: "Creator",
    status: "Suspended",
    lastLogin: "2 weeks ago",
    verified: false,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-006",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    role: "Artist",
    status: "Active",
    lastLogin: "4 hours ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-007",
    name: "David Kim",
    email: "david@example.com",
    role: "Creator",
    status: "Inactive",
    lastLogin: "1 month ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
  {
    id: "USR-008",
    name: "Olivia Martinez",
    email: "olivia@example.com",
    role: "Label",
    status: "Active",
    lastLogin: "1 hour ago",
    verified: true,
    avatar: "/abstract-profile.png",
  },
]

export default function UsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [displayedUsers, setDisplayedUsers] = useState(users)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter users based on search term, role, and status
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesRole = selectedRole === "all" || user.role.toLowerCase() === selectedRole.toLowerCase()

      const matchesStatus = selectedStatus === "all" || user.status.toLowerCase() === selectedStatus.toLowerCase()

      return matchesSearch && matchesRole && matchesStatus
    })

    setDisplayedUsers(filtered)
  }, [searchTerm, selectedRole, selectedStatus])

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="h-4 w-4 text-purple-500" />
      case "creator":
        return <Youtube className="h-4 w-4 text-red-500" />
      case "artist":
        return <Music className="h-4 w-4 text-blue-500" />
      case "label":
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "inactive":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Inactive
          </Badge>
        )
      case "suspended":
        return <Badge className="bg-red-500">Suspended</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handleAddUser = () => {
    toast({
      title: "Add User",
      description: "Opening user creation form",
      duration: 3000,
    })
    router.push("/admin/users/add")
  }

  const handleExport = () => {
    toast({
      title: "Export Users",
      description: "User data export started. You'll be notified when it's ready.",
      duration: 3000,
    })
    // In a real app, this would trigger a download
  }

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Refreshed",
        description: "User data has been refreshed.",
        duration: 3000,
      })
    }, 1000)
  }

  const handleUserAction = (action: string, user: (typeof users)[0]) => {
    switch (action) {
      case "View Profile":
        toast({
          title: "View Profile",
          description: `Viewing profile for ${user.name}.`,
          duration: 2000,
        })
        router.push(`/admin/users/${user.id}`)
        break
      case "Edit Permissions":
        toast({
          title: "Edit Permissions",
          description: `Editing permissions for ${user.name}.`,
          duration: 2000,
        })
        router.push(`/admin/users/${user.id}/permissions`)
        break
      case "Send Message":
        toast({
          title: "Send Message",
          description: `Opening message composer for ${user.name}.`,
          duration: 2000,
        })
        router.push(`/admin/messages/compose?to=${user.id}`)
        break
      case "Suspend Account":
        toast({
          title: "Suspend Account",
          description: `Account for ${user.name} has been suspended.`,
          duration: 2000,
        })
        // In a real app, this would open a confirmation dialog
        break
      default:
        toast({
          title: action,
          description: `Action ${action} performed on user ${user.name}.`,
          duration: 2000,
        })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Management</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="h-8" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-8" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button size="sm" className="h-8 bg-purple-600 hover:bg-purple-700" onClick={handleAddUser}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Directory</CardTitle>
          <CardDescription>Manage and monitor all platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, email, or ID..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all" onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="creator">Creator</SelectItem>
                  <SelectItem value="artist">Artist</SelectItem>
                  <SelectItem value="label">Label</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all" onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-16 text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : displayedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-16 text-center">
                      No users found matching your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => router.push(`/admin/users/${user.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <span>{user.role}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.lastLogin}</TableCell>
                      <TableCell>
                        {user.verified ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            Unverified
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUserAction("View Profile", user)
                              }}
                            >
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUserAction("Edit Permissions", user)
                              }}
                            >
                              <Lock className="mr-2 h-4 w-4" />
                              Edit Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUserAction("Send Message", user)
                              }}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-500"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleUserAction("Suspend Account", user)
                              }}
                            >
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
