import Image from "next/image"
import Link from "next/link"

import {
  ArrowRight,
  Sparkles,
  Star,
  ShieldCheck,
  CheckCircle2,
  Heart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"

const STATS = [
  { value: "2.4M+", label: "Women trust us" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9★", label: "From 12k+ reviews" },
]

const TRUST = ["No sign-up", "100% free", "Medically reviewed"]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 bg-soft-radial" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-rose-soft/50 via-rose-soft/20 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -right-20 top-32 -z-10 size-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-20 bottom-0 -z-10 size-80 rounded-full bg-primary/15 blur-3xl"
      />

      <div className="container mx-auto px-4 pb-16 pt-12 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              <span>Built for women. Backed by science.</span>
            </div>

            <h1 className="mt-6 max-w-2xl text-balance text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
              Lose weight the way{" "}
              <span className="relative inline-block">
                <span className="gradient-text">your body</span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-2 left-0 h-3 w-full text-primary/40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <path d="M2 8 C 50 2, 150 2, 198 8" />
                </svg>
              </span>{" "}
              actually works.
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              A free, medically reviewed library of yoga flows, mindful
              movement, and women-focused weight loss guidance — built
              around the hormones, life stages, and goals most plans ignore.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full px-7 text-base shadow-md hover:shadow-lg"
              >
                <Link href="/quiz">
                  <Heart className="size-5" />
                  Find your style
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-primary/30 bg-background/60 px-7 text-base backdrop-blur hover:bg-rose-soft/40"
              >
                <Link href="/blog?category=weight-loss">
                  <Sparkles className="size-4" />
                  Read the journal
                </Link>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {TRUST.map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-success" />
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-border/60 rounded-2xl border border-border/60 bg-background/60 p-1 backdrop-blur">
              {STATS.map((s) => (
                <div key={s.label} className="px-3 py-3 text-center sm:px-5">
                  <div className="text-xl font-bold text-foreground sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-primary/10">
              <Image
                src="/images/hero-yoga-sunset.jpg"
                alt="Woman practicing yoga at sunset on the beach — mindful movement for women"
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URLS["/images/hero-yoga-sunset"]}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                  <Heart className="size-3.5 text-primary" /> Today&apos;s flow
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                  <Star className="size-3 fill-gold text-gold" /> 4.9
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-white shadow-lg backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
                  Featured routine
                </p>
                <h3 className="mt-1 text-lg font-bold leading-tight">
                  Hormone-balancing yoga · 18 min
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  Restorative flow to lower cortisol and reset your nervous
                  system before bed.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-2 hidden rotate-2 items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium shadow-lg sm:flex">
              <ShieldCheck className="size-3.5 text-success" />
              Medically reviewed
            </div>
            <div className="absolute -left-3 top-12 hidden -rotate-3 items-center gap-2 rounded-2xl border border-border/60 bg-card px-3 py-2 text-xs shadow-lg sm:flex">
              <div className="flex -space-x-1.5">
                <span className="size-5 rounded-full border-2 border-card bg-rose-soft" />
                <span className="size-5 rounded-full border-2 border-card bg-gold" />
                <span className="size-5 rounded-full border-2 border-card bg-primary" />
              </div>
              <span className="text-foreground">
                <strong>1,240</strong> women flowed this week
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
