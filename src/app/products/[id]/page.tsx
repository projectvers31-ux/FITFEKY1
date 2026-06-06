import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Star, ExternalLink, ArrowLeft, Check, ShieldCheck, Sparkles } from "lucide-react"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { AffiliateDisclosureWrapper } from "@/components/affiliate/AffiliateDisclosureClient"
import { EditorReview } from "@/components/affiliate/EditorReview"
import { ProductReviews } from "@/components/affiliate/ProductReviews"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedArticles } from "@/components/shared/RelatedArticles"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Button } from "@/components/ui/button"
import { getEditorReviewForProduct } from "@/data/editor-reviews"
import { products } from "@/data/products"
import {
  getAverageUserRating,
  getReviewerById,
  getReviewsForProduct,
} from "@/data/reviews"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import {
  getRelatedBlogPostsForProduct,
  getRelatedProductsForProduct,
  getRelatedToolsForProduct,
} from "@/lib/related"
import { buildReviewSchema } from "@/lib/schema"
import { SITE_URL, buildMetadata, buildPageKeywords } from "@/lib/seo"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) {
    return buildMetadata({
      title: "Product Not Found",
      description: "The product you're looking for is no longer available.",
      path: "/products",
      noindex: true,
    })
  }
  const editorReview = getEditorReviewForProduct(product.id)
  const description =
    editorReview?.verdict ??
    `We tested ${product.name} for 30+ days. Read our editor's review, pros and cons, and what real women thought.`

  return buildMetadata({
    title: `${product.name} Review — Is It Worth It?`,
    description,
    path: `/products/${product.id}`,
    keywords: buildPageKeywords(
      `${product.name} review`,
      `${product.name} for women`,
      "FitFeky product review",
      product.goals,
      [product.category.replace(/-/g, " ")],
    ),
    image: product.image,
    imageAlt: `${product.name} — FitFeky product review`,
    type: "product",
    author: editorReview?.editor?.name ?? "FitFeky Editorial Team",
  })
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3)
  const relatedBlogPosts = await getRelatedBlogPostsForProduct(product, 3)
  const relatedTools = getRelatedToolsForProduct(product, 3)
  const relatedProducts = getRelatedProductsForProduct(product, 3)
  const editorReview = getEditorReviewForProduct(product.id)
  const userReviews = getAverageUserRating(product.id)
  const reviewsData = getReviewsForProduct(product.id)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Products", href: "/products" },
    { label: product.name, href: `/products/${product.id}` },
  ])

  const productReviews = reviewsData.flatMap((r) => {
    const reviewer = getReviewerById(r.reviewerId)
    if (!reviewer) return []
    return [
      buildReviewSchema({
        authorName: reviewer.name,
        datePublished: r.date,
        reviewBody: r.body,
        headline: r.title,
        ratingValue: r.rating,
      }),
    ]
  })

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [`${SITE_URL}${product.image}`],
    description: product.benefits.join(". "),
    sku: product.id,
    brand: { "@type": "Brand", name: "FitFeky Picks" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: editorReview?.rating ?? product.rating,
      reviewCount: product.reviewCount + userReviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    ...(productReviews.length > 0 ? { review: productReviews } : {}),
    offers: {
      "@type": "Offer",
      url: product.affiliateLink,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        className="mb-6"
      />
      <JsonLd data={[breadcrumb, productLd]} />
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="rounded-full">
          <Link href="/products">
            <ArrowLeft className="size-4" /> All products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 500px"
            quality={80}
            placeholder="blur"
            blurDataURL={
              BLUR_DATA_URLS[
                product.image.replace(/\.(jpe?g|png|webp|avif)$/i, "")
              ]
            }
            className="object-cover"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            <ShieldCheck className="size-3.5 text-success" />
            Editor-tested
          </span>
        </div>

        <div>
          <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-rose-soft/50 px-3 py-1 text-xs font-semibold text-foreground/80">
            <Sparkles className="size-3 text-primary" /> {product.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "size-4",
                      i < Math.round(editorReview?.rating ?? product.rating)
                        ? "fill-gold text-gold"
                        : "fill-muted text-muted",
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">
                {(editorReview?.rating ?? product.rating).toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">
                editor rating
              </span>
            </div>
            {userReviews.count > 0 && (
              <span className="text-xs text-muted-foreground">
                + {userReviews.count} reader {userReviews.count === 1 ? "review" : "reviews"} ·{" "}
                <span className="font-medium text-foreground">
                  {userReviews.rating.toFixed(1)}/5
                </span>
              </span>
            )}
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold tracking-tight">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">on Amazon</span>
          </div>

          <AffiliateDisclosureWrapper />

          <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            What we like
          </h2>
          <ul className="mt-3 space-y-2">
            {product.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-2 text-sm"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>

          <h2 className="mt-6 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Best for
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.goals.map((g) => (
              <span
                key={g}
                className="rounded-full bg-rose-soft/40 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {g}
              </span>
            ))}
          </div>

          <Button
            asChild
            size="lg"
            className="mt-8 h-12 w-full rounded-full shadow-md"
          >
            <a
              href={product.affiliateLink}
              target="_blank"
              rel="sponsored noopener noreferrer"
            >
              Check Price on Amazon
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            We earn a small commission at no extra cost to you.
          </p>
        </div>
      </div>

      {editorReview && (
        <section className="mt-16">
          <EditorReview
            editor={editorReview.editor}
            rating={editorReview.rating}
            testedFor={editorReview.testedFor}
            pros={editorReview.pros}
            cons={editorReview.cons}
            verdict={editorReview.verdict}
            inDepth={editorReview.inDepth}
          />
        </section>
      )}

      <section className="mt-16">
        <ProductReviews productId={product.id} />
      </section>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            You might also like
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <AffiliateCard key={p.id} product={p} showBadge={false} />
            ))}
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-xl font-bold tracking-tight">
            More picks in the same goal category
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <AffiliateCard key={p.id} product={p} showBadge={false} />
            ))}
          </div>
        </section>
      )}

      {relatedTools.length > 0 && (
        <RelatedTools
          tools={relatedTools}
          limit={3}
          title="Calculators that go with this product"
          intro="Free, 30-second tools built for women's bodies — pair your purchase with the numbers."
          seeAllHref="/tools"
          seeAllLabel="See all calculators"
        />
      )}

      {relatedBlogPosts.length > 0 && (
        <RelatedArticles
          articles={relatedBlogPosts.map((p) => ({ ...p, kind: "post" as const }))}
          title="Read the science behind the pick"
          intro="Evidence-based guides from the FitFeky editorial team."
          seeAllHref="/blog"
          seeAllLabel="See all articles"
        />
      )}
    </div>
  )
}
