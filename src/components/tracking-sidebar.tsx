"use client"

import { Button } from "./ui/button" // Assuming shadcn UI is available at src/components/ui
import { Card, CardContent } from "./ui/card" // Assuming shadcn UI is available at src/components/ui
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu" // Assuming shadcn UI is available at src/components/ui
import { Apple, ChevronDown, Copy, LinkIcon, RefreshCw, Flag } from "lucide-react"
import { motion } from "framer-motion"

type TrackingSidebarProps = {
  trackingNumber: string
}

export function TrackingSidebar({ trackingNumber }: TrackingSidebarProps) {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-secondary">
          <CardContent className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between dark:hover:bg-gray-700">
                  All (1) <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>{trackingNumber}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-secondary">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <p className="font-mono text-sm font-bold">{trackingNumber}</p>
              <Button variant="ghost" size="icon" className="dark:hover:bg-gray-700" aria-label="Refresh tracking">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-around">
              <Button
                variant="ghost"
                size="icon"
                className="flex flex-col h-auto gap-1 text-xs text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Flag className="h-5 w-5" />
                <span>Report</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex flex-col h-auto gap-1 text-xs text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <Copy className="h-5 w-5" />
                <span>Copy</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex flex-col h-auto gap-1 text-xs text-gray-500 dark:text-gray-400 dark:hover:bg-gray-700"
              >
                <LinkIcon className="h-5 w-5" />
                <span>Link</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="bg-white dark:bg-secondary">
          <CardContent className="p-4 flex flex-col items-center text-center space-y-4">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${trackingNumber}`}
              alt="QR Code for tracking number"
              width={150}
              height={150}
              className="rounded-lg"
            />
            <div className="space-y-2">
              <Button className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                <Apple className="mr-2 h-5 w-5" /> Download on the App Store
              </Button>
              <Button
                variant="outline"
                className="w-full bg-transparent dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
              >
                <img src="/google-play.png" alt="Google Play icon" width={20} height={20} className="mr-2" />
                Get it on Google Play
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
