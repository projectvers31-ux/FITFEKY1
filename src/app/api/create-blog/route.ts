import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import fs from "node:fs/promises"
import path from "node:path"

import { getAllPosts } from "@/lib/mdx"

export const dynamic = "force-dynamic"

const RATE_LIMIT = 10
const WINDOW_MS = 60 * 60 * 1000
const hits = new Map<string, number[]>()

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return req.headers.get("x-real-ip") ?? "anonymous"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > RATE_LIMIT
}

function isAuthorized(req: Request): boolean {
  const expected = process.env.API_SECRET
  if (!expected) return false
  const provided = req.headers.get("x-api-secret")
  return provided === expected
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

function escapeYaml(value: string): string {
  if (/[":#]/.test(value) || value !== value.trim()) {
    return `"${value.replace(/"/g, '\\"')}"`
  }
  return value
}

function buildFrontmatter(data: Record<string, string | boolean>): string {
  return [
    "---",
    ...Object.entries(data).map(([k, v]) => `${k}: ${typeof v === "boolean" ? v : escapeYaml(v)}`),
    "---",
    "",
  ].join("\n")
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const ip = getClientIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Max 10 requests per hour." },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Body must be an object" }, { status: 400 })
  }

  const data = body as Record<string, unknown>
  const { title, content, category, description, cover, draft = false } = data

  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "Missing 'title'" }, { status: 400 })
  }
  if (typeof content !== "string" || !content.trim()) {
    return NextResponse.json({ error: "Missing 'content'" }, { status: 400 })
  }

  const slug = slugify(typeof data.slug === "string" ? data.slug : title)
  const date = new Date().toISOString().slice(0, 10)

  const frontmatter = buildFrontmatter({
    title: title.trim(),
    slug,
    date,
    category: typeof category === "string" ? category : "general",
    description: typeof description === "string" ? description : "",
    ...(typeof cover === "string" ? { cover } : {}),
    draft: Boolean(draft),
  })

  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${frontmatter}${content}\n`, "utf8")

  revalidatePath("/blog")
  revalidatePath(`/blog/${slug}`)
  revalidatePath("/sitemap.xml")
  revalidatePath("/")

  const existing = await getAllPosts()
  const wasUpdate = existing.some((p) => p.slug === slug)

  return NextResponse.json({
    success: true,
    url: `/blog/${slug}`,
    slug,
    action: wasUpdate ? "updated" : "created",
  })
}
