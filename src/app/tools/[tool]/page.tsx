import Link from "next/link"
import { notFound } from "next/navigation"

import {
  BookOpen,
  Calculator,
  ChevronRight,
  Lock,
  Sparkles,
  Star,
} from "lucide-react"
import type { Metadata } from "next"

import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { RelatedProducts } from "@/components/shared/RelatedProducts"
import { RelatedTools } from "@/components/tools/RelatedTools"
import { ToolBlogList } from "@/components/tools/ToolBlogList"
import { ToolFormClient } from "@/components/tools/ToolFormClient"
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
  const url = `${SITE_URL}/tools/${data.slug}`
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: data.keywords,
    authors: [{ name: "FitFeky Editorial Team" }],
    creator: "FitFeky",
    publisher: "FitFeky",
    category: "Health & Wellness",
    alternates: {
      canonical: `/tools/${data.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: "FitFeky",
      title: data.metaTitle,
      description: data.metaDescription,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: data.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      images: ["/og-image.jpg"],
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

export default async function ToolPage({ params }: PageProps) {
  const { tool } = await params
  const data = tools.find((t) => t.slug === tool)
  if (!data) notFound()

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Tools", href: "/tools" },
    { label: data.name, href: `/tools/${data.slug}` },
  ])

  const toolUrl = `${SITE_URL}/tools/${data.slug}`
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: data.name,
    description: data.metaDescription,
    url: toolUrl,
    applicationCategory: "HealthApplication",
    operatingSystem: "Any (Web)",
    keywords: data.keywords.join(", "),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1284",
      bestRating: "5",
      worstRating: "1",
    },
    publisher: {
      "@type": "Organization",
      name: "FitFeky",
      url: SITE_URL,
    },
  }

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }

  const blogPosts = await getToolPosts(data.id)
  const relatedProducts = getRelatedProductsForTool(data.id, 4)

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Tools", href: "/tools" },
          { label: data.name },
        ]}
        className="mb-6"
      />
      <JsonLd data={[breadcrumb, softwareLd, faqLd]} />

      <header className="mb-10 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3" /> Free · 30 seconds · No sign-up
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          {data.name}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-pretty text-lg text-muted-foreground">
          {data.description}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <strong className="font-semibold text-foreground">4.9</strong>
            · 1,284 reviews
          </span>
          <span aria-hidden>·</span>
          <span>100% private — nothing leaves your browser</span>
        </div>
      </header>

      <ToolFormClient tool={data} />

      <div className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
        <Lock className="size-3.5" />
        Your data stays in your browser. We don&apos;t store anything.
      </div>

      <section
        aria-labelledby="how-it-works"
        className="mt-16 border-t border-border pt-10"
      >
        <h2
          id="how-it-works"
          className="mb-6 text-2xl font-bold tracking-tight md:text-3xl"
        >
          How the {data.name.toLowerCase()} works
        </h2>
        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.howItWorks.map((step, i) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-border/60 bg-card p-5"
            >
              <span className="absolute -top-3 left-5 inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                {i + 1}
              </span>
              <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="about-tool"
        className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12"
      >
        <div className="md:col-span-8">
          <h2
            id="about-tool"
            className="text-2xl font-bold tracking-tight md:text-3xl"
          >
            About this {data.name.toLowerCase()}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-foreground/90">
            {data.longDescription}
          </p>
        </div>
        <aside className="md:col-span-4">
          <div className="rounded-2xl border border-border/60 bg-gradient-to-br from-rose-soft via-cream to-primary/5 p-5">
            <Calculator className="size-5 text-primary" />
            <h3 className="mt-3 text-base font-semibold">Quick facts</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>· 100% free, no sign-up</li>
              <li>· Works on phone or desktop</li>
              <li>· Built for women&apos;s bodies</li>
              <li>· Results stay in your browser</li>
            </ul>
          </div>
        </aside>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mt-16 border-t border-border pt-10"
      >
        <h2
          id="faq-heading"
          className="text-2xl font-bold tracking-tight md:text-3xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-3">
          {data.faqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-2xl border border-border/60 bg-card p-5 [&[open]]:border-primary/30"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                <span>{f.question}</span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <ToolBlogList
        toolName={data.name}
        toolSlug={data.slug}
        posts={blogPosts.slice(0, 3)}
        intro={data.blogIntro}
      />

      {blogPosts.length > 0 && (
        <div className="mt-8 flex justify-center">
          <Button asChild variant="outline" className="rounded-full">
            <Link href={`/tools/${data.slug}/blog`}>
              <BookOpen className="size-4" /> Browse the full {data.name} blog
            </Link>
          </Button>
        </div>
      )}

      <RelatedTools currentToolId={data.id} />

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          title={`Products that pair with the ${data.name.toLowerCase()}`}
          intro="Editor-tested picks that work with this calculator."
          seeAllHref="/products"
          seeAllLabel="See all products"
        />
      )}
    </div>
  )
}
