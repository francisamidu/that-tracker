import React from "react";

/**
 * Animated skeleton loader for tracked packages (recent searches)
 */
export default function SkeletonTrackedPackages({
  count = 3,
}: {
  count?: number;
}) {
  return (
    <div className="mt-8 dark:bg-card text-card-foreground rounded-lg dark:shadow p-4 animate-pulse">
      <h2 className="text-lg font-semibold mb-6 text-left bg-gray-200 dark:bg-gray-800 rounded w-40 h-6"></h2>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="w-full rounded-b-2xl rounded-t-md mb-4 cursor-pointer transition bg-card text-card-foreground border border-gray-50 dark:!border-gray-800"
        >
          {/* Top row */}
          <div className="flex items-center justify-between px-4 py-2 bg-green-50 dark:bg-green-900/20 border-b border-border dark:!border-gray-800">
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 dark:bg-gray-700 rounded w-6 h-6 block"></span>
              <span className="bg-gray-200 dark:bg-gray-700 rounded w-32 h-4 block"></span>
            </div>
            <span className="bg-gray-200 dark:bg-gray-700 rounded w-20 h-4 block"></span>
          </div>
          {/* Middle row */}
          <div className="grid grid-cols-[minmax(200px,1fr)_minmax(900px,1fr)_100px] place-items-start px-4 py-2">
            <span className="bg-gray-200 dark:bg-gray-700 rounded w-24 h-4 block mr-6"></span>
            <span className="bg-gray-200 dark:bg-gray-700 rounded w-32 h-4 block mr-6"></span>
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-[minmax(200px,1fr)_minmax(900px,1fr)_100px] place-items-start px-4 pb-2">
            <span className="bg-gray-200 dark:bg-gray-700 rounded w-40 h-4 block"></span>
            <span className="bg-gray-200 dark:bg-gray-700 rounded w-32 h-4 block mr-6"></span>
          </div>
        </div>
      ))}
    </div>
  );
}
