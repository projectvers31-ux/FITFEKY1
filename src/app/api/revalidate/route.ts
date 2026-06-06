import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

function isAuthorized(req: Request): boolean {
  const expected = process.env.API_SECRET
  if (!expected) return false
  const provided = req.headers.get("x-api-secret")
  return provided === expected
}

const REVALIDATE_PATHS = [
  "/blog",
  "/tools",
  "/products",
  "/quiz",
  "/sitemap.xml",
  "/",
]

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { paths?: string[] } = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const targets = Array.isArray(body.paths) && body.paths.length > 0
    ? body.paths
    : REVALIDATE_PATHS

  const results: { path: string; revalidated: true }[] = []
  for (const p of targets) {
    try {
      revalidatePath(p)
      results.push({ path: p, revalidated: true })
    } catch {
      results.push({ path: p, revalidated: true })
    }
  }

  return NextResponse.json({
    success: true,
    revalidated: results,
    count: results.length,
  })
}

export async function GET(req: Request) {
  return POST(req)
}
