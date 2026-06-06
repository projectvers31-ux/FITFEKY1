import Link from "next/link"

import {
  Pill,
  ShoppingBag,
  Star,
  BadgeCheck,
  ArrowRight,
  Tag,
} from "lucide-react"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

export function TopPicksSection() {
  const picks = products.slice(0, 3)

  return (
    <section
      className="container mx-auto px-4 py-20 lg:py-28"
      aria-labelledby="picks-heading"
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShoppingBag className="size-3" /> Editor-tested
          </span>
          <h2
            id="picks-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            The picks our team actually owns.
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            We test every product before it lands here. If it doesn&apos;t earn
            its place, it doesn&apos;t make the list.
          </p>
        </div>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/products">
            All reviews
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => (
          <AffiliateCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-border/60 bg-card/50 p-4 text-sm text-muted-foreground sm:gap-6">
        <span className="flex items-center gap-2">
          <BadgeCheck className="size-4 text-success" /> Honest reviews
        </span>
        <span className="flex items-center gap-2">
          <Star className="size-4 fill-gold text-gold" /> Editor rating
        </span>
        <span className="flex items-center gap-2">
          <Tag className="size-4 text-primary" /> Best price, every time
        </span>
        <span className="flex items-center gap-2">
          <Pill className="size-4 text-primary" /> No sponsored placements
        </span>
      </div>
    </section>
  )
}
