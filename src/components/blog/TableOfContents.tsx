"use client"

import * as React from "react"

import { List } from "lucide-react"

import { slugify } from "@/lib/slugify"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

function extractHeadings(mdx: string): Heading[] {
  const headings: Heading[] = []
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

interface TableOfContentsProps {
  mdx: string
  className?: string
}

export function TableOfContents({ mdx, className }: TableOfContentsProps) {
  const headings = React.useMemo(() => extractHeadings(mdx), [mdx])
  const [activeId, setActiveId] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav
      aria-label="Table of contents"
      className={cn(
        "hidden md:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg border border-border bg-card p-4 text-sm",
        className,
      )}
    >
      <h2 className="mb-3 flex items-center gap-2 font-semibold">
        <List className="size-4" />
        On this page
      </h2>
      <ul className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block text-muted-foreground transition-colors hover:text-foreground",
                activeId === h.id && "font-medium text-primary",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export { extractHeadings }
