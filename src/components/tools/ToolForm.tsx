"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Tool } from "@/data/tools"
import { cn } from "@/lib/utils"

interface ToolFormProps {
  tool: Tool
}

type UnitSystem = "metric" | "imperial"

const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentary (little/no exercise)" },
  { value: "light", label: "Light (1-3 days/week)" },
  { value: "moderate", label: "Moderate (3-5 days/week)" },
  { value: "active", label: "Active (6-7 days/week)" },
  { value: "very-active", label: "Very Active (athlete)" },
]

const GOALS = [
  { value: "weight-loss", label: "Lose Fat" },
  { value: "maintain", label: "Maintain Weight" },
  { value: "muscle-gain", label: "Build Muscle" },
  { value: "general-fitness", label: "General Fitness" },
]

function FieldsForTool({
  tool,
  unit,
  selectValues,
  onSelectChange,
}: {
  tool: Tool
  unit: UnitSystem
  selectValues: Record<string, string>
  onSelectChange: (name: string, value: string) => void
}) {
  switch (tool.id) {
    case "bmi":
    case "body-fat":
      return (
        <>
          <Field
            name="weight"
            label="Weight"
            type="number"
            placeholder={unit === "metric" ? "70 kg" : "154 lb"}
            unit={unit === "metric" ? "kg" : "lb"}
            inputMode="decimal"
            step="0.1"
          />
          <Field
            name="height"
            label="Height"
            type="number"
            placeholder={unit === "metric" ? "175 cm" : "68 in"}
            unit={unit === "metric" ? "cm" : "in"}
            inputMode="decimal"
            step="0.1"
          />
        </>
      )
    case "calorie":
    case "macro":
    case "bmr":
      return (
        <>
          <Field
            name="age"
            label="Age"
            type="number"
            placeholder="30"
            unit="years"
            inputMode="numeric"
            min="10"
            max="120"
          />
          <SelectField
            name="sex"
            label="Sex"
            options={[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
            ]}
            value={selectValues["sex"] || ""}
            onChange={onSelectChange}
          />
          <Field
            name="weight"
            label="Weight"
            type="number"
            placeholder={unit === "metric" ? "70 kg" : "154 lb"}
            unit={unit === "metric" ? "kg" : "lb"}
            inputMode="decimal"
            step="0.1"
          />
          <Field
            name="height"
            label="Height"
            type="number"
            placeholder={unit === "metric" ? "175 cm" : "68 in"}
            unit={unit === "metric" ? "cm" : "in"}
            inputMode="decimal"
            step="0.1"
          />
          <SelectField
            name="activity"
            label="Activity Level"
            options={ACTIVITY_LEVELS}
            value={selectValues["activity"] || ""}
            onChange={onSelectChange}
          />
        </>
      )
    case "heart-rate":
      return (
        <>
          <Field
            name="age"
            label="Age"
            type="number"
            placeholder="30"
            unit="years"
            inputMode="numeric"
            min="10"
            max="120"
          />
          <Field
            name="restingHr"
            label="Resting Heart Rate"
            type="number"
            placeholder="65"
            unit="bpm"
            inputMode="numeric"
            min="30"
            max="120"
          />
        </>
      )
    case "protein":
      return (
        <Field
          name="weight"
          label="Weight"
          type="number"
          placeholder={unit === "metric" ? "70 kg" : "154 lb"}
          unit={unit === "metric" ? "kg" : "lb"}
          inputMode="decimal"
          step="0.1"
        />
      )
    case "ideal-weight":
      return (
        <>
          <Field
            name="height"
            label="Height"
            type="number"
            placeholder={unit === "metric" ? "175 cm" : "68 in"}
            unit={unit === "metric" ? "cm" : "in"}
            inputMode="decimal"
            step="0.1"
          />
          <SelectField
            name="frame"
            label="Frame Size"
            options={[
              { value: "small", label: "Small" },
              { value: "medium", label: "Medium" },
              { value: "large", label: "Large" },
            ]}
            value={selectValues["frame"] || ""}
            onChange={onSelectChange}
          />
        </>
      )
    case "water-intake":
      return (
        <>
          <Field
            name="weight"
            label="Weight"
            type="number"
            placeholder={unit === "metric" ? "70 kg" : "154 lb"}
            unit={unit === "metric" ? "kg" : "lb"}
            inputMode="decimal"
            step="0.1"
          />
          <SelectField
            name="activity"
            label="Activity Level"
            options={[
              { value: "sedentary", label: "Sedentary (little/no exercise)" },
              { value: "light", label: "Light (1-3 days/week)" },
              { value: "moderate", label: "Moderate (3-5 days/week)" },
              { value: "active", label: "Active (6-7 days/week)" },
            ]}
            value={selectValues["activity"] || ""}
            onChange={onSelectChange}
          />
          <SelectField
            name="climate"
            label="Climate"
            options={[
              { value: "cool", label: "Cool / Air-conditioned" },
              { value: "moderate", label: "Moderate / Room temperature" },
              { value: "hot", label: "Hot / Humid / Outdoors" },
            ]}
            value={selectValues["climate"] || ""}
            onChange={onSelectChange}
          />
        </>
      )
    default:
      return null
  }
}

interface FieldProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  unit?: string
  inputMode?: "text" | "decimal" | "numeric"
  step?: string
  min?: string
  max?: string
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  unit,
  inputMode = "decimal",
  step,
  min,
  max,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          inputMode={inputMode}
          step={step}
          min={min}
          max={max}
          autoComplete="off"
          className={cn(unit && "pr-12")}
          required
        />
        {unit && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}

interface SelectFieldProps {
  name: string
  label: string
  options: { value: string; label: string }[]
  value: string
  onChange: (name: string, value: string) => void
}

function SelectField({ name, label, options, value, onChange }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <input type="hidden" name={name} value={value} />
      <Select
        value={value}
        onValueChange={(v) => onChange(name, v)}
        required
      >
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
  const formRef = React.useRef<HTMLFormElement>(null)
  const [unit, setUnit] = React.useState<UnitSystem>("metric")
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [selectValues, setSelectValues] = React.useState<Record<string, string>>({})

  const handleSelectChange = (name: string, value: string) => {
    setSelectValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = (fd: FormData): boolean => {
    const next: Record<string, string> = {}
    for (const [key, val] of fd.entries()) {
      if (typeof val === "string" && val.trim().length === 0) {
        next[key] = "This field is required"
      }
    }
    const allSelects = ["sex", "activity", "goal", "frame", "climate"]
    for (const key of allSelects) {
      if (!fd.get(key) || fd.get(key) === "") {
        if (!selectValues[key] || selectValues[key].length === 0) {
          next[key] = "Please select an option"
        }
      }
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (!validate(fd)) return

    const params = new URLSearchParams()
    fd.forEach((value, key) => {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value)
      }
    })
    for (const [key, value] of Object.entries(selectValues)) {
      if (value) params.set(key, value)
    }
    params.set("unit", unit)

    const goal = selectValues["goal"] || fd.get("goal")
    if (tool.categories.length > 0) {
      const category = typeof goal === "string" && goal ? goal : tool.categories[0]
      router.push(`/tools/${tool.slug}/result/${category}?${params.toString()}`)
    } else {
      router.push(`/tools/${tool.slug}/result/general?${params.toString()}`)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Your details</h2>
        <div className="flex items-center gap-1 rounded-full border border-border/40 bg-muted/50 p-0.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => setUnit("metric")}
            className={cn(
              "rounded-full px-3 py-1 transition-colors",
              unit === "metric" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Metric
          </button>
          <button
            type="button"
            onClick={() => setUnit("imperial")}
            className={cn(
              "rounded-full px-3 py-1 transition-colors",
              unit === "imperial" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Imperial
          </button>
        </div>
      </div>

      <FieldsForTool tool={tool} unit={unit} selectValues={selectValues} onSelectChange={handleSelectChange} />

      <SelectField
        name="goal"
        label="Primary Goal"
        options={GOALS}
        value={selectValues["goal"] || ""}
        onChange={handleSelectChange}
      />

      {Object.keys(errors).length > 0 && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive" role="alert">
          <p className="font-medium">Please fix the following:</p>
          <ul className="mt-1 list-inside list-disc space-y-0.5">
            {Object.entries(errors).map(([key, msg]) => (
              <li key={key}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <Button type="submit" className="w-full" size="lg">
        Calculate My Results
      </Button>
    </form>
  )
}
