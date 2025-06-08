"use client"

import { useEffect } from "react"
import { useDashboard } from "@/context/dashboard-context"
import { DSPList } from "@/components/distribution/DSPList"

export default function DSPSelectionPage() {
  const { setCurrentPage } = useDashboard()

  useEffect(() => {
    setCurrentPage("DSP Selection")
  }, [setCurrentPage])

  return <DSPList />
}
