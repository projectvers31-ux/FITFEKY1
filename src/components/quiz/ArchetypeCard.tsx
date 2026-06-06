"use client"

import * as React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { ShoppingBag } from "lucide-react"

import { AffiliateCard } from "@/components/affiliate/AffiliateCard"
import { ShareButton } from "@/components/shared/ShareButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Archetype } from "@/data/archetypes"
import type { Product } from "@/data/products"

interface ArchetypeCardProps {
  archetype: Archetype
  products: Product[]
}

export function ArchetypeCard({ archetype, products }: ArchetypeCardProps) {
  const pathname = usePathname()
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${pathname}`
    : ""

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-br from-primary/10 to-primary/5 text-center">
          <div className="text-6xl" aria-hidden>
            {archetype.emoji}
          </div>
          <h1 className="mt-2 text-3xl leading-tight font-semibold tracking-tight">
            You&rsquo;re {archetype.title}
          </h1>
        </CardHeader>
        <CardContent className="space-y-4 p-6 text-center">
          <p className="text-lg text-muted-foreground">{archetype.description}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <ShareButton
              url={shareUrl}
              title={`I'm "${archetype.title}" — ${archetype.description}`}
              description={archetype.description}
            />
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <ShoppingBag className="size-5 text-primary" />
          Recommended for You
        </h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <AffiliateCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No products matched this archetype yet.</p>
        )}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button asChild variant="outline">
          <Link href="/quiz">Retake Quiz</Link>
        </Button>
        <Button asChild>
          <Link href="/tools">Explore Tools</Link>
        </Button>
      </div>
    </div>
  )
}
