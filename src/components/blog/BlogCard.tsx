import Image from "next/image"
import Link from "next/link"

import { Clock, ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"
import { cn } from "@/lib/utils"

export interface BlogCardProps {
  post: {
    title: string
    slug: string
    excerpt?: string
    description?: string
    image?: string
    cover?: string
    category?: string
    readTime?: number
    date?: string
  }
  href?: string
  className?: string
}

export function BlogCard({ post, href, className }: BlogCardProps) {
  const cover = post.image ?? post.cover
  const excerpt = post.excerpt ?? post.description ?? ""
  const date = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null
  const linkHref = href ?? (post.slug.startsWith("/") ? post.slug : `/blog/${post.slug}`)

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl",
        className,
      )}
    >
      <Link
        href={linkHref}
        className="flex h-full flex-col"
        aria-label={post.title}
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              quality={70}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URLS[cover.replace(/\.(jpe?g|png|webp|avif)$/i, "")]}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-rose-soft via-cream to-primary/10" />
          )}
          {post.category && (
            <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-card/95 px-2.5 py-0.5 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
              {post.category}
            </span>
          )}
          <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-card/95 text-foreground opacity-0 shadow-sm backdrop-blur transition-opacity group-hover:opacity-100">
            <ArrowUpRight className="size-4" />
          </span>
        </div>
        <CardContent className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {post.readTime} min read
              </span>
            )}
            {date && <span>{date}</span>}
          </div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
            {post.title}
          </h3>
          {excerpt && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Link>
    </Card>
  )
}
