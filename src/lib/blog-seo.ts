import { SITE_URL } from "./seo"
import { slugify } from "./slugify"

const WORDS_PER_MINUTE = 200

export interface FAQ {
  question: string
  answer: string
}

export interface ArticleSchemaInput {
  title: string
  description: string
  path: string
  image?: string
  datePublished: string
  dateModified: string
  author?: string
  category: string
  articleSection?: string
  keywords?: string[]
  wordCount: number
  readingTime: number
  inLanguage?: string
}

function resolveUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

function resolveImageUrl(image: string | undefined): string {
  if (!image) return `${SITE_URL}/og-image.jpg`
  if (image.startsWith("http")) return image
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const url = resolveUrl(input.path)
  const imageUrl = resolveImageUrl(input.image)
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: input.title,
    description: input.description,
    image: [imageUrl],
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: {
      "@type": "Organization",
      name: input.author ?? "FitFeky Editorial Team",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "FitFeky",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    wordCount: input.wordCount,
    timeRequired: toIsoDuration(input.readingTime),
    articleSection: input.articleSection ?? input.category,
    inLanguage: input.inLanguage ?? "en-US",
    ...(input.keywords?.length ? { keywords: input.keywords.join(", ") } : {}),
  }
}

export function buildFaqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faqpage`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  }
}

export function toIsoDuration(minutes: number): string {
  if (minutes < 1) return "PT1M"
  if (minutes < 60) return `PT${Math.round(minutes)}M`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `PT${h}H${m}M` : `PT${h}H`
}

export function stripMdx(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^>+\s*/gm, "")
    .replace(/^[-+*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^[#*~_`]+/gm, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function calculateWordCount(content: string): number {
  const text = stripMdx(content)
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

export function calculateReadingTime(content: string): number {
  return Math.max(1, Math.round(calculateWordCount(content) / WORDS_PER_MINUTE))
}

export function extractFaqs(mdx: string): FAQ[] {
  const faqs: FAQ[] = []
  const lines = mdx.split(/\r?\n/)

  let inFaqSection = false
  let currentQuestion: string | null = null
  let currentAnswer: string[] = []

  const flush = () => {
    if (currentQuestion && currentAnswer.length > 0) {
      const answer = stripMdx(currentAnswer.join("\n")).trim()
      if (answer) {
        faqs.push({ question: currentQuestion, answer })
      }
    }
    currentQuestion = null
    currentAnswer = []
  }

  for (const line of lines) {
    if (line.startsWith("```")) continue

    const h2 = line.match(/^##\s+(.+)$/)
    if (h2) {
      flush()
      inFaqSection = /^(faq|frequently\s+asked(\s+questions)?|common\s+questions|q\s*&\s*a|questions\s*&\s*answers)/i.test(
        h2[1].trim(),
      )
      continue
    }

    if (!inFaqSection) continue

    const h3 = line.match(/^###\s+(.+)$/)
    if (h3) {
      flush()
      currentQuestion = h3[1].trim()
      continue
    }

    if (currentQuestion) {
      const trimmed = line.trim()
      if (trimmed) currentAnswer.push(trimmed)
    }
  }

  flush()
  return faqs
}

export function extractHeadings(mdx: string): { id: string; text: string; level: 2 | 3 }[] {
  const headings: { id: string; text: string; level: 2 | 3 }[] = []
  const seen = new Map<string, number>()
  const lines = mdx.split(/\r?\n/)

  let inCodeBlock = false
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(##|###)\s+(.+)$/)
    if (!match) continue

    const level = (match[1].length === 2 ? 2 : 3) as 2 | 3
    const text = match[2].replace(/[*_`]/g, "").trim()
    let id = slugify(text)
    const count = seen.get(id) ?? 0
    seen.set(id, count + 1)
    if (count > 0) id = `${id}-${count}`

    headings.push({ id, text, level })
  }
  return headings
}
