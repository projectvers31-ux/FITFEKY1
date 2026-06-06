import Link from "next/link"

import { ArrowLeft, Sparkles, Clock, Heart } from "lucide-react"

import { FitnessQuizClient } from "@/components/quiz/FitnessQuizClient"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { buildQuizSchema } from "@/lib/schema"
import { buildMetadata, SITE_URL } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Find Your Weight Loss Style — 60-Second Fitness Quiz",
  description:
    "Answer 4 quick questions and get matched to a weight-loss style that fits your life — plus personal product picks. Free, no sign-up.",
  path: "/quiz",
  keywords: [
    "weight loss quiz",
    "fitness style quiz",
    "women's fitness personality",
    "weight loss archetype",
    "personalised fitness quiz",
    "free fitness quiz",
  ],
  imageAlt: "Find your weight loss style — FitFeky 60-second quiz",
  type: "website",
})

export default function QuizPage() {
  const quizSchema = buildQuizSchema({
    name: "Find Your Weight Loss Style — FitFeky Fitness Quiz",
    description:
      "A 60-second, 4-question fitness quiz for women that matches you to a weight-loss style that fits your life — plus personal product picks.",
    path: "/quiz",
    about: "Women's fitness and weight loss styles",
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Quiz", href: "/quiz" },
  ])

  return (
    <div className="relative">
      <JsonLd data={[breadcrumb, quizSchema]} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-96 bg-soft-radial"
      />
      <div className="container mx-auto max-w-3xl px-4 py-12 lg:py-20">
        <div className="mb-6">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/">
              <ArrowLeft className="size-4" /> Back to home
            </Link>
          </Button>
        </div>

        <header className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3" /> 60 seconds · 4 questions
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Find your weight-loss style.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
            Answer 4 quick questions. We&apos;ll match you to a style that fits
            your life — plus product picks and a free kickstart plan.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> Less than 60 seconds
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="size-3.5 text-primary" /> Built for women
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="size-3.5 text-primary" /> Personal picks
            </span>
          </div>
        </header>

        <FitnessQuizClient />
      </div>
    </div>
  )
}
