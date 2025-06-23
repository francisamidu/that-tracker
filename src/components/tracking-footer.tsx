import { Link } from "@tanstack/react-router"
import { Package, Twitter, Youtube, Facebook } from "lucide-react"

export function TrackingFooter() {
  return (
    <footer className="bg-background border-t border-border text-foreground py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Package className="h-7 w-7 text-accent" />
          <span>ThatTracks</span>
        </Link>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-accent" aria-label="Twitter">
            <Twitter />
          </a>
          <a href="#" className="hover:text-accent" aria-label="Youtube">
            <Youtube />
          </a>
          <a href="#" className="hover:text-accent" aria-label="Facebook">
            <Facebook />
          </a>
        </div>
        <span className="text-xs text-muted-foreground mt-2">&copy; {new Date().getFullYear()} ThatTracks. All rights reserved.</span>
      </div>
    </footer>
  );
}
