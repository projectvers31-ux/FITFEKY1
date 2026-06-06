import Link from "next/link"

import { CheckCircle2, BookOpen, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResultConfig } from "@/data/results"
import { cn } from "@/lib/utils"

interface ResultCardProps {
  config: ResultConfig
  userValue?: string | number
  className?: string
  relatedPost?: { title: string; slug: string } | null
}

const colorMap: Record<string, string> = {
  green: "border-green-500/50 bg-green-50 dark:bg-green-950/20",
  blue: "border-blue-500/50 bg-blue-50 dark:bg-blue-950/20",
  red: "border-red-500/50 bg-red-50 dark:bg-red-950/20",
  orange: "border-orange-500/50 bg-orange-50 dark:bg-orange-950/20",
  purple: "border-purple-500/50 bg-purple-50 dark:bg-purple-950/20",
  yellow: "border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20",
}

export function ResultCard({
  config,
  userValue,
  className,
  relatedPost,
}: ResultCardProps) {
  const colorClass = colorMap[config.color] ?? "border-border bg-card"

  return (
    <Card className={cn("border-2", colorClass, className)}>
      <CardHeader>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your Result
          {userValue !== undefined && (
            <span className="ml-2 rounded bg-primary/10 px-2 py-0.5 text-primary">
              {String(userValue)}
            </span>
          )}
        </p>
        <CardTitle className="text-2xl">{config.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{config.explanation}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="size-4 text-primary" />
            Your Action Plan
          </h3>
          <ul className="space-y-2">
            {config.actionPlan.map((step, i) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 border-t border-border pt-4 sm:flex-row",
          )}
        >
          {relatedPost ? (
            <Button asChild variant="outline" className="flex-1">
              <Link href={`/blog/${relatedPost.slug}`}>
                <BookOpen className="size-4" />
                {relatedPost.title}
              </Link>
            </Button>
          ) : (
            <Button asChild variant="outline" className="flex-1">
              <Link href="/blog">
                <BookOpen className="size-4" />
                Read related guides
              </Link>
            </Button>
          )}
          <Button asChild className="flex-1">
            <Link href="/products">
              <ShoppingBag className="size-4" />
              Shop Products
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
