'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { products } from '@/data/products'

export function ProductSuggestion({ limit = 1 }: { limit?: number }) {
  const [clicked, setClicked] = useState<string | null>(null)

  const suggested = products.slice(0, limit)

  if (suggested.length === 0) return null

  return (
    <div className="my-8 rounded-xl border bg-card p-6">
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
          EDITOR TESTED
        </span>
        <span className="text-xs text-muted-foreground">
          We personally recommend products we trust
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        {suggested.map(product => (
          <div key={product.id} className="flex-1 min-w-[220px]">
            <div className="mb-2 aspect-square w-full overflow-hidden rounded-lg bg-muted">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <h4 className="font-semibold">{product.name}</h4>
            <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
            <div className="mt-1 flex items-center gap-1 text-sm">
              <span className="text-amber-500">{'★'.repeat(Math.round(product.rating || 0))}</span>
              <span className="text-muted-foreground">({product.reviewCount || 0})</span>
            </div>
            <Link
              href={`/products/${product.id}`}
              className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              onClick={() => setClicked(product.id)}
            >
              {clicked === product.id ? '✓ Viewing' : 'See Review →'}
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        When you buy through our links, we may earn a commission. Learn more in our{' '}
        <Link href="/privacy-policy" className="underline">
          affiliate disclosure
        </Link>
        .
      </p>
    </div>
  )
}
