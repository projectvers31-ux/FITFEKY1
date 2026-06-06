"use client"

import dynamic from "next/dynamic"

const FitnessQuiz = dynamic(
  () => import("./FitnessQuiz").then((m) => m.FitnessQuiz),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-card shadow-lg">
        <div className="h-1.5 w-full bg-muted" />
        <div className="space-y-6 p-6 sm:p-8">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-8 w-3/4 animate-pulse rounded bg-muted" />
          <div className="space-y-2.5">
            <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
            <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
            <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
            <div className="h-14 w-full animate-pulse rounded-xl bg-muted" />
          </div>
          <div className="flex justify-between pt-4">
            <div className="h-10 w-20 animate-pulse rounded-full bg-muted" />
            <div className="h-10 w-28 animate-pulse rounded-full bg-muted" />
          </div>
        </div>
      </div>
    ),
  },
)

export function FitnessQuizClient() {
  return <FitnessQuiz />
}
