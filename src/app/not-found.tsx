import Link from "next/link"

import { ArrowLeft, Home, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Page Not Found — FitFeky",
  description:
    "The page you're looking for doesn't exist. Explore FitFeky's free calculators, honest product reviews, and women's fitness blog.",
  path: "/404",
  keywords: ["404", "page not found", "FitFeky"],
  imageAlt: "Page not found — FitFeky",
  noindex: true,
})

export default function NotFound() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-soft-radial"
      />
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Search className="size-3" /> 404
          </span>
          <h1 className="mt-5 text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="gradient-text">Not found</span>
          </h1>
          <p className="mt-5 text-pretty text-lg text-muted-foreground">
            Sorry, we couldn&apos;t find that page. It may have been moved, or
            the link might be incorrect. Let&apos;s get you back on track.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="group h-12 rounded-full px-7 shadow-md">
              <Link href="/">
                <Home className="size-4" />
                Back to home
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full"
            >
              <Link href="/contact">
                <ArrowLeft className="size-4" /> Contact support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
