import fs from "node:fs/promises"
import path from "node:path"

import { tools } from "@/data/tools"

export interface ToolPostFrontmatter {
  title: string
  slug: string
  date: string
  modifiedTime?: string
  category: string
  description?: string
  draft: boolean
  cover?: string
  tool: string
  author?: string
  readingTime?: number
  keywords?: string[]
}

export interface ToolPost extends ToolPostFrontmatter {
  content: string
  toolSlug: string
}

const CONTENT_ROOT = path.join(process.cwd(), "content", "tools")
const VALID_TOOL_IDS = new Set(tools.map((t) => t.id))

function parseFrontmatter(raw: string): {
  data: Partial<ToolPostFrontmatter>
  content: string
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const [, yamlBlock, body] = match
  const data: Record<string, unknown> = {}

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue

    const colonIdx = trimmed.indexOf(":")
    if (colonIdx === -1) continue

    const key = trimmed.slice(0, colonIdx).trim()
    let value: unknown = trimmed.slice(colonIdx + 1).trim()

    if (value === "true") value = true
    else if (value === "false") value = false
    else if (/^["'].*["']$/.test(value as string)) {
      value = (value as string).slice(1, -1)
    }

    data[key] = value
  }

  return { data: data as Partial<ToolPostFrontmatter>, content: body }
}

function fileToPost(
  toolSlug: string,
  fileName: string,
  raw: string,
): ToolPost | null {
  const { data, content } = parseFrontmatter(raw)
  const slug = data.slug ?? fileName.replace(/\.mdx?$/, "")

  const declaredTool = (data.tool ?? toolSlug).toString()
  if (!VALID_TOOL_IDS.has(declaredTool)) return null
  if (declaredTool !== toolSlug) return null
  if (data.draft) return null

  return {
    title: data.title ?? slug,
    slug,
    date: data.date ?? new Date(0).toISOString(),
    modifiedTime: data.modifiedTime,
    category: data.category ?? "general",
    description: data.description,
    draft: data.draft ?? false,
    cover: data.cover,
    tool: declaredTool,
    toolSlug,
    author: data.author,
    readingTime: data.readingTime,
    keywords: data.keywords,
    content,
  }
}

async function readPostFile(
  toolSlug: string,
  fileName: string,
): Promise<ToolPost | null> {
  const filePath = path.join(CONTENT_ROOT, toolSlug, fileName)
  try {
    const raw = await fs.readFile(filePath, "utf8")
    return fileToPost(toolSlug, fileName, raw)
  } catch {
    return null
  }
}

export async function getToolPosts(toolSlug: string): Promise<ToolPost[]> {
  if (!VALID_TOOL_IDS.has(toolSlug)) return []
  const toolDir = path.join(CONTENT_ROOT, toolSlug)
  let entries: string[] = []
  try {
    entries = await fs.readdir(toolDir)
  } catch {
    return []
  }

  const mdxFiles = entries.filter((f) => /\.mdx?$/.test(f))
  const posts = (
    await Promise.all(mdxFiles.map((f) => readPostFile(toolSlug, f)))
  ).filter((p): p is ToolPost => p !== null)

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

export async function getAllToolPosts(): Promise<ToolPost[]> {
  const results = await Promise.all(
    tools.map((t) => getToolPosts(t.id)),
  )
  return results
    .flat()
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
}

export async function getToolPost(
  toolSlug: string,
  slug: string,
): Promise<ToolPost | null> {
  if (!VALID_TOOL_IDS.has(toolSlug)) return null
  const candidates = [slug, `${slug}.mdx`, `${slug}.md`]

  for (const name of candidates) {
    const post = await readPostFile(toolSlug, name)
    if (post) return post
  }
  return null
}

export async function getRelatedToolPosts(
  toolSlug: string,
  currentSlug: string,
  limit = 3,
): Promise<ToolPost[]> {
  const all = await getToolPosts(toolSlug)
  return all.filter((p) => p.slug !== currentSlug).slice(0, limit)
}
