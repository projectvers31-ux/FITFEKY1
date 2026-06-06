import Link from "next/link"

import { ArrowRight, ShoppingBag } from "lucide-react"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure"
import { Button } from "@/components/ui/button"
import type { Product } from "@/data/products"

interface RelatedProductsProps {
  products: Product[]
  title?: string
  intro?: string
  seeAllHref?: string
  seeAllLabel?: string
  compact?: boolean
}

export function RelatedProducts({
  products,
  title = "Related products",
  intro,
  seeAllHref,
  seeAllLabel,
  compact = false,
}: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section
      aria-labelledby="related-products-heading"
      className="mt-16 border-t border-border pt-10"
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <ShoppingBag className="size-3" /> Editor-tested picks
          </span>
          <h2
            id="related-products-heading"
            className="mt-3 text-2xl font-bold tracking-tight md:text-3xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
        {seeAllHref && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            <Link href={seeAllHref}>
              {seeAllLabel ?? "See all products"}{" "}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        )}
      </div>

      <AffiliateDisclosure className="mb-4" />

      <div
        className={
          compact
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {products.map((product) => (
          <AffiliateCard key={product.id} product={product} showBadge={false} />
        ))}
      </div>
    </section>
  )
}
