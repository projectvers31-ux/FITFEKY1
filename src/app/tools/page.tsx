import Link from "next/link"

import {
  ArrowRight,
  Calculator,
  type LucideIcon,
  Sparkles,
} from "lucide-react"

import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { tools } from "@/data/tools"
import { buildCollectionPageSchema } from "@/lib/schema"
import { buildMetadata, buildPageKeywords, SITE_URL } from "@/lib/seo"

const ICON_MAP: Record<string, LucideIcon> = {
  Scale: Calculator,
  Flame: Calculator,
  Utensils: Calculator,
  Heart: Calculator,
  Percent: Calculator,
}

export const metadata = buildMetadata({
  title: "Free Weight Loss Calculators for Women — BMI, Calories, Macros",
  description:
    "BMI, calorie, macro, heart rate, and body fat calculators — built for women's bodies, hormones, and goals. Free, instant, no sign-up.",
  path: "/tools",
  keywords: buildPageKeywords(
    "free weight loss calculators",
    "women's fitness calculators",
    tools.map((t) => `${t.name.toLowerCase()} for women`),
    tools.flatMap((t) => t.keywords),
  ),
  imageAlt: "Free weight loss calculators for women — FitFeky",
  type: "website",
})

export default function ToolsPage() {
  const collectionSchema = buildCollectionPageSchema({
    name: "Free Weight Loss Calculators for Women",
    description:
      "BMI, calorie, macro, heart rate, and body fat calculators — built for women's bodies, hormones, and goals. Free, instant, no sign-up.",
    path: "/tools",
    about: "Weight loss calculators for women",
    hasPart: tools.map((t) => ({
      "@type": "WebApplication",
      name: t.name,
      url: `${SITE_URL}/tools/${t.slug}`,
      applicationCategory: "HealthApplication",
      operatingSystem: "Any (Web)",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    })),
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Tools", href: "/tools" },
  ])

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <JsonLd data={[breadcrumb, collectionSchema]} />
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3" /> {tools.length} free tools
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Weight loss calculators, built for women.
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Your numbers, in plain English — using formulas that actually
          account for women&apos;s bodies and life stages. No email, no
          paywall, ever.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, idx) => {
          const Icon = ICON_MAP[tool.icon] ?? Calculator
          const isFeatured = idx === 0
          return (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              {isFeatured && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  Most popular
                </span>
              )}
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary transition-transform group-hover:scale-110">
                <Icon className="size-5" />
              </div>
              <h2 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
                {tool.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {tool.categories.slice(0, 3).map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-rose-soft/50 px-2.5 py-0.5 text-xs font-medium text-foreground/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-xs text-muted-foreground">
                  ~30 sec · No email
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                  Open tool
                  <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          Not sure which tool to start with?
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/quiz">
            <Sparkles className="size-4" /> Take the 60-sec quiz
          </Link>
        </Button>
      </div>
    </div>
  )
}
