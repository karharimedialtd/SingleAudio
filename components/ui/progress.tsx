"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

type Variant = "default" | "success" | "danger" | "warning"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  indicatorClassName?: string
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  default: "bg-primary",
  success: "bg-green-500",
  danger: "bg-red-500",
  warning: "bg-yellow-500",
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, variant = "default", ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full transition-all", variantClasses[variant], indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))

Progress.displayName = "Progress"

export { Progress }
