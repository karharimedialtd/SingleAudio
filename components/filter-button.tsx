"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FilterOption {
  id: string
  label: string
}

interface FilterButtonProps {
  options?: FilterOption[]
  onFilter?: (selectedOptions: string[]) => void
  buttonText?: string
  className?: string
}

export function FilterButton({
  options = [
    { id: "all", label: "All" },
    { id: "recent", label: "Recent" },
    { id: "popular", label: "Popular" },
  ],
  onFilter = () => {},
  buttonText = "Filter",
  className = "",
}: FilterButtonProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleSelect = (optionId: string) => {
    const newSelected = selectedOptions.includes(optionId)
      ? selectedOptions.filter((id) => id !== optionId)
      : [...selectedOptions, optionId]

    setSelectedOptions(newSelected)
    onFilter(newSelected)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={`bg-gray-800 border-gray-700 hover:bg-gray-700 ${className}`}>
          <Filter className="h-4 w-4 mr-2" />
          {buttonText}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-900 border-gray-800">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.id}
            checked={selectedOptions.includes(option.id)}
            onCheckedChange={() => handleSelect(option.id)}
            className="cursor-pointer hover:bg-gray-800"
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
