"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X, CheckCircle2 } from "lucide-react"
import { handleUpload } from "@/lib/button-actions"

interface FileUploadProps {
  accept?: string
  maxSize?: number // in MB
  onUploadComplete?: (url: string) => void
  buttonText?: string
  className?: string
}

export function FileUpload({
  accept = "image/*,video/*",
  maxSize = 10, // 10MB default
  onUploadComplete,
  buttonText = "Upload File",
  className,
}: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`)
      return
    }

    setFile(selectedFile)
    setError(null)
    setIsUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return 95
        }
        return prev + 5
      })
    }, 200)

    try {
      // Actual upload
      const url = await handleUpload(selectedFile)

      // Complete the progress
      clearInterval(interval)
      setProgress(100)
      setUploadComplete(true)
      setIsUploading(false)

      // Callback
      if (onUploadComplete) {
        onUploadComplete(url)
      }
    } catch (err) {
      clearInterval(interval)
      setError("Upload failed. Please try again.")
      setIsUploading(false)
      setProgress(0)
    }
  }

  const cancelUpload = () => {
    setFile(null)
    setProgress(0)
    setIsUploading(false)
    setError(null)
    setUploadComplete(false)
  }

  return (
    <div className={className}>
      {!file && !isUploading && !uploadComplete ? (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => {
            const input = document.createElement("input")
            input.type = "file"
            input.accept = accept
            input.onchange = (e) => handleFileChange(e as React.ChangeEvent<HTMLInputElement>)
            input.click()
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm truncate max-w-[200px]">{file?.name}</div>
            {isUploading ? (
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={cancelUpload}>
                <X className="h-4 w-4" />
              </Button>
            ) : uploadComplete ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : null}
          </div>

          {isUploading && (
            <div className="space-y-1">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{progress}%</span>
                <span>{Math.round((file?.size || 0) / 1024)} KB</span>
              </div>
            </div>
          )}

          {error && <div className="text-xs text-red-500">{error}</div>}

          {uploadComplete && (
            <Button variant="outline" size="sm" className="w-full" onClick={cancelUpload}>
              Upload Another
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
