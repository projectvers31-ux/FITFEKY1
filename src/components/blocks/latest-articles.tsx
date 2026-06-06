import Link from "next/link"

import { ArrowRight, FileText, Sparkles } from "lucide-react"

import { BlogCard } from "@/components/blog/BlogCard"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/mdx"

export async function LatestArticlesSection() {
  const posts = (await getAllPosts()).slice(0, 3)

  return (
    <section
      className="relative border-y border-border/60 bg-gradient-to-b from-background to-cream/30 py-20 lg:py-28"
      aria-labelledby="articles-heading"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <FileText className="size-3" /> The FitFeky Journal
            </span>
            <h2
              id="articles-heading"
              className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
            >
              Evidence-based guides, no fluff.
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Written by certified coaches, RDs, and our editorial team.
              Reviewed by a medical advisor.
            </p>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/blog">
              All articles
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
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
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
            <Sparkles className="size-6 text-primary" />
            <p className="text-sm text-muted-foreground">
              New articles publishing soon — sign up to be the first to read
              them.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
