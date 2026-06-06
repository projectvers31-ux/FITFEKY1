import Image from "next/image"
import Link from "next/link"

import { ArrowRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BLUR_DATA_URLS } from "@/lib/blur-data-urls"

const IMAGES = [
  {
    src: "/images/hero-yoga-sunset.jpg",
    alt: "Woman practicing yoga at sunset on the beach",
    title: "Mindful movement",
    body: "Yoga, walking, and breathwork that fits your cycle — not fights it.",
    span: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[4/5] md:aspect-auto",
  },
  {
    src: "/images/hero-yoga-mat.jpg",
    alt: "Woman practicing yoga on a mat indoors",
    title: "Strength + softness",
    body: "Build lean muscle with 25-minute home routines.",
  },
  {
    src: "/images/yoga-balance.jpg",
    alt: "Woman in a balance yoga pose",
    title: "Hormone-friendly flow",
    body: "Sequences designed for PMS, perimenopause, and beyond.",
  },
  {
    src: "/images/meditation-mindful.jpg",
    alt: "Woman in mindful meditation",
    title: "Rest as training",
    body: "Sleep and recovery are the most underrated weight-loss tools.",
  },
  {
    src: "/images/wellness-warm.jpg",
    alt: "Wellness and warmth ritual",
    title: "Daily ritual, not punishment",
    body: "Small, repeatable habits that compound over months.",
  },
]

export function YogaGallerySection() {
  return (
    <section
      id="yoga-wellness"
      className="container mx-auto px-4 py-20 lg:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3" /> Yoga & Wellness
        </span>
        <h2
          id="gallery-heading"
          className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
        >
          Movement that meets you where you are.
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Real women, real practice. No gym required, no shame, no
          before-and-afters — just a relationship with your body that
          actually lasts.
        </p>
      </div>

      <div className="mt-14 grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {IMAGES.map((img) => (
          <figure
            key={img.src}
            className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-muted ${img.span ?? ""}`}
          >
            <div className={`relative w-full ${img.aspect ?? "aspect-[4/5]"} h-full`}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={75}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URLS[img.src.replace(/\.(jpe?g|png|webp|avif)$/i, "")]}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="text-lg font-semibold tracking-tight drop-shadow">
                {img.title}
              </h3>
              <p className="mt-1 text-sm text-white/85 drop-shadow">
                {img.body}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 flex flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-muted-foreground">
          Photos from <span className="font-medium text-foreground">Unsplash</span>{" "}
          · Free to use under the Unsplash License
        </p>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/blog?category=weight-loss">
            Read the journal
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
