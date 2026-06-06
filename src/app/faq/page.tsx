import { FAQS, FaqSection } from "@/components/blocks/faq-section"
import { LatestArticlesSection } from "@/components/blocks/latest-articles"
import { TopPicksSection } from "@/components/blocks/top-picks"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { buildFaqPageSchema } from "@/lib/schema"
import { buildMetadata, SITE_URL } from "@/lib/seo"

export const metadata = buildMetadata({
  title: "Frequently Asked Questions — FitFeky Help Center",
  description:
    "Honest answers to the questions we get most about FitFeky, our free calculators, and how we choose products to recommend.",
  path: "/faq",
  keywords: [
    "FitFeky FAQ",
    "frequently asked questions",
    "calculator help",
    "FitFeky help center",
    "are FitFeky calculators accurate",
    "is FitFeky free",
  ],
  imageAlt: "FitFeky FAQ — honest answers about our calculators and reviews",
})

export default function FaqPage() {
  const faqSchema = buildFaqPageSchema({
    questions: FAQS.map((f) => ({ question: f.q, answer: f.a })),
  })
  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "FAQ", href: "/faq" },
  ])

  return (
    <>
      <JsonLd data={[breadcrumb, faqSchema]} />
      <div className="container mx-auto px-4 pt-16 lg:pt-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Help center
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Honest answers, before you start.
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Still have a question? We read every email.
          </p>
        </div>
      </div>
      <FaqSection />
      <TopPicksSection />
      <LatestArticlesSection />
    </>
  )
}