"use client"

import { createContext, useContext } from "react"
import type { ReactNode } from "react"

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContextProps {
  config: ChartConfig
}

const ChartContext = createContext<ChartContextProps>({
  config: {},
})

interface ChartContainerProps {
  children: ReactNode
  config: ChartConfig
  className?: string
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className}>{children}</div>
    </ChartContext.Provider>
  )
}

export function useChartContext() {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error("useChartContext must be used within a ChartContainer")
  }
  return context
}

export function ChartTooltip() {
  return null
}

export function ChartTooltipContent() {
  const { config } = useChartContext()

  return (
    <div className="rounded-md bg-gray-800 p-2">
      <p className="text-sm text-gray-100">
        {/* You can customize the tooltip content here */}
        {/* Example: Accessing data from the chart item */}
        {/* {payload[0]?.payload.date} */}
      </p>
      {/* {payload.map((item) => (
        <p key={item.dataKey} className="text-xs text-gray-300">
          <span style={{ color: config[item.dataKey]?.color || item.stroke }}>●</span>{" "}
          {config[item.dataKey]?.label || item.dataKey}: {item.value}
        </p>
      ))} */}
    </div>
  )
}

export function Chart() {
  return null
}
