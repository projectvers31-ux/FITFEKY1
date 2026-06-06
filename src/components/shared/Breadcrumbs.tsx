import Link from "next/link"

import { ChevronRight, Home } from "lucide-react"

import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [{ label: "Home", href: "/" }, ...items]

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "text-muted-foreground flex items-center gap-1 text-xs sm:text-sm",
        className,
      )}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {fullItems.map((item, i) => {
          const isLast = i === fullItems.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1 transition-colors hover:text-foreground"
                >
                  {i === 0 && <Home className="size-3.5" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1 truncate",
                    isLast && "font-medium text-foreground",
                  )}
                >
                  {i === 0 && <Home className="size-3.5" />}
                  <span className="truncate">{item.label}</span>
                </span>
              )}
              {!isLast && (
                <ChevronRight className="text-muted-foreground/60 size-3.5 shrink-0" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
