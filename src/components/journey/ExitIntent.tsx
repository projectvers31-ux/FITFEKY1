'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

export function ExitIntent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !show) {
        const dismissed = localStorage.getItem('fitfeky_exit_dismissed')
        if (!dismissed || Date.now() - parseInt(dismissed, 10) > 604800000) {
          setShow(true)
        }
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [show])

  function dismiss() {
    setShow(false)
    localStorage.setItem('fitfeky_exit_dismissed', Date.now().toString())
  }

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-md rounded-t-2xl bg-background p-8 shadow-2xl sm:rounded-2xl">
        <button
          onClick={dismiss}
          className="float-right text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="mb-2 text-2xl font-bold">
          Before you go —
        </h2>
        <p className="mb-6 text-muted-foreground">
          Your personalized fat loss report is ready. See your calorie target,
          timeline, and exactly what to do next.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/quiz"
            onClick={dismiss}
            className="rounded-lg bg-primary px-6 py-3 text-center font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            See My Plan →
          </Link>
          <button
            onClick={dismiss}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            No thanks, I'll come back later
          </button>
        </div>
      </div>
    </div>
  )
}
