import { Link } from "@tanstack/react-router"
import { Package, Twitter, Youtube, Facebook } from "lucide-react"

export function TrackingFooter() {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold mb-4">
              <Package className="h-8 w-8 text-accent-secondary" />
              <span>OrderTracker</span>
            </Link>
            <div className="flex gap-4">
              <a href="#" className="hover:text-accent-secondary" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="hover:text-accent-secondary" aria-label="Youtube">
                <Youtube />
              </a>
              <a href="#" className="hover:text-accent-secondary" aria-label="Facebook">
                <Facebook />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-4">TRACKER</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Track a parcel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Couriers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">INTEGRATION</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Integrate to your website
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Install Shopify app
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Create JavaScript widget
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">COMPANY</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-secondary text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-xs text-gray-400">
          <p>© 2025 OrderTracker. All rights reserved.</p>
          <p>All listed company names are trademarks™ or registered trademarks ® of their respective holders.</p>
        </div>
      </div>
    </footer>
  )
}
