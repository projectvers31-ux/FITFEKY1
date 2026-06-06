import { MDXRemote } from "next-mdx-remote/rsc"
import fs from "node:fs/promises"
import path from "node:path"

import { buildMetadata } from "@/lib/seo"

const CONTENT_PATH = path.join(process.cwd(), "src", "app", "privacy", "privacy.mdx")

export const metadata = buildMetadata({
  title: "Privacy Notice — How We Handle Your Data",
  description:
    "Plain-English overview of what data FitFeky collects, how we use it, and the controls you have. Calculators run entirely in your browser — nothing is sent to our servers.",
  path: "/privacy",
  keywords: [
    "FitFeky privacy",
    "data handling",
    "calculator privacy",
    "no tracking",
    "browser-only calculations",
  ],
  imageAlt: "FitFeky privacy notice",
})

const mdxComponents = {
  // The page renders its own <h1>; demote MDX `#` headings to <h2> for hierarchy.
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 text-2xl font-bold tracking-tight first:mt-0"
      {...props}
    />
  ),
}

export default async function PrivacyPage() {
  const source = await fs.readFile(CONTENT_PATH, "utf8")
  const stripped = source.replace(/^#\s+.+$\r?\n/m, "").replace(/^#\s+.+\r?\n/m, "")
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 lg:pt-44 lg:pb-32">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Notice</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <article className="prose prose-lg dark:prose-invert mt-8">
        <MDXRemote source={stripped} components={mdxComponents} />
      </article>
    </section>
  )
}
