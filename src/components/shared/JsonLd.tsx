interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function buildBreadcrumbList(
  base: string,
  trail: { label: string; href: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${base}/`,
      },
      ...trail.map((t, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: t.label,
        item: `${base}${t.href}`,
      })),
    ],
  }
}
