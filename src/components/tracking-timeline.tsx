"use client"

import type React from "react"
import { Card, CardContent, CardHeader } from "./ui/card" // Assuming shadcn UI is available at src/components/ui
import { Progress } from "./ui/progress" // Assuming shadcn UI is available at src/components/ui
import { trackingData, type TrackingEvent } from "../lib/tracking-data"
import { MoreHorizontal, PackageCheck, Truck, Ship, Plane } from "lucide-react"
import { Button } from "./ui/button" // Assuming shadcn UI is available at src/components/ui
import { motion } from "framer-motion"

const statusIcons: { [key: string]: React.ReactNode } = {
  "UNIVERSAL POSTAL UNION": <PackageCheck className="h-5 w-5 text-blue-500" />,
  CAINAO: <Plane className="h-5 w-5 text-green-500" />,
  MAILAMERICAS: <Ship className="h-5 w-5 text-purple-500" />,
  default: <Truck className="h-5 w-5 text-gray-500" />,
}

export function TrackingTimeline() {
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-secondary">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <div className="bg-main p-3 rounded-full">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Your package has been in transit for 13 day(s)</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Delivery is expected in 1-5 days (based on 1000 similar deliveries)
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="dark:hover:bg-gray-700" aria-label="More options">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent>
          <Progress value={60} className="w-full [&>div]:bg-main" aria-label="Tracking progress: 60%" />
        </CardContent>
      </Card>

      <div className="relative pl-8">
        {trackingData.map((event, index) => (
          <TimelineItem
            key={event.date + event.time + index} // Ensure unique key
            event={event}
            isLast={index === trackingData.length - 1}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

function TimelineItem({ event, isLast, index }: { event: TrackingEvent; isLast: boolean; index: number }) {
  return (
    <motion.div
      className="relative pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      {!isLast && <div className="absolute top-4 left-[1.1rem] w-0.5 h-full bg-gray-300 dark:bg-gray-600" />}
      <div className="flex items-start gap-4">
        <div className="absolute top-4 left-0 -translate-x-1/2 transform">
          <div className="flex items-center -ml-8">
            <p className="text-sm text-gray-500 dark:text-gray-400 w-20 text-right">
              {event.date}
              <br />
              {event.time}
            </p>
            <div className="w-4 h-4 bg-main rounded-full border-4 border-accent dark:border-dark z-10 ml-4" />
          </div>
        </div>
        <Card className="w-full bg-white dark:bg-secondary ml-8">
          <CardContent className="p-4 flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">{event.carrier}</p>
              <p className="font-bold">{event.status}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.location}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-md">
              {statusIcons[event.carrier] || statusIcons.default}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
