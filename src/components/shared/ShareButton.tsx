"use client"

import * as React from "react"

import { Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ShareButtonProps {
  url: string
  title: string
  description?: string
  image?: string
  className?: string
}

export function ShareButton({ url, title, description, image, className }: ShareButtonProps) {
  const handleClick = () => {
    const params = new URLSearchParams({
      url,
      media: image ?? "",
      description: description ?? title,
    })
    const pinterestUrl = `https://pinterest.com/pin/create/button/?${params.toString()}`
    window.open(pinterestUrl, "_blank", "noopener,noreferrer,width=750,height=550")
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={className}
      aria-label={`Share ${title} on Pinterest`}
    >
      <Share2 className="size-4" />
      Share on Pinterest
    </Button>
  )
}
