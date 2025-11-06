"use client"

import { Navbar } from "@/components/navbar"
import { useState, useMemo } from "react"
import { Search, X, Copy, Check } from "lucide-react"
import { SHORTCUTS_DATA, APPS, CATEGORIES } from "@/lib/shortcuts-database"

export default function ShortcutsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApp, setSelectedApp] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<"All" | "Windows" | "Mac" | "Linux">("All")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const filteredShortcuts = useMemo(() => {
    return SHORTCUTS_DATA.filter((shortcut) => {
      const matchesSearch =
        searchQuery === "" ||
        shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.keys.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesApp = selectedApp === null || shortcut.app === selectedApp
      const matchesCategory = selectedCategory === null || shortcut.category === selectedCategory
      const matchesPlatform =
        selectedPlatform === "All" || shortcut.platform === selectedPlatform || shortcut.platform === "All"

      return matchesSearch && matchesApp && matchesCategory && matchesPlatform
    })
  }, [searchQuery, selectedApp, selectedCategory, selectedPlatform])

  const handleCopyShortcut = (keys: string, id: string) => {
    navigator.clipboard.writeText(keys)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedApp(null)
    setSelectedCategory(null)
    setSelectedPlatform("All")
  }

  // Get unique categories for selected app
  const appCategories = selectedApp
    ? Array.from(new Set(SHORTCUTS_DATA.filter((s) => s.app === selectedApp).map((s) => s.category)))
    : CATEGORIES

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Keyboard Shortcuts Hub</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
            Browse 500+ keyboard shortcuts across MS Office, Development Tools, Creative Software, and more. Find the
            perfect shortcut for your workflow.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative group">
            <Search
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, description, or keys (e.g., Ctrl+S, Find & Replace)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search shortcuts"
              className="w-full pl-10 md:pl-12 pr-10 py-3 md:py-3.5 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base transition-all hover-light-effect"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Platform Filter */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <label className="text-xs md:text-sm font-semibold text-foreground mb-3 block">Operating System</label>
          <div className="flex flex-wrap gap-2">
            {["All", "Windows", "Mac", "Linux"].map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform as "All" | "Windows" | "Mac" | "Linux")}
                className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all hover-light-effect ${
                  selectedPlatform === platform
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card text-foreground border border-border"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* App Filter */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <label className="text-xs md:text-sm font-semibold text-foreground mb-3 block">Application</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedApp(null)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all hover-light-effect ${
                selectedApp === null
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-foreground border border-border"
              }`}
            >
              All Apps
            </button>
            {APPS.map((app) => (
              <button
                key={app}
                onClick={() => setSelectedApp(app)}
                className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all hover-light-effect ${
                  selectedApp === app
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card text-foreground border border-border"
                }`}
              >
                {app}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.25s" }}>
          <label className="text-xs md:text-sm font-semibold text-foreground mb-3 block">Category</label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all hover-light-effect ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-card text-foreground border border-border"
              }`}
            >
              All Categories
            </button>
            {appCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 md:px-4 py-2 rounded-lg font-medium text-sm transition-all hover-light-effect ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-bold text-primary">{filteredShortcuts.length}</span> shortcuts
          </p>
          {(searchQuery || selectedApp || selectedCategory || selectedPlatform !== "All") && (
            <button
              onClick={resetFilters}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <X size={16} />
              Clear filters
            </button>
          )}
        </div>

        {/* Shortcuts Grid */}
        <div className="space-y-2 md:space-y-3">
          {filteredShortcuts.length > 0 ? (
            filteredShortcuts.map((shortcut, idx) => (
              <div
                key={shortcut.id}
                className="group p-4 md:p-5 bg-card border border-border rounded-lg hover-light-effect cursor-pointer transition-all"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                  {/* Left Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-base md:text-lg font-bold text-foreground">{shortcut.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary border border-primary/20">
                          {shortcut.app}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded bg-accent/10 text-accent border border-accent/20">
                          {shortcut.category}
                        </span>
                        {shortcut.platform && shortcut.platform !== "All" && (
                          <span className="px-2 py-1 text-xs font-medium rounded bg-secondary/10 text-secondary border border-secondary/20">
                            {shortcut.platform}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                  </div>

                  {/* Right Content - Keys */}
                  <button
                    onClick={() => handleCopyShortcut(shortcut.keys, shortcut.id)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg font-mono font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-all transform hover:scale-105 whitespace-nowrap text-sm md:text-base"
                  >
                    {copiedId === shortcut.id ? (
                      <>
                        <Check size={18} className="text-green-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span>{shortcut.keys}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 md:py-16">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-lg md:text-xl text-muted-foreground mb-6">
                No shortcuts found matching your criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 md:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            Tip: Click on any shortcut to copy it. Keyboard shortcuts work best when practiced regularly!
          </p>
        </div>
      </div>
    </div>
  )
}
