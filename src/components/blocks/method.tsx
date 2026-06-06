import Link from "next/link"

import { ArrowRight, Sparkles, ClipboardList, Sparkle, HeartHandshake } from "lucide-react"

import { Button } from "@/components/ui/button"

const STEPS = [
  {
    n: "01",
    title: "Tell us your story",
    body: "Take a 60-sec quiz covering your goal, life stage, and what's worked (and hasn't).",
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "Get your numbers",
    body: "Use our free calculators to lock in your daily calories, macros, and fat-burn zone.",
    icon: Sparkle,
  },
  {
    n: "03",
    title: "Follow your plan",
    body: "Read editor-tested guides and shop only what we'd actually use ourselves.",
    icon: HeartHandshake,
  },
]

export function HowItWorksSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-cream/50 via-background to-background py-20 lg:py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" /> How FitFeky works
          </span>
          <h2
            id="how-it-works-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            Three steps. No guesswork.
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            We built FitFeky around what women actually search for at 11 p.m.:
            &ldquo;why isn&apos;t this working for me?&rdquo;
          </p>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent md:block"
          />
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.n}
                className="group relative rounded-2xl border border-border/60 bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold tracking-widest text-primary/70">
                    STEP {s.n}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-soft to-cream text-primary transition-transform group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-7 shadow-md">
            <Link href="/quiz">
              Start with the quiz
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full"
          >
            <Link href="/tools/bmi">Or try a calculator</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
