"use client"

import * as React from "react"

import Link from "next/link"

import { X, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface StickyMobileCTAProps {
  label: string
  href: string
  dismissible?: boolean
  storageKey?: string
  className?: string
}

export function StickyMobileCTA({
  label,
  href,
  dismissible = true,
  storageKey = "fitfeky-sticky-cta-dismissed",
  className,
}: StickyMobileCTAProps) {
  const [hidden, setHidden] = React.useState(true)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (window.sessionStorage.getItem(storageKey) === "true") {
      setHidden(true)
    } else {
      setHidden(false)
    }
  }, [storageKey])

  const handleDismiss = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(storageKey, "true")
    }
    setHidden(true)
  }

  if (hidden) return null

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 shadow-lg backdrop-blur supports-[padding:env(safe-area-inset-bottom)]:pb-[env(safe-area-inset-bottom)] md:hidden",
        className,
      )}
      role="region"
      aria-label="Quick action"
    >
      <div className="flex items-center gap-2 pb-3">
        <Button asChild className="flex-1" size="lg">
          <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        {dismissible && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
