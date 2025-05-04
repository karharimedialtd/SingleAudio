"use client"

import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

type ToastVariant = "default" | "destructive" | "success"

type Toast = {
  id: string
  title?: string
  description?: string
  action?: ReactNode
  duration?: number
  variant?: ToastVariant
  [key: string]: any
}

type ToastContextProps = {
  toasts: Toast[]
  toast: (toast: Omit<Toast, "id">) => void
  dismiss: (toastId: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (newToast: Omit<Toast, "id">) => {
    const id = String(Math.random())
    setToasts((prevToasts) => [...prevToasts, { id, ...newToast }])
  }

  const dismiss = (toastId: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
  }

  return <ToastContext.Provider value={{ toasts, toast: addToast, dismiss }}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Export a standalone toast function for easier usage
let toastFn: (toast: Omit<Toast, "id">) => void

export function setToastFunction(fn: (toast: Omit<Toast, "id">) => void) {
  toastFn = fn
}

export const toast = (props: Omit<Toast, "id">) => {
  if (!toastFn) {
    console.warn("Toast function not set. Make sure ToastProvider is mounted.")
    return
  }
  return toastFn(props)
}
