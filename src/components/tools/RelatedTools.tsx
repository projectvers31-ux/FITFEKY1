import Link from "next/link"

import { ArrowRight, Calculator } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { tools, type Tool } from "@/data/tools"

interface RelatedToolsProps {
  currentToolId?: string
  limit?: number
  title?: string
  tools?: Tool[]
  intro?: string
  seeAllHref?: string
  seeAllLabel?: string
}

function getRelated(currentToolId: string, limit: number): Tool[] {
  const current = tools.find((t) => t.id === currentToolId)
  if (!current) return []

  return tools
    .filter((t) => t.id !== currentToolId)
    .map((t) => ({
      tool: t,
      score: t.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.tool)
}

export function RelatedTools({
  currentToolId,
  limit = 3,
  title = "Related Tools",
  tools: explicitTools,
  intro,
  seeAllHref = "/tools",
  seeAllLabel = "See all tools",
}: RelatedToolsProps) {
  const items = explicitTools
    ? explicitTools.slice(0, limit)
    : currentToolId
      ? getRelated(currentToolId, limit)
      : []
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="mt-12 border-t border-border pt-8"
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 id="related-tools-heading" className="text-2xl font-bold">
            {title}
          </h2>
          {intro && (
            <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
              {intro}
            </p>
          )}
        </div>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {seeAllLabel}
            <ArrowRight className="size-3.5" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((tool) => (
          <Card key={tool.id} className="group transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calculator className="size-5" />
              </div>
              <CardTitle className="group-hover:text-primary">{tool.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{tool.description}</p>
              <Link
                href={`/tools/${tool.slug}`}
                className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
              >
                Use tool
                <ArrowRight className="size-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
