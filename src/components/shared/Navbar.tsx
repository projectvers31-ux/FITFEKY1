"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  Calculator,
  ChevronDown,
  Heart,
  Menu,
  Pill,
  Salad,
  Sparkles,
  Target,
  Trophy,
  X,
  type LucideIcon,
} from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { tools } from "@/data/tools"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  description?: string
  icon?: LucideIcon
}

type NavGroup = {
  label: string
  href?: string
  items?: NavItem[]
  columns?: { heading: string; items: NavItem[] }[]
  featured?: {
    title: string
    description: string
    href: string
    image?: string
    icon?: LucideIcon
  }
}

const TOOLS_BY_ID = Object.fromEntries(tools.map((t) => [t.id, t])) as Record<
  string,
  (typeof tools)[number]
>

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Calculators",
    columns: [
      {
        heading: "Start here",
        items: [
          {
            label: TOOLS_BY_ID.bmi?.name ?? "BMI Calculator",
            href: "/tools/bmi",
            description: "Quick weight range check",
            icon: Calculator,
          },
          {
            label: TOOLS_BY_ID.calorie?.name ?? "Calorie Calculator",
            href: "/tools/calorie",
            description: "Daily target for your goal",
            icon: Target,
          },
          {
            label: TOOLS_BY_ID.macro?.name ?? "Macro Calculator",
            href: "/tools/macro",
            description: "Protein, carbs, fat split",
            icon: Salad,
          },
        ],
      },
      {
        heading: "Train smarter",
        items: [
          {
            label: TOOLS_BY_ID["heart-rate"]?.name ?? "Heart Rate Zones",
            href: "/tools/heart-rate",
            description: "Fat-burn & cardio zones",
            icon: Heart,
          },
          {
            label: TOOLS_BY_ID["body-fat"]?.name ?? "Body Fat Calculator",
            href: "/tools/body-fat",
            description: "Estimate with US Navy method",
            icon: Trophy,
          },
        ],
      },
    ],
    featured: {
      title: "Take the 60-sec Quiz",
      description: "Find your weight-loss style",
      href: "/quiz",
      icon: Sparkles,
    },
  },
  {
    label: "Weight Loss",
    columns: [
      {
        heading: "By goal",
        items: [
          {
            label: "Hormone-Balanced Fat Loss",
            href: "/category/weight-loss",
            description: "For 30s, 40s, 50+",
            icon: Heart,
          },
          {
            label: "Postpartum Recovery",
            href: "/category/weight-loss?goal=postpartum",
            description: "Gentle, sustainable plan",
            icon: Sparkles,
          },
          {
            label: "Stubborn Belly Fat",
            href: "/blog?category=weight-loss",
            description: "What actually works",
            icon: Target,
          },
        ],
      },
      {
        heading: "By method",
        items: [
          {
            label: "Strength Training for Women",
            href: "/category/strength",
            description: "Build lean, strong muscle",
            icon: Trophy,
          },
          {
            label: "Macros & Nutrition",
            href: "/blog?category=nutrition",
            description: "Eat to lose, not starve",
            icon: Salad,
          },
          {
            label: "Supplements, Reviewed",
            href: "/products",
            description: "Only what earns its place",
            icon: Pill,
          },
        ],
      },
    ],
  },
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Quiz",
    href: "/quiz",
  },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }

  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-rose-soft/30 to-transparent" />
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4 lg:h-20"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="group flex items-center gap-2 font-bold"
          aria-label="FitFeky home"
        >
          <Image
            src="/logo.svg"
            alt="FitFeky"
            width={140}
            height={28}
            priority
            fetchPriority="low"
            quality={100}
            unoptimized
            className="h-7 w-auto text-primary dark:invert"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_GROUPS.map((group) => {
            const hasMenu = !!group.columns
            return (
              <li
                key={group.label}
                className="relative"
                onMouseEnter={() => hasMenu && handleEnter(group.label)}
                onMouseLeave={handleLeave}
              >
                {hasMenu ? (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                    aria-expanded={openMenu === group.label}
                    aria-haspopup="true"
                    onClick={() =>
                      setOpenMenu((prev) =>
                        prev === group.label ? null : group.label,
                      )
                    }
                    onFocus={() => handleEnter(group.label)}
                  >
                    {group.label}
                    <ChevronDown
                      className={cn(
                        "size-3.5 transition-transform",
                        openMenu === group.label && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={group.href ?? "#"}
                    className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {group.label}
                  </Link>
                )}

                {hasMenu && openMenu === group.label && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 animate-fade-up"
                    onMouseEnter={() => handleEnter(group.label)}
                    onMouseLeave={handleLeave}
                  >
                    <div className="rounded-2xl border border-border/60 bg-popover/95 p-4 shadow-xl backdrop-blur-xl">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                          {group.columns?.map((col) => (
                            <div key={col.heading}>
                              <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                {col.heading}
                              </h4>
                              <ul className="space-y-0.5">
                                {col.items.map((item) => {
                                  const Icon = item.icon
                                  return (
                                    <li key={item.label}>
                                      <Link
                                        href={item.href}
                                        className="group flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-rose-soft/50"
                      onClick={() => setOpenMenu(null)}
                                      >
                                        {Icon && (
                                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-rose-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                            <Icon className="size-4" />
                                          </span>
                                        )}
                                        <span>
                                          <span className="block text-sm font-medium">
                                            {item.label}
                                          </span>
                                          {item.description && (
                                            <span className="block text-xs text-muted-foreground">
                                              {item.description}
                                            </span>
                                          )}
                                        </span>
                                      </Link>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {group.featured && (
                          <Link
                            href={group.featured.href}
                            onClick={() => setOpenMenu(null)}
                            className="group relative flex flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-rose-soft to-cream p-5 transition-transform hover:-translate-y-0.5"
                          >
                            <div>
                              <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                                {group.featured.icon && (
                                  <group.featured.icon className="size-5" />
                                )}
                              </div>
                              <h5 className="font-display text-base font-semibold">
                                {group.featured.title}
                              </h5>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {group.featured.description}
                              </p>
                            </div>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                              Try it free →
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/quiz">Take the Quiz</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full shadow-sm">
            <Link href="/tools/bmi">Get Started Free</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden ring-focus"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border/60 bg-background/98 backdrop-blur-xl lg:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-4">
            {NAV_GROUPS.map((group) => {
              const hasMenu = !!group.columns
              if (!hasMenu) {
                return (
                  <Link
                    key={group.label}
                    href={group.href ?? "#"}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-rose-soft/50"
                  >
                    {group.label}
                  </Link>
                )
              }
              return (
                <details
                  key={group.label}
                  className="group rounded-lg border border-border/60"
                >
                  <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-base font-medium marker:hidden">
                    {group.label}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="space-y-3 px-2 pb-3">
                    {group.columns?.map((col) => (
                      <div key={col.heading}>
                        <h5 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {col.heading}
                        </h5>
                        <ul className="mt-1 space-y-0.5">
                          {col.items.map((item) => {
                            const Icon = item.icon
                            return (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-start gap-3 rounded-lg p-2 hover:bg-rose-soft/50"
                                >
                                  {Icon && (
                                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-rose-soft text-primary">
                                      <Icon className="size-4" />
                                    </span>
                                  )}
                                  <span>
                                    <span className="block text-sm font-medium">
                                      {item.label}
                                    </span>
                                    {item.description && (
                                      <span className="block text-xs text-muted-foreground">
                                        {item.description}
                                      </span>
                                    )}
                                  </span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    ))}
                    {group.featured && (
                      <Link
                        href={group.featured.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg bg-gradient-to-br from-primary/10 via-rose-soft to-cream p-3"
                      >
                        {group.featured.icon && (
                          <span className="flex size-9 items-center justify-center rounded-md bg-primary/15 text-primary">
                            <group.featured.icon className="size-4" />
                          </span>
                        )}
                        <span>
                          <span className="block text-sm font-semibold">
                            {group.featured.title}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {group.featured.description}
                          </span>
                        </span>
                      </Link>
                    )}
                  </div>
                </details>
              )
            })}

            <div className="mt-3 flex flex-col gap-2 border-t border-border/60 pt-4">
              <Button asChild variant="outline" className="w-full rounded-full">
                <Link href="/quiz" onClick={() => setMobileOpen(false)}>
                  Take the Quiz
                </Link>
              </Button>
              <Button asChild className="w-full rounded-full shadow-sm">
                <Link href="/tools/bmi" onClick={() => setMobileOpen(false)}>
                  Get Started Free
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
