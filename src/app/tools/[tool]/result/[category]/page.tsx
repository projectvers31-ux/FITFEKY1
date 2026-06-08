import Link from "next/link"
import { notFound } from "next/navigation"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedArticles } from "@/components/shared/RelatedArticles"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { ResultCard } from "@/components/tools/ResultCard"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/categories"
import { results } from "@/data/results"
import { tools } from "@/data/tools"
import { getProducts } from "@/lib/getRecommendations"
import {
  getRelatedArticlesForToolResult,
  getRelatedPostForResult,
  getRelatedProductsForTool,
} from "@/lib/related"
import { SITE_URL, buildMetadata } from "@/lib/seo"

interface PageProps {
  params: Promise<{ tool: string; category: string }>
  searchParams: Promise<Record<string, string | string[]>>
}

export function generateStaticParams() {
  const params: { tool: string; category: string }[] = []
  for (const tool of tools) {
    for (const category of tool.categories) {
      params.push({ tool: tool.slug, category })
    }
    for (const cat of categories) {
      if (!tool.categories.includes(cat.slug)) {
        params.push({ tool: tool.slug, category: cat.slug })
      }
    }
  }
  return params
}

function toMetricWeight(value: number, unit: string): number {
  return unit === "imperial" ? value * 0.453592 : value
}

function toMetricHeight(value: number, unit: string): number {
  return unit === "imperial" ? value * 2.54 : value
}

function computeUserValue(
  tool: string,
  category: string,
  sp: Record<string, string | string[]>,
): string {
  const get = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v
  }
  const num = (k: string) => {
    const v = parseFloat(get(k) ?? "")
    return Number.isFinite(v) ? v : NaN
  }
  const unit = get("unit") || "metric"

  if (tool === "bmi") {
    const wRaw = num("weight"), hRaw = num("height")
    if (!Number.isFinite(wRaw) || !Number.isFinite(hRaw) || hRaw === 0) return ""
    const w = toMetricWeight(wRaw, unit)
    const h = toMetricHeight(hRaw, unit)
    const m = h / 100
    return (w / (m * m)).toFixed(1)
  }
  if (tool === "calorie") {
    const bmr = computeBmr(sp, unit)
    const tdee = bmr * activityMultiplier(get("activity"))
    if (!Number.isFinite(tdee) || tdee === 0) return ""
    if (category === "weight-loss") return Math.round(tdee - 400).toString()
    if (category === "bulking") return Math.round(tdee + 350).toString()
    return Math.round(tdee).toString()
  }
  if (tool === "macro") {
    const tdee = computeBmr(sp, unit) * activityMultiplier(get("activity"))
    if (!Number.isFinite(tdee) || tdee === 0) return ""
    const wRaw = num("weight")
    const wKg = toMetricWeight(wRaw, unit)
    const protein = Math.round(wKg * 2.0)
    const fat = Math.round((tdee * 0.25) / 9)
    const carbs = Math.round((tdee - protein * 4 - fat * 9) / 4)
    return `${protein}P / ${carbs}C / ${fat}F`
  }
  if (tool === "heart-rate") {
    const age = num("age")
    if (!Number.isFinite(age)) return ""
    const max = 220 - age
    return `${Math.round(max * 0.6)}-${Math.round(max * 0.8)} bpm`
  }
  if (tool === "body-fat") {
    const wRaw = num("weight"), hRaw = num("height")
    if (!Number.isFinite(wRaw) || !Number.isFinite(hRaw) || hRaw === 0) return ""
    const w = toMetricWeight(wRaw, unit)
    const h = toMetricHeight(hRaw, unit)
    const bmi = w / Math.pow(h / 100, 2)
    return `${bmi.toFixed(1)}% (est.)`
  }
  if (tool === "bmr") {
    const bmr = computeBmr(sp, unit)
    if (!Number.isFinite(bmr) || bmr === 0) return ""
    return `${Math.round(bmr)} kcal/day`
  }
  if (tool === "protein") {
    const w = num("weight")
    const weightLb = unit === "metric" ? w * 2.20462 : w
    if (!Number.isFinite(weightLb) || weightLb <= 0) return ""
    const goal = category === "weight-loss" ? 1.0 : category === "muscle-gain" ? 1.2 : 0.8
    return `${Math.round(weightLb * goal)} g/day`
  }
  if (tool === "ideal-weight") {
    const hRaw = num("height")
    const frame = get("frame")
    if (!Number.isFinite(hRaw) || hRaw <= 0) return ""
    const hCm = toMetricHeight(hRaw, unit)
    const inches = hCm / 2.54
    const base = inches > 60 ? (inches - 60) * 2.3 : 0
    const frameAdj = frame === "small" ? -10 : frame === "large" ? 10 : 0
    const ideal = 45.5 + base + frameAdj
    return `${Math.round(ideal * 2.20462)} lbs (${Math.round(ideal)} kg)`
  }
  if (tool === "water-intake") {
    const w = num("weight")
    const weightKg = unit === "metric" ? w : w / 2.20462
    if (!Number.isFinite(weightKg) || weightKg <= 0) return ""
    const activity = get("activity")
    const climate = get("climate")
    const base = weightKg * 35
    const activityOz = activity === "light" ? 8 : activity === "moderate" ? 16 : activity === "active" ? 24 : 0
    const climateOz = climate === "hot" ? 16 : climate === "moderate" ? 8 : 0
    const totalMl = base + activityOz * 29.5735 + climateOz * 29.5735
    const totalOz = totalMl / 29.5735
    return `${Math.round(totalOz)} oz (${(totalMl / 1000).toFixed(1)} L)`
  }
  return ""
}

function computeBmr(sp: Record<string, string | string[]>, unit?: string): number {
  const get = (k: string) => {
    const v = sp[k]
    return Array.isArray(v) ? v[0] : v
  }
  const wRaw = parseFloat(get("weight") ?? "")
  const hRaw = parseFloat(get("height") ?? "")
  const age = parseFloat(get("age") ?? "")
  const sex = get("sex")
  if (![wRaw, hRaw, age].every(Number.isFinite) || wRaw <= 0) return 0
  const w = toMetricWeight(wRaw, unit || "metric")
  const h = toMetricHeight(hRaw, unit || "metric")
  const base = 10 * w + 6.25 * h - 5 * age
  return sex === "female" ? base - 161 : base + 5
}

function activityMultiplier(level: string | undefined): number {
  switch (level) {
    case "sedentary": return 1.2
    case "light": return 1.375
    case "moderate": return 1.55
    case "active": return 1.725
    case "very-active": return 1.9
    default: return 1.55
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { tool, category } = await params
  const toolData = tools.find((t) => t.slug === tool)
  const config = results.find((r) => r.tool === tool && r.category === category)
  if (!toolData || !config) {
    return buildMetadata({
      title: "Result Not Found",
      description: "The result you're looking for is unavailable.",
      path: "/tools",
      noindex: true,
    })
  }
  const categoryName =
    categories.find((c) => c.slug === category)?.name ?? category

  return buildMetadata({
    title: `${config.title} — ${toolData.name} for ${categoryName}`,
    description: config.metaDescription,
    path: `/tools/${tool}/result/${category}`,
    keywords: [
      ...toolData.keywords,
      categoryName,
      `${toolData.name.toLowerCase()} ${categoryName.toLowerCase()}`,
      `${toolData.name.toLowerCase()} result`,
    ],
    imageAlt: `${config.title} — ${toolData.name} result for ${categoryName}`,
    type: "article",
  })
}

export default async function ToolResultPage({ params, searchParams }: PageProps) {
  const { tool, category } = await params
  const sp = await searchParams

  const toolData = tools.find((t) => t.slug === tool)
  if (!toolData) notFound()

  const config = results.find((r) => r.tool === tool && r.category === category)
  if (!config) notFound()

  const userValue = computeUserValue(tool, category, sp)
  const products = getProducts(tool, category).slice(0, 3)
  const relatedArticles = await getRelatedArticlesForToolResult(toolData.id, 3)
  const relatedProducts = getRelatedProductsForTool(toolData.id, 4)
  const relatedPost = await getRelatedPostForResult(toolData.id, category)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Tools", href: "/tools" },
    { label: toolData.name, href: `/tools/${tool}` },
    { label: category, href: `/tools/${tool}/result/${category}` },
  ])

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: toolData.name,
    description: config.metaDescription,
    url: `${SITE_URL}/tools/${tool}/result/${category}`,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any (Web)",
    keywords: toolData.keywords.join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "FitFeky", url: SITE_URL },
  }

  const actionLd = {
    "@context": "https://schema.org",
    "@type": "Action",
    name: config.title,
    description: config.metaDescription,
    target: `${SITE_URL}/tools/${tool}/result/${category}`,
    ...(userValue ? { result: { "@type": "Thing", name: userValue } } : {}),
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: toolData.name, href: `/tools/${tool}` },
          { label: category },
        ]}
        className="mb-6"
      />
      <JsonLd data={[breadcrumb, webAppLd, actionLd]} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ResultCard config={config} userValue={userValue} relatedPost={relatedPost} />
        </div>
        <aside className="space-y-4">
          <h2 className="text-lg font-semibold">Recommended Products</h2>
          <AffiliateDisclosure />
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {products.map((p) => (
                <AffiliateCard key={p.id} product={p} showBadge={false} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No products yet for this combo.</p>
          )}
          <Button asChild variant="outline" className="w-full">
            <Link href={`/tools/${tool}`}>Recalculate</Link>
          </Button>
        </aside>
      </div>

      {relatedArticles.length > 0 && (
        <RelatedArticles
          articles={relatedArticles.map((p) => ({
            ...p,
            kind: "tool-post" as const,
          }))}
          title={`More ${toolData.name.toLowerCase()} guides`}
          intro="Read the science, the formulas, and the practical how-tos."
          seeAllHref={`/tools/${toolData.slug}/blog`}
          seeAllLabel={`See all ${toolData.name} articles`}
        />
      )}

      <RelatedTools
        currentToolId={toolData.id}
        limit={3}
        title="Pair this with another calculator"
        seeAllHref="/tools"
        seeAllLabel="See all calculators"
      />

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          title={`Products that pair with the ${toolData.name.toLowerCase()}`}
          seeAllHref="/products"
          seeAllLabel="See all products"
        />
      )}
    </div>
  )
}
