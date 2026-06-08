import Link from "next/link"
import { notFound } from "next/navigation"

import { BookOpen, ChevronLeft, Sparkles } from "lucide-react"
import type { Metadata } from "next"

import { BlogCard } from "@/components/blog/BlogCard"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Button } from "@/components/ui/button"
import { tools } from "@/data/tools"
import { getToolPosts } from "@/lib/mdx-tools"
import { getRelatedProductsForTool } from "@/lib/related"

interface PageProps {
  params: Promise<{ tool: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tool } = await params
  const data = tools.find((t) => t.slug === tool)
  if (!data) return { title: "Tool Not Found" }
  const url = `${SITE_URL}/tools/${data.slug}/blog`
  return {
    title: `${data.name} Blog — Guides, Science & How-Tos for Women`,
    description: `${data.name} guides built for women. ${data.description} Read evidence-based articles, formulas explained, and practical tips.`,
    keywords: [
      ...data.keywords,
      `${data.name.toLowerCase()} blog`,
      `${data.name.toLowerCase()} guide`,
      `${data.name.toLowerCase()} for women`,
      `${data.name.toLowerCase()} articles`,
    ],
    authors: [{ name: "FitFeky Editorial Team" }],
    creator: "FitFeky",
    publisher: "FitFeky",
    category: "Health & Wellness",
    alternates: {
      canonical: `/tools/${data.slug}/blog`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "FitFeky",
      title: `${data.name} Blog — FitFeky`,
      description: `${data.name} guides built for women. ${data.description}`,
      images: [
        {
          url: "/images/hero-yoga-sunset.jpg",
          width: 1200,
          height: 630,
          alt: `${data.name} blog — FitFeky`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} Blog — FitFeky`,
      description: `${data.name} guides built for women. ${data.description}`,
      images: ["/images/hero-yoga-sunset.jpg"],
      creator: "@fitfeky",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

export default async function ToolBlogPage({ params }: PageProps) {
  const { tool } = await params
  const data = tools.find((t) => t.slug === tool)
  if (!data) notFound()

  const posts = await getToolPosts(data.id)
  const relatedProducts = getRelatedProductsForTool(data.id, 4)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Tools", href: "/tools" },
    { label: data.name, href: `/tools/${data.slug}` },
    { label: "Blog", href: `/tools/${data.slug}/blog` },
  ])

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${data.name} Blog — FitFeky`,
    description: data.blogIntro,
    url: `${SITE_URL}/tools/${data.slug}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/tools/${data.slug}/blog/${p.slug}`,
      datePublished: p.date,
      description: p.description ?? p.title,
    })),
    publisher: {
      "@type": "Organization",
      name: "FitFeky",
      url: SITE_URL,
    },
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-16 lg:py-20">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: data.name, href: `/tools/${data.slug}` },
          { label: "Blog" },
        ]}
        className="mb-6"
      />
      <JsonLd data={[breadcrumb, blogLd]} />

      <div className="mb-4">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/tools/${data.slug}`}>
            <ChevronLeft className="size-4" /> Back to {data.name}
          </Link>
        </Button>
      </div>

      <header className="mx-auto mb-12 max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <BookOpen className="size-3" /> {data.name} Blog
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {data.name} guides, written for women.
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          {data.blogIntro}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {posts.length} article{posts.length === 1 ? "" : "s"} · Updated{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard
              key={post.slug}
              href={`/tools/${data.slug}/blog/${post.slug}`}
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
      ) : (
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-card/40 p-10 text-center">
          <Sparkles className="size-6 text-primary" />
          <p className="text-sm text-muted-foreground">
            Articles for the {data.name.toLowerCase()} are coming soon. In the
            meantime, try the tool itself — it takes 30 seconds.
          </p>
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link href={`/tools/${data.slug}`}>Open the {data.name}</Link>
          </Button>
        </div>
      )}

      <section
        aria-labelledby="use-the-tool"
        className="mt-16 rounded-2xl border border-border/60 bg-gradient-to-br from-rose-soft via-cream to-primary/10 p-8 text-center"
      >
        <h2
          id="use-the-tool"
          className="text-2xl font-bold tracking-tight md:text-3xl"
        >
          Ready to see your numbers?
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-pretty text-muted-foreground">
          The {data.name.toLowerCase()} takes about 30 seconds. No email, no
          sign-up, and your data never leaves your browser.
        </p>
        <Button asChild size="lg" className="mt-5 rounded-full shadow-sm">
          <Link href={`/tools/${data.slug}`}>Open the {data.name}</Link>
        </Button>
      </section>

      <RelatedTools
        currentToolId={data.id}
        title="Pair it with these tools"
        seeAllHref="/tools"
        seeAllLabel="See all calculators"
      />

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          title={`Products that pair with the ${data.name.toLowerCase()}`}
          seeAllHref="/products"
          seeAllLabel="See all products"
        />
      )}
    </div>
  )
}
