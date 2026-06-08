'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import {
  shouldShowReturnWelcome,
  getReturnWelcomeMessage,
  recordReturnVisit,
} from '@/lib/journey'

export function ReturnWelcome() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState({ title: '', subtitle: '' })

  useEffect(() => {
    if (shouldShowReturnWelcome()) {
      setMessage(getReturnWelcomeMessage())
      setVisible(true)
      recordReturnVisit()
    }
  }, [])

  if (!visible) return null

  return (
    <div className="mb-6 rounded-xl border border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">{message.title}</h2>
          <p className="mt-1 text-muted-foreground">{message.subtitle}</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/my-results"
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/quiz"
              className="rounded-lg border px-5 py-2 text-sm font-semibold"
            >
              Retake Quiz
            </Link>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
