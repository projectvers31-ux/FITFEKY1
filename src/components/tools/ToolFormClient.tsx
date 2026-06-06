"use client"

import dynamic from "next/dynamic"

import type { Tool } from "@/data/tools"

const ToolForm = dynamic(() => import("./ToolForm").then((m) => m.ToolForm), {
  ssr: false,
  loading: () => (
    <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 sm:p-8">
      <div className="h-8 w-1/2 animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
      <div className="h-12 w-full animate-pulse rounded-md bg-muted" />
    </div>
  ),
})

export function ToolFormClient({ tool }: { tool: Tool }) {
  return <ToolForm tool={tool} />
}
