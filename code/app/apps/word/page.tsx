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

const WORD_SHORTCUTS: Shortcut[] = [
  // File Operations
  { name: "Save", description: "Save the current document", keys: "Ctrl + S", category: "File Operations" },
  { name: "Save As", description: "Save with a new name", keys: "Ctrl + Shift + S", category: "File Operations" },
  { name: "New", description: "Create a new document", keys: "Ctrl + N", category: "File Operations" },
  { name: "Open", description: "Open an existing document", keys: "Ctrl + O", category: "File Operations" },
  { name: "Print", description: "Print the document", keys: "Ctrl + P", category: "File Operations" },

  // Formatting
  { name: "Bold", description: "Make text bold", keys: "Ctrl + B", category: "Formatting" },
  { name: "Italic", description: "Make text italic", keys: "Ctrl + I", category: "Formatting" },
  { name: "Underline", description: "Underline text", keys: "Ctrl + U", category: "Formatting" },
  { name: "Strikethrough", description: "Strike through text", keys: "Ctrl + Shift + X", category: "Formatting" },
  { name: "Clear Formatting", description: "Remove all formatting", keys: "Ctrl + M", category: "Formatting" },

  // Editing
  { name: "Cut", description: "Cut selected text", keys: "Ctrl + X", category: "Editing" },
  { name: "Copy", description: "Copy selected text", keys: "Ctrl + C", category: "Editing" },
  { name: "Paste", description: "Paste from clipboard", keys: "Ctrl + V", category: "Editing" },
  { name: "Undo", description: "Undo last action", keys: "Ctrl + Z", category: "Editing" },
  { name: "Redo", description: "Redo last undone action", keys: "Ctrl + Y", category: "Editing" },
  { name: "Select All", description: "Select entire document", keys: "Ctrl + A", category: "Editing" },
  { name: "Find", description: "Find text in document", keys: "Ctrl + F", category: "Editing" },
  { name: "Find & Replace", description: "Find and replace text", keys: "Ctrl + H", category: "Editing" },

  // Navigation
  { name: "Go to Page", description: "Jump to specific page", keys: "Ctrl + G", category: "Navigation" },
  { name: "Move to Beginning", description: "Go to start of document", keys: "Ctrl + Home", category: "Navigation" },
  { name: "Move to End", description: "Go to end of document", keys: "Ctrl + End", category: "Navigation" },
]

export default function WordPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = Array.from(new Set(WORD_SHORTCUTS.map((s) => s.category)))

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
            <div className="text-5xl">📄</div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Microsoft Word</h1>
              <p className="text-muted-foreground mt-2">
                Master essential Word shortcuts to increase your productivity
              </p>
            </div>
          </div>
        </div>

        {/* Shortcuts by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryShortcuts = WORD_SHORTCUTS.filter((s) => s.category === category)
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
