import { categories } from "@/data/categories"
import { products, type Product } from "@/data/products"
import { results } from "@/data/results"
import { tools, type Tool } from "@/data/tools"
import { getAllPosts, type Post } from "@/lib/mdx"
import { getAllToolPosts, type ToolPost } from "@/lib/mdx-tools"

function uniqBy<T>(arr: T[], key: (item: T) => string): T[] {
  const seen = new Set<string>()
  const out: T[] = []
  for (const item of arr) {
    const k = key(item)
    if (seen.has(k)) continue
    seen.add(k)
    out.push(item)
  }
  return out
}

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 4)
}

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0
  const sa = new Set(a)
  const sb = new Set(b)
  let inter = 0
  for (const t of sa) if (sb.has(t)) inter++
  const union = sa.size + sb.size - inter
  return union === 0 ? 0 : inter / union
}

export function getToolsForGoal(goal: string): Tool[] {
  return tools.filter((t) => t.categories.includes(goal))
}

export function getProductsForGoal(goal: string): Product[] {
  return products.filter(
    (p) => p.goals.includes(goal) || p.category === goal,
  )
}

export async function getRelatedBlogPostsForProduct(
  product: Product,
  limit = 3,
): Promise<Post[]> {
  const all = await getAllPosts()
  const ranked = all
    .map((post) => {
      const goalMatch = product.goals.includes(post.category) ? 2 : 0
      const catMatch = product.category === post.category ? 1 : 0
      const sim = jaccard(
        tokens(`${post.title} ${post.description ?? ""}`),
        tokens(`${product.name} ${product.benefits.join(" ")}`),
      )
      return { post, score: goalMatch + catMatch + sim }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return ranked.slice(0, limit).map((x) => x.post)
}

export function getRelatedToolsForProduct(
  product: Product,
  limit = 4,
): Tool[] {
  return tools
    .map((t) => ({
      tool: t,
      score: t.categories.filter(
        (c) => product.goals.includes(c) || product.category === c,
      ).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tool)
}

export function getRelatedProductsForProduct(
  product: Product,
  limit = 3,
): Product[] {
  return uniqBy(
    products.filter((p) => p.id !== product.id),
    (p) => p.id,
  )
    .map((p) => {
      const sharedGoals = p.goals.filter((g) => product.goals.includes(g))
        .length
      const sameCategory = p.category === product.category ? 1 : 0
      return { product: p, score: sharedGoals + sameCategory }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product)
}

export function getRelatedProductsForTool(
  toolId: string,
  limit = 4,
): Product[] {
  const curated = results
    .filter((r) => r.tool === toolId)
    .flatMap((r) => r.productIds)

  if (curated.length > 0) {
    return uniqBy(
      curated
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p)),
      (p) => p.id,
    ).slice(0, limit)
  }

  const tool = tools.find((t) => t.id === toolId)
  if (!tool) return []
  return products
    .map((p) => ({
      product: p,
      score: p.goals.filter((g) => tool.categories.includes(g)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.product)
}

export async function getRelatedArticlesForTool(
  toolId: string,
  limit = 3,
): Promise<ToolPost[]> {
  const all = await getAllToolPosts()
  const sameTool = all.filter((p) => p.tool === toolId)
  if (sameTool.length > 0) return sameTool.slice(0, limit)
  return all.slice(0, limit)
}

export async function getRelatedBlogPostsForBlogPost(
  post: Post,
  limit = 3,
): Promise<Post[]> {
  const all = await getAllPosts()
  const sameCategory = all.filter(
    (p) => p.category === post.category && p.slug !== post.slug,
  )
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit)

  const filler = all.filter(
    (p) => p.category !== post.category && p.slug !== post.slug,
  )
  return uniqBy([...sameCategory, ...filler], (p) => p.slug).slice(0, limit)
}

export function getRelatedToolsForBlogPost(
  post: Post,
  limit = 4,
): Tool[] {
  const category = categories.find((c) => c.slug === post.category)
  if (category) {
    const byCategory = category.toolIds
      .map((id) => tools.find((t) => t.id === id))
      .filter((t): t is Tool => Boolean(t))
    if (byCategory.length > 0) return byCategory.slice(0, limit)
  }

  const postTokens = tokens(`${post.title} ${post.description ?? ""}`)
  return tools
    .map((t) => ({
      tool: t,
      score: t.keywords
        .map((k) => k.toLowerCase())
        .filter((k) => postTokens.includes(k)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tool)
}

export function getRelatedProductsForBlogPost(
  post: Post,
  limit = 3,
): Product[] {
  return getProductsForGoal(post.category).slice(0, limit)
}

export async function getRelatedArticlesForToolResult(
  toolId: string,
  limit = 3,
): Promise<ToolPost[]> {
  return getRelatedArticlesForTool(toolId, limit)
}

export function getRelatedProductsForCategory(
  slug: string,
  limit = 4,
): Product[] {
  const category = categories.find((c) => c.slug === slug)
  if (!category) return []
  return uniqBy(
    category.relatedGoals.flatMap((g) => getProductsForGoal(g)),
    (p) => p.id,
  ).slice(0, limit)
}

export function getAllToolSlugs(): string[] {
  return tools.map((t) => t.slug)
}

export function getAllProductIds(): string[] {
  return products.map((p) => p.id)
}

const RESULT_CATEGORY_TO_BLOG_CATEGORY: Record<string, string[]> = {
  general: ["general-fitness", "weight-loss"],
  nutrition: ["weight-loss"],
  cardio: ["weight-loss", "endurance"],
  "weight-loss": ["weight-loss"],
  bulking: ["muscle-gain", "weight-loss"],
  cutting: ["weight-loss", "strength"],
  endurance: ["endurance"],
  "fat-loss": ["weight-loss"],
  strength: ["strength"],
  athlete: ["strength", "endurance"],
}

export async function getRelatedPostForResult(
  tool: string,
  category: string,
): Promise<{ title: string; slug: string } | null> {
  const all = await getAllPosts()
  const targets = RESULT_CATEGORY_TO_BLOG_CATEGORY[category] ?? []
  const matched = all.filter((p) => targets.includes(p.category))
  const pool = matched.length > 0 ? matched : all

  const toolWord = tool.toLowerCase()
  const scored = pool.map((p) => {
    const blob = `${p.title} ${p.description ?? ""}`.toLowerCase()
    return {
      post: p,
      score: blob.includes(toolWord) ? 2 : 1,
    }
  })
  scored.sort((a, b) => b.score - a.score)
  const top = scored[0]?.post
  if (!top) return null
  return { title: top.title, slug: top.slug }
}
