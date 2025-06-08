"use client"

import { useState, useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  Palette,
  TrendingUp,
  Wand2,
  Download,
  RefreshCw,
  Sparkles,
  ImageIcon,
  BarChart3,
  Copy,
  Check,
} from "lucide-react"

export default function AIToolsPage() {
  const { setCurrentPage } = useDashboard()
  const [metadataPrompt, setMetadataPrompt] = useState("")
  const [coverArtPrompt, setCoverArtPrompt] = useState("")
  const [generatedMetadata, setGeneratedMetadata] = useState<any>(null)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  useEffect(() => {
    setCurrentPage("AI Tools")
  }, [setCurrentPage])

  const generateMetadata = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setGeneratedMetadata({
      title: "Midnight Dreams",
      genre: "Electronic Pop",
      subgenre: "Synthwave",
      mood: "Dreamy, Nostalgic",
      tags: ["synthwave", "retro", "electronic", "dreamy", "80s", "neon"],
      description:
        "A nostalgic journey through neon-lit streets and midnight dreams, blending modern electronic production with classic synthwave aesthetics.",
      bpm: 128,
      key: "C# Minor",
      energy: 75,
      danceability: 82,
    })
    setIsGenerating(false)
  }

  const generateCoverArt = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setGeneratedImages([
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ])
    setIsGenerating(false)
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const revenueData = [
    { month: "Jan", predicted: 1200, actual: 1150 },
    { month: "Feb", predicted: 1350, actual: 1280 },
    { month: "Mar", predicted: 1500, actual: 1420 },
    { month: "Apr", predicted: 1650, actual: null },
    { month: "May", predicted: 1800, actual: null },
    { month: "Jun", predicted: 1950, actual: null },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Tools</h1>
          <p className="text-gray-400">Leverage AI to enhance your music creation and marketing</p>
        </div>
        <Badge className="bg-purple-600/20 text-purple-400 border-purple-600/30">
          <Sparkles className="h-4 w-4 mr-1" />
          AI Powered
        </Badge>
      </div>

      <Tabs defaultValue="metadata" className="space-y-6">
        <TabsList className="bg-white/10 border-white/20">
          <TabsTrigger value="metadata" className="text-gray-300 data-[state=active]:text-white">
            <Brain className="h-4 w-4 mr-2" />
            Metadata Generator
          </TabsTrigger>
          <TabsTrigger value="artwork" className="text-gray-300 data-[state=active]:text-white">
            <Palette className="h-4 w-4 mr-2" />
            Cover Art Generator
          </TabsTrigger>
          <TabsTrigger value="forecast" className="text-gray-300 data-[state=active]:text-white">
            <TrendingUp className="h-4 w-4 mr-2" />
            Revenue Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="metadata" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Metadata Generator
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Generate comprehensive metadata for your tracks using AI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Describe your track</Label>
                  <Textarea
                    value={metadataPrompt}
                    onChange={(e) => setMetadataPrompt(e.target.value)}
                    placeholder="Describe your track's style, mood, instruments, and any specific details..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Quick Prompts</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Upbeat electronic dance track with heavy bass",
                      "Melancholic indie folk song with acoustic guitar",
                      "High-energy hip-hop track with trap influences",
                      "Ambient chill-out music for relaxation",
                    ].map((prompt, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setMetadataPrompt(prompt)}
                        className="justify-start text-left border-white/20 text-gray-300 hover:text-white"
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateMetadata}
                  disabled={!metadataPrompt || isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Metadata
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Generated Metadata</CardTitle>
                <CardDescription className="text-gray-400">AI-generated suggestions for your track</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedMetadata ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Title</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={generatedMetadata.title}
                            readOnly
                            className="bg-white/5 border-white/10 text-white"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generatedMetadata.title, "title")}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedField === "title" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Genre</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            value={generatedMetadata.genre}
                            readOnly
                            className="bg-white/5 border-white/10 text-white"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(generatedMetadata.genre, "genre")}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedField === "genre" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Description</Label>
                      <div className="flex items-start space-x-2">
                        <Textarea
                          value={generatedMetadata.description}
                          readOnly
                          rows={3}
                          className="bg-white/5 border-white/10 text-white"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(generatedMetadata.description, "description")}
                          className="text-gray-400 hover:text-white mt-2"
                        >
                          {copiedField === "description" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Tags</Label>
                      <div className="flex flex-wrap gap-2">
                        {generatedMetadata.tags.map((tag: string, index: number) => (
                          <Badge key={index} className="bg-purple-600/20 text-purple-400 border-purple-600/30">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-sm">BPM</p>
                        <p className="text-white font-semibold">{generatedMetadata.bpm}</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-sm">Key</p>
                        <p className="text-white font-semibold">{generatedMetadata.key}</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-sm">Energy</p>
                        <p className="text-white font-semibold">{generatedMetadata.energy}%</p>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg">
                        <p className="text-gray-400 text-sm">Dance</p>
                        <p className="text-white font-semibold">{generatedMetadata.danceability}%</p>
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="h-4 w-4 mr-2" />
                      Apply to Release
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Generate metadata to see AI suggestions here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="artwork" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  AI Cover Art Generator
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Create stunning cover art using AI image generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-300">Describe your cover art</Label>
                  <Textarea
                    value={coverArtPrompt}
                    onChange={(e) => setCoverArtPrompt(e.target.value)}
                    placeholder="Describe the visual style, colors, mood, and elements you want in your cover art..."
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Style Presets</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Synthwave neon aesthetic",
                      "Minimalist geometric design",
                      "Abstract watercolor painting",
                      "Vintage vinyl record style",
                      "Futuristic cyberpunk theme",
                      "Nature-inspired organic forms",
                    ].map((style, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setCoverArtPrompt(style)}
                        className="justify-start text-left border-white/20 text-gray-300 hover:text-white"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={generateCoverArt}
                  disabled={!coverArtPrompt || isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Generate Cover Art
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Generated Artwork</CardTitle>
                <CardDescription className="text-gray-400">AI-generated cover art options</CardDescription>
              </CardHeader>
              <CardContent>
                {generatedImages.length > 0 ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {generatedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Generated artwork ${index + 1}`}
                            className="w-full aspect-square object-cover rounded-lg bg-white/5"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-white/20 text-white">
                                Select
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1 border-white/20 text-gray-300 hover:text-white">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Generate More
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download Selected
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Generate artwork to see AI creations here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card className="bg-white/5 border-white/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                AI Revenue Forecast
              </CardTitle>
              <CardDescription className="text-gray-400">Predict your music revenue using AI analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Predicted Revenue</p>
                      <p className="text-2xl font-bold text-white">$1,950</p>
                      <p className="text-green-400 text-sm">+15.2% growth</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Confidence Level</p>
                      <p className="text-2xl font-bold text-white">87%</p>
                      <Progress value={87} className="mt-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Best Release Time</p>
                      <p className="text-2xl font-bold text-white">Friday</p>
                      <p className="text-blue-400 text-sm">3PM EST</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Revenue Prediction Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {revenueData.map((month, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-gray-400 text-sm">{month.month}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white text-sm">Predicted: ${month.predicted}</span>
                            {month.actual && <span className="text-gray-400 text-sm">Actual: ${month.actual}</span>}
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                              style={{ width: `${(month.predicted / 2000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white text-lg">AI Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Optimal Release Strategy</p>
                        <p className="text-gray-400 text-sm">Release on Friday at 3PM EST for maximum engagement</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Genre Trending</p>
                        <p className="text-gray-400 text-sm">Electronic music is trending 23% higher this month</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                      <div>
                        <p className="text-white font-medium">Platform Focus</p>
                        <p className="text-gray-400 text-sm">Spotify and Apple Music show highest conversion rates</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
