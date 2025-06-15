"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function RequestAccessForm() {
  const { requestAccess } = useAuth()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    reason: "",
    website: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const success = await requestAccess(formData)

    if (success) {
      setSubmitted(true)
    }

    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }))
  }

  if (submitted) {
    return (
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <img src="/logo.png" alt="Single Audio" className="w-8 h-8 object-contain" />
          </div>
          <span className="font-semibold text-blue-600">Single Audio</span>
        </div>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Request Submitted!</h1>
            <p className="text-gray-600">
              Your access request has been submitted successfully. An admin will review your request and contact you
              within 24-48 hours.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">We'll send you an email confirmation shortly with next steps.</p>

            <Link href="/login">
              <Button variant="outline" className="w-full h-11">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">SA</span>
        </div>
        <span className="font-semibold text-blue-600">Single Audio</span>
      </div>

      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-gray-500">ACCESS REQUEST</p>
        <h1 className="text-2xl font-bold">Join our platform</h1>
        <p className="text-sm text-gray-500">Submit your information for admin approval</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm">
              Full Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm">
              Email Address *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="h-11"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company" className="text-sm">
              Company/Label
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Your company or record label"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm">
              Role *
            </Label>
            <Select onValueChange={handleSelectChange} required>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artist">Artist</SelectItem>
                <SelectItem value="producer">Producer</SelectItem>
                <SelectItem value="label-manager">Label Manager</SelectItem>
                <SelectItem value="content-creator">Content Creator</SelectItem>
                <SelectItem value="distributor">Distributor</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm">
              Website/Social Media
            </Label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Your website or main social media"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Your phone number"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reason" className="text-sm">
            Why do you need access? *
          </Label>
          <Textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Briefly explain why you need access to the platform and how you plan to use it"
            rows={4}
            className="resize-none"
            required
          />
        </div>

        <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Request...
            </>
          ) : (
            "Submit Access Request"
          )}
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have access?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
