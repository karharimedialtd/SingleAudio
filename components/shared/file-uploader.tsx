"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, File, Music, Video, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileWithPreview extends File {
  preview?: string
  progress?: number
  status?: "uploading" | "completed" | "error"
}

interface FileUploaderProps {
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number
  onFilesChange?: (files: FileWithPreview[]) => void
  className?: string
  multiple?: boolean
  type?: "audio" | "video" | "image" | "any"
}

export function FileUploader({
  accept,
  maxFiles = 10,
  maxSize = 100 * 1024 * 1024, // 100MB
  onFilesChange,
  className,
  multiple = true,
  type = "any",
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([])

  const getAcceptTypes = () => {
    if (accept) return accept

    switch (type) {
      case "audio":
        return {
          "audio/*": [".mp3", ".wav", ".flac", ".aac", ".ogg"],
        }
      case "video":
        return {
          "video/*": [".mp4", ".mov", ".avi", ".mkv"],
        }
      case "image":
        return {
          "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
        }
      default:
        return {}
    }
  }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
          progress: 0,
          status: "uploading" as const,
        })

        // Simulate upload progress
        simulateUpload(fileWithPreview)

        return fileWithPreview
      })

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    },
    [files, maxFiles, onFilesChange],
  )

  const simulateUpload = (file: FileWithPreview) => {
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f === file) {
            const newProgress = Math.min((f.progress || 0) + Math.random() * 30, 100)
            if (newProgress >= 100) {
              clearInterval(interval)
              return { ...f, progress: 100, status: "completed" }
            }
            return { ...f, progress: newProgress }
          }
          return f
        }),
      )
    }, 200)
  }

  const removeFile = (fileToRemove: FileWithPreview) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)

    if (fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: getAcceptTypes(),
    maxFiles: multiple ? maxFiles : 1,
    maxSize,
    multiple,
  })

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("audio/")) return <Music className="h-8 w-8" />
    if (file.type.startsWith("video/")) return <Video className="h-8 w-8" />
    if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8" />
    return <File className="h-8 w-8" />
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div {...getRootProps()} className={cn("file-upload-zone cursor-pointer", isDragActive && "dragover")}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-4">
          <Upload className="h-12 w-12 text-muted-foreground" />
          <div className="text-center">
            <p className="text-lg font-medium">{isDragActive ? "Drop files here" : "Drag & drop files here"}</p>
            <p className="text-sm text-muted-foreground">or click to browse files</p>
            <p className="text-xs text-muted-foreground mt-2">
              Max {maxFiles} files, {Math.round(maxSize / 1024 / 1024)}MB each
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files ({files.length})</h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {file.preview ? (
                        <img
                          src={file.preview || "/placeholder.svg"}
                          alt={file.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        getFileIcon(file)
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>

                      {file.status === "uploading" && (
                        <div className="mt-2">
                          <Progress value={file.progress || 0} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {Math.round(file.progress || 0)}% uploaded
                          </p>
                        </div>
                      )}

                      {file.status === "completed" && <p className="text-xs text-green-600 mt-1">Upload complete</p>}
                    </div>

                    <Button variant="ghost" size="sm" onClick={() => removeFile(file)} className="flex-shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
