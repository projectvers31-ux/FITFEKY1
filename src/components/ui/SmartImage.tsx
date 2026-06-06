import Image, { type ImageProps } from "next/image"

import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"

interface SmartImageProps
  extends Omit<ImageProps, "src" | "placeholder" | "blurDataURL" | "quality"> {
  src: string
  /** Force priority loading (e.g. LCP). Adds fetchPriority="high" + preload. */
  priority?: boolean
  /** Default 75 (Next.js default). Lower for big photos, higher for logos/UI. */
  quality?: number
}

/**
 * SmartImage wraps next/image with:
 *  - automatic LQIP blur placeholder for known raster assets
 *  - explicit quality (default 75)
 *  - safe fallback (no blur, no error) for SVGs, remote URLs, and unmapped files
 */
export function SmartImage(props: SmartImageProps) {
  const { src, priority, quality = 75, alt, ...rest } = props

  const blur = lookupBlur(src)
  const isSvg = typeof src === "string" && src.toLowerCase().endsWith(".svg")

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      placeholder={blur ? "blur" : "empty"}
      blurDataURL={blur}
      quality={isSvg ? 100 : quality}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      unoptimized={isSvg}
      {...rest}
    />
  )
}

function lookupBlur(src: string): string | undefined {
  if (!src.startsWith("/")) return undefined
  // Strip query / hash
  const clean = src.split("?")[0].split("#")[0]
  // Try exact key
  if (BLUR_DATA_URLS[clean]) return BLUR_DATA_URLS[clean]
  // Try with common extensions removed (so .jpg source matches same key as .webp)
  const stem = clean.replace(/\.(jpe?g|png|webp|avif)$/i, "")
  if (BLUR_DATA_URLS[stem]) return BLUR_DATA_URLS[stem]
  return undefined
}
