"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  TrendingUp,
  ArrowUpRight,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Info,
  Copy,
  ExternalLink,
  BarChart4,
} from "lucide-react"
import { handleAnalyze, handleExport, handleRefresh } from "@/lib/button-actions"

export default function SEOPage() {
  const [activeTab, setActiveTab] = useState("analyzer")
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)

  // Sample keywords data
  const keywordsData = [
    { keyword: "guitar tutorial", volume: "135K", competition: "High", cpc: "$1.20", score: 85 },
    { keyword: "learn guitar solo", volume: "74K", competition: "Medium", cpc: "$0.95", score: 92 },
    { keyword: "guitar lessons for beginners", volume: "110K", competition: "High", cpc: "$1.50", score: 78 },
    { keyword: "how to play guitar fast", volume: "45K", competition: "Medium", cpc: "$0.85", score: 88 },
    { keyword: "guitar techniques advanced", volume: "22K", competition: "Low", cpc: "$0.65", score: 94 },
  ]

  // Sample SEO issues
  const seoIssues = [
    { type: "error", message: "Title is too long (exceeds 70 characters)" },
    { type: "warning", message: "Description could use more keywords" },
    { type: "success", message: "Good use of tags" },
    { type: "info", message: "Consider adding timestamps to your description" },
    { type: "warning", message: "Missing call-to-action in description" },
  ]

  const handleSeoAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      await handleAnalyze("seo", {
        title: videoTitle,
        description: videoDescription,
      })
      // Simulate analysis complete
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalyzed(true)
      }, 2000)
    } catch (error) {
      console.error("Error analyzing SEO:", error)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">SEO Optimization</h1>
          <p className="text-sm text-gray-400">Improve your video's discoverability and ranking</p>
        </div>
      </div>

      <Tabs defaultValue="analyzer" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-800 w-full justify-start mb-6">
          <TabsTrigger value="analyzer" className="data-[state=active]:bg-gray-700">
            SEO Analyzer
          </TabsTrigger>
          <TabsTrigger value="keywords" className="data-[state=active]:bg-gray-700">
            Keyword Research
          </TabsTrigger>
          <TabsTrigger value="competitor" className="data-[state=active]:bg-gray-700">
            Competitor Analysis
          </TabsTrigger>
          <TabsTrigger value="trends" className="data-[state=active]:bg-gray-700">
            Trending Topics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Section */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Video Details</CardTitle>
                  <CardDescription>Enter your video information for SEO analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="video-title" className="block text-sm font-medium text-gray-400 mb-1">
                      Video Title
                    </label>
                    <Input
                      id="video-title"
                      placeholder="Enter your video title"
                      className="bg-gray-800 border-gray-700"
                      value={videoTitle}
                      onChange={(e) => setVideoTitle(e.target.value)}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">{videoTitle.length} / 100 characters</span>
                      <span className={`text-xs ${videoTitle.length > 70 ? "text-red-400" : "text-green-400"}`}>
                        {videoTitle.length > 70 ? "Too long" : "Good length"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="video-description" className="block text-sm font-medium text-gray-400 mb-1">
                      Video Description
                    </label>
                    <Textarea
                      id="video-description"
                      placeholder="Enter your video description"
                      className="bg-gray-800 border-gray-700 min-h-[150px]"
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">{videoDescription.length} / 5000 characters</span>
                      <span
                        className={`text-xs ${videoDescription.length < 300 ? "text-yellow-400" : "text-green-400"}`}
                      >
                        {videoDescription.length < 300 ? "Could be longer" : "Good length"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="video-tags" className="block text-sm font-medium text-gray-400 mb-1">
                      Video Tags (comma separated)
                    </label>
                    <Input
                      id="video-tags"
                      placeholder="guitar tutorial, learn guitar, music lessons"
                      className="bg-gray-800 border-gray-700"
                    />
                    <div className="text-xs text-gray-400 mt-1">Recommended: 5-15 relevant tags</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleSeoAnalyze}
                    disabled={isAnalyzing || !videoTitle}
                  >
                    {isAnalyzing ? (
                      <>
                        <Search className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Analyze SEO
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Analysis Results */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>SEO Analysis Results</CardTitle>
                    {analyzed && <Badge className="bg-purple-600">Score: 78/100</Badge>}
                  </div>
                  <CardDescription>Detailed analysis of your video's SEO performance</CardDescription>
                </CardHeader>
                <CardContent>
                  {isAnalyzing ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Search className="h-12 w-12 text-purple-500 mb-4 animate-spin" />
                      <h3 className="text-lg font-medium mb-2">Analyzing Your Content...</h3>
                      <p className="text-gray-400 max-w-md">
                        We're checking your content against YouTube's ranking factors and best practices.
                      </p>
                    </div>
                  ) : analyzed ? (
                    <div className="space-y-6">
                      {/* Overall Score */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium">Overall SEO Score</h3>
                          <span className="text-sm">78/100</span>
                        </div>
                        <Progress value={78} className="h-2" />
                        <p className="text-xs text-gray-400">
                          Your video has good SEO but could be improved in several areas.
                        </p>
                      </div>

                      {/* Category Scores */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">Title Optimization</h4>
                            <span className="text-sm">65/100</span>
                          </div>
                          <Progress value={65} className="h-1.5 mb-2" />
                          <p className="text-xs text-gray-400">Needs improvement</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">Description</h4>
                            <span className="text-sm">82/100</span>
                          </div>
                          <Progress value={82} className="h-1.5 mb-2" />
                          <p className="text-xs text-gray-400">Good</p>
                        </div>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="text-sm font-medium">Tags</h4>
                            <span className="text-sm">90/100</span>
                          </div>
                          <Progress value={90} className="h-1.5 mb-2" />
                          <p className="text-xs text-gray-400">Excellent</p>
                        </div>
                      </div>

                      {/* Issues List */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Issues & Recommendations</h3>
                        <div className="space-y-2">
                          {seoIssues.map((issue, index) => (
                            <div key={index} className="flex items-start gap-2 bg-gray-800 p-3 rounded-lg">
                              {issue.type === "error" && <XCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />}
                              {issue.type === "warning" && (
                                <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                              )}
                              {issue.type === "success" && (
                                <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                              )}
                              {issue.type === "info" && <Info className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />}
                              <div>
                                <p className="text-sm">{issue.message}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Keyword Analysis */}
                      <div>
                        <h3 className="text-sm font-medium mb-3">Keyword Analysis</h3>
                        <div className="bg-gray-800 p-3 rounded-lg">
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-500/20 text-green-400">guitar tutorial</Badge>
                            <Badge className="bg-yellow-500/20 text-yellow-400">learn guitar</Badge>
                            <Badge className="bg-green-500/20 text-green-400">guitar lessons</Badge>
                            <Badge className="bg-red-500/20 text-red-400">missing: beginner</Badge>
                            <Badge className="bg-red-500/20 text-red-400">missing: easy</Badge>
                          </div>
                          <p className="text-xs text-gray-400 mt-2">
                            Your content includes 3/5 recommended keywords. Add missing keywords to improve ranking.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                      <Search className="h-12 w-12 text-gray-500 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Analysis Yet</h3>
                      <p className="text-gray-400 max-w-md">
                        Enter your video details on the left and click "Analyze SEO" to get a detailed analysis.
                      </p>
                    </div>
                  )}
                </CardContent>
                {analyzed && (
                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-gray-400">
                      <span className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Last updated: Just now
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                      onClick={() => {
                        alert("Viewing detailed SEO report")
                      }}
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      View Detailed Report
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Keyword Research</CardTitle>
                  <Badge className="bg-purple-600">Pro Feature</Badge>
                </div>
                <CardDescription>Find the best keywords to target for your videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Search Bar */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                      <Input placeholder="Search for keywords..." className="pl-9 bg-gray-800 border-gray-700" />
                    </div>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={async () => {
                        await handleRefresh("keywords")
                        alert("Keyword research completed!")
                      }}
                    >
                      <Search className="h-4 w-4 mr-2" />
                      Research
                    </Button>
                  </div>

                  {/* Keywords Table */}
                  <div className="rounded-md border border-gray-800">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-gray-800/50 border-gray-800">
                          <TableHead>Keyword</TableHead>
                          <TableHead>Search Volume</TableHead>
                          <TableHead>Competition</TableHead>
                          <TableHead>CPC</TableHead>
                          <TableHead>SEO Score</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {keywordsData.map((keyword, index) => (
                          <TableRow key={index} className="hover:bg-gray-800/50 border-gray-800">
                            <TableCell className="font-medium">{keyword.keyword}</TableCell>
                            <TableCell>{keyword.volume}</TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  keyword.competition === "High"
                                    ? "bg-red-500/20 text-red-400"
                                    : keyword.competition === "Medium"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-green-500/20 text-green-400"
                                }
                              >
                                {keyword.competition}
                              </Badge>
                            </TableCell>
                            <TableCell>{keyword.cpc}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress value={keyword.score} className="h-2 w-16" />
                                <span>{keyword.score}/100</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Copy className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Keyword Trends */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Trending in Your Niche</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">guitar for beginners 2023</span>
                          <Badge className="bg-green-500/20 text-green-400">+45%</Badge>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">easy guitar songs</span>
                          <Badge className="bg-green-500/20 text-green-400">+32%</Badge>
                        </div>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">fingerstyle guitar techniques</span>
                          <Badge className="bg-green-500/20 text-green-400">+28%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-gray-400">
                  <span className="flex items-center">
                    <BarChart4 className="h-4 w-4 mr-1" />
                    Data updated daily from YouTube search trends
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                  onClick={async () => {
                    await handleExport(keywordsData, "csv")
                    alert("Keywords exported successfully!")
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Export Keywords
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="competitor" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <BarChart4 className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Competitor Analysis</h3>
            <p className="text-gray-400 max-w-md">
              Analyze your competitors' videos to understand their SEO strategies and performance metrics.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="mt-0">
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <TrendingUp className="h-12 w-12 text-gray-500 mb-4" />
            <h3 className="text-lg font-medium mb-2">Trending Topics</h3>
            <p className="text-gray-400 max-w-md">
              Discover trending topics and keywords in your niche to create timely and relevant content.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
