"use client";

import { useState, useEffect, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { InitialTrackingView } from "./initial-tracking-view";
import { TrackingResultsView } from "./tracking-results-view";
import { useRecentSearches, RecentSearch } from "../hooks/use-recent-searches";
import { Loader2 } from "lucide-react"; // For loading spinner
import { useQuery } from "@tanstack/react-query";
import { getTrackingData } from "../api/api";
import { APIResponse } from "../types/api";
import { TrackingResponse } from "../types/tracking-response.types";
import { useLocalStorage } from "../hooks/use-localstorage";

export function TrackingPageClient() {
  const [trackingNumberInput, setTrackingNumberInput] = useState("");
  const [currentTrackingNumber, setCurrentTrackingNumber] =
    useLocalStorage<string>("trackingNumber", "");
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, addRecentSearch, removeRecentSearch] =
    useRecentSearches();

  function addTrackingNumber(newNumber: string) {
    if (!currentTrackingNumber || currentTrackingNumber !== newNumber) {
      setCurrentTrackingNumber(newNumber);
    }
  }

  const {
    data,
    isLoading: isTrackingLoading,
    error,
  } = useQuery<{}, Error, TrackingResponse>({
    queryKey: ["tracking", currentTrackingNumber],
    queryFn: () => getTrackingData(currentTrackingNumber!),
    enabled: !!currentTrackingNumber,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // All hooks must be called before any conditional return!
  // (already at the top, just making it explicit)

  // Removed pageLoaded effect

  // Handler functions declared after hooks
  const handleTrackPackage = (tnToTrack?: string) => {
    const effectiveTrackingNumber = tnToTrack || trackingNumberInput;

    if (!effectiveTrackingNumber.trim()) {
      toast.error("Please enter a tracking number.");
      return;
    }
    addTrackingNumber(effectiveTrackingNumber);
    setIsLoading(true);

    // We'll add to recentSearches only after successful fetch
    // The useQuery hook will update data, so useEffect will handle it
    if (error) {
      setCurrentTrackingNumber("");
      toast.error("Error fetching tracking data: " + error.message);
      setIsLoading(false);
    }
  };

  const handleRecentSearchClick = (trackingNumber: string) => {
    setTrackingNumberInput(trackingNumber); // Populate input
    handleTrackPackage(trackingNumber); // Immediately track
    setCurrentTrackingNumber(trackingNumber);
  };

  const handleRemoveRecentSearch = (trackingNumber: string) => {
    removeRecentSearch(trackingNumber);
    toast.success(`Removed "${trackingNumber}" from recent searches.`, {
      duration: 2000,
    });
  };

  // Add to recentSearches only after successful fetch
  // Use an effect to watch for new successful data
  useEffect(() => {
    if (data && currentTrackingNumber) {
      // Extract recent search data from API response
      const tracking = data?.data?.trackings?.[0];
      if (tracking) {
        const mostRecentEvent =
          tracking.events && tracking.events.length > 0
            ? tracking.events[0]
            : { status: "", occurrenceDatetime: "" };
        const recent: RecentSearch = {
          trackingNumber: tracking.tracker.trackingNumber,
          carrier: tracking.events?.[0].courierCode || "",
          statusCategory: tracking.shipment.statusCategory || "",
          event: {
            status: mostRecentEvent.status,
            occurrenceDatetime: mostRecentEvent.occurrenceDatetime,
          },
        };
        addRecentSearch(recent);
      }
      setIsLoading(false);
    }
  }, [data, currentTrackingNumber, addRecentSearch]);

  // Handler for going back to main view
  const handleBackToMain = () => {
    setCurrentTrackingNumber("");
    setTrackingNumberInput("");
  };

  // Only perform conditional returns after all hooks and handlers
  if (isLoading && !currentTrackingNumber) {
    // Show full page loader if loading initial search
    return (
      <div className="min-h-screen bg-background text-foreground transition-colors flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <AnimatePresence mode="wait">
        {!currentTrackingNumber || !data ? (
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
          <Suspense
            fallback={<Loader2 className="h-12 w-12 animate-spin" />}
          >
            <TrackingResultsView
              key="resultsView"
              currentTrackingNumber={currentTrackingNumber!}
              data={data?.data!}
              recentSearches={recentSearches}
              onRecentSearchClick={handleRecentSearchClick}
              onRemoveRecentSearch={handleRemoveRecentSearch}
              onBack={handleBackToMain}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
