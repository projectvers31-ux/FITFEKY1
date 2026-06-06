import { SITE_URL } from "./seo"

export const SCHEMA_PUBLISHER = {
  "@type": "Organization" as const,
  "@id": `${SITE_URL}/#organization`,
  name: "FitFeky",
  url: `${SITE_URL}/`,
  logo: {
    "@type": "ImageObject" as const,
    url: `${SITE_URL}/favicon/favicon.svg`,
  },
  sameAs: [
    "https://twitter.com/fitfeky",
    "https://pinterest.com/fitfeky",
    "https://instagram.com/fitfeky",
  ],
}

interface BlogSchemaInput {
  name: string
  description: string
  path: string
  posts: { title: string; slug: string; date: string; description?: string }[]
}

export function buildBlogSchema(input: BlogSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}${input.path}#blog`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    publisher: SCHEMA_PUBLISHER,
    blogPost: input.posts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}${input.path}/${p.slug}`,
      datePublished: p.date,
      description: p.description ?? p.title,
      author: { "@type": "Organization", name: "FitFeky" },
      publisher: SCHEMA_PUBLISHER,
    })),
  }
}

interface CollectionPageInput {
  name: string
  description: string
  path: string
  about?: string
  hasPart: Record<string, unknown>[]
}

export function buildCollectionPageSchema(input: CollectionPageInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${input.path}#collection`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    ...(input.about ? { about: { "@type": "Thing", name: input.about } } : {}),
    isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: "FitFeky" },
    hasPart: input.hasPart,
  }
}

interface ReviewInput {
  authorName: string
  datePublished: string
  reviewBody?: string
  headline?: string
  ratingValue: number
}

export function buildReviewSchema(input: ReviewInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    datePublished: input.datePublished,
    ...(input.reviewBody ? { reviewBody: input.reviewBody } : {}),
    ...(input.headline ? { headline: input.headline } : {}),
    reviewRating: {
      "@type": "Rating",
      ratingValue: input.ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
  }
}

interface QuizInput {
  name: string
  description: string
  path: string
  about?: string
  resultName?: string
  resultDescription?: string
}

export function buildQuizSchema(input: QuizInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "@id": `${SITE_URL}${input.path}#quiz`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    about: {
      "@type": "Thing",
      name: input.about ?? "Fitness and weight loss for women",
    },
    ...(input.resultName
      ? {
          result: {
            "@type": "Thing",
            name: input.resultName,
            description: input.resultDescription,
          },
        }
      : {}),
    provider: SCHEMA_PUBLISHER,
    inLanguage: "en-US",
  }
}

interface ContactPageInput {
  name: string
  description: string
  path: string
}

export function buildContactPageSchema(input: ContactPageInput) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}${input.path}#contact`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: "FitFeky" },
    publisher: SCHEMA_PUBLISHER,
  }
}

interface AboutPageInput {
  name: string
  description: string
  path: string
}

export function buildAboutPageSchema(input: AboutPageInput) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}${input.path}#about`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    isPartOf: { "@type": "WebSite", url: `${SITE_URL}/`, name: "FitFeky" },
    mainEntity: SCHEMA_PUBLISHER,
  }
}

interface FaqInput {
  questions: { question: string; answer: string }[]
}

export function buildFaqPageSchema(input: FaqInput) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: input.questions.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }
}

interface WebAppInput {
  name: string
  description: string
  path: string
  keywords?: string[]
  applicationCategory?: string
  operatingSystem?: string
  offers?: { price: string; priceCurrency: string }
  ratingValue?: number
  reviewCount?: number
}

export function buildWebAppResultSchema(input: WebAppInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}${input.path}#webapp`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    applicationCategory: input.applicationCategory ?? "HealthApplication",
    operatingSystem: input.operatingSystem ?? "Any (Web)",
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
    offers: {
      "@type": "Offer",
      price: input.offers?.price ?? "0",
      priceCurrency: input.offers?.priceCurrency ?? "USD",
    },
    ...(input.ratingValue && input.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: input.ratingValue,
            reviewCount: input.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    publisher: SCHEMA_PUBLISHER,
  }
}
