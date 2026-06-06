import Image from "next/image"

import { BadgeCheck, Star, ThumbsUp, Quote } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { ProductReview, Reviewer } from "@/data/reviews"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { cn } from "@/lib/utils"

interface ReviewProps {
  review: ProductReview
  reviewer: Reviewer
  className?: string
}

export function Review({ review, reviewer, className }: ReviewProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-5 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <header className="flex items-start gap-3">
        <div className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-card bg-muted ring-2 ring-rose-soft/40">
          <Image
            src={reviewer.photo}
            alt={reviewer.name}
            fill
            sizes="48px"
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
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold tracking-tight">
              {reviewer.name}
            </span>
            {reviewer.verified && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                <BadgeCheck className="size-3" /> Verified
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {reviewer.role}
            {reviewer.age ? ` · ${reviewer.age}` : ""}
          </div>
          <div className="mt-1.5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3.5",
                  i < review.rating
                    ? "fill-gold text-gold"
                    : "fill-muted text-muted",
                )}
              />
            ))}
            <span className="ml-1 text-xs font-medium">
              {review.rating}.0
            </span>
          </div>
        </div>
        <time className="text-xs text-muted-foreground">
          {new Date(review.date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
        </time>
      </header>

      <div className="mt-4">
        <h4 className="text-base font-semibold leading-snug tracking-tight">
          {review.title}
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {review.body}
        </p>
      </div>

      {(review.beforeQuote || review.afterQuote) && (
        <div className="mt-4 space-y-3 rounded-xl border border-border/60 bg-muted/40 p-4">
          {review.beforeQuote && (
            <p className="text-xs leading-relaxed text-foreground/85">
              <span className="font-semibold uppercase tracking-wider text-muted-foreground">
                Before
              </span>
              <br />
              <span className="italic">&ldquo;{review.beforeQuote}&rdquo;</span>
            </p>
          )}
          {review.afterQuote && (
            <p className="text-xs leading-relaxed text-foreground/85">
              <span className="font-semibold uppercase tracking-wider text-primary">
                After
              </span>
              <br />
              <span className="italic">&ldquo;{review.afterQuote}&rdquo;</span>
            </p>
          )}
        </div>
      )}

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {review.timeframe && (
            <span className="inline-flex items-center gap-1">
              <Quote className="size-3" />
              {review.timeframe}
            </span>
          )}
          {review.result && (
            <span className="inline-flex items-center gap-1 font-semibold text-success">
              {review.result}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 rounded-full px-2 text-xs"
        >
          <ThumbsUp className="size-3" /> Helpful · {review.helpful}
        </Button>
      </footer>
    </article>
  )
}
