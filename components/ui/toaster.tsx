"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useToast, setToastFunction } from "./use-toast"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismiss, toast } = useToast()

  // Set the toast function for the standalone toast
  useEffect(() => {
    setToastFunction(toast)
  }, [toast])

  return (
    <div className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
      ))}
    </div>
  )
}

interface ToastProps {
  toast: ReturnType<typeof useToast>["toasts"][number]
  onDismiss: () => void
}

function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onDismiss, 300) // Allow time for exit animation
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [onDismiss, toast.duration])

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border border-gray-800 bg-gray-900 p-4 pr-8 shadow-lg transition-all",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        toast.variant === "destructive" && "border-red-500 bg-red-900/20",
      )}
    >
      <div className="flex flex-col gap-1">
        {toast.title && <div className="font-semibold text-white">{toast.title}</div>}
        {toast.description && <div className="text-sm text-gray-300">{toast.description}</div>}
      </div>
      {toast.action}
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onDismiss, 300)
        }}
        className="absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}
