"use client"

import { Navbar } from "@/components/navbar"
import { Copy, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useMemo } from "react"
import { SHORTCUTS_DATA } from "@/lib/shortcuts-database"

const APP_INFO: Record<string, { emoji: string; description: string; icon: string }> = {
  "MS Word": {
    emoji: "📄",
    description: "Master essential Word shortcuts to increase your productivity",
    icon: "Word",
  },
  "MS Excel": {
    emoji: "📊",
    description: "Accelerate spreadsheet work with Excel keyboard shortcuts",
    icon: "Excel",
  },
  "VS Code": {
    emoji: "💻",
    description: "Code faster with VS Code editor shortcuts",
    icon: "VS Code",
  },
  Git: {
    emoji: "🔀",
    description: "Master version control with essential Git commands",
    icon: "Git",
  },
  "Linux Terminal": {
    emoji: "🐧",
    description: "Navigate Linux command line like a pro",
    icon: "Linux",
  },
  "Jupyter Notebook": {
    emoji: "📓",
    description: "Speed up data science workflows with Jupyter shortcuts",
    icon: "Jupyter",
  },
  "Adobe Photoshop": {
    emoji: "🎨",
    description: "Create designs faster with Photoshop keyboard shortcuts",
    icon: "Photoshop",
  },
  Python: {
    emoji: "🐍",
    description: "Essential Python syntax and shortcuts",
    icon: "Python",
  },
  "Power BI": {
    emoji: "📈",
    description: "Build dashboards efficiently with Power BI shortcuts",
    icon: "Power BI",
  },
  "Mac System": {
    emoji: "🍎",
    description: "Master macOS keyboard shortcuts",
    icon: "Mac",
  },
}

export default function AppPage({ params }: { params: { app: string } }) {
  const appName = decodeURIComponent(params.app)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const appShortcuts = useMemo(() => {
    return SHORTCUTS_DATA.filter((s) => s.app === appName)
  }, [appName])

  const categories = useMemo(() => {
    return Array.from(new Set(appShortcuts.map((s) => s.category)))
  }, [appShortcuts])

  const filteredShortcuts = useMemo(() => {
    return appShortcuts.filter((shortcut) => {
      const matchesSearch =
        searchQuery === "" ||
        shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shortcut.keys.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === null || shortcut.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [appShortcuts, searchQuery, selectedCategory])

  const appInfo = APP_INFO[appName] || {
    emoji: "⌨",
    description: "Essential keyboard shortcuts",
    icon: appName,
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <Link
          href="/shortcuts"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium text-sm md:text-base hover-light-effect px-3 py-2 rounded-lg"
        >
          <ArrowLeft size={20} />
          Back to Shortcuts
        </Link>

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-5xl md:text-6xl">{appInfo.emoji}</div>
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">{appName}</h1>
              <p className="text-base md:text-lg text-muted-foreground mt-2 max-w-2xl">{appInfo.description}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Total shortcuts: <span className="font-bold text-primary">{appShortcuts.length}</span> | Categories:{" "}
            <span className="font-bold text-primary">{categories.length}</span>
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <input
            type="text"
            placeholder="Search shortcuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base hover-light-effect"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.15s" }}>
          <label className="text-xs md:text-sm font-semibold text-foreground mb-3 block">Filter by Category</label>
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
            {categories.map((category) => (
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

        {/* Shortcuts by Category */}
        <div className="space-y-10">
          {categories.map((category, catIdx) => {
            const categoryShortcuts = filteredShortcuts.filter((s) => s.category === category)
            if (categoryShortcuts.length === 0) return null

            return (
              <div key={category} className="animate-slide-up" style={{ animationDelay: `${0.2 + catIdx * 0.05}s` }}>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{category}</h2>
                  <span className="text-sm text-muted-foreground bg-card px-3 py-1 rounded-full">
                    {categoryShortcuts.length} shortcuts
                  </span>
                </div>

                <div className="grid gap-3 md:gap-4">
                  {categoryShortcuts.map((shortcut, idx) => (
                    <div
                      key={shortcut.id}
                      className="group p-4 md:p-5 bg-card rounded-lg border border-border hover-light-effect transition-all"
                      style={{ animationDelay: `${0.2 + (catIdx * 10 + idx) * 0.02}s` }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
                        {/* Left Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base md:text-lg text-foreground mb-1">{shortcut.name}</h3>
                          <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                        </div>

                        {/* Right Content - Keys */}
                        <button
                          onClick={() => copyToClipboard(shortcut.keys, shortcut.id)}
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
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {filteredShortcuts.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <p className="text-lg text-muted-foreground mb-6">No shortcuts found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory(null)
              }}
              className="px-6 md:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
