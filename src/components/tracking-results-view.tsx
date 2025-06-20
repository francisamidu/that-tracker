"use client"

import { TrackingSidebar } from "./tracking-sidebar"
import { TrackingTimeline } from "./tracking-timeline"
import { motion } from "framer-motion"

type TrackingResultsViewProps = {
  currentTrackingNumber: string
}

export function TrackingResultsView({ currentTrackingNumber }: TrackingResultsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <TrackingSidebar trackingNumber={currentTrackingNumber} />
        </motion.div>
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <TrackingTimeline />
        </motion.div>
      </div>
    </motion.div>
  )
}
