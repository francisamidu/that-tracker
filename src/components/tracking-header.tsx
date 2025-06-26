import { Link } from "@tanstack/react-router";
import { Package, Globe, Code, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button"; // Assuming shadcn UI is available at src/components/ui
import { useTheme } from "./theme-provider";

export function TrackingHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-background text-foreground shadow-md border-b  border-gray-200 dark:!border-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
          <Package className="h-8 w-8 text-primary dark:text-accent-foreground" />
          <span>ThatTracks</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:text-accent transition-colors">
            Couriers
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            Features
          </a>
          <a
            href="#"
            className="flex items-center gap-1 hover:text-accent transition-colors"
          >
            <Code className="h-4 w-4" />
            Integrate
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:flex items-center gap-2 hover:bg-muted hover:text-accent"
          >
            <Globe className="h-4 w-4" />
            English
          </Button>
          <Button
            variant="outline"
            className="bg-background text-primary hover:bg-primary hover:text-white border border-border dark:bg-card-foreground dark:hover:bg-accent dark:hover:text-white dark:text-accent"
          >
            Sign In
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-muted hover:text-accent dark:hover:!text-gray-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
