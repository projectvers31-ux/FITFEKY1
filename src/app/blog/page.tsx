import Link from "next/link"

import { FileText, Sparkles } from "lucide-react"

import { BlogCard } from "@/components/blog/BlogCard"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/categories"
import { getAllPosts } from "@/lib/mdx"
import { buildBlogSchema } from "@/lib/schema"
import { buildMetadata, SITE_URL } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "The FitFeky Journal — Evidence-Based Weight Loss for Women",
  description:
    "Evidence-based guides, hormone-friendly tips, and honest reviews — written for women, by women who've been there.",
  path: "/blog",
  keywords: [
    "FitFeky blog",
    "weight loss blog for women",
    "women's fitness blog",
    "hormone-friendly weight loss",
    "evidence-based fitness articles",
    "PCOS weight loss blog",
    "perimenopause weight gain",
    "postpartum weight loss",
  ],
  imageAlt: "The FitFeky Journal — evidence-based weight loss for women",
  type: "website",
})

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function BlogPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const activeCategory = sp.category
  const allPosts = await getAllPosts()
  const filtered = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts

  const blogSchema = buildBlogSchema({
    name: "The FitFeky Journal",
    description:
      "Evidence-based guides, hormone-friendly tips, and honest reviews — written for women, by women who've been there.",
    path: "/blog",
    posts: allPosts.map((p) => ({
      title: p.title,
      slug: p.slug,
      date: p.date,
      description: p.description,
    })),
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Blog", href: "/blog" },
  ])

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-24">
      <JsonLd data={[breadcrumb, blogSchema]} />
      <header className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <FileText className="size-3" /> The FitFeky Journal
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Real answers, not clickbait.
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {allPosts.length} articles. Filter by topic, written by certified
          coaches and our editorial team.
        </p>
      </header>

      <nav
        className="mb-10 flex flex-wrap justify-center gap-2"
        aria-label="Filter by category"
      >
        <Button
          asChild
          variant={activeCategory ? "outline" : "default"}
          size="sm"
          className="rounded-full"
        >
          <Link href="/blog">All</Link>
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            asChild
            variant={activeCategory === cat.slug ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            <Link href={`/blog?category=${cat.slug}`}>{cat.name}</Link>
          </Button>
        ))}
      </nav>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
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
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
          <Sparkles className="size-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            No posts in this category yet. Check back soon.
          </p>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href="/blog">See all articles</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
