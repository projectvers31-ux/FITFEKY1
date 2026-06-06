import Image from "next/image"

import { BadgeCheck, Sparkles } from "lucide-react"

import { BeforeAfterSlider } from "@/components/affiliate/BeforeAfterSlider"
import { type ProductReview, type Reviewer } from "@/data/reviews"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { cn } from "@/lib/utils"

interface BeforeAfterProps {
  review: ProductReview
  reviewer: Reviewer
  className?: string
}

export function BeforeAfter({ review, reviewer, className }: BeforeAfterProps) {
  if (!review.beforeImage || !review.afterImage) return null
  return (
    <article
      className={cn(
        "rounded-2xl border border-border/60 bg-card p-5",
        className,
      )}
    >
      <BeforeAfterSlider
        beforeSrc={review.beforeImage}
        afterSrc={review.afterImage}
        beforeAlt={`Before using the product — ${reviewer.name}`}
        afterAlt={`After using the product — ${reviewer.name}`}
      />

      <div className="mt-5 flex items-center gap-3">
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full border-2 border-card bg-muted">
          <Image
            src={reviewer.photo}
            alt={reviewer.name}
            fill
            sizes="44px"
            quality={70}
            placeholder="blur"
            blurDataURL={
              BLUR_DATA_URLS[
                reviewer.photo.replace(/\.(jpe?g|png|webp|avif)$/i, "")
              ]
            }
            className="object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold">
              {reviewer.name}
            </span>
            {reviewer.verified && (
              <BadgeCheck className="size-3.5 shrink-0 text-primary" />
            )}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {reviewer.role} · {review.timeframe}
          </div>
        </div>
        {review.result && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
            <Sparkles className="size-3" />
            {review.result}
          </span>
        )}
      </div>

      <blockquote className="mt-4 space-y-3">
        <p className="text-sm italic leading-relaxed text-foreground/90">
          <span className="text-muted-foreground">Before: </span>
          &ldquo;{review.beforeQuote}&rdquo;
        </p>
        <p className="text-sm italic leading-relaxed text-foreground/90">
          <span className="font-semibold text-primary">After: </span>
          &ldquo;{review.afterQuote}&rdquo;
        </p>
      </blockquote>
    </article>
  )
}
