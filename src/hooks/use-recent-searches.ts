"use client"

import { useState, useEffect, useCallback } from "react"

const MAX_RECENT_SEARCHES = 4;
const LOCAL_STORAGE_KEY = "recentTrackingSearches";

export type RecentSearch = {
  trackingNumber: string;
  carrier: string;
  statusCategory: string;
  event: {
    status: string;
    occurrenceDatetime: string;
  };
};

export function useRecentSearches(): [RecentSearch[], (item: RecentSearch) => void, (trackingNumber: string) => void] {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearches = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedSearches) {
        setRecentSearches(JSON.parse(storedSearches));
      }
    }
  }, []);

  const updateLocalStorage = (searches: RecentSearch[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searches));
    }
  };

  const addSearch = useCallback((item: RecentSearch) => {
    if (!item || !item.trackingNumber || item.trackingNumber.trim() === "") return;
    setRecentSearches((prevSearches) => {
      const filtered = prevSearches.filter((s) => s.trackingNumber !== item.trackingNumber);
      const newSearches = [item, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      updateLocalStorage(newSearches);
      return newSearches;
    });
  }, []);

  const removeSearch = useCallback((trackingNumber: string) => {
    setRecentSearches((prevSearches) => {
      const newSearches = prevSearches.filter((s) => s.trackingNumber !== trackingNumber);
      updateLocalStorage(newSearches);
      return newSearches;
    });
  }, []);

  return [recentSearches, addSearch, removeSearch];
}
