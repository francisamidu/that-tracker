"use client"

import { Input } from "./ui/input" // Assuming shadcn UI is available at src/components/ui
import { Button } from "./ui/button" // Assuming shadcn UI is available at src/components/ui
import { motion } from "framer-motion"
import { Search, X, Tag } from "lucide-react"

type InitialTrackingViewProps = {
  trackingNumberInput: string
  setTrackingNumberInput: (value: string) => void
  handleTrackPackage: () => void
  recentSearches: string[]
  onRecentSearchClick: (searchTerm: string) => void
  onRemoveRecentSearch: (searchTerm: string) => void
}

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
]

export function InitialTrackingView({
  trackingNumberInput,
  setTrackingNumberInput,
  handleTrackPackage,
  recentSearches,
  onRecentSearchClick,
  onRemoveRecentSearch,
}: InitialTrackingViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center p-4 bg-hero-pattern bg-accent dark:bg-dark" // Adjusted min-height
    >
      <div className="max-w-3xl w-full">
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
              <a href="#" className="underline hover:text-main dark:hover:text-accent-secondary">
                {courier}
              </a>
              {index < couriers.length - 1 ? ", " : ""}
            </span>
          ))}
          .
        </motion.p>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault()
            handleTrackPackage()
          }}
          className="flex flex-col sm:flex-row items-center gap-2 mb-4 max-w-xl mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Input
            type="text"
            placeholder="Enter your tracking number (e.g., UA796544924AE)"
            className="w-full p-6 text-lg bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 focus:border-main dark:focus:border-accent-secondary focus:ring-main dark:focus:ring-accent-secondary"
            value={trackingNumberInput}
            onChange={(e) => setTrackingNumberInput(e.target.value)}
            aria-label="Tracking number input"
          />
          <Button
            type="submit"
            className="w-full sm:w-auto bg-main hover:bg-blue-700 text-white px-8 py-6 text-lg"
            aria-label="Track Package"
          >
            <Search className="mr-2 h-5 w-5" /> Track Package
          </Button>
        </motion.form>

        {recentSearches.length > 0 && (
          <motion.div
            className="mt-6 flex flex-wrap justify-center items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 w-full mb-1 sm:w-auto sm:mb-0 sm:mr-2">Recent:</p>
            {recentSearches.map((search) => (
              <motion.div
                key={search}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center bg-main/10 dark:bg-secondary text-main dark:text-accent-secondary px-3 py-1.5 rounded-full text-sm cursor-pointer hover:bg-main/20 dark:hover:bg-secondary/80"
                onClick={() => onRecentSearchClick(search)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && onRecentSearchClick(search)}
              >
                <Tag className="h-3 w-3 mr-1.5 flex-shrink-0" />
                <span className="mr-1.5 truncate max-w-[150px] sm:max-w-[200px]">{search}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 p-0.5 rounded-full hover:bg-main/30 dark:hover:bg-accent-secondary/30 flex-shrink-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    onRemoveRecentSearch(search)
                  }}
                  aria-label={`Remove ${search} from recent searches`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
