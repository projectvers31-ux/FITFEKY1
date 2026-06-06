import type { MetadataRoute } from "next"

import { archetypes } from "@/data/archetypes"
import { categories } from "@/data/categories"
import { products } from "@/data/products"
import { tools } from "@/data/tools"
import { getAllPosts } from "@/lib/mdx"
import { getAllToolPosts } from "@/lib/mdx-tools"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fitfeky.com"

const now = new Date()

function pairToolCategoryResults(): { tool: string; category: string }[] {
  const pairs: { tool: string; category: string }[] = []
  for (const tool of tools) {
    for (const cat of tool.categories) pairs.push({ tool: tool.slug, category: cat })
    for (const cat of categories) {
      if (!tool.categories.includes(cat.slug)) {
        pairs.push({ tool: tool.slug, category: cat.slug })
      }
    }
  }
  return pairs
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, allToolPosts] = await Promise.all([
    getAllPosts(),
    getAllToolPosts(),
  ])

  // Defense in depth: getAllPosts/getAllToolPosts already filter drafts at the source,
  // but we re-check here so any future caller that bypasses those helpers stays safe.
  const publishedPosts = posts.filter((p) => !p.draft)
  const publishedToolPosts = allToolPosts.filter((p) => !p.draft)

  const latestPostDate = publishedPosts.reduce<string | null>((acc, p) => {
    if (!acc) return p.date
    return new Date(p.date) > new Date(acc) ? p.date : acc
  }, null)

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/quiz`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: latestPostDate ? new Date(latestPostDate) : now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/category`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ]

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const toolBlogListings: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${SITE_URL}/tools/${tool.slug}/blog`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const toolBlogPosts: MetadataRoute.Sitemap = publishedToolPosts.map((p) => ({
    url: `${SITE_URL}/tools/${p.toolSlug}/blog/${p.slug}`,
    lastModified: new Date(p.modifiedTime ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const toolResultPages: MetadataRoute.Sitemap = pairToolCategoryResults().map(
    ({ tool, category }) => ({
      url: `${SITE_URL}/tools/${tool}/result/${category}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  )

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }))

  const archetypePages: MetadataRoute.Sitemap = archetypes.map((archetype) => ({
    url: `${SITE_URL}/quiz/result/${archetype.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }))

  const postsByCategory = new Map<string, string>()
  for (const p of publishedPosts) {
    const prev = postsByCategory.get(p.category)
    if (!prev || new Date(p.date) > new Date(prev)) {
      postsByCategory.set(p.category, p.date)
    }
  }
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${SITE_URL}/category/${cat.slug}`,
    lastModified: postsByCategory.get(cat.slug)
      ? new Date(postsByCategory.get(cat.slug) as string)
      : now,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedTime ?? post.date),
    changeFrequency: "monthly",
    priority: 0.65,
  }))

  return [
    ...staticPages,
    ...toolPages,
    ...toolBlogListings,
    ...toolBlogPosts,
    ...toolResultPages,
    ...productPages,
    ...archetypePages,
    ...categoryPages,
    ...blogPages,
  ]
}
