"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Tool } from "@/data/tools"

interface ToolFormProps {
  tool: Tool
}

const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little/no exercise)" },
  { value: "light", label: "Light (1-3 days/week)" },
  { value: "moderate", label: "Moderate (3-5 days/week)" },
  { value: "active", label: "Active (6-7 days/week)" },
  { value: "very-active", label: "Very Active (athlete)" },
]

const GOALS = [
  { value: "weight-loss", label: "Weight Loss" },
  { value: "muscle-gain", label: "Muscle Gain" },
  { value: "endurance", label: "Endurance" },
  { value: "general-fitness", label: "General Fitness" },
  { value: "strength", label: "Strength" },
]

function FieldsForTool({ tool }: { tool: Tool }) {
  switch (tool.id) {
    case "bmi":
    case "body-fat":
      return (
        <>
          <Field name="weight" label="Weight (kg)" type="number" placeholder="70" />
          <Field name="height" label="Height (cm)" type="number" placeholder="175" />
        </>
      )
    case "calorie":
    case "macro":
      return (
        <>
          <Field name="age" label="Age" type="number" placeholder="30" />
          <SelectField name="sex" label="Sex" options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]} />
          <Field name="weight" label="Weight (kg)" type="number" placeholder="70" />
          <Field name="height" label="Height (cm)" type="number" placeholder="175" />
          <SelectField name="activity" label="Activity Level" options={ACTIVITY_LEVELS} />
        </>
      )
    case "heart-rate":
      return (
        <>
          <Field name="age" label="Age" type="number" placeholder="30" />
          <Field name="restingHr" label="Resting Heart Rate (bpm)" type="number" placeholder="65" />
        </>
      )
    default:
      return null
  }
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
}: {
  name: string
  label: string
  type?: string
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} required />
    </div>
  )
}

function SelectField({
  name,
  label,
  options,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} required>
        <SelectTrigger id={name}>
          <SelectValue placeholder="Select..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export function ToolForm({ tool }: ToolFormProps) {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    fd.forEach((value, key) => {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value)
      }
    })

    if (tool.categories.length > 0) {
      const goal = fd.get("goal")
      const category = typeof goal === "string" && goal ? goal : tool.categories[0]
      router.push(`/tools/${tool.slug}/result/${category}?${params.toString()}`)
    } else {
      router.push(`/tools/${tool.slug}/result/general?${params.toString()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <FieldsForTool tool={tool} />
      <SelectField name="goal" label="Primary Goal" options={GOALS} />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" size="lg">
        Calculate My Results
      </Button>
    </form>
  )
}
