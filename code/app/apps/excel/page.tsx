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

const EXCEL_SHORTCUTS: Shortcut[] = [
  // File Operations
  { name: "Save", description: "Save the workbook", keys: "Ctrl + S", category: "File Operations" },
  { name: "New", description: "Create a new workbook", keys: "Ctrl + N", category: "File Operations" },
  { name: "Open", description: "Open a workbook", keys: "Ctrl + O", category: "File Operations" },
  { name: "Print", description: "Print the spreadsheet", keys: "Ctrl + P", category: "File Operations" },
  { name: "Close", description: "Close the workbook", keys: "Ctrl + W", category: "File Operations" },

  // Navigation
  { name: "Move to Cell A1", description: "Go to the beginning", keys: "Ctrl + Home", category: "Navigation" },
  { name: "Move to Last Cell", description: "Go to the end of data", keys: "Ctrl + End", category: "Navigation" },
  {
    name: "Move Between Sheets",
    description: "Cycle through sheets",
    keys: "Ctrl + Page Down",
    category: "Navigation",
  },
  { name: "New Row", description: "Insert new row", keys: "Ctrl + +", category: "Navigation" },

  // Editing
  { name: "Cut", description: "Cut selected cells", keys: "Ctrl + X", category: "Editing" },
  { name: "Copy", description: "Copy selected cells", keys: "Ctrl + C", category: "Editing" },
  { name: "Paste", description: "Paste from clipboard", keys: "Ctrl + V", category: "Editing" },
  { name: "Undo", description: "Undo last action", keys: "Ctrl + Z", category: "Editing" },
  { name: "Redo", description: "Redo last undone action", keys: "Ctrl + Y", category: "Editing" },
  { name: "Delete Row", description: "Delete current row", keys: "Ctrl + -", category: "Editing" },
  { name: "Clear Contents", description: "Delete cell content", keys: "Delete", category: "Editing" },

  // Formatting
  { name: "Bold", description: "Make text bold", keys: "Ctrl + B", category: "Formatting" },
  { name: "Italic", description: "Make text italic", keys: "Ctrl + I", category: "Formatting" },
  { name: "Underline", description: "Underline text", keys: "Ctrl + U", category: "Formatting" },
  { name: "Format Cells", description: "Open Format Cells dialog", keys: "Ctrl + 1", category: "Formatting" },

  // Functions
  { name: "AutoSum", description: "Insert SUM formula", keys: "Alt + =", category: "Functions" },
  { name: "Insert Date", description: "Insert today's date", keys: "Ctrl + ;", category: "Functions" },
  { name: "Insert Time", description: "Insert current time", keys: "Ctrl + Shift + ;", category: "Functions" },
]

export default function ExcelPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const categories = Array.from(new Set(EXCEL_SHORTCUTS.map((s) => s.category)))

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
            <div className="text-5xl">📊</div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Microsoft Excel</h1>
              <p className="text-muted-foreground mt-2">
                Speed up your spreadsheet work with these essential shortcuts
              </p>
            </div>
          </div>
        </div>

        {/* Shortcuts by Category */}
        <div className="space-y-12">
          {categories.map((category) => {
            const categoryShortcuts = EXCEL_SHORTCUTS.filter((s) => s.category === category)
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
