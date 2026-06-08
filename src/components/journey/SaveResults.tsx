'use client'

import { useState } from 'react'

import Link from 'next/link'

import { recordSaveResults } from '@/lib/journey'

interface SaveResultsProps {
  bmi?: number
  calories?: number
  archetype?: string
}

export function SaveResults({ bmi, calories, archetype }: SaveResultsProps) {
  const [saved, setSaved] = useState(false)

  function handleSave() {
    if (typeof window === 'undefined') return
    const data = {
      bmi,
      calories,
      archetype,
      savedAt: Date.now(),
    }
    localStorage.setItem('fitfeky_results', JSON.stringify(data))
    setSaved(true)
    recordSaveResults()
  }

  function handleLoad() {
    const stored = localStorage.getItem('fitfeky_results')
    if (stored) {
      const data = JSON.parse(stored)
      const hoursAgo = Math.round((Date.now() - data.savedAt) / 3600000)
      return (
        <div className="mt-2 rounded-lg bg-muted p-3 text-sm">
          <p className="font-medium">Saved {hoursAgo}h ago</p>
          {data.bmi && <p>BMI: {data.bmi}</p>}
          {data.calories && <p>Calories: {data.calories}</p>}
          {data.archetype && <p>Archetype: {data.archetype}</p>}
        </div>
      )
    }
    return null
  }

  return (
    <div className="my-6 rounded-xl border p-6">
      <h3 className="mb-2 text-lg font-bold">
        {saved ? '✓ Results Saved!' : 'Save Your Results'}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {saved
          ? 'Your results are saved to this browser. Come back anytime to review.'
          : 'Save your results to track progress over time. No account needed.'}
      </p>
      {!saved ? (
        <button
          onClick={handleSave}
          className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90"
        >
          Save My Results
        </button>
      ) : (
        <div>
          <Link
            href="/my-results"
            className="inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90"
          >
            View My Dashboard →
          </Link>
          {saved && handleLoad()}
        </div>
      )}
    </div>
  )
}
