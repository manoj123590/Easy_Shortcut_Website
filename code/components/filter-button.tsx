"use client"

interface FilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base hover-light-effect ${
        isActive
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          : "bg-card text-foreground border border-border hover:border-primary"
      }`}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
}
