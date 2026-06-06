"use client"

import * as React from "react"

import { X, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "fitfeky-affiliate-dismissed"

export function AffiliateDisclosure({ className }: { className?: string }) {
  const [dismissed, setDismissed] = React.useState(true)

  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    setDismissed(stored === "true")
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setDismissed(true)
  }

  if (dismissed) return null

  return (
    <div
      role="region"
      aria-label="Affiliate disclosure"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-foreground dark:bg-gold/5",
        className,
      )}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-gold-foreground" />
      <div className="flex-1">
        <strong className="block font-semibold">Affiliate Disclosure (FTC)</strong>
        <p className="mt-1 text-xs leading-relaxed">
          FitFeky is a participant in the Amazon Services LLC Associates
          Program. We earn from qualifying purchases made through our
          affiliate links, at no extra cost to you.
        </p>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        onClick={handleDismiss}
        aria-label="Dismiss affiliate disclosure"
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}
