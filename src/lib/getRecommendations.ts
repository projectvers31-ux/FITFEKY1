import { products, type Product } from "@/data/products"
import { tools } from "@/data/tools"

export function getProducts(tool: string, category: string): Product[] {
  const toolData = tools.find((t) => t.slug === tool)
  const validCategories = toolData?.categories ?? []

  const matches = products.filter((product) => {
    const goalMatch = product.goals.includes(category)
    const categoryMatch = product.category === category
    const toolCategoryMatch = validCategories.includes(product.category)
    return goalMatch || categoryMatch || toolCategoryMatch
  })

  return matches.slice(0, 4)
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByIds(ids: string[]): Product[] {
  return ids
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
}
