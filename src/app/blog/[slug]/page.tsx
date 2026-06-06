import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { AffiliateDisclosureWrapper } from "@/components/affiliate/AffiliateDisclosureClient"
import { TableOfContentsClient } from "@/components/blog/TableOfContentsClient"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedArticles } from "@/components/shared/RelatedArticles"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { StickyMobileCTAWrapper } from "@/components/shared/StickyMobileCTAClient"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { Button } from "@/components/ui/button"
import { results } from "@/data/results"
import {
  buildArticleSchema,
  buildFaqSchema,
  calculateReadingTime,
  calculateWordCount,
  extractFaqs,
} from "@/lib/blog-seo"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { getProductById } from "@/lib/getRecommendations"
import { getAllPosts, getPostBySlug } from "@/lib/mdx"
import {
  getRelatedBlogPostsForBlogPost,
  getRelatedProductsForBlogPost,
  getRelatedToolsForBlogPost,
} from "@/lib/related"
import { SITE_URL, buildMetadata, buildPageKeywords } from "@/lib/seo"
import { slugify } from "@/lib/slugify"
import { cn } from "@/lib/utils"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return buildMetadata({
      title: "Post Not Found",
      description: "The article you're looking for is unavailable.",
      path: "/blog",
      noindex: true,
    })
  }
  const description =
    post.description ?? `${post.title} — evidence-based guide from FitFeky.`
  const fallbackKeywords = post.title
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 4)
  return buildMetadata({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    keywords: buildPageKeywords(
      post.keywords,
      post.category,
      ...fallbackKeywords,
    ),
    image: post.cover,
    imageAlt: post.title,
    type: "article",
    publishedTime: post.date,
    modifiedTime: post.modifiedTime ?? post.date,
    author: "FitFeky Editorial Team",
  })
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
    a: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className="text-primary underline-offset-4 hover:underline" {...props}>
        {children}
      </a>
    ),
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedBlogPostsForBlogPost(post, 3)
  const relatedTools = getRelatedToolsForBlogPost(post, 3)
  const relatedProducts = getRelatedProductsForBlogPost(post, 3)
  const readTime = calculateReadingTime(post.content)
  const wordCount = calculateWordCount(post.content)
  const faqs = extractFaqs(post.content)

  const productIds = results
    .filter((r) => r.relatedArticle.slug === post.slug)
    .flatMap((r) => r.productIds)
  const firstProduct = productIds.map(getProductById).find(Boolean)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Blog", href: "/blog" },
    { label: post.title, href: `/blog/${post.slug}` },
  ])

  const articleLd = buildArticleSchema({
    title: post.title,
    description: post.description ?? post.title,
    path: `/blog/${post.slug}`,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.modifiedTime ?? post.date,
    author: "FitFeky Editorial Team",
    category: post.category,
    keywords: post.keywords,
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
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        className="mb-6"
      />
      <JsonLd data={jsonLd} />
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/blog">
            <ArrowLeft className="size-4" /> All posts
          </Link>
        </Button>
      </div>

      <article className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_220px]">
        <div className="min-w-0">
          <header className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              {post.category && (
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                  <Tag className="size-3" /> {post.category}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" /> {readTime} min read
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
            {post.description && (
              <p className="mt-4 text-lg text-muted-foreground">{post.description}</p>
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

          {firstProduct && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="mb-4 text-2xl font-bold">Recommended Product</h2>
              <AffiliateDisclosureWrapper />
              <div className="max-w-sm">
                <AffiliateCard product={firstProduct} />
              </div>
            </section>
          )}
        </div>

        <TableOfContentsClient mdx={post.content} />
      </article>

      {relatedPosts.length > 0 && (
        <RelatedArticles
          articles={relatedPosts.map((p) => ({ ...p, kind: "post" as const }))}
          title="Related posts"
          intro="More evidence-based guides from the FitFeky editorial team."
          seeAllHref="/blog"
          seeAllLabel="See all articles"
        />
      )}

      {relatedTools.length > 0 && (
        <RelatedTools
          tools={relatedTools}
          limit={3}
          title="Pair this with a free calculator"
          intro="Free tools built for women's bodies — run your numbers in 30 seconds."
          seeAllHref="/tools"
          seeAllLabel="See all calculators"
        />
      )}

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          title="Products our readers paired with this guide"
          seeAllHref="/products"
          seeAllLabel="See all products"
        />
      )}

      <StickyMobileCTAWrapper
        label="Try a free calculator"
        href="/tools/bmi"
        storageKey="fitfeky-blog-cta-dismissed"
      />
    </div>
  )
}
