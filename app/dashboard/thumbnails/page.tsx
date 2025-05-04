"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Download,
  Wand2,
  ImageIcon,
  Upload,
  RefreshCw,
  Layers,
  Type,
  ImageIcon as ImageLucide,
  Palette,
} from "lucide-react"
import { ActionButton } from "@/components/action-button"
import { generateThumbnail, uploadImage } from "@/lib/button-actions"
import { toast } from "@/components/ui/use-toast"

export default function ThumbnailsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [thumbnailStyle, setThumbnailStyle] = useState("modern")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Sample generated thumbnails
  const sampleThumbnails = [
    "/placeholder.svg?key=a5rfc",
    "/placeholder.svg?key=x9ryz",
    "/placeholder.svg?key=lpdod",
    "/placeholder.svg?key=ujcd5",
  ]

  const handleGenerateThumbnails = async () => {
    setIsGenerating(true)
    try {
      await generateThumbnail({
        title: videoTitle,
        style: thumbnailStyle,
      })
      // Simulate generation complete
      setTimeout(() => {
        setIsGenerating(false)
      }, 2000)
    } catch (error) {
      console.error("Error generating thumbnails:", error)
      setIsGenerating(false)
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      try {
        await uploadImage(file)
        toast({
          title: "Upload successful",
          description: `File "${file.name}" uploaded successfully!`,
        })
      } catch (error) {
        console.error("Upload error:", error)
        toast({
          title: "Upload failed",
          description: "There was an error uploading your image.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Thumbnail Generator</h1>
          <p className="text-sm text-gray-400">Create eye-catching thumbnails for your videos</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={() => {
              // Create a hidden file input and trigger it
              const input = document.createElement("input")
              input.type = "file"
              input.accept = "image/*"
              input.onchange = (e) => handleFileUpload(e as React.ChangeEvent<HTMLInputElement>)
              input.click()
            }}
            icon={<Upload className="h-4 w-4" />}
            actionName="Upload Image"
          >
            Upload Image
          </ActionButton>
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            href="/dashboard/thumbnails/gallery"
            icon={<ImageIcon className="h-4 w-4" />}
            actionName="My Thumbnails"
          >
            My Thumbnails
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Thumbnail Settings</CardTitle>
              <CardDescription>Configure your thumbnail generation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="video-title">Video Title</Label>
                <Input
                  id="video-title"
                  placeholder="Enter your video title"
                  className="mt-1 bg-gray-800 border-gray-700"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="thumbnail-description">Thumbnail Description</Label>
                <Textarea
                  id="thumbnail-description"
                  placeholder="Describe what you want in your thumbnail"
                  className="mt-1 bg-gray-800 border-gray-700"
                />
              </div>

              <div>
                <Label htmlFor="thumbnail-style">Thumbnail Style</Label>
                <Select defaultValue="modern" onValueChange={setThumbnailStyle}>
                  <SelectTrigger id="thumbnail-style" className="mt-1 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="modern">Modern & Clean</SelectItem>
                    <SelectItem value="bold">Bold & Attention-Grabbing</SelectItem>
                    <SelectItem value="minimal">Minimal & Elegant</SelectItem>
                    <SelectItem value="vibrant">Vibrant & Colorful</SelectItem>
                    <SelectItem value="professional">Professional & Serious</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="color-scheme" className="mt-1 bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-800">
                    <SelectItem value="auto">Auto (Based on Brand)</SelectItem>
                    <SelectItem value="vibrant">Vibrant</SelectItem>
                    <SelectItem value="dark">Dark & Moody</SelectItem>
                    <SelectItem value="light">Light & Airy</SelectItem>
                    <SelectItem value="contrast">High Contrast</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <Label htmlFor="text-size">Text Size</Label>
                  <span className="text-sm text-gray-400">Medium</span>
                </div>
                <Slider id="text-size" defaultValue={[50]} max={100} step={1} className="mt-1" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="include-face" defaultChecked />
                <Label htmlFor="include-face">Include face/person</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="add-effects" defaultChecked />
                <Label htmlFor="add-effects">Add visual effects</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="auto-text" defaultChecked />
                <Label htmlFor="auto-text">Auto-generate text</Label>
              </div>
            </CardContent>
            <CardFooter>
              <ActionButton
                className="w-full bg-purple-600 hover:bg-purple-700"
                action={handleGenerateThumbnails}
                disabled={isGenerating || !videoTitle}
                icon={isGenerating ? <Sparkles className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                loadingText="Generating..."
                actionName="Generate Thumbnails"
              >
                {isGenerating ? "Generating..." : "Generate Thumbnails"}
              </ActionButton>
            </CardFooter>
          </Card>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Thumbnails</CardTitle>
                <Badge className="bg-purple-600">AI-Powered</Badge>
              </div>
              <CardDescription>Click on a thumbnail to edit or download it</CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Sparkles className="h-12 w-12 text-purple-500 mb-4 animate-spin" />
                  <h3 className="text-lg font-medium mb-2">Generating Thumbnails...</h3>
                  <p className="text-gray-400 max-w-md">
                    Our AI is creating eye-catching thumbnails based on your specifications. This may take a few
                    moments.
                  </p>
                </div>
              ) : sampleThumbnails.length > 0 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleThumbnails.map((thumbnail, index) => (
                      <div key={index} className="group relative">
                        <img
                          src={thumbnail || "/placeholder.svg"}
                          alt={`Thumbnail option ${index + 1}`}
                          className="w-full h-auto rounded-lg border border-gray-700 object-cover aspect-video"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-lg">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8"
                            onClick={() => {
                              toast({
                                title: "Edit thumbnail",
                                description: `Editing thumbnail option ${index + 1}`,
                              })
                            }}
                          >
                            <Layers className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8"
                            onClick={() => {
                              toast({
                                title: "Download thumbnail",
                                description: `Downloading thumbnail option ${index + 1}`,
                              })
                            }}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                        <Badge className="absolute top-2 right-2 bg-gray-800/80">Option {index + 1}</Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <ActionButton
                      variant="outline"
                      className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                      action={async () => {
                        setIsGenerating(true)
                        try {
                          await generateThumbnail({
                            title: videoTitle,
                            style: thumbnailStyle,
                            more: true,
                          })
                        } catch (error) {
                          console.error("Error generating more thumbnails:", error)
                        } finally {
                          setIsGenerating(false)
                        }
                      }}
                      icon={<RefreshCw className="h-4 w-4" />}
                      actionName="Generate More Options"
                    >
                      Generate More Options
                    </ActionButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ImageLucide className="h-12 w-12 text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Thumbnails Generated Yet</h3>
                  <p className="text-gray-400 max-w-md">
                    Fill in the settings on the left and click "Generate Thumbnails" to create eye-catching thumbnails
                    for your video.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">
                <span className="flex items-center">
                  <Palette className="h-4 w-4 mr-1" />
                  Thumbnails are optimized for YouTube's recommended size (1280×720)
                </span>
              </div>
              {sampleThumbnails.length > 0 && !isGenerating ? (
                <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
                  <Type className="h-4 w-4 mr-2" />
                  Edit Text Overlay
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
