"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getResult, type AnswerKey } from "@/lib/quizScoring"
import { cn } from "@/lib/utils"

interface Question {
  id: AnswerKey
  prompt: string
  options: { value: number; label: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: "strength",
    prompt: "How do you feel about lifting weights?",
    options: [
      { value: 3, label: "Love it — sign me up for deadlifts" },
      { value: 2, label: "I'm into it" },
      { value: 1, label: "It's okay" },
      { value: 0, label: "Not my thing" },
    ],
  },
  {
    id: "cardio",
    prompt: "What's your relationship with cardio?",
    options: [
      { value: 3, label: "I love long runs and rides" },
      { value: 2, label: "I do it regularly" },
      { value: 1, label: "Only when I have to" },
      { value: 0, label: "I'd rather not" },
    ],
  },
  {
    id: "flexibility",
    prompt: "How important is flexibility and mobility?",
    options: [
      { value: 3, label: "Crucial — I stretch daily" },
      { value: 2, label: "Important" },
      { value: 1, label: "Sometimes" },
      { value: 0, label: "Barely on my radar" },
    ],
  },
  {
    id: "intensity",
    prompt: "Pick your training style:",
    options: [
      { value: 3, label: "Go hard or go home" },
      { value: 2, label: "I like pushing myself" },
      { value: 1, label: "Moderate effort" },
      { value: 0, label: "Slow and steady" },
    ],
  },
]

export function FitnessQuiz() {
  const router = useRouter()
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<AnswerKey[]>([])
  const [selected, setSelected] = React.useState<number | null>(null)

  const current = QUESTIONS[step]
  const progress = ((step + (selected !== null ? 1 : 0)) / QUESTIONS.length) * 100
  const isLast = step === QUESTIONS.length - 1

  const handleNext = () => {
    if (selected === null) return
    const picked = current.options[selected]
    const accumulated = [...answers]
    for (let i = 0; i < picked.value; i++) accumulated.push(current.id)

    if (isLast) {
      const archetypeId = getResult(accumulated)
      router.push(`/quiz/result/${archetypeId}`)
      return
    }
    setAnswers(accumulated)
    setStep((s) => s + 1)
    setSelected(null)
  }

  const handleBack = () => {
    if (step === 0) return
    setStep((s) => s - 1)
    setSelected(null)
  }

  return (
    <Card className="mx-auto w-full max-w-2xl overflow-hidden border-border/60 shadow-lg">
      <div className="h-1.5 w-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-primary via-rose-soft to-gold transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-primary" />
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>

        <h2 className="text-balance text-2xl font-bold leading-tight tracking-tight">
          {current.prompt}
        </h2>

        <div className="space-y-2.5">
          {current.options.map((opt, i) => {
            const isSelected = selected === i
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelected(i)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left text-sm transition-all",
                  isSelected
                    ? "border-primary bg-rose-soft/50 font-medium shadow-sm"
                    : "border-border bg-card hover:border-primary/40 hover:bg-rose-soft/30",
                )}
                aria-pressed={isSelected}
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background group-hover:border-primary/40",
                  )}
                >
                  {isSelected && <Check className="size-3.5" />}
                </span>
                <span className="flex-1">{opt.label}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleBack}
            disabled={step === 0}
            className="rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={selected === null}
            className="rounded-full shadow-sm"
            size="lg"
          >
            {isLast ? "See my style" : "Next"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
