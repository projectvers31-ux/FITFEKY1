import Link from "next/link"

import { ArrowRight, BookOpen, Sparkles } from "lucide-react"

import { BlogCard } from "@/components/blog/BlogCard"
import { Button } from "@/components/ui/button"
import type { ToolPost } from "@/lib/mdx-tools"

interface ToolBlogListProps {
  toolName: string
  toolSlug: string
  posts: ToolPost[]
  intro?: string
  showHeader?: boolean
  emptyStateHref?: string
}

export function ToolBlogList({
  toolName,
  toolSlug,
  posts,
  intro,
  showHeader = true,
}: ToolBlogListProps) {
  if (posts.length === 0) return null

  return (
    <section
      aria-labelledby={`${toolSlug}-blog-heading`}
      className="mt-16 border-t border-border pt-10"
    >
      {showHeader && (
        <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <BookOpen className="size-3" /> {toolName} Blog
            </span>
            <h2
              id={`${toolSlug}-blog-heading`}
              className="mt-3 text-2xl font-bold tracking-tight md:text-3xl"
            >
              Guides built around the {toolName.toLowerCase()}
            </h2>
            {intro && (
              <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
                {intro}
              </p>
            )}
          </div>
          {posts.length > 3 && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="rounded-full"
            >
              <Link href={`/tools/${toolSlug}/blog`}>
                All {toolName} articles <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard
            key={post.slug}
            href={`/tools/${toolSlug}/blog/${post.slug}`}
            post={{
              title: post.title,
              slug: post.slug,
              excerpt: post.description,
              cover: post.cover,
              category: post.category,
              date: post.date,
              readTime: post.readingTime,
            }}
          />
        ))}
      </div>

      {showHeader && posts.length <= 3 && (
        <div className="mt-6 text-center">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="rounded-full text-primary"
          >
            <Link href={`/tools/${toolSlug}/blog`}>
              <Sparkles className="size-3.5" /> See all {toolName} articles
            </Link>
          </Button>
        </div>
      )}
    </section>
  )
}
