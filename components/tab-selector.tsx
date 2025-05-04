"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabOption {
  value: string
  label: string
}

interface TabSelectorProps {
  options: TabOption[]
  defaultValue: string
  onChange: (value: string) => void
  className?: string
}

export function TabSelector({ options, defaultValue, onChange, className = "" }: TabSelectorProps) {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onChange} className={`w-auto ${className}`}>
      <TabsList className="bg-gray-800">
        {options.map((option) => (
          <TabsTrigger key={option.value} value={option.value} className="data-[state=active]:bg-gray-700">
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
