import { Star, MessageSquareQuote } from "lucide-react"

import { BeforeAfter } from "@/components/affiliate/BeforeAfter"
import { Review } from "@/components/affiliate/Review"
import {
  getReviewerById,
  getReviewsForProduct,
  type ProductReview,
} from "@/data/reviews"
import { cn } from "@/lib/utils"

interface ProductReviewsProps {
  productId: string
  className?: string
}

export function ProductReviews({ productId, className }: ProductReviewsProps) {
  const reviews = getReviewsForProduct(productId)
  if (reviews.length === 0) return null

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  const recommendationRate = Math.round(
    (reviews.filter((r) => r.rating >= 4).length / reviews.length) * 100,
  )

  return (
    <section
      className={cn("space-y-12", className)}
      aria-labelledby="user-reviews-heading"
    >
      <header className="rounded-2xl border border-border/60 bg-gradient-to-br from-rose-soft/40 via-card to-cream/40 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <MessageSquareQuote className="size-3" /> Real women · Verified
              reviews
            </span>
            <h2
              id="user-reviews-heading"
              className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              What readers told us
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {reviews.length} honest reviews from FitFeky readers who used
              this product for at least 30 days.
            </p>
          </div>

          <div className="flex items-center gap-6 sm:flex-col sm:items-end sm:gap-3">
            <div className="text-center sm:text-right">
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-bold leading-none tracking-tight">
                  {avg.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <div className="mt-1 flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      "size-4",
                      s <= Math.round(avg)
                        ? "fill-gold text-gold"
                        : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="hidden h-12 w-px bg-border sm:block" />
            <div className="text-center sm:text-right">
              <div className="text-2xl font-bold leading-none text-success">
                {recommendationRate}%
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                would recommend
              </div>
            </div>
          </div>
        </div>
      </header>

      <BeforeAfterSection reviews={reviews} />

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold tracking-tight">
            All reviews ({reviews.length})
          </h3>
          <div className="h-px flex-1 bg-border/60" />
        </div>

        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {reviews.map((r) => {
            const reviewer = getReviewerById(r.reviewerId)
            if (!reviewer) return null
            return (
              <li key={r.id}>
                <Review review={r} reviewer={reviewer} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function BeforeAfterSection({ reviews }: { reviews: ProductReview[] }) {
  const withImages = reviews.filter(
    (r) => r.beforeImage && r.afterImage,
  )
  if (withImages.length === 0) return null

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <h3 className="text-xl font-bold tracking-tight">
          Before &amp; after
        </h3>
        <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
          Verified photos
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {withImages.slice(0, 2).map((r) => {
          const reviewer = getReviewerById(r.reviewerId)
          if (!reviewer) return null
          return (
            <BeforeAfter
              key={r.id}
              review={r}
              reviewer={reviewer}
            />
          )
        })}
      </div>
    </div>
  )
}
