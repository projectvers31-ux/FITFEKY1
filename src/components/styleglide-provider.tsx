"use client"

import dynamic from "next/dynamic"

const KitViewProvider = dynamic(
  () => import("@styleglide/kit-view-provider").then((m) => m.KitViewProvider),
  { ssr: false },
)

export function StyleGlideProvider() {
  if (process.env.NODE_ENV === "production") return null
  return <KitViewProvider />
}
