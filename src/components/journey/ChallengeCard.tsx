'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { getChallengeState, getCompletionPercentage, challengeDays } from '@/lib/challenge'

export function ChallengeCard() {
  const [state, setState] = useState(getChallengeState())

  useEffect(() => {
    setState(getChallengeState())
  }, [])

  const percentage = getCompletionPercentage()

  if (!state.startedAt) {
    return (
      <div className="my-6 rounded-xl border p-6">
        <h3 className="mb-2 text-lg font-bold">7-Day Weight Loss Challenge</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          One small task per day. Recalculate, move, eat, sleep, repeat.
          No sign-up required.
        </p>
        <Link
          href="/my-challenge"
          className="inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90"
        >
          Start the Challenge →
        </Link>
      </div>
    )
  }

  return (
    <div className="my-6 rounded-xl border p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-bold">7-Day Challenge</h3>
        <span className="text-sm font-semibold text-primary">{percentage}%</span>
      </div>
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Day {state.currentDay} of 7 —{' '}
        {challengeDays.find(d => d.day === state.currentDay)?.title}
      </p>
      <Link
        href="/my-challenge"
        className="inline-block rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground hover:opacity-90"
      >
        Continue Challenge →
      </Link>
    </div>
  )
}
