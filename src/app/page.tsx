import { AffiliateDisclosureWrapper } from "@/components/affiliate/AffiliateDisclosureClient"
import { FaqSection } from "@/components/blocks/faq-section"
import { HeroSection } from "@/components/blocks/hero-women"
import { LatestArticlesSection } from "@/components/blocks/latest-articles"
import { MedicalInfoSection } from "@/components/blocks/medical-info"
import { HowItWorksSection } from "@/components/blocks/method"
import { TopPicksWithReviewsSection } from "@/components/blocks/top-picks-with-reviews"
import { TransformationStoriesSection } from "@/components/blocks/transformation-stories"
import { TrustSection } from "@/components/blocks/trust"
import { YogaGallerySection } from "@/components/blocks/yoga-gallery"
import { StickyMobileCTAWrapper } from "@/components/shared/StickyMobileCTAClient"
import { buildMetadata } from "@/lib/seo"

export const metadata = buildMetadata({
  title:
    "FitFeky — Smart Weight Loss Tools & Honest Reviews for Women",
  description:
    "Free, science-backed weight loss calculators, a personal style quiz, and editor-tested product picks — built for women who want lasting results, not crash diets.",
  path: "/",
  keywords: [
    "FitFeky",
    "weight loss for women",
    "women's fitness tools",
    "free calorie calculator",
    "free BMI calculator",
    "macro calculator for women",
    "heart rate zone calculator",
    "body fat calculator for women",
    "hormone-friendly fat loss",
    "fitness quiz for women",
    "honest product reviews",
  ],
  imageAlt:
    "FitFeky — smart weight loss tools, calculators and honest product reviews for women",
  type: "website",
})

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <HowItWorksSection />
      <TransformationStoriesSection />
      <YogaGallerySection />
      <MedicalInfoSection />
      <TopPicksWithReviewsSection />
      <LatestArticlesSection />
      <TrustSection />
      <FaqSection />

      <section className="container mx-auto px-4 pb-16 pt-4">
        <AffiliateDisclosureWrapper />
      </section>

      <StickyMobileCTAWrapper
        label="Take the 60-sec Quiz"
        href="/quiz"
        storageKey="fitfeky-sticky-quiz-dismissed"
      />
    </div>
  )
}