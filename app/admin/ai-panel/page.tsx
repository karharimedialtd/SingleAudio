"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BrainCircuit, Download, Pencil, Plus, RefreshCw, Settings, Sparkles, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample data for AI models
const aiModels = [
  {
    id: "model-1",
    name: "Content Generator",
    description: "Generates titles, descriptions, and tags for content",
    status: "Active",
    version: "2.3.0",
    lastUpdated: "2023-04-15",
    usageCount: 1250,
    successRate: 98,
    avgResponseTime: 0.8,
    provider: "OpenAI",
  },
  {
    id: "model-2",
    name: "Thumbnail Generator",
    description: "Creates thumbnails from video content",
    status: "Active",
    version: "1.5.0",
    lastUpdated: "2023-04-10",
    usageCount: 875,
    successRate: 95,
    avgResponseTime: 1.2,
    provider: "Stable Diffusion",
  },
  {
    id: "model-3",
    name: "Content Moderator",
    description: "Automatically flags inappropriate content",
    status: "Active",
    version: "3.1.0",
    lastUpdated: "2023-04-12",
    usageCount: 2150,
    successRate: 92,
    avgResponseTime: 0.5,
    provider: "Internal",
  },
  {
    id: "model-4",
    name: "Music Analyzer",
    description: "Analyzes music tracks for genre, mood, and tempo",
    status: "Inactive",
    version: "1.0.0",
    lastUpdated: "2023-03-20",
    usageCount: 320,
    successRate: 85,
    avgResponseTime: 1.5,
    provider: "Internal",
  },
]

// Sample data for AI usage
const aiUsageData = [
  { date: "Apr 1", usage: 120, success: 115, failed: 5 },
  { date: "Apr 2", usage: 145, success: 140, failed: 5 },
  { date: "Apr 3", usage: 165, success: 160, failed: 5 },
  { date: "Apr 4", usage: 190, success: 185, failed: 5 },
  { date: "Apr 5", usage: 210, success: 200, failed: 10 },
  { date: "Apr 6", usage: 230, success: 220, failed: 10 },
  { date: "Apr 7", usage: 250, success: 240, failed: 10 },
]

// Sample data for AI prompts
const aiPrompts = [
  {
    id: "prompt-1",
    name: "Video Title Generator",
    description: "Generates engaging video titles based on content",
    prompt:
      "Generate 5 engaging, clickable YouTube titles for a video about {topic}. Make them attention-grabbing but not clickbait.",
    model: "Content Generator",
    category: "Content Creation",
    usageCount: 450,
  },
  {
    id: "prompt-2",
    name: "Video Description Generator",
    description: "Creates detailed video descriptions with keywords",
    prompt:
      "Write a detailed YouTube video description for a video about {topic}. Include relevant keywords, timestamps for key sections, and a call to action.",
    model: "Content Generator",
    category: "Content Creation",
    usageCount: 380,
  },
  {
    id: "prompt-3",
    name: "Thumbnail Concept",
    description: "Generates thumbnail concepts based on video content",
    prompt:
      "Create a thumbnail concept for a YouTube video about {topic}. Describe the visual elements, text overlay, and color scheme that would make viewers click.",
    model: "Thumbnail Generator",
    category: "Design",
    usageCount: 320,
  },
]

export default function AdminAIPanel() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isModelDialogOpen, setIsModelDialogOpen] = useState(false)
  const [isPromptDialogOpen, setIsPromptDialogOpen] = useState(false)
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [isNewModelDialogOpen, setIsNewModelDialogOpen] = useState(false)
  const [isNewPromptDialogOpen, setIsNewPromptDialogOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [testResult, setTestResult] = useState(null)

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulate data refresh
    toast({
      title: "Refreshing",
      description: "Refreshing AI data...",
      duration: 2000,
    })
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Refreshed",
        description: "AI data has been refreshed.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleAddNewModel = () => {
    setIsNewModelDialogOpen(true)
    toast({
      title: "Add New Model",
      description: "Opening model creation form",
      duration: 2000,
    })
  }

  const handleAddNewPrompt = () => {
    setIsNewPromptDialogOpen(true)
    toast({
      title: "Add New Prompt",
      description: "Opening prompt template creation form",
      duration: 2000,
    })
  }

  const handleEditModel = (model) => {
    setSelectedModel(model)
    setIsModelDialogOpen(true)
    toast({
      title: "Edit Model",
      description: `Editing model: ${model.name}`,
      duration: 2000,
    })
  }

  const handleEditPrompt = (prompt) => {
    setSelectedPrompt(prompt)
    setIsPromptDialogOpen(true)
    toast({
      title: "Edit Prompt",
      description: `Editing prompt: ${prompt.name}`,
      duration: 2000,
    })
  }

  const handleTestModel = (model) => {
    setSelectedModel(model)
    setTestResult(null)
    setIsTestDialogOpen(true)
    toast({
      title: "Test Model",
      description: `Preparing to test ${model.name}`,
      duration: 2000,
    })
  }

  const runModelTest = () => {
    setIsLoading(true)
    toast({
      title: "Running Test",
      description: `Testing ${selectedModel.name}...`,
      duration: 2000,
    })
    // Simulate AI processing
    setTimeout(() => {
      setIsLoading(false)
      setTestResult({
        success: true,
        responseTime: 0.75,
        output: "This is a sample output from the AI model test. The model is functioning correctly.",
      })
      toast({
        title: "Test Complete",
        description: `${selectedModel.name} test completed successfully`,
        duration: 3000,
      })
    }, 2000)
  }

  const saveNewModel = () => {
    toast({
      title: "Model Created",
      description: "New AI model has been created successfully",
      duration: 3000,
    })
    setIsNewModelDialogOpen(false)
  }

  const saveNewPrompt = () => {
    toast({
      title: "Prompt Created",
      description: "New prompt template has been created successfully",
      duration: 3000,
    })
    setIsNewPromptDialogOpen(false)
  }

  const saveModelChanges = () => {
    toast({
      title: "Model Updated",
      description: `${selectedModel.name} has been updated successfully`,
      duration: 3000,
    })
    setIsModelDialogOpen(false)
  }

  const savePromptChanges = () => {
    toast({
      title: "Prompt Updated",
      description: `${selectedPrompt.name} has been updated successfully`,
      duration: 3000,
    })
    setIsPromptDialogOpen(false)
  }

  const handleExportReport = () => {
    toast({
      title: "Exporting Report",
      description: "AI usage report export started. You'll be notified when it's ready.",
      duration: 3000,
    })
  }

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "AI system settings have been updated successfully",
      duration: 3000,
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Management Panel</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddNewModel}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Model
          </Button>
        </div>
      </div>

      <Alert className="bg-blue-50 text-blue-800 border-blue-200">
        <BrainCircuit className="h-4 w-4" />
        <AlertTitle>AI System Status</AlertTitle>
        <AlertDescription>
          All AI systems are operating normally. Current API usage is at 65% of your monthly quota.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Out of 4 total models</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Calls Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.5%</div>
            <p className="text-xs text-muted-foreground">+2.3% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.85s</div>
            <p className="text-xs text-muted-foreground">-0.1s from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models">
        <TabsList>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="prompts">Prompt Templates</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Models</CardTitle>
              <CardDescription>Manage and monitor AI models used across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiModels.map((model) => (
                    <TableRow key={model.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-purple-500" />
                          <div>
                            <div>{model.name}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell>{model.version}</TableCell>
                      <TableCell>
                        <Badge variant={model.status === "Active" ? "default" : "secondary"}>{model.status}</Badge>
                      </TableCell>
                      <TableCell>{model.usageCount.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={model.successRate} className="h-2 w-16" />
                          <span className="text-sm">{model.successRate}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{model.avgResponseTime}s</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditModel(model)}>
                            <Settings size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleTestModel(model)}>
                            <Zap size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Prompt Templates</CardTitle>
                  <CardDescription>Manage reusable AI prompt templates</CardDescription>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddNewPrompt}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Prompt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Prompt Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aiPrompts.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div>{prompt.name}</div>
                          <div className="text-xs text-muted-foreground">{prompt.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{prompt.category}</TableCell>
                      <TableCell>{prompt.model}</TableCell>
                      <TableCell>{prompt.usageCount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => handleEditPrompt(prompt)}>
                          <Pencil size={16} className="mr-2" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Usage Analytics</CardTitle>
              <CardDescription>Monitor AI usage and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Daily API Calls (Last 7 Days)</h3>
                  <div className="h-[300px] w-full bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Chart visualization would appear here</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Usage by Model</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Model</TableHead>
                        <TableHead>API Calls</TableHead>
                        <TableHead>Success Rate</TableHead>
                        <TableHead>Avg Response Time</TableHead>
                        <TableHead>Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Content Generator</TableCell>
                        <TableCell>1,250</TableCell>
                        <TableCell>98%</TableCell>
                        <TableCell>0.8s</TableCell>
                        <TableCell>$12.50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Thumbnail Generator</TableCell>
                        <TableCell>875</TableCell>
                        <TableCell>95%</TableCell>
                        <TableCell>1.2s</TableCell>
                        <TableCell>$17.50</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Content Moderator</TableCell>
                        <TableCell>2,150</TableCell>
                        <TableCell>92%</TableCell>
                        <TableCell>0.5s</TableCell>
                        <TableCell>$10.75</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Music Analyzer</TableCell>
                        <TableCell>320</TableCell>
                        <TableCell>85%</TableCell>
                        <TableCell>1.5s</TableCell>
                        <TableCell>$3.20</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleExportReport}>
                <Download className="mr-2 h-4 w-4" />
                Export Usage Report
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI System Settings</CardTitle>
              <CardDescription>Configure global AI settings and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Configuration</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <Input id="openai-key" type="password" value="sk-••••••••••••••••••••••••••••••••••••" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="stability-key">Stability AI API Key</Label>
                    <Input id="stability-key" type="password" value="sk-••••••••••••••••••••••••••••••••••••" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Parameters</h3>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="temperature">Temperature</Label>
                      <span className="text-sm">0.7</span>
                    </div>
                    <Slider id="temperature" defaultValue={[0.7]} max={1} step={0.1} />
                    <p className="text-xs text-muted-foreground">
                      Controls randomness: Lower values are more deterministic, higher values more creative
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <span className="text-sm">1024</span>
                    </div>
                    <Slider id="max-tokens" defaultValue={[1024]} max={2048} step={128} />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of tokens to generate in the completion
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Controls</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Content Moderation</Label>
                      <p className="text-sm text-muted-foreground">
                        Filter AI outputs for inappropriate or harmful content
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Usage Limits</Label>
                      <p className="text-sm text-muted-foreground">Enforce API usage limits per user</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Fallback Models</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically use fallback models when primary models fail
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Model Dialog */}
      <Dialog open={isModelDialogOpen} onOpenChange={setIsModelDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit AI Model</DialogTitle>
            <DialogDescription>Configure settings for {selectedModel?.name}</DialogDescription>
          </DialogHeader>
          {selectedModel && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input id="model-name" defaultValue={selectedModel.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model-description">Description</Label>
                <Textarea id="model-description" defaultValue={selectedModel.description} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="model-provider">Provider</Label>
                  <Select defaultValue={selectedModel.provider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenAI">OpenAI</SelectItem>
                      <SelectItem value="Stable Diffusion">Stable Diffusion</SelectItem>
                      <SelectItem value="Internal">Internal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="model-version">Version</Label>
                  <Input id="model-version" defaultValue={selectedModel.version} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="model-status">Status</Label>
                <Select defaultValue={selectedModel.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Advanced Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="model-cache" className="text-sm">
                      Enable Response Caching
                    </Label>
                    <Switch id="model-cache" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="model-logging" className="text-sm">
                      Log All Requests
                    </Label>
                    <Switch id="model-logging" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="model-fallback" className="text-sm">
                      Enable Fallback
                    </Label>
                    <Switch id="model-fallback" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveModelChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Prompt Dialog */}
      <Dialog open={isPromptDialogOpen} onOpenChange={setIsPromptDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Prompt Template</DialogTitle>
            <DialogDescription>Configure the prompt template for AI generation</DialogDescription>
          </DialogHeader>
          {selectedPrompt && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input id="prompt-name" defaultValue={selectedPrompt.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt-description">Description</Label>
                <Input id="prompt-description" defaultValue={selectedPrompt.description} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt-category">Category</Label>
                <Select defaultValue={selectedPrompt.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Content Creation">Content Creation</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Analysis">Analysis</SelectItem>
                    <SelectItem value="Moderation">Moderation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt-model">Model</Label>
                <Select defaultValue={selectedPrompt.model}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.id} value={model.name}>
                        {model.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="prompt-template">Prompt Template</Label>
                <Textarea id="prompt-template" rows={6} defaultValue={selectedPrompt.prompt} />
                <p className="text-xs text-muted-foreground">
                  Use {"{variable}"} syntax for dynamic variables that will be replaced at runtime
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPromptDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePromptChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Model Dialog */}
      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test AI Model</DialogTitle>
            <DialogDescription>Run a test on {selectedModel?.name} to verify functionality</DialogDescription>
          </DialogHeader>
          {selectedModel && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="test-input">Test Input</Label>
                <Textarea
                  id="test-input"
                  rows={4}
                  placeholder="Enter test input for the AI model..."
                  defaultValue={
                    selectedModel.name === "Content Generator"
                      ? "Generate a title for a music tutorial video about guitar chords for beginners."
                      : "Enter test input here..."
                  }
                />
              </div>

              {testResult && (
                <div className="space-y-2 border rounded-md p-4 bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Label>Test Result:</Label>
                    <Badge variant={testResult.success ? "default" : "destructive"}>
                      {testResult.success ? "Success" : "Failed"}
                    </Badge>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Response Time:</span> {testResult.responseTime}s
                  </div>
                  <div className="mt-2">
                    <Label className="text-sm">Output:</Label>
                    <div className="mt-1 p-3 bg-muted rounded-md text-sm">{testResult.output}</div>
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={runModelTest} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Run Test
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Model Dialog */}
      <Dialog open={isNewModelDialogOpen} onOpenChange={setIsNewModelDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New AI Model</DialogTitle>
            <DialogDescription>Configure a new AI model for the platform</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-model-name">Model Name</Label>
              <Input id="new-model-name" placeholder="Enter model name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-model-description">Description</Label>
              <Textarea id="new-model-description" placeholder="Describe what this model does" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="new-model-provider">Provider</Label>
                <Select defaultValue="OpenAI">
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OpenAI">OpenAI</SelectItem>
                    <SelectItem value="Stable Diffusion">Stable Diffusion</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-model-version">Version</Label>
                <Input id="new-model-version" placeholder="1.0.0" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-model-endpoint">API Endpoint</Label>
              <Input id="new-model-endpoint" placeholder="https://api.example.com/v1/completions" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-model-key">API Key</Label>
              <Input id="new-model-key" type="password" placeholder="Enter API key" />
            </div>
            <div className="grid gap-2">
              <Label>Model Capabilities</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Switch id="capability-text" defaultChecked />
                  <Label htmlFor="capability-text">Text Generation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="capability-image" />
                  <Label htmlFor="capability-image">Image Generation</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="capability-audio" />
                  <Label htmlFor="capability-audio">Audio Processing</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewModelDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewModel}>Create Model</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Prompt Dialog */}
      <Dialog open={isNewPromptDialogOpen} onOpenChange={setIsNewPromptDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Prompt Template</DialogTitle>
            <DialogDescription>Create a new reusable prompt template</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="new-prompt-name">Prompt Name</Label>
              <Input id="new-prompt-name" placeholder="Enter prompt name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-prompt-description">Description</Label>
              <Input id="new-prompt-description" placeholder="Describe what this prompt does" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-prompt-category">Category</Label>
              <Select defaultValue="Content Creation">
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Content Creation">Content Creation</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Analysis">Analysis</SelectItem>
                  <SelectItem value="Moderation">Moderation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-prompt-model">Model</Label>
              <Select defaultValue="Content Generator">
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {aiModels.map((model) => (
                    <SelectItem key={model.id} value={model.name}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-prompt-template">Prompt Template</Label>
              <Textarea
                id="new-prompt-template"
                rows={6}
                placeholder="Enter your prompt template with {variables} for dynamic content"
              />
              <p className="text-xs text-muted-foreground">
                Use {"{variable}"} syntax for dynamic variables that will be replaced at runtime
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewPromptDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNewPrompt}>Create Prompt</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
