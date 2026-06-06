import { NextResponse } from "next/server"

import fs from "node:fs/promises"
import path from "node:path"

export const dynamic = "force-dynamic"

const LOG_FILE = path.join(process.cwd(), "logs", "clicks.jsonl")

interface ClickEvent {
  productId: string
  page: string
  timestamp: string
  userAgent?: string
}

function isValid(body: unknown): body is { productId: string; page: string } {
  if (!body || typeof body !== "object") return false
  const b = body as Record<string, unknown>
  return (
    typeof b.productId === "string" &&
    b.productId.length > 0 &&
    b.productId.length < 200 &&
    typeof b.page === "string" &&
    b.page.length > 0 &&
    b.page.length < 500
  )
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (!isValid(body)) {
    return NextResponse.json(
      { error: "Missing or invalid 'productId' or 'page'" },
      { status: 400 },
    )
  }

  const event: ClickEvent = {
    productId: body.productId,
    page: body.page,
    timestamp: new Date().toISOString(),
  }

  const ua = req.headers.get("user-agent")
  if (ua && ua.length < 300) event.userAgent = ua

  const line = JSON.stringify(event) + "\n"

  try {
    await fs.mkdir(path.dirname(LOG_FILE), { recursive: true })
    await fs.appendFile(LOG_FILE, line, "utf8")
  } catch (err) {
    // eslint-disable-next-line no-console -- operational error must be visible
    console.error("[track-click] failed to write log", err)
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    )
  }

  return NextResponse.json({ success: true })
}
