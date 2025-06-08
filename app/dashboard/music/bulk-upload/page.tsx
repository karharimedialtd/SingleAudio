"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileUploader } from "@/components/shared/file-uploader"
import { Upload, FileText, Music, ImageIcon, CheckCircle, AlertCircle, Clock, Download, Trash2 } from "lucide-react"

interface BulkUploadFile {
  id: string
  name: string
  type: "audio" | "image" | "metadata"
  size: number
  status: "pending" | "processing" | "completed" | "error"
  progress: number
  metadata?: any
  errors?: string[]
}

export default function BulkUploadPage() {
  const { setCurrentPage } = useDashboard()
  const [files, setFiles] = useState<BulkUploadFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    setCurrentPage("Bulk Upload")
  }, [setCurrentPage])

  const handleFilesChange = (newFiles: File[]) => {
    const bulkFiles: BulkUploadFile[] = newFiles.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith("audio/") ? "audio" : file.type.startsWith("image/") ? "image" : "metadata",
      size: file.size,
      status: "pending",
      progress: 0,
    }))

    setFiles((prev) => [...prev, ...bulkFiles])
  }

  const processFiles = async () => {
    setIsProcessing(true)

    for (const file of files) {
      if (file.status === "pending") {
        // Update status to processing
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "processing" } : f)))

        // Simulate processing with progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 200))
          setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, progress } : f)))
        }

        // Mark as completed
        setFiles((prev) => prev.map((f) => (f.id === file.id ? { ...f, status: "completed", progress: 100 } : f)))
      }
    }

    setIsProcessing(false)
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-400 animate-spin" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "bg-gray-600/20 text-gray-400 border-gray-600/30",
      processing: "bg-blue-600/20 text-blue-400 border-blue-600/30",
      completed: "bg-green-600/20 text-green-400 border-green-600/30",
      error: "bg-red-600/20 text-red-400 border-red-600/30",
    }

    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const completedFiles = files.filter((f) => f.status === "completed").length
  const totalFiles = files.length
  const overallProgress = totalFiles > 0 ? (completedFiles / totalFiles) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bulk Upload</h1>
          <p className="text-gray-400">Upload multiple files and process them in batches</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={processFiles}
            disabled={files.length === 0 || isProcessing}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isProcessing ? "Processing..." : "Process All"}
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      {files.length > 0 && (
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold">Upload Progress</h3>
                <p className="text-gray-400 text-sm">
                  {completedFiles} of {totalFiles} files processed
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-white">{Math.round(overallProgress)}%</p>
              </div>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="upload" className="text-gray-300 data-[state=active]:text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger value="metadata" className="text-gray-300 data-[state=active]:text-white">
            <FileText className="h-4 w-4 mr-2" />
            Metadata Template
          </TabsTrigger>
          <TabsTrigger value="history" className="text-gray-300 data-[state=active]:text-white">
            <Clock className="h-4 w-4 mr-2" />
            Upload History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Upload Files</CardTitle>
                <CardDescription className="text-gray-400">
                  Drag and drop multiple audio files, images, and metadata files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUploader
                  type="any"
                  maxFiles={50}
                  onFilesChange={handleFilesChange}
                  className="border-white/10"
                  multiple={true}
                />

                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <h4 className="text-blue-400 font-medium mb-2">Supported File Types:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-blue-300 font-medium">Audio</p>
                      <p className="text-blue-200">MP3, WAV, FLAC, AAC</p>
                    </div>
                    <div>
                      <p className="text-blue-300 font-medium">Images</p>
                      <p className="text-blue-200">JPG, PNG, GIF, WebP</p>
                    </div>
                    <div>
                      <p className="text-blue-300 font-medium">Metadata</p>
                      <p className="text-blue-200">CSV, JSON, XML</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Upload Queue</CardTitle>
                <CardDescription className="text-gray-400">{files.length} files ready for processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-auto">
                  {files.length > 0 ? (
                    files.map((file) => (
                      <Card key={file.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {file.type === "audio" && <Music className="h-6 w-6 text-purple-400" />}
                              {file.type === "image" && <ImageIcon className="h-6 w-6 text-green-400" />}
                              {file.type === "metadata" && <FileText className="h-6 w-6 text-blue-400" />}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-white text-sm font-medium truncate">{file.name}</p>
                                {getStatusBadge(file.status)}
                              </div>
                              <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                              {file.status === "processing" && (
                                <div className="mt-2">
                                  <Progress value={file.progress} className="h-1" />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {getStatusIcon(file.status)}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(file.id)}
                                className="text-gray-400 hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">No files uploaded yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Metadata Template</CardTitle>
              <CardDescription className="text-gray-400">
                Download and use our CSV template for bulk metadata upload
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Required Fields</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      "Track Title",
                      "Artist Name",
                      "Album/Release Title",
                      "Genre",
                      "Release Date",
                      "Audio File Name",
                    ].map((field, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Optional Fields</h4>
                  <div className="space-y-2 text-sm">
                    {[
                      "Featuring Artists",
                      "Producer",
                      "Songwriter",
                      "ISRC Code",
                      "Explicit Content",
                      "Cover Art File Name",
                    ].map((field, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-300">{field}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV Template
                </Button>
                <Button variant="outline" className="border-white/20 text-gray-300 hover:text-white">
                  <FileText className="h-4 w-4 mr-2" />
                  View Sample Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white">Upload History</CardTitle>
              <CardDescription className="text-gray-400">Previous bulk upload sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "1",
                    date: "2024-01-15",
                    files: 12,
                    status: "completed",
                    duration: "5m 32s",
                  },
                  {
                    id: "2",
                    date: "2024-01-10",
                    files: 8,
                    status: "completed",
                    duration: "3m 45s",
                  },
                  {
                    id: "3",
                    date: "2024-01-08",
                    files: 15,
                    status: "partial",
                    duration: "7m 12s",
                  },
                ].map((session) => (
                  <Card key={session.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">Bulk Upload Session</p>
                          <p className="text-gray-400 text-sm">
                            {session.date} • {session.files} files • {session.duration}
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusBadge(session.status)}
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
