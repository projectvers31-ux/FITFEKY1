"use client"

import dynamic from "next/dynamic"

import type { Tool } from "@/data/tools"

const ToolForm = dynamic(() => import("./ToolForm").then((m) => m.ToolForm), {
  ssr: false,
  loading: () => (
    <div className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 sm:p-8" role="status" aria-label="Loading calculator form">
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
        <div className="h-7 w-28 animate-pulse rounded-full bg-muted" />
      </div>
      <div className="space-y-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3.5 w-16 animate-pulse rounded-md bg-muted" />
            <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        ))}
      </div>
      <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
      <span className="sr-only">Loading calculator...</span>
    </div>
  ),
})

export function ToolFormClient({ tool }: { tool: Tool }) {
  return <ToolForm tool={tool} />
}
