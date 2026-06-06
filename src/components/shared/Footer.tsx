import Image from "next/image"
import Link from "next/link"

import { Instagram, Twitter, Youtube, Send, Heart, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories } from "@/data/categories"
import { tools } from "@/data/tools"

const POPULAR_TOOLS = tools.slice(0, 5)
const FEATURED_CATEGORIES = categories.slice(0, 4)

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-border/60 bg-gradient-to-b from-background via-cream/30 to-rose-soft/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold"
              aria-label="FitFeky home"
            >
              <Image
                src="/logo.svg"
                alt="FitFeky"
                width={140}
                height={28}
                quality={100}
                unoptimized
                className="h-7 w-auto text-primary dark:invert"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Science-backed calculators, a personal style quiz, and editor-tested
              product picks — built for women who want lasting results, not
              crash diets.
            </p>

            <form
              className="mt-6 max-w-sm"
              action="/api/newsletter"
              method="post"
              aria-label="Newsletter signup"
            >
              <label
                htmlFor="newsletter-email"
                className="text-sm font-semibold"
              >
                Get our free 7-day kickstart
              </label>
              <p className="mt-1 text-xs text-muted-foreground">
                One email a week. Real women, real results. No spam, ever.
              </p>
              <div className="mt-3 flex gap-2">
                <Input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="h-11 rounded-full bg-background/80"
                />
                <Button
                  type="submit"
                  className="h-11 shrink-0 rounded-full px-5 shadow-sm"
                >
                  <Send className="size-4" /> Join
                </Button>
              </div>
            </form>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/fitfeky" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com/fitfeky" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@fitfeky" },
              ].map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-3 text-sm font-semibold">Free Tools</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {POPULAR_TOOLS.map((tool) => (
                  <li key={tool.id}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {tool.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">For Women</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {FEATURED_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/category/${cat.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/quiz"
                    className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                  >
                    <Sparkles className="size-3.5" /> Style Quiz
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-primary"
                  >
                    Blog & Guides
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors hover:text-primary"
                  >
                    About FitFeky
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-primary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="transition-colors hover:text-primary"
                  >
                    Shop Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="transition-colors hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="transition-colors hover:text-primary"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border/60 bg-background/60 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3 text-xs text-muted-foreground">
            <Heart className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="leading-relaxed">
              <strong className="font-semibold text-foreground">
                Affiliate Disclosure:
              </strong>{" "}
              Some links on this site are Amazon affiliate links. We earn a small
              commission at no extra cost to you. We only recommend products
              we&apos;d actually use ourselves.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} FitFeky. Made with care for women.</p>
          <p className="flex items-center gap-1.5">
            This site is not medical advice. Always consult a qualified
            professional.
          </p>
        </div>
      </div>
    </footer>
  )
}
