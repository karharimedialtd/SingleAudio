"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { BookOpen, FileQuestion, HelpCircle, Search, ThumbsUp, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data
const faqs = [
  {
    id: 1,
    question: "How do I upload my music?",
    answer:
      "To upload your music, go to the Upload page from the main navigation. You can upload audio files, add metadata, artwork, and select distribution platforms. Follow the step-by-step process to complete your release.",
    category: "Upload",
  },
  {
    id: 2,
    question: "When will I get paid?",
    answer:
      "Royalty payments are processed monthly. Once your earnings reach the minimum threshold ($50), they will be transferred to your selected payment method on the 15th of each month. You can view your earnings and payment history in the Royalties section.",
    category: "Payments",
  },
  {
    id: 3,
    question: "How do I set up royalty splits?",
    answer:
      "You can set up royalty splits in the Splits section. Select the track you want to manage, add collaborators with their email addresses, and assign percentage splits. All collaborators will need to confirm their splits before payments are distributed.",
    category: "Royalties",
  },
  {
    id: 4,
    question: "How long does it take for my music to appear on streaming platforms?",
    answer:
      "After submission, your music typically takes 1-3 business days for review. Once approved, it takes approximately 2-5 business days to appear on major platforms like Spotify and Apple Music. Some platforms may take longer, up to 2-3 weeks.",
    category: "Distribution",
  },
  {
    id: 5,
    question: "Can I change my release date after submission?",
    answer:
      "Yes, you can change your release date as long as it's at least 7 days in the future. Go to your Releases page, select the release, and update the release date. Note that frequent changes may delay distribution.",
    category: "Distribution",
  },
]

const tutorials = [
  {
    id: 1,
    title: "Getting Started with SingleAudio",
    description: "Learn the basics of the platform and how to navigate the dashboard",
    duration: "5:32",
    thumbnail: "/placeholder.svg?key=p0tlx",
  },
  {
    id: 2,
    title: "How to Upload and Distribute Your Music",
    description: "Step-by-step guide to uploading and distributing your tracks",
    duration: "8:45",
    thumbnail: "/placeholder.svg?key=5wzjh",
  },
  {
    id: 3,
    title: "Understanding Royalties and Payments",
    description: "Learn how royalties are calculated and how payments work",
    duration: "7:20",
    thumbnail: "/placeholder.svg?key=hbps2",
  },
  {
    id: 4,
    title: "Setting Up Artist Profiles and Splits",
    description: "How to manage artist profiles and set up royalty splits",
    duration: "6:15",
    thumbnail: "/placeholder.svg?key=md28q",
  },
]

const tickets = [
  {
    id: 1,
    subject: "Missing royalty payment",
    date: "2023-08-01",
    status: "Open",
    lastUpdate: "2023-08-02",
  },
  {
    id: 2,
    subject: "Release not appearing on Spotify",
    date: "2023-07-25",
    status: "Closed",
    lastUpdate: "2023-07-28",
  },
  {
    id: 3,
    subject: "How to change artist name",
    date: "2023-07-15",
    status: "Resolved",
    lastUpdate: "2023-07-16",
  },
]

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("help-center")
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "distribution",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleTicketChange = (field: string, value: string) => {
    setTicketForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitTicket = () => {
    if (!ticketForm.subject || !ticketForm.message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Ticket submitted",
        description: "We'll get back to you as soon as possible",
      })
      setTicketForm({
        subject: "",
        category: "distribution",
        message: "",
      })
    }, 1500)
  }

  const handleWatchTutorial = (id: number) => {
    toast({
      title: "Opening tutorial",
      description: `Tutorial #${id} is loading`,
    })
  }

  const handleViewTicket = (id: number) => {
    toast({
      title: "Opening ticket",
      description: `Ticket #${id} details are loading`,
    })
  }

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Support</h1>
        <p className="text-sm text-gray-400">Get help and support for your music distribution</p>
      </div>

      <Tabs defaultValue="help-center" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="help-center">Help Center</TabsTrigger>
          <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "help-center" && (
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search help articles..."
              className="pl-8 bg-gray-950 border-gray-800"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                    <FileQuestion className="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Getting Started</h3>
                    <p className="text-xs text-gray-400">Platform basics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                    <FileQuestion className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Distribution</h3>
                    <p className="text-xs text-gray-400">Release management</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                    <FileQuestion className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Royalties</h3>
                    <p className="text-xs text-gray-400">Payments & splits</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-gray-900">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20">
                    <FileQuestion className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Account</h3>
                    <p className="text-xs text-gray-400">Settings & security</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq) => (
                    <div key={faq.id} className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 mt-0.5">
                            <HelpCircle className="h-3 w-3 text-purple-500" />
                          </div>
                          <div>
                            <h3 className="font-medium">{faq.question}</h3>
                            <Badge variant="outline" className="mt-1 mb-2">
                              {faq.category}
                            </Badge>
                            <p className="text-sm text-gray-400">{faq.answer}</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                      <FileQuestion className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No results found</h3>
                    <p className="mt-2 text-center text-gray-400">
                      Try adjusting your search or browse the help categories
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <Button variant="outline" className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                View All Help Articles
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {activeTab === "tutorials" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Video Tutorials</CardTitle>
              <CardDescription>Learn how to use the platform with step-by-step guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className="rounded-lg border border-gray-800 bg-gray-950 overflow-hidden cursor-pointer"
                    onClick={() => handleWatchTutorial(tutorial.id)}
                  >
                    <div className="relative">
                      <img
                        src={tutorial.thumbnail || "/placeholder.svg"}
                        alt={tutorial.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                          <Video className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {tutorial.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{tutorial.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">{tutorial.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "contact" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Contact Support</CardTitle>
              <CardDescription>Submit a support ticket and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={ticketForm.subject}
                  onChange={(e) => handleTicketChange("subject", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={ticketForm.category} onValueChange={(value) => handleTicketChange("category", value)}>
                  <SelectTrigger className="bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distribution">Distribution</SelectItem>
                    <SelectItem value="royalties">Royalties & Payments</SelectItem>
                    <SelectItem value="account">Account & Settings</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={ticketForm.message}
                  onChange={(e) => handleTicketChange("message", e.target.value)}
                  className="min-h-32 bg-gray-950 border-gray-800"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <Button
                onClick={handleSubmitTicket}
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Ticket"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {activeTab === "tickets" && (
        <div className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">My Support Tickets</CardTitle>
              <CardDescription>View and manage your support requests</CardDescription>
            </CardHeader>
            <CardContent>
              {tickets.length > 0 ? (
                <div className="rounded-md border border-gray-800">
                  <div className="grid grid-cols-12 gap-2 border-b border-gray-800 bg-gray-950 p-3 text-xs font-medium text-gray-400">
                    <div className="col-span-5">Subject</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Last Update</div>
                    <div className="col-span-1"></div>
                  </div>
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="grid grid-cols-12 gap-2 border-b border-gray-800 p-3 text-sm last:border-0"
                    >
                      <div className="col-span-5">{ticket.subject}</div>
                      <div className="col-span-2 text-gray-400">{ticket.date}</div>
                      <div className="col-span-2">
                        <Badge
                          variant={
                            ticket.status === "Open"
                              ? "default"
                              : ticket.status === "Resolved"
                                ? "success"
                                : "secondary"
                          }
                          className={
                            ticket.status === "Open"
                              ? "bg-blue-500/20 text-blue-500"
                              : ticket.status === "Resolved"
                                ? "bg-green-500/20 text-green-500"
                                : "bg-gray-500/20 text-gray-400"
                          }
                        >
                          {ticket.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-gray-400">{ticket.lastUpdate}</div>
                      <div className="col-span-1 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewTicket(ticket.id)}
                          className="h-7 text-xs"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800">
                    <FileQuestion className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No tickets found</h3>
                  <p className="mt-2 text-center text-gray-400">You haven't submitted any support tickets yet</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4">
              <Button variant="outline" className="w-full" onClick={() => setActiveTab("contact")}>
                Create New Ticket
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
