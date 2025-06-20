"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { InitialTrackingView } from "./initial-tracking-view"
import { TrackingResultsView } from "./tracking-results-view"
import { useRecentSearches } from "../hooks/use-recent-searches"
import { Loader2 } from "lucide-react" // For loading spinner

const fetchTrackingData = (trackingNumber: string): Promise<{ success: boolean; message?: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (trackingNumber === "ERROR123") {
        reject(new Error("Simulated API error: Could not connect."))
      } else if (trackingNumber.length < 5 || (!trackingNumber.startsWith("RR") && !trackingNumber.startsWith("UA"))) {
        resolve({ success: false, message: "Invalid tracking number format." })
      } else if (trackingNumber === "NODATA456") {
        resolve({ success: false, message: "Tracking number not found." })
      } else {
        resolve({ success: true })
      }
    }, 1500)
  })
}

export function TrackingPageClient() {
  const [trackingNumberInput, setTrackingNumberInput] = useState("")
  const [currentTrackingNumber, setCurrentTrackingNumber] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, addRecentSearch, removeRecentSearch] = useRecentSearches()
  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setPageLoaded(true), 200)
    return () => clearTimeout(timer)
  }, [])

  const handleTrackPackage = async (tnToTrack?: string) => {
    const effectiveTrackingNumber = tnToTrack || trackingNumberInput
    if (!effectiveTrackingNumber.trim()) {
      toast.error("Please enter a tracking number.")
      return
    }
    setIsLoading(true)
    const loadingToastId = toast.loading(`Tracking ${effectiveTrackingNumber}...`)

    try {
      const result = await fetchTrackingData(effectiveTrackingNumber)
      if (result.success) {
        setCurrentTrackingNumber(effectiveTrackingNumber)
        addRecentSearch(effectiveTrackingNumber)
        if (tnToTrack) setTrackingNumberInput(tnToTrack) // Update input if tracked via recent
        toast.success(`Tracking information loaded for ${effectiveTrackingNumber}!`, { id: loadingToastId })
      } else {
        setCurrentTrackingNumber(null)
        toast.error(result.message || "Could not find tracking information.", { id: loadingToastId })
      }
    } catch (error) {
      setCurrentTrackingNumber(null)
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred.", { id: loadingToastId })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRecentSearchClick = (searchTerm: string) => {
    setTrackingNumberInput(searchTerm) // Populate input
    handleTrackPackage(searchTerm) // Immediately track
  }

  const handleRemoveRecentSearch = (searchTerm: string) => {
    removeRecentSearch(searchTerm)
    toast.success(`Removed "${searchTerm}" from recent searches.`, { duration: 2000 })
  }

  if (!pageLoaded && !isLoading) {
    // Show loading only if page not loaded AND not already loading data
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <Loader2 className="h-12 w-12 animate-spin text-main" />
      </div>
    )
  }

  if (isLoading && !currentTrackingNumber) {
    // Show full page loader if loading initial search
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
        <Loader2 className="h-12 w-12 animate-spin text-main" />
      </div>
    )
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!currentTrackingNumber ? (
          <InitialTrackingView
            key="initialView"
            trackingNumberInput={trackingNumberInput}
            setTrackingNumberInput={setTrackingNumberInput}
            handleTrackPackage={() => handleTrackPackage()}
            recentSearches={recentSearches}
            onRecentSearchClick={handleRecentSearchClick}
            onRemoveRecentSearch={handleRemoveRecentSearch}
          />
        ) : (
          <TrackingResultsView key="resultsView" currentTrackingNumber={currentTrackingNumber} />
        )}
      </AnimatePresence>
    </div>
  )
}
