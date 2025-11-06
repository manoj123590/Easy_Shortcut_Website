"use client"

import { Navbar } from "@/components/navbar"
import { Copy, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Shortcut {
  name: string
  description: string
  keys: string
  category: string
}

const PHOTOSHOP_SHORTCUTS: Shortcut[] = [
  // File Operations
  { name: "New", description: "Create a new document", keys: "Ctrl + N", category: "File Operations" },
  { name: "Open", description: "Open an image file", keys: "Ctrl + O", category: "File Operations" },
  { name: "Save", description: "Save the document", keys: "Ctrl + S", category: "File Operations" },
  {
    name: "Export As",
    description: "Export to different format",
    keys: "Ctrl + Shift + E",
    category: "File Operations",
  },
  { name: "Print", description: "Print the image", keys: "Ctrl + P", category: "File Operations" },

  // View
  { name: "Zoom In", description: "Increase zoom level", keys: "Ctrl + +", category: "View" },
  { name: "Zoom Out", description: "Decrease zoom level", keys: "Ctrl + -", category: "View" },
  { name: "Fit in Window", description: "Fit image to window", keys: "Ctrl + 0", category: "View" },
  { name: "100% View", description: "Set zoom to 100%", keys: "Ctrl + Alt + 0", category: "View" },
  { name: "Full Screen", description: "Toggle full screen", keys: "F", category: "View" },

  // Editing
  { name: "Undo", description: "Undo last action", keys: "Ctrl + Z", category: "Editing" },
  { name: "Redo", description: "Redo last action", keys: "Ctrl + Shift + Z", category: "Editing" },
  { name: "Cut", description: "Cut selected area", keys: "Ctrl + X", category: "Editing" },
  { name: "Copy", description: "Copy selected area", keys: "Ctrl + C", category: "Editing" },
  { name: "Paste", description: "Paste from clipboard", keys: "Ctrl + V", category: "Editing" },
  { name: "Transform", description: "Free transform tool", keys: "Ctrl + T", category: "Editing" },
  { name: "Select All", description: "Select entire layer", keys: "Ctrl + A", category: "Editing" },
  { name: "Deselect", description: "Remove selection", keys: "Ctrl + D", category: "Editing" },

  // Tools
  { name: "Rectangular Select", description: "Rectangle selection tool", keys: "R", category: "Tools" },
  { name: "Move Tool", description: "Move selected content", keys: "V", category: "Tools" },
  { name: "Brush Tool", description: "Paint with brush", keys: "B", category: "Tools" },
  { name: "Eraser Tool", description: "Erase content", keys: "E", category: "Tools" },
  { name: "Text Tool", description: "Add text to image", keys: "T", category: "Tools" },
  { name: "Clone Tool", description: "Clone from source", keys: "S", category: "Tools" },
]

export default function PhotoshopPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = Array.from(new Set(PHOTOSHOP_SHORTCUTS.map((s) => s.category)))

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <Link
          href="/shortcuts"
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 font-medium"
        >
          <ArrowLeft size={20} />
          Back to Shortcuts
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">🎨</div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Adobe Photoshop</h1>
              <p className="text-muted-foreground mt-2">Master Photoshop shortcuts for faster image editing</p>
            </div>
          </div>
        </div>

        {/* Shortcuts by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryShortcuts = PHOTOSHOP_SHORTCUTS.filter((s) => s.category === category)
            return (
              <div key={category}>
                <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
                <div className="space-y-3">
                  {categoryShortcuts.map((shortcut, idx) => (
                    <div
                      key={`${category}-${idx}`}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition-all"
                    >
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground">{shortcut.name}</h3>
                        <p className="text-sm text-muted-foreground">{shortcut.description}</p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <div className="bg-muted px-4 py-2 rounded-lg font-mono font-bold text-foreground text-sm">
                          {shortcut.keys}
                        </div>
                        <button
                          onClick={() => copyToClipboard(shortcut.keys, `${category}-${idx}`)}
                          className={`p-2 rounded-lg transition-all ${
                            copiedId === `${category}-${idx}`
                              ? "bg-green-500/20 text-green-600"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          {copiedId === `${category}-${idx}` ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
