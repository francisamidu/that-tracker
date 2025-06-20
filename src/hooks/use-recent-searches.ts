"use client"

import { useState, useEffect, useCallback } from "react"

const MAX_RECENT_SEARCHES = 4 // Adjusted to match image more closely
const LOCAL_STORAGE_KEY = "recentTrackingSearches"

export function useRecentSearches(): [string[], (searchTerm: string) => void, (searchTerm: string) => void] {
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches))
      }
    }
  }, [])

  const updateLocalStorage = (searches: string[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searches))
    }
  }

  const addSearch = useCallback((searchTerm: string) => {
    if (!searchTerm || searchTerm.trim() === "") return
    setRecentSearches((prevSearches) => {
      const newSearches = [searchTerm, ...prevSearches.filter((s) => s !== searchTerm)].slice(0, MAX_RECENT_SEARCHES)
      updateLocalStorage(newSearches)
      return newSearches
    })
  }, [])

  const removeSearch = useCallback((searchTerm: string) => {
    setRecentSearches((prevSearches) => {
      const newSearches = prevSearches.filter((s) => s !== searchTerm)
      updateLocalStorage(newSearches)
      return newSearches
    })
  }, [])

  return [recentSearches, addSearch, removeSearch]
}
