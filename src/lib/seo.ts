import type { Metadata } from "next"

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

export const DEFAULT_OG_IMAGE = "/og-image.jpg"
export const DEFAULT_FAVICON = "/favicon/favicon.svg"

export const DEFAULT_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

export const SITE_KEYWORDS = [
  "weight loss for women",
  "women's fitness",
  "calorie calculator for women",
  "macro calculator women",
  "BMI calculator for women",
  "body fat calculator for women",
  "heart rate zone calculator",
  "hormone-friendly fat loss",
  "fitness tools for women",
  "women's weight loss plan",
  "honest product reviews",
  "FitFeky",
]

interface BuildMetadataInput {
  title: string
  description: string
  path: string
  keywords?: string[]
  image?: string
  imageAlt?: string
  type?: "website" | "article" | "product"
  publishedTime?: string
  modifiedTime?: string
  author?: string
  noindex?: boolean
  nofollow?: boolean
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${input.path.startsWith("/") ? input.path : `/${input.path}`}`
  const image = input.image ?? DEFAULT_OG_IMAGE
  const imageUrl = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
  const keywords = input.keywords?.length
    ? Array.from(new Set([...input.keywords, ...SITE_KEYWORDS]))
    : SITE_KEYWORDS

  return {
    title: input.title,
    description: input.description,
    keywords,
    authors: input.author
      ? [{ name: input.author }]
      : [{ name: "FitFeky Editorial Team" }],
    creator: "FitFeky",
    publisher: "FitFeky",
    category: "Health & Wellness",
    alternates: {
      canonical: input.path,
    },
    robots: input.noindex || input.nofollow
      ? {
          index: !input.noindex,
          follow: !input.nofollow,
          googleBot: {
            index: !input.noindex,
            follow: !input.nofollow,
            "max-image-preview": "large" as const,
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        }
      : DEFAULT_ROBOTS,
    openGraph: {
      type: (input.type === "product" ? "website" : input.type) ?? "website",
      locale: "en_US",
      url,
      siteName: "FitFeky",
      title: input.title,
      description: input.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: input.imageAlt ?? input.title,
        },
      ],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      ...(input.author ? { authors: [input.author] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imageUrl],
      creator: "@fitfeky",
    },
  }
}

export function buildPageKeywords(...groups: (string | string[] | undefined)[]): string[] {
  const merged: string[] = []
  for (const g of groups) {
    if (!g) continue
    if (Array.isArray(g)) merged.push(...g)
    else merged.push(g)
  }
  return Array.from(new Set(merged.map((k) => k.trim()).filter(Boolean)))
}
