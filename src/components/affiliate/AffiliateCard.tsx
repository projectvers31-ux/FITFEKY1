import Image from "next/image"
import Link from "next/link"

import { Star, ExternalLink, BadgeCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Product } from "@/data/products"
import { cn } from "@/lib/utils"

interface AffiliateCardProps {
  product: Product
  showBadge?: boolean
  className?: string
}

export function AffiliateCard({
  product,
  showBadge = true,
  className,
}: AffiliateCardProps) {
  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
        className,
      )}
    >
      <CardHeader className="p-0">
        <Link
          href={`/products/${product.id}`}
          className="block"
          aria-label={product.name}
        >
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              quality={75}
              unoptimized={product.image.endsWith(".svg")}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {showBadge && (
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                <BadgeCheck className="size-3.5 text-primary" />
                Editor&apos;s pick
              </span>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-5">
        <CardTitle className="line-clamp-2 text-base font-semibold leading-snug">
          <Link
            href={`/products/${product.id}`}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </CardTitle>
        <div className="mt-2 flex items-center gap-1.5 text-sm">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-3.5",
                  i < Math.round(product.rating)
                    ? "fill-gold text-gold"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-muted-foreground">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
          {product.benefits.slice(0, 3).map((benefit) => (
            <li key={benefit} className="flex items-start gap-1.5">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
              <span className="line-clamp-1">{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-xl font-bold tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">on Amazon</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button
          asChild
          className="w-full rounded-full shadow-sm"
          size="sm"
        >
          <Link href={`/products/${product.id}`}>
            Read the review
            <ExternalLink className="size-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
