"use client";

import { TrackingSidebar } from "./tracking-sidebar";
import { TrackingTimeline } from "./tracking-timeline";
import { motion } from "framer-motion";
import { TrackingResponse } from "../types/tracking-response.types";
import { RecentSearch } from "../hooks/use-recent-searches";

type TrackingResultsViewProps = {
  currentTrackingNumber: string;
  data: TrackingResponse["data"];
  recentSearches: RecentSearch[];
  onRecentSearchClick: (searchTerm: string) => void;
  onRemoveRecentSearch: (searchTerm: string) => void;
  onBack: () => void;
};

export function TrackingResultsView({
  currentTrackingNumber,
  data,
  recentSearches,
  onRecentSearchClick,
  onRemoveRecentSearch,
  onBack,
}: TrackingResultsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="mb-4">
        <button
          onClick={onBack}
          className="text-main hover:underline bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded"
        >
          ← Back to all tracked numbers
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Recent Searches</h2>
            <ul className="space-y-2">
              {recentSearches.map((search) => (
                <li
                  key={search.trackingNumber}
                  className="flex items-center justify-between bg-main/10 dark:bg-secondary px-3 py-1.5 rounded-full text-sm"
                >
                  <span
                    className={`truncate max-w-[150px] cursor-pointer ${
                      search.trackingNumber === currentTrackingNumber
                        ? "font-bold text-main dark:text-accent-secondary"
                        : ""
                    }`}
                    onClick={() => onRecentSearchClick(search.trackingNumber)}
                  >
                    {search.trackingNumber}
                  </span>
                  <button
                    onClick={() => onRemoveRecentSearch(search.trackingNumber)}
                    className="ml-2 text-gray-400 hover:text-red-500"
                    aria-label={`Remove ${search.trackingNumber}`}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <TrackingSidebar trackingNumber={currentTrackingNumber} />
        </motion.div>
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TrackingTimeline data={data} />
        </motion.div>
      </div>
    </motion.div>
  );
}
