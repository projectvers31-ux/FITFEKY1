import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  Tag,
} from "lucide-react"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"

import { BlogCard } from "@/components/blog/BlogCard"
import { TableOfContentsClient } from "@/components/blog/TableOfContentsClient"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { StickyMobileCTAWrapper } from "@/components/shared/StickyMobileCTAClient"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Button } from "@/components/ui/button"
import { tools } from "@/data/tools"
import {
  buildArticleSchema,
  buildFaqSchema,
  calculateReadingTime,
  calculateWordCount,
  extractFaqs,
} from "@/lib/blog-seo"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { getRelatedToolPosts, getToolPost, getToolPosts } from "@/lib/mdx-tools"
import { getRelatedProductsForTool } from "@/lib/related"
import { slugify } from "@/lib/slugify"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ tool: string; slug: string }>
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

export async function generateStaticParams() {
  const out: { tool: string; slug: string }[] = []
  for (const tool of tools) {
    const posts = await getToolPosts(tool.id)
    for (const p of posts) out.push({ tool: tool.id, slug: p.slug })
  }
  return out
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tool, slug } = await params
  const data = tools.find((t) => t.slug === tool)
  const post = await getToolPost(tool, slug)
  if (!data || !post) return { title: "Post Not Found" }

  const url = `${SITE_URL}/tools/${data.slug}/blog/${post.slug}`
  const title = post.title
  const description =
    post.description ?? `${post.title} — ${data.name} guide on FitFeky.`
  const fallbackKeywords = title
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 4)
  const keywords = Array.from(
    new Set([
      ...data.keywords,
      post.category,
      ...(post.keywords ?? []),
      ...fallbackKeywords,
    ]),
  ).filter(Boolean)

  return {
    title,
    description,
    keywords,
    authors: post.author
      ? [{ name: post.author }]
      : [{ name: "FitFeky Editorial Team" }],
    creator: "FitFeky",
    publisher: "FitFeky",
    category: "Health & Wellness",
    alternates: {
      canonical: `/tools/${data.slug}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName: "FitFeky",
      title,
      description,
      ...(post.modifiedTime ? { modifiedTime: post.modifiedTime } : {}),
      images: post.cover
        ? [
            {
              url: post.cover,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: "/images/hero-yoga-sunset.jpg",
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.cover ? [post.cover] : ["/images/hero-yoga-sunset.jpg"],
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

function mdxComponents() {
  return {
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? "")
      const id = slugify(text)
      return <h2 id={id} className="mt-10 text-2xl font-bold" {...props} />
    },
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => {
      const text = String(props.children ?? "")
      const id = slugify(text)
      return <h3 id={id} className="mt-8 text-xl font-semibold" {...props} />
    },
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className="leading-relaxed text-foreground/90" {...props} />
    ),
    a: ({
      children,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className="text-primary underline-offset-4 hover:underline" {...props}>
        {children}
      </a>
    ),
  }
}

export default async function ToolBlogPostPage({ params }: PageProps) {
  const { tool, slug } = await params
  const data = tools.find((t) => t.slug === tool)
  const post = await getToolPost(tool, slug)
  if (!data || !post) notFound()

  const related = await getRelatedToolPosts(data.id, post.slug, 3)
  const relatedProducts = getRelatedProductsForTool(data.id, 3)
  const readTime =
    post.readingTime ?? calculateReadingTime(post.content)
  const wordCount = calculateWordCount(post.content)
  const faqs = extractFaqs(post.content)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Tools", href: "/tools" },
    { label: data.name, href: `/tools/${data.slug}` },
    { label: "Blog", href: `/tools/${data.slug}/blog` },
    { label: post.title, href: `/tools/${data.slug}/blog/${post.slug}` },
  ])

  const articleLd = buildArticleSchema({
    title: post.title,
    description: post.description ?? post.title,
    path: `/tools/${data.slug}/blog/${post.slug}`,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.modifiedTime ?? post.date,
    author: post.author,
    category: data.name,
    articleSection: data.name,
    keywords: Array.from(
      new Set([...data.keywords, post.category, ...(post.keywords ?? [])]),
    ).filter(Boolean),
    wordCount,
    readingTime: readTime,
  })

  const jsonLd = faqs.length > 0
    ? [breadcrumb, articleLd, buildFaqSchema(faqs)]
    : [breadcrumb, articleLd]

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 pb-24 md:pb-12">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: data.name, href: `/tools/${data.slug}` },
          { label: "Blog", href: `/tools/${data.slug}/blog` },
          { label: post.title },
        ]}
        className="mb-6"
      />
      <JsonLd data={jsonLd} />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/tools/${data.slug}/blog`}>
            <ArrowLeft className="size-4" /> All {data.name} articles
          </Link>
        </Button>
        <Button asChild variant="ghost" size="sm" className="ml-auto">
          <Link href={`/tools/${data.slug}`}>
            <ChevronLeft className="size-4" /> Back to {data.name}
          </Link>
        </Button>
      </div>

      <article className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                <BookOpen className="size-3" /> {data.name}
              </span>
              {post.category && (
                <span className="flex items-center gap-1 rounded-full bg-rose-soft/50 px-2 py-0.5 font-medium text-foreground/80">
                  <Tag className="size-3" /> {post.category}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {readTime} min read
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {post.title}
            </h1>
            {post.description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {post.description}
              </p>
            )}
            {post.cover && (
              <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                  quality={75}
                  placeholder="blur"
                  blurDataURL={
                    BLUR_DATA_URLS[
                      post.cover.replace(/\.(jpe?g|png|webp|avif)$/i, "")
                    ]
                  }
                  className="object-cover"
                />
              </div>
            )}
          </header>

          <div className={cn("prose prose-neutral max-w-none dark:prose-invert")}>
            <MDXRemote source={post.content} components={mdxComponents()} />
          </div>

          <section className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-rose-soft via-cream to-primary/5 p-6 text-center md:p-8">
            <h2 className="text-2xl font-bold tracking-tight">
              Try the {data.name.toLowerCase()} now
            </h2>
            <p className="mx-auto mt-2 max-w-md text-pretty text-muted-foreground">
              Free, instant, and 100% private. Your data stays in your browser.
            </p>
            <Button asChild size="lg" className="mt-4 rounded-full shadow-sm">
              <Link href={`/tools/${data.slug}`}>
                Open the {data.name} →
              </Link>
            </Button>
          </section>
        </div>

        <TableOfContentsClient mdx={post.content} />
      </article>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="mb-6 text-2xl font-bold">More {data.name} guides</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <BlogCard
                key={p.slug}
                href={`/tools/${data.slug}/blog/${p.slug}`}
                post={{
                  title: p.title,
                  slug: p.slug,
                  excerpt: p.description,
                  cover: p.cover,
                  category: p.category,
                  date: p.date,
                  readTime: p.readingTime,
                }}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline" className="rounded-full">
              <Link href={`/tools/${data.slug}/blog`}>
                <BookOpen className="size-4" /> See all {data.name} articles
              </Link>
            </Button>
          </div>
        </section>
      )}

      <RelatedTools
        currentToolId={data.id}
        limit={3}
        title="Pair this with another calculator"
        intro="Every FitFeky calculator takes 30 seconds, runs in your browser, and is built around women's bodies."
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

      <StickyMobileCTAWrapper
        label={`Try the ${data.name.toLowerCase()}`}
        href={`/tools/${data.slug}`}
        storageKey={`fitfeky-tool-blog-cta-${data.slug}-dismissed`}
      />
    </div>
  )
}
