"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Bot, Calendar, ChevronRight, Download, FileText, Lightbulb, Mic, Music, Sparkles, Wand2 } from "lucide-react"

export default function AIToolsPage() {
  const [activeTab, setActiveTab] = useState("release-optimizer")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Release Optimizer
  const [releaseData, setReleaseData] = useState({
    title: "",
    genre: "pop",
    mood: "upbeat",
    releaseDate: "",
    description: "",
  })

  // Description Generator
  const [descriptionData, setDescriptionData] = useState({
    trackTitle: "",
    genre: "pop",
    mood: "upbeat",
    keywords: "",
    length: 50,
  })

  // Artwork Generator
  const [artworkData, setArtworkData] = useState({
    title: "",
    style: "abstract",
    mood: "energetic",
    colors: "vibrant",
    includeText: true,
  })

  // Release Calendar
  const [calendarData, setCalendarData] = useState({
    trackCount: "1",
    startDate: "",
    endDate: "",
    frequency: "weekly",
    includeHolidays: true,
  })

  const handleReleaseChange = (name: string, value: string) => {
    setReleaseData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDescriptionChange = (name: string, value: string | number) => {
    setDescriptionData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArtworkChange = (name: string, value: string | boolean) => {
    setArtworkData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCalendarChange = (name: string, value: string | boolean) => {
    setCalendarData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowResults(true)
      toast({
        title: "AI generation complete",
        description: "Your results are ready to view",
      })
    }, 2500)
  }

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your results are being downloaded",
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">AI Tools</h1>
        <p className="text-sm text-gray-400">Leverage AI to optimize your music releases and marketing</p>
      </div>

      <Tabs defaultValue="release-optimizer" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="release-optimizer">Release Optimizer</TabsTrigger>
          <TabsTrigger value="description-generator">Description Generator</TabsTrigger>
          <TabsTrigger value="artwork-generator">Artwork Generator</TabsTrigger>
          <TabsTrigger value="release-calendar">Release Calendar</TabsTrigger>
        </TabsList>
      </Tabs>

      {activeTab === "release-optimizer" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Release Strategy Optimizer</CardTitle>
              <CardDescription>Get AI-powered recommendations for your next release</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Release Title</Label>
                <Input
                  id="title"
                  value={releaseData.title}
                  onChange={(e) => handleReleaseChange("title", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                  placeholder="Enter your release title"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={releaseData.genre} onValueChange={(value) => handleReleaseChange("genre", value)}>
                    <SelectTrigger id="genre" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="rnb">R&B</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={releaseData.mood} onValueChange={(value) => handleReleaseChange("mood", value)}>
                    <SelectTrigger id="mood" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upbeat">Upbeat</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="melancholic">Melancholic</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="releaseDate">Planned Release Date</Label>
                <Input
                  id="releaseDate"
                  type="date"
                  value={releaseData.releaseDate}
                  onChange={(e) => handleReleaseChange("releaseDate", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                />
              </div>
              <div>
                <Label htmlFor="description">Brief Description</Label>
                <Textarea
                  id="description"
                  value={releaseData.description}
                  onChange={(e) => handleReleaseChange("description", e.target.value)}
                  className="h-24 bg-gray-950 border-gray-800"
                  placeholder="Describe your release, target audience, and goals"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Recommendations
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {showResults && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">AI Recommendations</CardTitle>
                <CardDescription>Optimized strategy for "{releaseData.title}"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                    Optimal Release Timing
                  </h3>
                  <p className="text-sm text-gray-400">
                    Based on your genre and current trends, we recommend releasing on a Thursday for maximum impact.
                    Consider scheduling for the 3rd week of the month to avoid major competing releases.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Music className="mr-2 h-4 w-4 text-blue-500" />
                    Platform Strategy
                  </h3>
                  <p className="text-sm text-gray-400">
                    Focus on Spotify and Apple Music for initial release. Your genre performs particularly well on these
                    platforms. Consider an exclusive pre-release on one platform to build anticipation.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Mic className="mr-2 h-4 w-4 text-green-500" />
                    Promotion Recommendations
                  </h3>
                  <p className="text-sm text-gray-400">
                    Start promotion 2 weeks before release. Focus on Instagram and TikTok for your target demographic.
                    Create 3-4 short teaser clips to build anticipation. Consider a collaborative playlist with similar
                    artists.
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Lightbulb className="mr-2 h-4 w-4 text-yellow-500" />
                    Additional Insights
                  </h3>
                  <p className="text-sm text-gray-400">
                    Your genre has seen a 15% increase in streams over the last quarter. Listeners in this category
                    typically discover music through playlists and social media. Consider creating vertical video
                    content for maximum engagement.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Report
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {activeTab === "description-generator" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Track Description Generator</CardTitle>
              <CardDescription>Create compelling descriptions for your music</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="trackTitle">Track Title</Label>
                <Input
                  id="trackTitle"
                  value={descriptionData.trackTitle}
                  onChange={(e) => handleDescriptionChange("trackTitle", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                  placeholder="Enter your track title"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="descGenre">Genre</Label>
                  <Select
                    value={descriptionData.genre}
                    onValueChange={(value) => handleDescriptionChange("genre", value)}
                  >
                    <SelectTrigger id="descGenre" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="rnb">R&B</SelectItem>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="descMood">Mood</Label>
                  <Select
                    value={descriptionData.mood}
                    onValueChange={(value) => handleDescriptionChange("mood", value)}
                  >
                    <SelectTrigger id="descMood" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upbeat">Upbeat</SelectItem>
                      <SelectItem value="chill">Chill</SelectItem>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="melancholic">Melancholic</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                      <SelectItem value="romantic">Romantic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  value={descriptionData.keywords}
                  onChange={(e) => handleDescriptionChange("keywords", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                  placeholder="e.g., summer, dance, love, night"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="length">Description Length</Label>
                  <span className="text-sm text-gray-400">{descriptionData.length}%</span>
                </div>
                <Slider
                  id="length"
                  defaultValue={[50]}
                  max={100}
                  step={10}
                  onValueChange={(value) => handleDescriptionChange("length", value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Short</span>
                  <span>Medium</span>
                  <span>Long</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Description
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {showResults && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Generated Description</CardTitle>
                <CardDescription>For "{descriptionData.trackTitle}"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2">Platform Description</h3>
                  <p className="text-sm text-gray-400">
                    "Step into a sonic journey with "{descriptionData.trackTitle}" – an {descriptionData.mood}{" "}
                    {descriptionData.genre} track that captures the essence of modern music. With pulsating rhythms and
                    captivating melodies, this track invites listeners to experience a blend of emotion and energy that
                    resonates with the soul. Perfect for playlists focused on {descriptionData.keywords}."
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2">Social Media Caption</h3>
                  <p className="text-sm text-gray-400">
                    "🎵 NEW RELEASE ALERT! 🎵 '{descriptionData.trackTitle}' is out now on all platforms! This{" "}
                    {descriptionData.mood} {descriptionData.genre} track is the perfect soundtrack for your{" "}
                    {descriptionData.keywords} vibes. Listen now and let me know what you think! #NewMusic #
                    {descriptionData.genre} #{descriptionData.mood}Music"
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2">Press Release Snippet</h3>
                  <p className="text-sm text-gray-400">
                    "The artist's latest release, '{descriptionData.trackTitle}', showcases a masterful blend of{" "}
                    {descriptionData.genre} influences with a distinctly {descriptionData.mood} atmosphere. Drawing
                    inspiration from {descriptionData.keywords}, the track represents a bold new direction while
                    maintaining the authentic sound fans have come to love."
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Bot className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {activeTab === "artwork-generator" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Artwork Generator</CardTitle>
              <CardDescription>Create AI-generated artwork for your releases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="artworkTitle">Release Title</Label>
                <Input
                  id="artworkTitle"
                  value={artworkData.title}
                  onChange={(e) => handleArtworkChange("title", e.target.value)}
                  className="bg-gray-950 border-gray-800"
                  placeholder="Enter your release title"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="style">Visual Style</Label>
                  <Select value={artworkData.style} onValueChange={(value) => handleArtworkChange("style", value)}>
                    <SelectTrigger id="style" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="abstract">Abstract</SelectItem>
                      <SelectItem value="minimalist">Minimalist</SelectItem>
                      <SelectItem value="photographic">Photographic</SelectItem>
                      <SelectItem value="illustrated">Illustrated</SelectItem>
                      <SelectItem value="retro">Retro</SelectItem>
                      <SelectItem value="futuristic">Futuristic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="artworkMood">Mood</Label>
                  <Select value={artworkData.mood} onValueChange={(value) => handleArtworkChange("mood", value)}>
                    <SelectTrigger id="artworkMood" className="bg-gray-950 border-gray-800">
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="energetic">Energetic</SelectItem>
                      <SelectItem value="calm">Calm</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="uplifting">Uplifting</SelectItem>
                      <SelectItem value="mysterious">Mysterious</SelectItem>
                      <SelectItem value="nostalgic">Nostalgic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="colors">Color Palette</Label>
                <Select value={artworkData.colors} onValueChange={(value) => handleArtworkChange("colors", value)}>
                  <SelectTrigger id="colors" className="bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select colors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vibrant">Vibrant</SelectItem>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="pastel">Pastel</SelectItem>
                    <SelectItem value="neon">Neon</SelectItem>
                    <SelectItem value="earthy">Earthy</SelectItem>
                    <SelectItem value="cool">Cool Tones</SelectItem>
                    <SelectItem value="warm">Warm Tones</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="includeText">Include Title Text</Label>
                  <p className="text-xs text-gray-500">Add your release title to the artwork</p>
                </div>
                <Switch
                  id="includeText"
                  checked={artworkData.includeText}
                  onCheckedChange={(checked) => handleArtworkChange("includeText", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Artwork
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {showResults && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Generated Artwork</CardTitle>
                <CardDescription>For "{artworkData.title}"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={`/abstract-geometric-shapes.png?height=400&width=400&query=${artworkData.style} ${artworkData.mood} music artwork with ${artworkData.colors} colors`}
                        alt="Generated artwork option 1"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Select
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-800">
                      <img
                        src={`/placeholder.svg?key=oxgn0&height=400&width=400&query=alternative ${artworkData.style} ${artworkData.mood} music artwork with ${artworkData.colors} colors`}
                        alt="Generated artwork option 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Select
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2">Artwork Details</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>
                      <span className="font-medium text-gray-300">Style:</span> {artworkData.style}
                    </li>
                    <li>
                      <span className="font-medium text-gray-300">Mood:</span> {artworkData.mood}
                    </li>
                    <li>
                      <span className="font-medium text-gray-300">Colors:</span> {artworkData.colors}
                    </li>
                    <li>
                      <span className="font-medium text-gray-300">Text:</span>{" "}
                      {artworkData.includeText ? "Included" : "Not included"}
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}

      {activeTab === "release-calendar" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Release Calendar Generator</CardTitle>
              <CardDescription>Create an optimized release schedule</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="trackCount">Number of Tracks</Label>
                <Select
                  value={calendarData.trackCount}
                  onValueChange={(value) => handleCalendarChange("trackCount", value)}
                >
                  <SelectTrigger id="trackCount" className="bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select track count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single (1 track)</SelectItem>
                    <SelectItem value="2-5">EP (2-5 tracks)</SelectItem>
                    <SelectItem value="6-10">Album (6-10 tracks)</SelectItem>
                    <SelectItem value="10+">Large Album (10+ tracks)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={calendarData.startDate}
                    onChange={(e) => handleCalendarChange("startDate", e.target.value)}
                    className="bg-gray-950 border-gray-800"
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={calendarData.endDate}
                    onChange={(e) => handleCalendarChange("endDate", e.target.value)}
                    className="bg-gray-950 border-gray-800"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="frequency">Release Frequency</Label>
                <Select
                  value={calendarData.frequency}
                  onValueChange={(value) => handleCalendarChange("frequency", value)}
                >
                  <SelectTrigger id="frequency" className="bg-gray-950 border-gray-800">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="includeHolidays">Avoid Holidays</Label>
                  <p className="text-xs text-gray-500">Skip major holidays for better performance</p>
                </div>
                <Switch
                  id="includeHolidays"
                  checked={calendarData.includeHolidays}
                  onCheckedChange={(checked) => handleCalendarChange("includeHolidays", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Generate Calendar
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {showResults && (
            <Card className="border-gray-800 bg-gray-900">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Optimized Release Calendar</CardTitle>
                <CardDescription>Based on your preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">First Single</h4>
                        <p className="text-xs text-gray-400">Friday, August 18, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-blue-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Second Single</h4>
                        <p className="text-xs text-gray-400">Friday, September 1, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Third Single</h4>
                        <p className="text-xs text-gray-400">Friday, September 15, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/20 text-orange-500">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">Full Release</h4>
                        <p className="text-xs text-gray-400">Friday, September 29, 2023</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950 p-4">
                  <h3 className="font-medium mb-2">Calendar Notes</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Optimized for {calendarData.frequency} releases</li>
                    <li>• Avoids major holidays and competing release dates</li>
                    <li>• Fridays are recommended for maximum streaming impact</li>
                    <li>• Schedule includes pre-save campaign periods</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Export to Calendar
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
