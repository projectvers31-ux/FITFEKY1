import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Quote,
  ShoppingBag,
  Star,
  ThumbsUp,
  Timer,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { products } from "@/data/products"
import { getReviewerById, getReviewsForProduct } from "@/data/reviews"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { cn } from "@/lib/utils"

const featuredProductIds = [
  "resistance-bands-set",
  "whey-protein",
  "kitchen-scale",
] as const

export function TopPicksWithReviewsSection() {
  const featured = featuredProductIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is (typeof products)[number] => Boolean(p))

  return (
    <section
      id="top-picks"
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-cream/30 via-background to-background py-20 lg:py-28"
      aria-labelledby="top-picks-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-12 size-72 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-12 size-72 rounded-full bg-gold/15 blur-3xl"
      />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShoppingBag className="size-3" /> Editor-tested · Reader-loved
          </span>
          <h2
            id="top-picks-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            The picks our team — and readers — love.
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Every product on FitFeky is tested by our editors for at least 30
            days — and validated by the women who actually use them. Here are
            three with the strongest reader reviews.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {featured.map((product, idx) => {
            const reviews = getReviewsForProduct(product.id)
            const topReview = reviews[0]
            const reviewer = topReview
              ? getReviewerById(topReview.reviewerId)
              : undefined

            return (
              <article
                key={product.id}
                className={cn(
                  "group relative grid grid-cols-1 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-xl lg:grid-cols-12",
                  idx % 2 === 1 && "lg:[&>div:first-child]:order-2",
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted lg:col-span-5 lg:aspect-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    quality={70}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 top-0 flex flex-wrap items-start justify-between gap-2 p-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                      <BadgeCheck className="size-3.5 text-primary" />
                      Editor&apos;s pick
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/95 px-2.5 py-1 text-xs font-semibold text-white shadow-sm backdrop-blur">
                      <Timer className="size-3.5" />
                      30+ days tested
                    </span>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
                </div>

                <div className="flex flex-col p-6 sm:p-8 lg:col-span-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                    <span className="rounded-full bg-rose-soft/60 px-2.5 py-0.5 font-medium text-foreground/80">
                      {product.category.replace("-", " ")}
                    </span>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3.5",
                            i < Math.round(product.rating)
                              ? "fill-gold text-gold"
                              : "fill-muted text-muted",
                          )}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-1 font-semibold text-foreground">
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-muted-foreground">
                      <Users className="size-3.5" aria-hidden="true" />
                      {product.reviewCount.toLocaleString()} reviews
                    </span>
                  </div>

                  <h3 className="mt-3 text-balance text-2xl font-bold tracking-tight">
                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                    >
                      {product.name}
                    </Link>
                  </h3>

                  <p className="mt-1.5 text-sm font-medium text-primary/90">
                    Why editors chose it
                  </p>
                  <ul
                    className="mt-2 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2"
                    aria-label="Top benefits"
                  >
                    {product.benefits.slice(0, 4).map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-1.5 text-foreground/85"
                      >
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-success"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {topReview && reviewer && (
                    <figure className="mt-6 rounded-xl border border-primary/10 bg-gradient-to-br from-rose-soft/40 to-cream/30 p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="relative size-8 shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-rose-soft/50">
                            <Image
                              src={reviewer.photo}
                              alt={reviewer.name}
                              fill
                              sizes="32px"
                              quality={70}
                              placeholder="blur"
                              blurDataURL={
                                BLUR_DATA_URLS[
                                  reviewer.photo.replace(
                                    /\.(jpe?g|png|webp|avif)$/i,
                                    "",
                                  )
                                ]
                              }
                              className="object-cover"
                            />
                          </div>
                          <figcaption className="text-xs">
                            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                              <span className="font-semibold text-foreground">
                                {reviewer.name}
                              </span>
                              {reviewer.verified && (
                                <span
                                  className="inline-flex items-center gap-0.5 rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300"
                                  title="Verified reader purchase"
                                >
                                  <BadgeCheck
                                    className="size-3"
                                    aria-hidden="true"
                                  />
                                  Verified reader
                                </span>
                              )}
                            </div>
                            <span className="text-muted-foreground">
                              {reviewer.age ? `${reviewer.age} · ` : ""}
                              {reviewer.role}
                            </span>
                          </figcaption>
                        </div>
                        {topReview.result && (
                          <span className="rounded-full bg-success/15 px-2.5 py-0.5 text-[11px] font-semibold text-success">
                            {topReview.result}
                          </span>
                        )}
                      </div>

                      <blockquote className="mt-3">
                        <Quote
                          className="size-3.5 text-primary/60"
                          aria-hidden="true"
                        />
                        <p className="mt-1 text-sm italic leading-relaxed text-foreground/90">
                          &ldquo;{topReview.title}&rdquo;
                        </p>
                      </blockquote>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-primary/10 pt-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3" aria-hidden="true" />
                          {topReview.timeframe} of testing
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <ThumbsUp className="size-3" aria-hidden="true" />
                          {topReview.helpful} found this helpful
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Star
                            className="size-3 fill-gold text-gold"
                            aria-hidden="true"
                          />
                          {topReview.rating}/5
                        </span>
                      </div>
                    </figure>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-4">
                    <div className="flex items-baseline gap-2 text-sm">
                      <span className="text-muted-foreground">From</span>
                      <span className="text-2xl font-bold tracking-tight text-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-full px-5 shadow-sm transition-transform group-hover:translate-x-0.5"
                    >
                      <Link href={`/products/${product.id}`}>
                        Read the full review
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-3">
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/products">
              See all editor-tested products
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
