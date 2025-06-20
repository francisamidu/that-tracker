import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TrackingHeader } from "../components/tracking-header" // Corrected path
import { TrackingFooter } from "../components/tracking-footer" // Corrected path

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <TrackingHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <TrackingFooter />
      {/* <TanStackRouterDevtools /> */} {/* Uncomment for devtools */}
    </div>
  )
}
