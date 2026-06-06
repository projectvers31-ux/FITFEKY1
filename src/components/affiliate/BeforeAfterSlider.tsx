"use client"

import * as React from "react"

import Image from "next/image"

import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { cn } from "@/lib/utils"

interface BeforeAfterProps {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  beforeLabel?: string
  afterLabel?: string
  className?: string
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterProps) {
  const [position, setPosition] = React.useState(50)
  const [dragging, setDragging] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleMove = React.useCallback(
    (clientX: number) => {
      const node = containerRef.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      const x = clientX - rect.left
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100))
      setPosition(pct)
    },
    [],
  )

  React.useEffect(() => {
    if (!dragging) return
    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0]?.clientX : e.clientX
      if (typeof x === "number") handleMove(x)
    }
    const onUp = () => setDragging(false)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove)
    window.addEventListener("touchend", onUp)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
  }, [dragging, handleMove])

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative aspect-[4/5] w-full select-none overflow-hidden rounded-2xl border border-border/60 bg-muted",
        className,
      )}
      onMouseDown={(e) => {
        setDragging(true)
        handleMove(e.clientX)
      }}
      onTouchStart={(e) => {
        setDragging(true)
        const x = e.touches[0]?.clientX
        if (typeof x === "number") handleMove(x)
      }}
      role="slider"
      aria-label="Before and after image comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft")
          setPosition((p) => Math.max(0, p - 5))
        if (e.key === "ArrowRight")
          setPosition((p) => Math.min(100, p + 5))
      }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={75}
        placeholder="blur"
        blurDataURL={
          BLUR_DATA_URLS[afterSrc.replace(/\.(jpe?g|png|webp|avif)$/i, "")]
        }
        className="object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="relative h-full"
          style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            placeholder="blur"
            blurDataURL={
              BLUR_DATA_URLS[
                beforeSrc.replace(/\.(jpe?g|png|webp|avif)$/i, "")
              ]
            }
            className="object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-primary/90 px-2.5 py-1 text-xs font-semibold text-primary-foreground backdrop-blur">
        {afterLabel}
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 w-1 -translate-x-1/2 bg-white shadow-lg"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-md">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path
              d="M4 7L2 7M2 7L3 5.5M2 7L3 8.5M10 7L12 7M12 7L11 5.5M12 7L11 8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
