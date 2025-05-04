"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckSquare,
  AlertCircle,
  CheckCircle2,
  Info,
  Download,
  RefreshCw,
  Sparkles,
  FileText,
  ImageIcon,
  Tag,
  MessageSquare,
  Clock,
  Share2,
} from "lucide-react"
import { ActionButton } from "@/components/action-button"
import { TabSelector } from "@/components/tab-selector"
import { exportData, optimizeContent } from "@/lib/button-actions"
import { toast } from "@/components/ui/use-toast"

// Sample checklist items
const checklistItems = [
  {
    id: "title",
    category: "metadata",
    label: "Optimize title with keywords (under 70 characters)",
    description: "Include primary keywords near the beginning of the title",
    completed: true,
  },
  {
    id: "description",
    category: "metadata",
    label: "Write detailed description with timestamps",
    description: "Include keywords, links, and call-to-action",
    completed: true,
  },
  {
    id: "tags",
    category: "metadata",
    label: "Add relevant tags (10-15 tags)",
    description: "Include a mix of broad and specific keywords",
    completed: false,
  },
  {
    id: "thumbnail",
    category: "visual",
    label: "Create high-quality custom thumbnail",
    description: "Use contrasting colors and readable text",
    completed: true,
  },
  {
    id: "endscreen",
    category: "visual",
    label: "Add end screen with suggested videos",
    description: "Include subscribe button and related content",
    completed: false,
  },
  {
    id: "cards",
    category: "visual",
    label: "Add interactive cards at key moments",
    description: "Link to related videos or playlists",
    completed: false,
  },
  {
    id: "captions",
    category: "accessibility",
    label: "Add closed captions/subtitles",
    description: "Improve accessibility and SEO",
    completed: false,
  },
  {
    id: "category",
    category: "metadata",
    label: "Select appropriate video category",
    description: "Choose the most relevant category for your content",
    completed: true,
  },
  {
    id: "playlist",
    category: "organization",
    label: "Add to relevant playlist",
    description: "Organize content for better discoverability",
    completed: false,
  },
  {
    id: "promotion",
    category: "marketing",
    label: "Prepare social media promotion",
    description: "Create posts for each platform to announce the video",
    completed: false,
  },
]

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(checklistItems)
  const [activeTab, setActiveTab] = useState("all")

  const toggleItem = (id: string) => {
    setChecklist(checklist.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedCount = checklist.filter((item) => item.completed).length
  const progress = Math.round((completedCount / checklist.length) * 100)

  const filteredChecklist = activeTab === "all" ? checklist : checklist.filter((item) => item.category === activeTab)

  const handleExportChecklist = async () => {
    try {
      await exportData(
        "checklist",
        checklist.map((item) => ({
          item: item.label,
          category: item.category,
          status: item.completed ? "Completed" : "Pending",
        })),
        `pre_publish_checklist_${new Date().toISOString().split("T")[0]}.csv`,
      )
      toast({
        title: "Checklist exported",
        description: "Your checklist has been exported successfully.",
      })
    } catch (error) {
      console.error("Error exporting checklist:", error)
    }
  }

  const handleAutoOptimize = async () => {
    try {
      await optimizeContent("video")
      toast({
        title: "Auto-optimization complete",
        description: "Your video has been optimized successfully.",
      })

      // Simulate auto-completing some items
      setTimeout(() => {
        setChecklist(
          checklist.map((item) => {
            if (["tags", "description", "endscreen"].includes(item.id)) {
              return { ...item, completed: true }
            }
            return item
          }),
        )
      }, 1500)
    } catch (error) {
      console.error("Error optimizing content:", error)
    }
  }

  const handleResetChecklist = () => {
    setChecklist(checklistItems.map((item) => ({ ...item, completed: false })))
    toast({
      title: "Checklist reset",
      description: "Your checklist has been reset successfully.",
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Pre-Publish Checklist</h1>
          <p className="text-sm text-gray-400">Ensure your video is fully optimized before publishing</p>
        </div>
        <div className="flex gap-2">
          <ActionButton
            variant="outline"
            className="bg-gray-800 border-gray-700 hover:bg-gray-700"
            action={handleExportChecklist}
            icon={<Download className="h-4 w-4" />}
            actionName="Export Checklist"
          >
            Export Checklist
          </ActionButton>
          <ActionButton
            className="bg-purple-600 hover:bg-purple-700"
            action={handleAutoOptimize}
            icon={<Sparkles className="h-4 w-4" />}
            actionName="Auto-Optimize"
          >
            Auto-Optimize
          </ActionButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Completion Progress</CardTitle>
              <CardDescription>Track your pre-publish checklist progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Overall Progress</h3>
                    <span className="text-sm">
                      {completedCount}/{checklist.length} completed
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-gray-400">
                    {progress < 50
                      ? "You still have several important items to complete."
                      : progress < 80
                        ? "Making good progress! Just a few more items to go."
                        : "Almost there! Just a few final touches."}
                  </p>
                </div>

                {/* Category Progress */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Category Progress</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Metadata</span>
                      <span className="text-xs">
                        {checklist.filter((item) => item.category === "metadata" && item.completed).length}/
                        {checklist.filter((item) => item.category === "metadata").length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.filter((item) => item.category === "metadata" && item.completed).length /
                          checklist.filter((item) => item.category === "metadata").length) *
                        100
                      }
                      className="h-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Visual</span>
                      <span className="text-xs">
                        {checklist.filter((item) => item.category === "visual" && item.completed).length}/
                        {checklist.filter((item) => item.category === "visual").length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.filter((item) => item.category === "visual" && item.completed).length /
                          checklist.filter((item) => item.category === "visual").length) *
                        100
                      }
                      className="h-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Accessibility</span>
                      <span className="text-xs">
                        {checklist.filter((item) => item.category === "accessibility" && item.completed).length}/
                        {checklist.filter((item) => item.category === "accessibility").length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.filter((item) => item.category === "accessibility" && item.completed).length /
                          checklist.filter((item) => item.category === "accessibility").length) *
                        100
                      }
                      className="h-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Organization</span>
                      <span className="text-xs">
                        {checklist.filter((item) => item.category === "organization" && item.completed).length}/
                        {checklist.filter((item) => item.category === "organization").length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.filter((item) => item.category === "organization" && item.completed).length /
                          checklist.filter((item) => item.category === "organization").length) *
                        100
                      }
                      className="h-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Marketing</span>
                      <span className="text-xs">
                        {checklist.filter((item) => item.category === "marketing" && item.completed).length}/
                        {checklist.filter((item) => item.category === "marketing").length}
                      </span>
                    </div>
                    <Progress
                      value={
                        (checklist.filter((item) => item.category === "marketing" && item.completed).length /
                          checklist.filter((item) => item.category === "marketing").length) *
                        100
                      }
                      className="h-1"
                    />
                  </div>
                </div>

                {/* Publish Readiness */}
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {progress === 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : progress >= 80 ? (
                      <Info className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-400" />
                    )}
                    <h3 className="font-medium">Publish Readiness</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    {progress === 100
                      ? "Your video is ready to publish! All checklist items are complete."
                      : progress >= 80
                        ? "Your video is almost ready to publish. Consider completing the remaining items for best results."
                        : "Your video is not ready to publish yet. Complete more checklist items to improve performance."}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <ActionButton
                className="w-full"
                variant={progress === 100 ? "default" : "outline"}
                disabled={progress < 80}
                actionName="Publish Video"
                action={() => {
                  if (progress >= 80) {
                    toast({
                      title: progress === 100 ? "Video published" : "Video published with caution",
                      description:
                        progress === 100
                          ? "Your video has been published successfully."
                          : "Your video has been published, but some checklist items are incomplete.",
                    })
                  }
                }}
              >
                {progress === 100
                  ? "Ready to Publish"
                  : progress >= 80
                    ? "Publish with Caution"
                    : "Not Ready to Publish"}
              </ActionButton>
            </CardFooter>
          </Card>
        </div>

        {/* Checklist */}
        <div className="lg:col-span-2">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Pre-Publish Checklist</CardTitle>
                <TabSelector
                  options={[
                    { value: "all", label: "All" },
                    { value: "metadata", label: "Metadata" },
                    { value: "visual", label: "Visual" },
                    { value: "accessibility", label: "Accessibility" },
                  ]}
                  defaultValue={activeTab}
                  onChange={setActiveTab}
                />
              </div>
              <CardDescription>Complete these items to optimize your video for maximum performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredChecklist.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      item.completed ? "bg-gray-800/50" : "bg-gray-800"
                    }`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={item.id}
                        className={`flex items-center text-sm font-medium cursor-pointer ${
                          item.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {item.label}
                        <Badge className="ml-2 bg-gray-700 text-gray-300" variant="outline">
                          {item.category}
                        </Badge>
                      </label>
                      <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                    </div>
                    <div>
                      {item.id === "title" && <FileText className="h-4 w-4 text-blue-400" />}
                      {item.id === "description" && <MessageSquare className="h-4 w-4 text-green-400" />}
                      {item.id === "tags" && <Tag className="h-4 w-4 text-yellow-400" />}
                      {item.id === "thumbnail" && <ImageIcon className="h-4 w-4 text-purple-400" />}
                      {item.id === "endscreen" && <Clock className="h-4 w-4 text-orange-400" />}
                      {item.id === "cards" && <Share2 className="h-4 w-4 text-red-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-gray-400">
                <span className="flex items-center">
                  <CheckSquare className="h-4 w-4 mr-1" />
                  Complete all items for best performance
                </span>
              </div>
              <ActionButton
                variant="outline"
                className="bg-gray-800 border-gray-700 hover:bg-gray-700"
                action={handleResetChecklist}
                icon={<RefreshCw className="h-4 w-4" />}
                actionName="Reset Checklist"
              >
                Reset Checklist
              </ActionButton>
            </CardFooter>
          </Card>

          {/* Tips and Best Practices */}
          <Card className="bg-gray-900 border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Tips & Best Practices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-400">Metadata Optimization</h4>
                    <p className="text-sm text-gray-300 mt-1">
                      Front-load your title with important keywords. YouTube's algorithm gives more weight to words at
                      the beginning of titles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <Info className="h-5 w-5 text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-400">Thumbnail Design</h4>
                    <p className="text-sm text-gray-300 mt-1">
                      Use high contrast colors and clear, readable text. Thumbnails should be recognizable even at small
                      sizes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <Info className="h-5 w-5 text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-400">Engagement Strategy</h4>
                    <p className="text-sm text-gray-300 mt-1">
                      Include a clear call-to-action in both your video and description. Ask viewers to like, comment,
                      and subscribe.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
