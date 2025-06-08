"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, UserPlus, Mail, Shield, Settings, MoreHorizontal, Search, Filter, Crown, User, Eye } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "owner" | "admin" | "editor" | "viewer"
  status: "active" | "pending" | "inactive"
  joinedDate: string
  lastActive: string
  avatar?: string
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "owner",
    status: "active",
    joinedDate: "2023-06-15",
    lastActive: "2024-01-20",
    avatar: "JD",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    role: "admin",
    status: "active",
    joinedDate: "2023-08-22",
    lastActive: "2024-01-19",
    avatar: "SW",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "editor",
    status: "active",
    joinedDate: "2023-10-10",
    lastActive: "2024-01-18",
    avatar: "MJ",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "viewer",
    status: "pending",
    joinedDate: "2024-01-15",
    lastActive: "Never",
    avatar: "ED",
  },
]

export default function TeamPage() {
  const { setCurrentPage } = useDashboard()
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers)
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [inviteForm, setInviteForm] = useState({
    email: "",
    name: "",
    role: "viewer",
  })

  useEffect(() => {
    setCurrentPage("Team Management")
  }, [setCurrentPage])

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    return matchesSearch && matchesRole
  })

  const handleInviteMember = () => {
    if (!inviteForm.email || !inviteForm.name) {
      alert("Please fill in all required fields")
      return
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role as any,
      status: "pending",
      joinedDate: new Date().toISOString().split("T")[0],
      lastActive: "Never",
      avatar: inviteForm.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    }

    setTeamMembers([...teamMembers, newMember])
    setInviteForm({ email: "", name: "", role: "viewer" })
    setShowInviteDialog(false)
    alert(`Invitation sent to ${inviteForm.email}`)
  }

  const handleEditRole = (member: TeamMember) => {
    setSelectedMember(member)
    setShowEditDialog(true)
  }

  const handleUpdateRole = () => {
    if (!selectedMember) return

    setTeamMembers(teamMembers.map((member) => (member.id === selectedMember.id ? selectedMember : member)))
    setShowEditDialog(false)
    setSelectedMember(null)
    alert("Member role updated successfully")
  }

  const handleResendInvite = (member: TeamMember) => {
    alert(`Invitation resent to ${member.email}`)
  }

  const handleRemoveMember = (member: TeamMember) => {
    if (confirm(`Are you sure you want to remove ${member.name}?`)) {
      setTeamMembers(teamMembers.filter((m) => m.id !== member.id))
      alert(`${member.name} has been removed from the team`)
    }
  }

  const getRoleBadge = (role: string) => {
    const variants = {
      owner: "bg-purple-600/20 text-purple-400 border-purple-600/30",
      admin: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      editor: "bg-green-600/20 text-green-400 border-green-600/30",
      viewer: "bg-gray-600/20 text-gray-400 border-gray-600/30",
    }

    return (
      <Badge className={variants[role as keyof typeof variants]}>{role.charAt(0).toUpperCase() + role.slice(1)}</Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-600/20 text-green-400 border-green-600/30",
      pending: "bg-yellow-600/20 text-yellow-400 border-yellow-600/30",
      inactive: "bg-red-600/20 text-red-400 border-red-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-purple-400" />
      case "admin":
        return <Shield className="h-4 w-4 text-blue-400" />
      case "editor":
        return <Settings className="h-4 w-4 text-green-400" />
      case "viewer":
        return <Eye className="h-4 w-4 text-gray-400" />
      default:
        return <User className="h-4 w-4 text-gray-400" />
    }
  }

  const activeMembers = teamMembers.filter((m) => m.status === "active").length
  const pendingInvites = teamMembers.filter((m) => m.status === "pending").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Team Management</h1>
          <p className="text-gray-400">Manage your team members and their permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowInviteDialog(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Members</p>
                <p className="text-2xl font-bold text-white">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Members</p>
                <p className="text-2xl font-bold text-white">{activeMembers}</p>
              </div>
              <Shield className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Pending Invites</p>
                <p className="text-2xl font-bold text-white">{pendingInvites}</p>
              </div>
              <Mail className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admins</p>
                <p className="text-2xl font-bold text-white">
                  {teamMembers.filter((m) => m.role === "admin" || m.role === "owner").length}
                </p>
              </div>
              <Crown className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="owner">Owner</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="border-white/20 text-gray-300 hover:text-white">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Team Members</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredMembers.length} of {teamMembers.length} members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredMembers.map((member) => (
              <Card key={member.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-white truncate">{member.name}</h3>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-gray-400 text-sm mb-2">{member.email}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>Joined: {new Date(member.joinedDate).toLocaleDateString()}</span>
                            <span>
                              Last active:{" "}
                              {member.lastActive === "Never"
                                ? "Never"
                                : new Date(member.lastActive).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {getRoleBadge(member.role)}
                          {getStatusBadge(member.status)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-white/20 text-gray-300">
                            {member.role === "owner"
                              ? "Full Access"
                              : member.role === "admin"
                                ? "Admin Access"
                                : member.role === "editor"
                                  ? "Edit Access"
                                  : "View Only"}
                          </Badge>
                        </div>

                        <div className="flex items-center space-x-2">
                          {member.role !== "owner" && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-gray-400 hover:text-white"
                                onClick={() => handleEditRole(member)}
                              >
                                Edit Role
                              </Button>

                              {member.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-400 hover:text-blue-300"
                                  onClick={() => handleResendInvite(member)}
                                >
                                  Resend Invite
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-400 hover:text-red-300"
                                onClick={() => handleRemoveMember(member)}
                              >
                                Remove
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No team members found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invite Member Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Invite Team Member</DialogTitle>
            <DialogDescription className="text-gray-400">
              Send an invitation to add a new member to your team
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                placeholder="Enter email address"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="invite-name"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                placeholder="Enter full name"
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Role</Label>
              <Select value={inviteForm.role} onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="viewer">Viewer</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteMember} className="bg-purple-600 hover:bg-purple-700">
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Member Role</DialogTitle>
            <DialogDescription className="text-gray-400">
              Change the role and permissions for {selectedMember?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Role</Label>
                <Select
                  value={selectedMember.role}
                  onValueChange={(value) => setSelectedMember({ ...selectedMember, role: value as any })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateRole} className="bg-purple-600 hover:bg-purple-700">
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Permissions */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Role Permissions</CardTitle>
          <CardDescription className="text-gray-400">
            Understanding what each role can do in your workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Owner",
                icon: Crown,
                color: "purple",
                permissions: ["Full access", "Manage billing", "Delete workspace", "Manage all members"],
              },
              {
                role: "Admin",
                icon: Shield,
                color: "blue",
                permissions: ["Manage releases", "View analytics", "Manage team", "Access all tools"],
              },
              {
                role: "Editor",
                icon: Settings,
                color: "green",
                permissions: ["Create releases", "Edit content", "View reports", "Use AI tools"],
              },
              {
                role: "Viewer",
                icon: Eye,
                color: "gray",
                permissions: ["View releases", "View analytics", "Download reports", "Read-only access"],
              },
            ].map((roleInfo, index) => (
              <Card key={index} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-8 h-8 bg-${roleInfo.color}-600/20 rounded-lg flex items-center justify-center`}>
                      <roleInfo.icon className={`h-4 w-4 text-${roleInfo.color}-400`} />
                    </div>
                    <h3 className="text-white font-semibold">{roleInfo.role}</h3>
                  </div>
                  <ul className="space-y-2">
                    {roleInfo.permissions.map((permission, permIndex) => (
                      <li key={permIndex} className="text-gray-400 text-sm flex items-center space-x-2">
                        <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        <span>{permission}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
