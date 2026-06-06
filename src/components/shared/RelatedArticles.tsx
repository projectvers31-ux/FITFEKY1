import Link from "next/link"

import { ArrowRight, BookOpen, FileText } from "lucide-react"

import { BlogCard } from "@/components/blog/BlogCard"
import { Button } from "@/components/ui/button"
import type { Post } from "@/lib/mdx"
import type { ToolPost } from "@/lib/mdx-tools"

type Article =
  | (Post & { kind: "post" })
  | (ToolPost & { kind: "tool-post" })

function toCardHref(article: Article): string {
  if (article.kind === "tool-post") {
    return `/tools/${article.toolSlug}/blog/${article.slug}`
  }
  return `/blog/${article.slug}`
}

interface RelatedArticlesProps {
  articles: Article[]
  title?: string
  intro?: string
  seeAllHref?: string
  seeAllLabel?: string
}

export function RelatedArticles({
  articles,
  title = "Related articles",
  intro,
  seeAllHref,
  seeAllLabel,
}: RelatedArticlesProps) {
  if (articles.length === 0) return null

  return (
    <section
      aria-labelledby="related-articles-heading"
      className="mt-16 border-t border-border pt-10"
    >
      <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            {articles.every((a) => a.kind === "tool-post") ? (
              <>
                <BookOpen className="size-3" /> Tool guides
              </>
            ) : (
              <>
                <FileText className="size-3" /> The FitFeky Journal
              </>
            )}
          </span>
          <h2
            id="related-articles-heading"
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
              {seeAllLabel ?? "See all articles"}{" "}
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard
            key={`${article.kind}-${article.slug}`}
            href={toCardHref(article)}
            post={{
              title: article.title,
              slug: article.slug,
              excerpt: article.description,
              cover: article.cover,
              category: article.category,
              date: article.date,
              readTime:
                article.kind === "tool-post" ? article.readingTime : undefined,
            }}
          />
        ))}
      </div>
    </section>
  )
}
