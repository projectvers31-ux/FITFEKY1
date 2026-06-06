import Link from "next/link"

import {
  Heart,
  Target,
  ShieldCheck,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react"

import { AffiliateDisclosure } from "@/components/affiliate/AffiliateDisclosure"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { buildAboutPageSchema } from "@/lib/schema"
import { buildMetadata, SITE_URL } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "About FitFeky — Our Mission & Editorial Standards",
  description:
    "Why we built FitFeky, who writes our content, and the promises we keep to the women who read us.",
  path: "/about",
  keywords: [
    "about FitFeky",
    "FitFeky editorial team",
    "women's fitness editorial standards",
    "FitFeky mission",
    "evidence-based fitness content",
    "honest product reviews",
  ],
  imageAlt: "About FitFeky — our mission and editorial standards",
})

const VALUES = [
  {
    icon: Heart,
    title: "Women-first, not women-only",
    body: "Every guide, calculator, and review is built with women's hormones, life stages, and goals in mind — not adapted from a male default.",
  },
  {
    icon: CheckCircle2,
    title: "Evidence over vibes",
    body: "We cite real studies, name our sources, and have a medical advisor review content. No bro-science, no miracle claims.",
  },
  {
    icon: ShieldCheck,
    title: "Honest reviews, always",
    body: "We test products for 30+ days. If a product doesn't earn its place, it doesn't get recommended — even if it costs us the commission.",
  },
]

export default function AboutPage() {
  const aboutSchema = buildAboutPageSchema({
    name: "About FitFeky",
    description:
      "Why we built FitFeky, who writes our content, and the promises we keep to the women who read us.",
    path: "/about",
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "About", href: "/about" },
  ])

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={[breadcrumb, aboutSchema]} />
      <Breadcrumbs items={[{ label: "About" }]} className="mb-6" />

      <header className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles className="size-3" /> Our story
        </span>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          We built FitFeky for the women we couldn&apos;t help.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          Free, evidence-based tools and honest product picks — for women
          who want lasting results, not crash diets.
        </p>
      </header>

      <div className="space-y-8">
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Target className="size-5 text-primary" /> Our mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-foreground/90">
            <p>
              Fitness is full of hype, bro-science, and products that
              overpromise. We built FitFeky to cut through the noise. Every
              calculator is grounded in real science. Every product review
              is based on what we&apos;d actually use ourselves.
            </p>
            <p>
              We don&apos;t believe in magic pills, extreme protocols, or
              one-size-fits-all answers. We believe in{" "}
              <strong>
                data you can measure, plans you can follow, and products
                worth your money
              </strong>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Heart className="size-5 text-primary" /> What we believe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {VALUES.map((v) => {
                const Icon = v.icon
                return (
                  <li key={v.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-soft text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-semibold tracking-tight">
                        {v.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {v.body}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CheckCircle2 className="size-5 text-primary" /> What you&apos;ll find
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-2 text-sm sm:grid-cols-2">
              {[
                "5+ free calculators (BMI, calories, macros, heart rate, body fat)",
                "A 60-second quiz with personalized recommendations",
                "Honest, hands-on product reviews",
                "Free guides on training, nutrition, and recovery",
                "100% free — no sign-up, no paywall",
                "A newsletter that respects your inbox",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-foreground/90">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="size-5 text-primary" /> Affiliate disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-foreground/90">
            <p>
              FitFeky is a participant in the Amazon Services LLC Associates
              Program. When you click a product link and make a purchase, we
              may earn a small commission — at no extra cost to you.
            </p>
            <p>
              <strong className="text-foreground">Our promise:</strong>{" "}
              affiliate relationships never influence our reviews or ratings.
              If a product isn&apos;t worth your money, we&apos;ll say so —
              even if it means losing the commission.
            </p>
            <AffiliateDisclosure />
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-gradient-to-br from-rose-soft/40 to-cream/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Mail className="size-5 text-primary" /> Get in touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Found a bug in a calculator? Disagree with a review? Just want
              to say hi? We read every message.
            </p>
            <Button asChild className="rounded-full shadow-sm">
              <Link href="/contact">Contact us</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
