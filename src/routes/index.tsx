import { createFileRoute } from "@tanstack/react-router";
import { TrackingPageClient } from "../components/tracking-page-client"; // Corrected path

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return <TrackingPageClient />;
}
