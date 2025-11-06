"use client"

import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface ShortcutCardProps {
  name: string
  description: string
  keys: string
  app?: string
  category?: string
  onCopy?: (keys: string) => void
}

export function ShortcutCard({ name, description, keys, app, category, onCopy }: ShortcutCardProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(keys)
    setIsCopied(true)
    onCopy?.(keys)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="p-4 md:p-5 bg-card rounded-lg border border-border hover-light-effect transition-all group">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2 flex-wrap">
            <h3 className="font-bold text-foreground text-base md:text-lg">{name}</h3>
            {(app || category) && (
              <div className="flex gap-2 flex-wrap">
                {app && (
                  <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium border border-primary/20">
                    {app}
                  </span>
                )}
                {category && (
                  <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-md font-medium border border-accent/20">
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <button
          onClick={handleCopy}
          aria-label={`Copy ${keys} to clipboard`}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono font-bold transition-all whitespace-nowrap text-sm md:text-base ${
            isCopied
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground transform hover:scale-105"
          }`}
        >
          {isCopied ? (
            <>
              <Check size={18} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>{keys}</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
