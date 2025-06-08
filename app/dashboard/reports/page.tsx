"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Download,
  FileText,
  CalendarIcon,
  Filter,
  Plus,
  Eye,
  Share2,
  TrendingUp,
  DollarSign,
  Music,
} from "lucide-react"
import { format } from "date-fns"

interface Report {
  id: string
  name: string
  type: "revenue" | "analytics" | "royalty" | "streaming"
  dateRange: string
  status: "completed" | "processing" | "failed"
  createdAt: string
  fileSize: string
  downloadUrl?: string
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Monthly Revenue Report - December 2023",
    type: "revenue",
    dateRange: "Dec 1-31, 2023",
    status: "completed",
    createdAt: "2024-01-02",
    fileSize: "2.4 MB",
    downloadUrl: "/reports/revenue-dec-2023.pdf",
  },
  {
    id: "2",
    name: "Streaming Analytics Q4 2023",
    type: "analytics",
    dateRange: "Oct 1 - Dec 31, 2023",
    status: "completed",
    createdAt: "2024-01-01",
    fileSize: "1.8 MB",
    downloadUrl: "/reports/analytics-q4-2023.pdf",
  },
  {
    id: "3",
    name: "Royalty Distribution Report",
    type: "royalty",
    dateRange: "Nov 1-30, 2023",
    status: "processing",
    createdAt: "2024-01-01",
    fileSize: "Processing...",
  },
]

export default function ReportsPage() {
  const { setCurrentPage, addNotification } = useDashboard()
  const [reports, setReports] = useState<Report[]>(mockReports)
  const [showNewReportDialog, setShowNewReportDialog] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filterType, setFilterType] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [newReport, setNewReport] = useState({
    name: "",
    type: "revenue",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    includeBreakdown: true,
    includeComparisons: false,
  })

  useEffect(() => {
    setCurrentPage("Revenue Reports")
  }, [setCurrentPage])

  const filteredReports = reports.filter((report) => {
    const matchesType = filterType === "all" || report.type === filterType
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  const handleGenerateReport = async () => {
    if (!newReport.name || !newReport.startDate || !newReport.endDate) {
      addNotification({
        type: "error",
        title: "Missing Information",
        message: "Please fill in all required fields",
      })
      return
    }

    setIsGenerating(true)
    console.log("Generating report:", newReport)

    // Simulate report generation
    setTimeout(() => {
      const report: Report = {
        id: Date.now().toString(),
        name: newReport.name,
        type: newReport.type as any,
        dateRange: `${format(newReport.startDate!, "MMM d")} - ${format(newReport.endDate!, "MMM d, yyyy")}`,
        status: "processing",
        createdAt: new Date().toISOString().split("T")[0],
        fileSize: "Processing...",
      }

      setReports([report, ...reports])
      setIsGenerating(false)
      setShowNewReportDialog(false)
      setNewReport({
        name: "",
        type: "revenue",
        startDate: undefined,
        endDate: undefined,
        includeBreakdown: true,
        includeComparisons: false,
      })

      addNotification({
        type: "success",
        title: "Report Generation Started",
        message: "Your report is being generated and will be ready shortly",
      })

      // Simulate completion after 5 seconds
      setTimeout(() => {
        setReports((prev) =>
          prev.map((r) =>
            r.id === report.id
              ? {
                  ...r,
                  status: "completed" as const,
                  fileSize: "1.2 MB",
                  downloadUrl: `/reports/${report.id}.pdf`,
                }
              : r,
          ),
        )

        addNotification({
          type: "success",
          title: "Report Ready",
          message: `${report.name} has been generated and is ready for download`,
        })
      }, 5000)
    }, 2000)
  }

  const handleDownloadReport = (report: Report) => {
    if (report.status !== "completed" || !report.downloadUrl) {
      addNotification({
        type: "error",
        title: "Download Failed",
        message: "Report is not ready for download yet",
      })
      return
    }

    console.log("Downloading report:", report.name)

    // Create a mock CSV content for download
    const csvContent = `Report: ${report.name}
Date Range: ${report.dateRange}
Generated: ${report.createdAt}

Platform,Streams,Revenue
Spotify,125430,$892.45
Apple Music,89234,$634.78
YouTube Music,45678,$324.56
Amazon Music,23456,$167.89
Deezer,12345,$89.34

Total Streams: 296143
Total Revenue: $2109.02`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${report.name.replace(/\s+/g, "-").toLowerCase()}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    addNotification({
      type: "success",
      title: "Download Started",
      message: `${report.name} is being downloaded`,
    })
  }

  const handleShareReport = (report: Report) => {
    const shareUrl = `${window.location.origin}/reports/shared/${report.id}`
    navigator.clipboard.writeText(shareUrl)

    addNotification({
      type: "success",
      title: "Link Copied",
      message: "Report sharing link copied to clipboard",
    })
  }

  const handleViewReport = (report: Report) => {
    console.log("Viewing report:", report.name)
    addNotification({
      type: "info",
      title: "Opening Report",
      message: `Opening ${report.name} in viewer`,
    })
    // In a real app, this would open a report viewer
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-600/20 text-green-400 border-green-600/30",
      processing: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      failed: "bg-red-600/20 text-red-400 border-red-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Revenue Reports</h1>
          <p className="text-gray-400">Generate and download detailed revenue and analytics reports</p>
        </div>
        <Button onClick={() => setShowNewReportDialog(true)} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Reports</p>
                <p className="text-2xl font-bold text-white">{reports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">$2,847.92</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Streams</p>
                <p className="text-2xl font-bold text-white">1.2M</p>
              </div>
              <Music className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Growth</p>
                <p className="text-2xl font-bold text-white">+12.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
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
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white w-40">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="royalty">Royalty</SelectItem>
                  <SelectItem value="streaming">Streaming</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-gray-300 hover:text-white"
                onClick={() => {
                  console.log("Opening advanced filters")
                  addNotification({
                    type: "info",
                    title: "Advanced Filters",
                    message: "Advanced filtering options coming soon",
                  })
                }}
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Generated Reports</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredReports.length} of {reports.length} reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">{report.name}</h3>
                        {getStatusBadge(report.status)}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{report.dateRange}</span>
                        <span>Created: {new Date(report.createdAt).toLocaleDateString()}</span>
                        <span>Size: {report.fileSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewReport(report)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadReport(report)}
                        disabled={report.status !== "completed"}
                        className="text-gray-400 hover:text-white disabled:opacity-50"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShareReport(report)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No reports found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generate New Report Dialog */}
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="bg-gray-900 border-gray-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Generate New Report</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a custom report with your specified parameters
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reportName" className="text-gray-300">
                Report Name *
              </Label>
              <Input
                id="reportName"
                value={newReport.name}
                onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
                placeholder="Enter report name"
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Report Type *</Label>
              <Select value={newReport.type} onValueChange={(value) => setNewReport({ ...newReport, type: value })}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="analytics">Analytics Report</SelectItem>
                  <SelectItem value="royalty">Royalty Report</SelectItem>
                  <SelectItem value="streaming">Streaming Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newReport.startDate ? format(newReport.startDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                    <Calendar
                      mode="single"
                      selected={newReport.startDate}
                      onSelect={(date) => setNewReport({ ...newReport, startDate: date })}
                      initialFocus
                      className="bg-gray-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newReport.endDate ? format(newReport.endDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                    <Calendar
                      mode="single"
                      selected={newReport.endDate}
                      onSelect={(date) => setNewReport({ ...newReport, endDate: date })}
                      initialFocus
                      className="bg-gray-900 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewReportDialog(false)}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
