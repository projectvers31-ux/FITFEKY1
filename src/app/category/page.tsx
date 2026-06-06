import Link from "next/link"

import {
  Calculator,
  FileText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"

import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"
import { getAllPosts } from "@/lib/mdx"
import { SITE_URL, buildMetadata } from "@/lib/seo"

const ICON_MAP: Record<string, LucideIcon> = {
  Scale: Calculator,
  Flame: Calculator,
  Utensils: Calculator,
  Heart: Calculator,
  Percent: Calculator,
}

export const metadata = buildMetadata({
  title: "Browse by Goal — Categories, Tools & Articles | FitFeky",
  description:
    "Find free calculators, evidence-based articles, and product picks for every fitness goal — weight loss, muscle gain, endurance, general fitness, and strength training.",
  path: "/category",
  keywords: [
    "fitness categories",
    "browse fitness goals",
    "weight loss tools",
    "muscle gain tools",
    "endurance training",
    "strength training",
    "general fitness",
  ],
  imageAlt: "Browse FitFeky by goal — calculators, articles, and product picks",
  type: "website",
})

export default async function CategoryIndexPage() {
  const allPosts = await getAllPosts()

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Browse FitFeky by goal",
    description:
      "Find free calculators, evidence-based articles, and product picks for every fitness goal.",
    url: `${SITE_URL}/category`,
    hasPart: categories.map((c) => ({
      "@type": "WebPage",
      name: c.name,
      url: `${SITE_URL}/category/${c.slug}`,
      description: c.description,
    })),
  }
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Categories", href: "/category" },
  ])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
      <Breadcrumbs items={[{ label: "Categories" }]} className="mb-6" />
      <JsonLd data={[breadcrumb, collectionLd]} />

      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          Browse by goal
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Find tools and articles for your goal.
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
          Every category pulls together the free calculators, evidence-based
          articles, and editor-tested products that match what you&apos;re
          trying to do.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon = ICON_MAP["Scale"] ?? Calculator
          const toolCount = tools.filter((t) => cat.toolIds.includes(t.id))
            .length
          const articleCount = allPosts.filter(
            (p) => p.category === cat.slug,
          ).length
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary">
                <Icon className="size-5" />
              </div>
              <h2 className="text-base font-semibold transition-colors group-hover:text-primary">
                {cat.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {cat.description}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calculator className="size-3" /> {toolCount} tool
                  {toolCount === 1 ? "" : "s"}
                </span>
                {articleCount > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <FileText className="size-3" /> {articleCount} article
                    {articleCount === 1 ? "" : "s"}
                  </span>
                )}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore {cat.name.toLowerCase()}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          )
        })}
      </div>

      <Card className="mt-12 border-primary/20 bg-gradient-to-br from-rose-soft/40 to-cream/40">
        <CardContent className="flex flex-col items-center gap-3 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which goal fits you best?
          </p>
          <Button asChild size="lg" className="rounded-full shadow-sm">
            <Link href="/quiz">
              Take the 60-second quiz{" "}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
