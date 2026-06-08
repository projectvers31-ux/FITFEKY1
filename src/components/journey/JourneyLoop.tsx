'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  type PageType,
  getUserJourneyState,
  getNextRecommendedPage,
  recordPageVisit,
} from '@/lib/journey'

const pageLabels: Record<string, string> = {
  '/quiz': 'Take the Fitness Quiz',
  '/tools/calorie': 'Calculate Your Calories',
  '/tools/macro': 'Get Your Macros',
  '/tools/bmi': 'Calculate Your BMI',
  '/tools/body-fat': 'Measure Body Fat',
  '/my-challenge': 'Join 7-Day Challenge',
  '/my-progress': 'Track Your Progress',
  '/blog': 'Read Related Articles',
}

export function JourneyLoop({ currentPageType }: { currentPageType: PageType }) {
  const [nextPage, setNextPage] = useState<string | null>(null)

  useEffect(() => {
    recordPageVisit(currentPageType)
    const state = getUserJourneyState()
    const recommended = getNextRecommendedPage(state)
    setNextPage(recommended)
  }, [currentPageType])

  if (!nextPage) return null

  return (
    <div className="my-8 rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-6">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">
        Recommended next step
      </p>
      <h3 className="mb-2 text-xl font-bold">
        {pageLabels[nextPage] || 'Continue Your Journey'}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Based on your activity, this will help you make the most progress.
      </p>
      <Link
        href={nextPage}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
      >
        {pageLabels[nextPage] || 'Continue'} →
      </Link>
    </div>
  )
}
