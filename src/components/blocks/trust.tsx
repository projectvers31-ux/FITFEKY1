import Link from "next/link"

import { ArrowRight, Sparkles, Heart, ShieldCheck, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

const PROMISES = [
  {
    icon: Heart,
    title: "Built for women's bodies",
    body: "Hormones, cycles, life stages — every calculator and guide factors them in.",
  },
  {
    icon: ShieldCheck,
    title: "Reviewed by experts",
    body: "Medical advisor on the team. We cite our sources and explain the why.",
  },
  {
    icon: Sparkles,
    title: "Never pushy",
    body: "No upsells, no fake countdowns, no &lsquo;buy now or miss out&rsquo;. Just honest help.",
  },
]

export function TrustSection() {
  return (
    <section
      className="container mx-auto px-4 py-20 lg:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Heart className="size-3" /> Why women trust FitFeky
          </span>
          <h2
            id="trust-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl"
          >
            We&apos;re on your team — not on a commission.
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Most &ldquo;fitness&rdquo; sites are sales funnels in disguise.
            FitFeky was built by women tired of the noise. If a product
            isn&apos;t worth it, we say so — even when it costs us the
            commission.
          </p>

          <ul className="mt-8 space-y-5">
            {PROMISES.map((p) => {
              const Icon = p.icon
              return (
                <li key={p.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{p.title}</h3>
                    <p
                      className="mt-1 text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-rose-soft to-cream" />
          <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-xl">
            <Mail className="size-7 text-primary" />
            <h3 className="mt-5 text-2xl font-bold tracking-tight">
              Get our free 7-day kickstart
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              A women-focused reset: simple daily plan, one shopping list, and
              the only 3 habits you actually need to start. No paywall.
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                "Day-by-day meal framework",
                "Beginner-friendly 25-min workouts",
                "Hormone-aware grocery list",
                "The 3 habits that actually move the scale",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <form
              className="mt-6 flex flex-col gap-2 sm:flex-row"
              action="/api/newsletter"
              method="post"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                aria-label="Email address"
                className="h-11 flex-1 rounded-full border border-border/60 bg-background px-4 text-sm ring-focus placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                size="lg"
                className="h-11 rounded-full px-6 shadow-sm"
              >
                Send it free
                <ArrowRight className="size-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              One email. Unsubscribe anytime.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Link
                href="/about"
                className="underline-offset-4 hover:underline"
              >
                Read our editorial standards
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
