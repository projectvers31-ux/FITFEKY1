import Image from "next/image"
import Link from "next/link"

import { Star, Quote, BadgeCheck, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"

const STORIES = [
  {
    name: "Maya, 38",
    role: "Lost 22 lbs · Mom of 2",
    image: "/images/story-postpartum.jpg",
    quote:
      "After two kids, my body just stopped responding to my old plan. I stopped counting and started doing gentle yoga + 25g protein at breakfast. The weight came off and stayed off.",
    tag: "Postpartum",
  },
  {
    name: "Priya, 47",
    role: "Lost 14 lbs · Perimenopause",
    image: "/images/story-perimenopause.jpg",
    quote:
      "I was eating 1,200 calories a day and gaining weight. Replacing one workout with a 20-min yoga flow and adding 200 calories fixed what years of restriction couldn't.",
    tag: "40+",
  },
  {
    name: "Elena, 29",
    role: "Lost 18 lbs · PCOS",
    image: "/images/story-pcos.jpg",
    quote:
      "The first time something has stuck past 3 months. Yoga and walking synced with my cycle instead of fighting it — that was the unlock for me.",
    tag: "PCOS",
  },
]

export function TransformationStoriesSection() {
  return (
    <section
      className="container mx-auto px-4 py-20 lg:py-28"
      aria-labelledby="stories-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Star className="size-3 fill-gold text-gold" /> 4.9 from 12,000+ readers
        </span>
        <h2
          id="stories-heading"
          className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
        >
          Real women. Real numbers. Real life.
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          We don&apos;t do stock photos. Every story here is a real FitFeky
          reader — names changed with permission.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STORIES.map((s, i) => (
          <Card
            key={s.name}
            className="group overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URLS[s.image.replace(/\.(jpe?g|png|webp|avif)$/i, "")]}
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : undefined}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur">
                {s.tag}
              </span>
            </div>
            <CardContent className="p-6">
              <Quote className="size-5 text-primary/50" />
              <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                {s.quote}
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-muted-foreground">{s.role}</div>
                </div>
                <BadgeCheck className="ml-auto size-4 text-success" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12 rounded-full px-7 shadow-md">
          <Link href="/quiz">
            See your own plan
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="h-12 rounded-full"
        >
          <Link href="/blog">Read more stories</Link>
        </Button>
      </div>
    </section>
  )
}
