"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, Wand2, MessageSquare, Lightbulb, Tag, Clock, Bookmark } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { ActionButton } from "@/components/action-button"

// Sample generated titles
const sampleTitles = [
  "How to Master Guitar Solos in Just 30 Days | Complete Tutorial",
  "10 Guitar Techniques That Will Transform Your Playing Overnight",
  "The Ultimate Guide to Guitar Solos: From Beginner to Pro",
  "Guitar Solo Secrets: What Professional Musicians Don't Tell You",
  "Learn These 5 Guitar Solo Patterns and Sound Like a Pro Instantly",
]

// Sample generated descriptions
const sampleDescription = `Unlock the secrets to mastering guitar solos with this comprehensive tutorial! Whether you're a beginner or intermediate player looking to take your skills to the next level, this video breaks down everything you need to know.

In this tutorial, you'll learn:
✅ The 5 essential scale patterns every guitarist must know
✅ How to develop speed and accuracy in your playing
✅ Techniques for creating emotional and memorable solos
✅ Tips for improvisation that will impress your audience
✅ Common mistakes to avoid when practicing

This step-by-step guide is designed to help you progress quickly while building a solid foundation. I've included practice exercises and backing tracks in the description below.

🎸 FREE RESOURCES:
- PDF of all scale patterns: [link]
- Backing tracks: [link]
- Practice schedule template: [link]

Don't forget to like and subscribe for weekly guitar tutorials! Leave a comment below with any questions or topics you'd like to see covered in future videos.

#GuitarTutorial #SoloTechniques #MusicLessons #LearnGuitar #GuitarTips`

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState("title-generator")
  const [generatedTitle, setGeneratedTitle] = useState("")
  const [generatedDescription, setGeneratedDescription] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoTopic, setVideoTopic] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [creativity, setCreativity] = useState([50])
  const [contentType, setContentType] = useState("tutorial")
  const [tone, setTone] = useState("informative")
  const [includeTrending, setIncludeTrending] = useState(true)
  const [optimizeCTR, setOptimizeCTR] = useState(true)

  const handleGenerateContent = async () => {
    if (!videoTopic) {
      toast({
        title: "Missing information",
        description: "Please enter a video topic first",
        variant: "destructive",
      })
      return false
    }

    setIsGenerating(true)

    // Simulate AI generation with a timeout
    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (activeTab === "title-generator") {
      setGeneratedTitle(sampleTitles[Math.floor(Math.random() * sampleTitles.length)])
      toast({
        title: "Title generated",
        description: "Your optimized title is ready",
      })
    } else if (activeTab === "description-generator") {
      setGeneratedDescription(sampleDescription)
      toast({
        title: "Description generated",
        description: "Your optimized description is ready",
      })
    } else {
      toast({
        title: `${activeTab.replace("-", " ")} generated`,
        description: "Your content is ready",
      })
    }

    setIsGenerating(false)
    return true
  }

  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard",
    })
  }

  const handleSaveToLibrary = () => {
    const contentType = activeTab === "title-generator" ? "title" : "description"
    const content = activeTab === "title-generator" ? generatedTitle : generatedDescription

    toast({
      title: "Saved to library",
      description: `Your ${contentType} has been saved to your library`,
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">AI Content Generator</h1>
          <p className="text-sm text-gray-400">Create optimized content for your videos</p>
        </div>
      </div>

      <Tabs defaultValue="title-generator" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 w-full justify-start mb-6">
          <TabsTrigger value="title-generator" className="data-[state=active]:bg-gray-700">
            Title Generator
          </TabsTrigger>
          <TabsTrigger value="description-generator" className="data-[state=active]:bg-gray-700">
            Description Generator
          </TabsTrigger>
          <TabsTrigger value="tag-generator" className="data-[state=active]:bg-gray-700">
            Tag Generator
          </TabsTrigger>
          <TabsTrigger value="script-generator" className="data-[state=active]:bg-gray-700">
            Script Generator
          </TabsTrigger>
          <TabsTrigger value="idea-generator" className="data-[state=active]:bg-gray-700">
            Idea Generator
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Input Parameters</CardTitle>
                <CardDescription>Provide details to generate optimized content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="video-topic">Video Topic</Label>
                  <Textarea
                    id="video-topic"
                    placeholder="What is your video about? Be specific."
                    className="mt-1 bg-gray-800 border-gray-700"
                    value={videoTopic}
                    onChange={(e) => setVideoTopic(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Input
                    id="target-audience"
                    placeholder="Who is your target audience?"
                    className="mt-1 bg-gray-800 border-gray-700"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select defaultValue={contentType} onValueChange={setContentType}>
                    <SelectTrigger id="content-type" className="mt-1 bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="vlog">Vlog</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tone">Tone</Label>
                  <Select defaultValue={tone} onValueChange={setTone}>
                    <SelectTrigger id="tone" className="mt-1 bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="informative">Informative</SelectItem>
                      <SelectItem value="entertaining">Entertaining</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="inspirational">Inspirational</SelectItem>
                      <SelectItem value="dramatic">Dramatic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <Label htmlFor="creativity">Creativity Level</Label>
                    <span className="text-sm text-gray-400">{creativity}%</span>
                  </div>
                  <Slider
                    id="creativity"
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    className="mt-1"
                    onValueChange={setCreativity}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="include-keywords" checked={includeTrending} onCheckedChange={setIncludeTrending} />
                  <Label htmlFor="include-keywords">Include trending keywords</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="optimize-ctr" checked={optimizeCTR} onCheckedChange={setOptimizeCTR} />
                  <Label htmlFor="optimize-ctr">Optimize for CTR</Label>
                </div>
              </CardContent>
              <CardFooter>
                <ActionButton
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  action={handleGenerateContent}
                  icon={<Wand2 className="h-4 w-4" />}
                  loadingText="Generating..."
                  disabled={!videoTopic}
                >
                  Generate Content
                </ActionButton>
              </CardFooter>
            </Card>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Generated Content</CardTitle>
                  <Badge className="bg-purple-600">AI-Powered</Badge>
                </div>
                <CardDescription>
                  {activeTab === "title-generator"
                    ? "Optimized titles for maximum click-through rate"
                    : activeTab === "description-generator"
                      ? "SEO-friendly video descriptions"
                      : activeTab === "tag-generator"
                        ? "Relevant tags to improve discoverability"
                        : activeTab === "script-generator"
                          ? "Engaging video scripts based on your topic"
                          : "Fresh content ideas for your channel"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeTab === "title-generator" && (
                  <div className="space-y-4">
                    {generatedTitle ? (
                      <>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium">{generatedTitle}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleCopyContent(generatedTitle)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-400">
                            <Badge className="bg-green-500/20 text-green-400 mr-2">High CTR</Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 mr-2">SEO Optimized</Badge>
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Est. 8.4% CTR
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-gray-400">Alternative Titles</h4>
                          {sampleTitles
                            .filter((title) => title !== generatedTitle)
                            .map((title, index) => (
                              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <p>{title}</p>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => handleCopyContent(title)}
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <Wand2 className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Content Generated Yet</h3>
                        <p className="text-gray-400 max-w-md">
                          Fill in the parameters on the left and click "Generate Content" to create optimized titles for
                          your video.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "description-generator" && (
                  <div className="space-y-4">
                    {generatedDescription ? (
                      <>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-medium">Video Description</h3>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCopyContent(generatedDescription)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => {
                                  const blob = new Blob([generatedDescription], { type: "text/plain" })
                                  const url = URL.createObjectURL(blob)
                                  const a = document.createElement("a")
                                  a.href = url
                                  a.download = "video-description.txt"
                                  document.body.appendChild(a)
                                  a.click()
                                  document.body.removeChild(a)
                                  URL.revokeObjectURL(url)
                                  toast({
                                    title: "Description downloaded",
                                    description: "Description saved as text file",
                                  })
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="whitespace-pre-line text-sm">{generatedDescription}</div>
                          <div className="flex items-center mt-4 text-sm text-gray-400">
                            <Badge className="bg-green-500/20 text-green-400 mr-2">SEO Optimized</Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 mr-2">Keyword Rich</Badge>
                            <Badge className="bg-yellow-500/20 text-yellow-400">Call-to-Action</Badge>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <MessageSquare className="h-12 w-12 text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Description Generated Yet</h3>
                        <p className="text-gray-400 max-w-md">
                          Fill in the parameters on the left and click "Generate Content" to create an optimized
                          description for your video.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tag-generator" && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Tag className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tag Generator</h3>
                    <p className="text-gray-400 max-w-md">
                      Generate relevant tags to improve your video's discoverability. Fill in the parameters and click
                      "Generate Content".
                    </p>
                  </div>
                )}

                {activeTab === "script-generator" && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <MessageSquare className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Script Generator</h3>
                    <p className="text-gray-400 max-w-md">
                      Create engaging video scripts based on your topic. Fill in the parameters and click "Generate
                      Content".
                    </p>
                  </div>
                )}

                {activeTab === "idea-generator" && (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <Lightbulb className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Idea Generator</h3>
                    <p className="text-gray-400 max-w-md">
                      Get fresh content ideas for your channel. Fill in the parameters and click "Generate Content".
                    </p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-400">
                  <span className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save your favorite outputs in the library
                  </span>
                </div>
                {generatedTitle || generatedDescription ? (
                  <Button
                    variant="outline"
                    className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                    onClick={handleSaveToLibrary}
                  >
                    Save to Library
                  </Button>
                ) : null}
              </CardFooter>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
