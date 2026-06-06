"use client"

import dynamic from "next/dynamic"

const TableOfContents = dynamic(
  () => import("./TableOfContents").then((m) => m.TableOfContents),
  { ssr: false },
)

export function TableOfContentsClient({
  mdx,
  className,
}: {
  mdx: string
  className?: string
}) {
  return <TableOfContents mdx={mdx} className={className} />
}
