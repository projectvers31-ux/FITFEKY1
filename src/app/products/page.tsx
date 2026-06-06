import Link from "next/link"

import { ShoppingBag, Sparkles, Star, BadgeCheck } from "lucide-react"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { AffiliateDisclosureWrapper } from "@/components/affiliate/AffiliateDisclosureClient"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/categories"
import { products } from "@/data/products"
import { buildCollectionPageSchema } from "@/lib/schema"
import { buildMetadata, buildPageKeywords, SITE_URL } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Best Women's Fitness Products — Editor-Tested Reviews",
  description:
    "Honest, hands-on reviews of the best women's fitness products. We test every item for 30+ days before recommending it.",
  path: "/products",
  keywords: buildPageKeywords(
    "best women's fitness products",
    "editor-tested fitness gear",
    "honest fitness product reviews",
    products.map((p) => p.name),
    products.flatMap((p) => p.goals),
  ),
  imageAlt: "Best women's fitness products — editor-tested reviews",
  type: "website",
})

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const activeCategory = sp.category
  const filtered = activeCategory
    ? products.filter((p) => p.category === activeCategory)
    : products

  const productCategories = Array.from(new Set(products.map((p) => p.category)))

  const collectionSchema = buildCollectionPageSchema({
    name: "Best Women's Fitness Products — Editor-Tested Reviews",
    description:
      "Honest, hands-on reviews of the best women's fitness products. We test every item for 30+ days before recommending it.",
    path: "/products",
    about: "Women's fitness products",
    hasPart: products.map((p) => ({
      "@type": "Product",
      name: p.name,
      url: `${SITE_URL}/products/${p.id}`,
      image: `${SITE_URL}${p.image}`,
      description: p.benefits.join(". "),
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: p.price,
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: p.rating,
        reviewCount: p.reviewCount,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Products", href: "/products" },
  ])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
      <JsonLd data={[breadcrumb, collectionSchema]} />
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <ShoppingBag className="size-3" /> {products.length} products reviewed
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Best women&apos;s fitness products, tested.
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Every item we&apos;d put in our own gym. No sponsored placements, no
          fluff — just honest picks.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BadgeCheck className="size-3.5 text-success" /> 30+ day tests
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-gold text-gold" /> Editor rating
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" /> No paid placements
          </span>
        </div>
      </header>

      <div className="mb-8">
        <AffiliateDisclosureWrapper />
      </div>

      <nav
        className="mb-10 flex flex-wrap justify-center gap-2"
        aria-label="Filter by category"
      >
        <Button
          asChild
          variant={activeCategory ? "outline" : "default"}
          size="sm"
          className="rounded-full"
        >
          <Link href="/products">All</Link>
        </Button>
        {productCategories.map((cat) => (
          <Button
            key={cat}
            asChild
            variant={activeCategory === cat ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            <Link href={`/products?category=${cat}`}>
              {categories.find((c) => c.id === cat)?.name ?? cat}
            </Link>
          </Button>
        ))}
      </nav>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <AffiliateCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No products in this category yet.
        </p>
      )}
    </div>
  )
}
