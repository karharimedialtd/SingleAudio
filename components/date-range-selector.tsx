"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"

interface DateRangeSelectorProps {
  onDateChange?: (startDate: Date, endDate: Date) => void
  className?: string
}

export function DateRangeSelector({ onDateChange, className }: DateRangeSelectorProps) {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [isStartDateOpen, setIsStartDateOpen] = useState(false)
  const [isEndDateOpen, setIsEndDateOpen] = useState(false)

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date)
    setIsStartDateOpen(false)

    if (date && endDate && onDateChange) {
      onDateChange(date, endDate)
      toast({
        description: `Date range set: ${format(date, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`,
        duration: 2000,
      })
    }
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date)
    setIsEndDateOpen(false)

    if (startDate && date && onDateChange) {
      onDateChange(startDate, date)
      toast({
        description: `Date range set: ${format(startDate, "MMM d, yyyy")} - ${format(date, "MMM d, yyyy")}`,
        duration: 2000,
      })
    }
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {startDate ? format(startDate, "MMM d, yyyy") : "Start Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
          <Calendar mode="single" selected={startDate} onSelect={handleStartDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
      <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="bg-gray-800 border-gray-700 hover:bg-gray-700">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {endDate ? format(endDate, "MMM d, yyyy") : "End Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={handleEndDateSelect}
            initialFocus
            disabled={(date) => (startDate ? date < startDate : false)}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
