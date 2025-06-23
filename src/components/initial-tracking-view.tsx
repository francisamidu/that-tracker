"use client";

import { Input } from "./ui/input"; // Assuming shadcn UI is available at src/components/ui
import { Button } from "./ui/button"; // Assuming shadcn UI is available at src/components/ui
import { motion } from "framer-motion";
import { Search, X, Tag, ArrowRight } from "lucide-react";
import { RecentSearch } from "../hooks/use-recent-searches";
import { formatDate } from "../lib/formatDate";
import SkeletonTrackedPackages from "./skeleton-tracked-packages";

type InitialTrackingViewProps = {
  trackingNumberInput: string;
  setTrackingNumberInput: (value: string) => void;
  handleTrackPackage: () => void;
  recentSearches: RecentSearch[];
  onRecentSearchClick: (searchTerm: string) => void;
  onRemoveRecentSearch: (searchTerm: string) => void;
  loading?: boolean; // <-- Added loading prop
};

const couriers = [
  "USPS",
  "Canada Post",
  "Royal Mail",
  "DHL",
  "China Post",
  "Fedex",
  "UPS",
  "Amazon",
  "Deutsche Post",
  "AliExpress",
  "Wish",
  "Shopee",
];

export function InitialTrackingView({
  trackingNumberInput,
  setTrackingNumberInput,
  handleTrackPackage,
  recentSearches,
  onRecentSearchClick,
  onRemoveRecentSearch,
  loading = false,
}: InitialTrackingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-20 flex flex-col items-center justify-center text-center bg-hero-pattern bg-white dark:bg-background"
    >
      <div className="p-4 ">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Global Package Tracking
        </motion.h1>
        <motion.p
          className="text-md md:text-lg text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Track{" "}
          {couriers.map((courier, index) => (
            <span key={courier}>
              <a
                href="#"
                className="underline hover:text-main dark:hover:text-accent-secondary"
              >
                {courier}
              </a>
              {index < couriers.length - 1 ? ", " : ""}
            </span>
          ))}
          .
        </motion.p>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleTrackPackage();
          }}
          className="flex flex-col sm:flex-row items-center gap-2 mb-4 max-w-xl mx-auto relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Input
            type="text"
            placeholder="Enter your tracking number (e.g., UA796544924AE)"
            className="w-full p-6 text-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:!border-gray-700 focus:border-main dark:focus:border-accent-secondary focus:ring-main dark:focus:ring-accent-secondary rounded-4xl"
            value={trackingNumberInput}
            onChange={(e) => setTrackingNumberInput(e.target.value)}
            aria-label="Tracking number input"
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-primary hover:bg-primary/80 text-white dark:bg-gray-700 dark:hover:bg-gray-600 py-1 px-2.5 text-lg absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full flex items-center"
            aria-label="Track Package"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.form>
      </div>
      <div className="max-w-3xl w-full">
        {loading ? (
          <SkeletonTrackedPackages count={3} />
        ) : (
          recentSearches.length > 0 && (
            <>
              <motion.div
                className="mt-6 flex flex-wrap justify-center items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 w-full mb-1 sm:w-auto sm:mb-0 sm:mr-2">
                  Recent:
                </p>
                {recentSearches.map((search) => (
                  <motion.div
                    key={search.trackingNumber}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center bg-main/10 dark:bg-secondary text-main dark:text-accent-secondary px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-main/20 dark:hover:bg-secondary/80"
                    onClick={() => onRecentSearchClick(search.trackingNumber)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      onRecentSearchClick(search.trackingNumber)
                    }
                  >
                    <Tag className="h-3 w-3 mr-1.5 flex-shrink-0" />
                    <span className="mr-1.5 truncate max-w-[150px] sm:max-w-[200px]">
                      {search.trackingNumber}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 p-0.5 rounded-full hover:bg-main/30 dark:hover:bg-accent-secondary/30 flex-shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveRecentSearch(search.trackingNumber);
                      }}
                      aria-label={`Remove ${search.trackingNumber} from recent searches`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Tracked Packages: styled to match provided image */}
              <div className="mt-8 dark:bg-card text-card-foreground rounded-lg dark:shadow p-4">
                <h2 className="text-lg font-semibold mb-4 text-left">
                  Tracked Packages
                </h2>
                {recentSearches.map((search) => (
                  <div
                    key={search.trackingNumber}
                    className="w-full rounded-b-2xl rounded-t-md mb-4 cursor-pointer transition bg-card text-card-foreground border border-gray-50 dark:!border-gray-800"
                    onClick={() => onRecentSearchClick(search.trackingNumber)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      onRecentSearchClick(search.trackingNumber)
                    }
                  >
                    {/* Top row: tracking number (red, mail icon), carrier (bold, right) */}
                    <div className="flex items-center justify-between px-4 py-2 bg-green-50 dark:bg-green-900/20 border-b border-border dark:!border-gray-800">
                      <div className="flex items-center gap-2">
                        <span className="text-green-700">
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            className="inline mr-1 text-green-700"
                          >
                            <rect x="3" y="5" width="18" height="14" rx="2" />
                            <polyline points="3 7 12 13 21 7" />
                          </svg>
                        </span>
                        <span className="text-green-700 font-mono font-semibold text-base">
                          {search.trackingNumber}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-400 capitalize">
                        {search.carrier}
                      </span>
                    </div>
                    {/* Middle row: most recent event datetime, status */}
                    <div className="grid grid-cols-[minmax(200px,1fr)_minmax(900px,1fr)_100px] place-items-start px-4 py-2 text-gray-800 dark:text-gray-400">
                      <span className="mr-6">
                        {formatDate(new Date().toLocaleString())}
                      </span>
                      <span className="mr-6 capitalize">
                        {search.event.status}
                      </span>
                    </div>
                    {/* Bottom row: status category */}
                    <div className="grid grid-cols-[minmax(200px,1fr)_minmax(900px,1fr)_100px] place-items-start px-4 pb-2  text-gray-600 dark:text-gray-400 text-sm">
                      <p>
                        Status:{" "}
                        <span className="font-semibold">
                          {search.statusCategory}
                        </span>
                      </p>
                      <p className="mr-6">
                        Last updated:
                        <span className="font-semibold">
                          {formatDate(
                            new Date(
                              search.event.occurrenceDatetime
                            ).toLocaleString()
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )
        )}
      </div>
    </motion.div>
  );
}
