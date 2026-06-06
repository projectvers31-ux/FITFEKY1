import Link from "next/link"
import { notFound } from "next/navigation"

import {
  Calculator,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

import { BlogCard } from "@/components/blog/BlogCard"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"
import { getAllPosts } from "@/lib/mdx"
import { getRelatedProductsForCategory } from "@/lib/related"
import { SITE_URL, buildMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ slug: string }>
}

const ICON_MAP: Record<string, LucideIcon> = {
  Scale: Calculator,
  Flame: Calculator,
  Utensils: Calculator,
  Heart: Calculator,
  Percent: Calculator,
}

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) {
    return buildMetadata({
      title: "Category Not Found",
      description: "The category you're looking for is unavailable.",
      path: "/category",
      noindex: true,
    })
  }
  const catTools = tools.filter((t) => cat.toolIds.includes(t.id))
  return buildMetadata({
    title: `${cat.name} — Tools, Articles & Tips for Women`,
    description: cat.description,
    path: `/category/${cat.slug}`,
    keywords: [
      `${cat.name.toLowerCase()} for women`,
      `${cat.name.toLowerCase()} tools`,
      `${cat.name.toLowerCase()} articles`,
      ...cat.relatedGoals,
      ...catTools.flatMap((t) => t.keywords),
    ],
    imageAlt: `${cat.name} — tools and articles for women`,
    type: "website",
  })
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const cat = categories.find((c) => c.slug === slug)
  if (!cat) notFound()

  const categoryTools = tools.filter((t) => cat.toolIds.includes(t.id))
  const allPosts = await getAllPosts()
  const articles = allPosts.filter((p) => p.category === slug)
  const relatedProducts = getRelatedProductsForCategory(slug, 4)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Categories", href: "/category" },
    { label: cat.name, href: `/category/${cat.slug}` },
  ])

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.description,
    url: `${SITE_URL}/category/${cat.slug}`,
    hasPart: [
      ...categoryTools.map((t) => ({
        "@type": "WebApplication",
        name: t.name,
        url: `${SITE_URL}/tools/${t.slug}`,
      })),
      ...articles.map((p) => ({
        "@type": "Article",
        name: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    ],
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Categories", href: "/category" },
          { label: cat.name },
        ]}
        className="mb-6"
      />
      <JsonLd data={[breadcrumb, collectionLd]} />

      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          Category
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {cat.name}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
          {cat.description}
        </p>
      </header>

      <section className="mb-16">
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Calculator className="size-5 text-primary" /> Tools for {cat.name}
        </h2>
        {categoryTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoryTools.map((tool) => {
              const Icon = ICON_MAP[tool.icon] ?? Calculator
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold transition-colors group-hover:text-primary">
                    {tool.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Use tool
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No tools yet for this category.
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold tracking-tight">
          <FileText className="size-5 text-primary" /> Articles on {cat.name}
        </h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((post) => (
              <BlogCard
                key={post.slug}
                post={{
                  title: post.title,
                  slug: post.slug,
                  excerpt: post.description,
                  image: post.cover,
                  category: post.category,
                  date: post.date,
                }}
              />
            ))}
          </div>
        ) : (
          <Card className="border-dashed bg-card/40">
            <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No articles yet for this category.
              </p>
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link href="/blog">See all articles</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          title={`Products for ${cat.name.toLowerCase()}`}
          seeAllHref="/products"
          seeAllLabel="See all products"
        />
      )}
    </div>
  )
}
