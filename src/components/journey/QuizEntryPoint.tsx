'use client'

import { useEffect, useState, useRef } from 'react'

import Link from 'next/link'

import { entryFlows } from '@/data/journey-flows'
import { recordPageVisit } from '@/lib/journey'

interface QuizEntryPointProps {
  currentPath: string
}

export function QuizEntryPoint({ currentPath }: QuizEntryPointProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const flow = entryFlows.find(f => f.entryPage === currentPath)

  useEffect(() => {
    if (!flow) return

    if (flow.quizTrigger === 'time') {
      const timer = setTimeout(() => setVisible(true), flow.quizTriggerThreshold)
      return () => clearTimeout(timer)
    }

    if (flow.quizTrigger === 'scroll') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true)
        },
        { threshold: flow.quizTriggerThreshold / 100 },
      )
      if (ref.current) observer.observe(ref.current)
      return () => observer.disconnect()
    }
  }, [flow])

  if (!flow || !visible) return null

  return (
    <div ref={ref} className="my-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-primary">
        Personalized for you
      </p>
      <h3 className="mb-2 text-xl font-bold">
        {flow.hookCTA}
      </h3>
      <p className="mb-4 text-muted-foreground">
        Answer 7 quick questions and get a custom weight loss plan with your
        calorie target, timeline, and product recommendations.
      </p>
      <Link
        href="/quiz"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
        onClick={() => recordPageVisit('quiz')}
      >
        Get Your Personal Plan →
      </Link>
    </div>
  )
}
