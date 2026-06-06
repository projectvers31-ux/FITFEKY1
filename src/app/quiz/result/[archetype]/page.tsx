import { notFound } from "next/navigation"

import { ArchetypeCard } from "@/components/quiz/ArchetypeCard"
import { Breadcrumbs } from "@/components/shared/Breadcrumbs"
import { JsonLd, buildBreadcrumbList } from "@/components/shared/JsonLd"
import { archetypes } from "@/data/archetypes"
import { getProductsByIds } from "@/lib/getRecommendations"
import { getArchetype } from "@/lib/quizScoring"
import { buildQuizSchema } from "@/lib/schema"
import { buildMetadata, SITE_URL } from "@/lib/seo"

interface PageProps {
  params: Promise<{ archetype: string }>
}

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.id }))
}

export async function generateMetadata({ params }: PageProps) {
  const { archetype } = await params
  const data = getArchetype(archetype)
  if (!data) {
    return buildMetadata({
      title: "Archetype Not Found",
      description: "The fitness archetype you're looking for is unavailable.",
      path: "/quiz",
      noindex: true,
    })
  }

  return buildMetadata({
    title: `You're ${data.title} — Your Fitness Archetype`,
    description: data.description,
    path: `/quiz/result/${data.id}`,
    keywords: [
      "fitness archetype",
      "weight loss personality",
      `${data.title} fitness`,
      "FitFeky fitness quiz",
      "personalised fitness recommendations",
    ],
    imageAlt: `You got ${data.title} — FitFeky fitness archetype quiz result`,
    type: "article",
  })
}

export default async function ArchetypeResultPage({ params }: PageProps) {
  const { archetype } = await params
  const data = getArchetype(archetype)
  if (!data) notFound()

  const products = getProductsByIds(data.productIds)

  const breadcrumb = buildBreadcrumbList(SITE_URL, [
    { label: "Quiz", href: "/quiz" },
    { label: data.title, href: `/quiz/result/${data.id}` },
  ])
  const quizSchema = buildQuizSchema({
    name: `FitFeky Fitness Quiz Result: ${data.title}`,
    description: data.description,
    path: `/quiz/result/${data.id}`,
    about: `Women's fitness archetype — ${data.title}`,
    resultName: data.title,
    resultDescription: data.description,
  })

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <JsonLd data={[breadcrumb, quizSchema]} />
      <Breadcrumbs
        items={[
          { label: "Quiz", href: "/quiz" },
          { label: data.title },
        ]}
        className="mb-6"
      />
      <ArchetypeCard archetype={data} products={products} />
    </div>
  )
}