import fs from "node:fs/promises"
import path from "node:path"

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  modifiedTime?: string
  category: string
  description?: string
  draft: boolean
  cover?: string
  keywords?: string[]
}

export interface Post extends PostFrontmatter {
  content: string
}

const CONTENT_DIR = path.join(process.cwd(), "content", "blog")

function parseFrontmatter(raw: string): { data: Partial<PostFrontmatter>; content: string } {
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

  return { data: data as Partial<PostFrontmatter>, content: body }
}

function fileToPost(fileName: string, raw: string): Post {
  const { data, content } = parseFrontmatter(raw)
  const slug = data.slug ?? fileName.replace(/\.mdx?$/, "")

  return {
    title: data.title ?? slug,
    slug,
    date: data.date ?? new Date(0).toISOString(),
    modifiedTime: data.modifiedTime,
    category: data.category ?? "general",
    description: data.description,
    draft: data.draft ?? false,
    cover: data.cover,
    keywords: data.keywords,
    content,
  }
}

async function readPostFile(fileName: string): Promise<Post> {
  const filePath = path.join(CONTENT_DIR, fileName)
  const raw = await fs.readFile(filePath, "utf8")
  return fileToPost(fileName, raw)
}

export async function getAllPosts(): Promise<Post[]> {
  let entries: string[] = []
  try {
    entries = await fs.readdir(CONTENT_DIR)
  } catch {
    return []
  }

  const mdxFiles = entries.filter((f) => /\.mdx?$/.test(f))
  const posts = await Promise.all(mdxFiles.map((f) => readPostFile(f)))

  return posts
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const candidates = [slug, `${slug}.mdx`, `${slug}.md`]
  for (const name of candidates) {
    const filePath = path.join(CONTENT_DIR, name)
    try {
      const raw = await fs.readFile(filePath, "utf8")
      const post = fileToPost(name, raw)
      if (post.draft) return null
      return post
    } catch {
      continue
    }
  }
  return null
}

export async function getRelatedPosts(category: string, slug: string, limit = 3): Promise<Post[]> {
  const all = await getAllPosts()
  return all.filter((p) => p.category === category && p.slug !== slug).slice(0, limit)
}
