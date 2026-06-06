import { Check, X as XIcon, Award, BadgeCheck, Clock } from "lucide-react"

import { cn } from "@/lib/utils"

interface EditorReviewProps {
  editor: {
    name: string
    credentials: string
    initials: string
  }
  rating: number
  testedFor: string
  pros: string[]
  cons: string[]
  verdict: string
  inDepth: string[]
  className?: string
}

export function EditorReview({
  editor,
  rating,
  testedFor,
  pros,
  cons,
  verdict,
  inDepth,
  className,
}: EditorReviewProps) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-primary/20 bg-gradient-to-br from-rose-soft/40 via-card to-cream/30 p-6 sm:p-8",
        className,
      )}
    >
      <header className="flex flex-wrap items-start gap-5">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-gold text-xl font-bold text-primary-foreground shadow-md">
          {editor.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <Award className="size-3" /> Editor&apos;s Review
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 text-xs font-semibold text-success">
              <BadgeCheck className="size-3" /> Verified
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {editor.name}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              {editor.credentials}
            </span>
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" /> Tested for {testedFor}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              Independent · No paid placement
            </span>
          </div>
        </div>

        <div className="text-center">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold leading-none tracking-tight">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">/ 5</span>
          </div>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
            Editor rating
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-success">
            <Check className="size-4" /> What we love
          </h3>
          <ul className="mt-3 space-y-2">
            {pros.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm leading-relaxed"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border/60 bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <XIcon className="size-4" /> Worth knowing
          </h3>
          <ul className="mt-3 space-y-2">
            {cons.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          The verdict
        </h3>
        <blockquote className="mt-3 rounded-xl border-l-4 border-primary bg-card p-5 text-lg leading-relaxed text-foreground/90">
          {verdict}
        </blockquote>
      </div>

      <div className="mt-8 space-y-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          What we tested
        </h3>
        {inDepth.map((para, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-foreground/90"
          >
            {para}
          </p>
        ))}
      </div>
    </article>
  )
}
