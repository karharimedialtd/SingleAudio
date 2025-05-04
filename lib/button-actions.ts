import { toast } from "@/components/ui/use-toast"

// Helper function to download CSV
export const downloadCSV = (data: any[], filename: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(",")
  const rows = data.map((item) => Object.values(item).join(","))
  const csv = [headers, ...rows].join("\n")

  // Create a blob and download it
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("download", filename)
  link.style.visibility = "hidden"
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Generic action handler that shows toast notifications
export const handleAction = async (
  actionName: string,
  action: () => Promise<any> | any,
  options?: {
    loadingMessage?: string
    successMessage?: string
    errorMessage?: string
  },
) => {
  const {
    loadingMessage = `Processing ${actionName}...`,
    successMessage = `${actionName} completed successfully`,
    errorMessage = `${actionName} failed`,
  } = options || {}

  toast({
    title: loadingMessage,
    duration: 2000,
  })

  try {
    const result = await action()

    toast({
      title: "Success",
      description: successMessage,
      duration: 3000,
    })

    return result
  } catch (error) {
    console.error(`${actionName} error:`, error)

    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
      duration: 3000,
    })

    throw error
  }
}

// Data refresh action
export const handleRefresh = async (dataType: string, onRefresh?: () => Promise<any>) => {
  return handleAction(
    "Refresh",
    async () => {
      if (onRefresh) {
        return await onRefresh()
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: `${dataType} data refreshed` }
    },
    {
      loadingMessage: `Refreshing ${dataType} data...`,
      successMessage: `${dataType} data refreshed successfully`,
      errorMessage: `Failed to refresh ${dataType} data`,
    },
  )
}

// Export data action - IMPORTANT: This was missing and causing the error
export const handleExport = async (
  dataType: string,
  data: any,
  filename: string,
  format: "csv" | "json" | "pdf" = "csv",
) => {
  return handleAction(
    "Export",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))

      if (format === "csv") {
        downloadCSV(data, filename)
      } else if (format === "json") {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else if (format === "pdf") {
        // In a real app, this would generate a PDF
        alert(`PDF export would happen here for ${filename}`)
      }

      return { success: true, format, filename }
    },
    {
      loadingMessage: `Exporting ${dataType} as ${format}...`,
      successMessage: `${dataType} exported successfully as ${format}`,
      errorMessage: `Failed to export ${dataType}`,
    },
  )
}

// Export report action - Added for clarity
export const exportReport = async (reportType: string) => {
  return handleAction(
    "Export Report",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true, message: `Report exported for ${reportType}` }
    },
    {
      loadingMessage: `Exporting report for ${reportType}...`,
      successMessage: `Report exported for ${reportType} successfully`,
      errorMessage: `Failed to export report for ${reportType}`,
    },
  )
}

// Generate content action
export const generateContent = async (contentType: string, params: any) => {
  return handleAction(
    "Generate",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Return mock generated content based on type
      if (contentType === "title") {
        return { content: `Amazing ${params.topic || "Video"} - Must Watch 2023!` }
      } else if (contentType === "description") {
        return {
          content: `This is an auto-generated description for ${params.topic || "your video"}.\n\nDon't forget to like and subscribe!\n\n#${params.topic?.replace(/\s+/g, "") || "video"} #trending`,
        }
      } else if (contentType === "tags") {
        return { content: ["video", "trending", params.topic?.replace(/\s+/g, "") || "content"] }
      } else {
        return { content: `Generated ${contentType} content` }
      }
    },
    {
      loadingMessage: `Generating ${contentType}...`,
      successMessage: `${contentType} generated successfully`,
      errorMessage: `Failed to generate ${contentType}`,
    },
  )
}

// Analyze content action
export const handleAnalyze = async (contentType: string, params: any) => {
  return handleAction(
    "Analyze",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      return { success: true, analysisResults: `Analysis results for ${contentType}` }
    },
    {
      loadingMessage: `Analyzing ${contentType}...`,
      successMessage: `${contentType} analyzed successfully`,
      errorMessage: `Failed to analyze ${contentType}`,
    },
  )
}

// Upload file action
export const handleUpload = async (file: File) => {
  return handleAction(
    "Upload",
    async () => {
      // Simulate upload progress
      const totalSteps = 10
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      return { success: true, url: `https://example.com/uploads/${file.name}` }
    },
    {
      loadingMessage: `Uploading ${file.name}...`,
      successMessage: `${file.name} uploaded successfully`,
      errorMessage: `Failed to upload ${file.name}`,
    },
  )
}

// Optimize content action
export const optimizeContent = async (contentType: string) => {
  return handleAction(
    "Optimize",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true, message: `Content optimized for ${contentType}` }
    },
    {
      loadingMessage: `Optimizing content for ${contentType}...`,
      successMessage: `Content optimized for ${contentType} successfully`,
      errorMessage: `Failed to optimize content for ${contentType}`,
    },
  )
}

// Generate report action
export const generateReport = async (reportType: string) => {
  return handleAction(
    "Generate Report",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true, message: `Report generated for ${reportType}` }
    },
    {
      loadingMessage: `Generating report for ${reportType}...`,
      successMessage: `Report generated for ${reportType} successfully`,
      errorMessage: `Failed to generate report for ${reportType}`,
    },
  )
}

// Create item action
export const createItem = async (itemType: string) => {
  return handleAction(
    "Create",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, message: `New ${itemType} created` }
    },
    {
      loadingMessage: `Creating new ${itemType}...`,
      successMessage: `New ${itemType} created successfully`,
      errorMessage: `Failed to create ${itemType}`,
    },
  )
}

// Schedule content action
export const scheduleContent = async (contentType: string, date: Date) => {
  return handleAction(
    "Schedule",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return { success: true, scheduledDate: date, contentType }
    },
    {
      loadingMessage: `Scheduling ${contentType}...`,
      successMessage: `${contentType} scheduled for ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`,
      errorMessage: `Failed to schedule ${contentType}`,
    },
  )
}

// Upload video action
export const uploadVideo = async (file: File) => {
  return handleAction(
    "Upload Video",
    async () => {
      // Simulate upload progress
      const totalSteps = 10
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300))
      }

      return { success: true, url: `https://example.com/videos/${file.name}` }
    },
    {
      loadingMessage: `Uploading video ${file.name}...`,
      successMessage: `Video ${file.name} uploaded successfully`,
      errorMessage: `Failed to upload video ${file.name}`,
    },
  )
}

// Upload image action
export const uploadImage = async (file: File) => {
  return handleAction(
    "Upload Image",
    async () => {
      // Simulate upload progress
      const totalSteps = 5
      for (let i = 1; i <= totalSteps; i++) {
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      return { success: true, url: `https://example.com/images/${file.name}` }
    },
    {
      loadingMessage: `Uploading image ${file.name}...`,
      successMessage: `Image ${file.name} uploaded successfully`,
      errorMessage: `Failed to upload image ${file.name}`,
    },
  )
}

// Generate thumbnail action
export const generateThumbnail = async (params: any) => {
  return handleAction(
    "Generate Thumbnail",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return { success: true, thumbnailUrl: `https://example.com/thumbnails/generated-${Date.now()}.jpg` }
    },
    {
      loadingMessage: `Generating thumbnail...`,
      successMessage: `Thumbnail generated successfully`,
      errorMessage: `Failed to generate thumbnail`,
    },
  )
}

// View analytics action
export const viewAnalytics = async (itemType: string, itemId: string | number) => {
  return handleAction(
    "View Analytics",
    async () => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      return { success: true, message: `Analytics for ${itemType} #${itemId}` }
    },
    {
      loadingMessage: `Loading analytics for ${itemType} #${itemId}...`,
      successMessage: `Analytics for ${itemType} #${itemId} loaded successfully`,
      errorMessage: `Failed to load analytics for ${itemType} #${itemId}`,
    },
  )
}

// Add this line near the end of the file to provide backward compatibility
export const exportData = handleExport

export const refreshData = handleRefresh
